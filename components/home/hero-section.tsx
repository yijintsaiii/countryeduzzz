"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

// Hero Section with persistent cursor-based fog reveal animation
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [isHoveringHero, setIsHoveringHero] = useState(false)
  const isHoveringHeroRef = useRef(false)
  // We rely on `pointerType` in handlers to avoid fake cursor on touch.
  // This state is kept for potential future tuning, but is not required.
  const [supportsFinePointer] = useState(false)

  // Mobile touch interaction (separate from desktop hover/cursor).
  const isTouchInteractingRef = useRef(false)
  const touchIdRef = useRef<number | null>(null)

  // Raw cursor position (relative to the hero)
  const mousePosition = useRef({ x: 0, y: 0 })
  // Smoothed cursor position (inertia)
  const smoothedMousePosition = useRef({ x: 0, y: 0 })

  const heroRectRef = useRef({ left: 0, top: 0, width: 1, height: 1 })

  const envFogRef = useRef<HTMLDivElement>(null)
  const midFogRef = useRef<HTMLDivElement>(null)
  const floatFogRef = useRef<HTMLDivElement>(null)

  // Persistent reveal masks (canvas-based, erased only once).
  const envMaskCanvasRef = useRef<HTMLCanvasElement>(null)
  const midMaskCanvasRef = useRef<HTMLCanvasElement>(null)
  const floatMaskCanvasRef = useRef<HTMLCanvasElement>(null)

  const envMaskCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  const midMaskCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  const floatMaskCtxRef = useRef<CanvasRenderingContext2D | null>(null)

  const maskScale = 0.42
  const lastStampRef = useRef<{ x: number; y: number } | null>(null)
  const lastPointerEventAtRef = useRef(0)
  const lastMaskCommitAtRef = useRef(0)
  const isMobileScrollModeRef = useRef(false)
  const mobileClearProgressRef = useRef(0)
  const cursorCoreRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const cursorInteractiveRef = useRef(false)

  // For "almost clear" end-state (still persistent, never recovers).
  const pathEnergyRef = useRef(0)
  const clearedTargetRef = useRef(0)
  const clearedAmountRef = useRef(0)
  const clearEnergyTargetRef = useRef(3200)

  // Throttle heavy `toDataURL()` mask updates.
  const maskDirtyRef = useRef(false)

  const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

  const inCentralZone = (x: number, y: number) => {
    const rect = heroRectRef.current
    const nx = rect.width > 0 ? x / rect.width : 0.5
    const ny = rect.height > 0 ? y / rect.height : 0.5

    // Keep touch reveal focused on the main hero visual area to avoid hurting scrolling.
    // (Tuned for "central title zone".)
    const inX = nx >= 0.18 && nx <= 0.82
    const inY = ny >= 0.18 && ny <= 0.78
    return inX && inY
  }

  useEffect(() => {
    // Intentionally no-op (pointerType filtering is the primary guard).
  }, [])

  useEffect(() => {
    let rafId = 0

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const commitMasks = () => {
      if (!envFogRef.current || !midFogRef.current || !floatFogRef.current) return
      const envCanvas = envMaskCanvasRef.current
      const midCanvas = midMaskCanvasRef.current
      const floatCanvas = floatMaskCanvasRef.current
      if (!envCanvas || !midCanvas || !floatCanvas) return

      // PNG alpha is used by CSS mask-image.
      const envUrl = envCanvas.toDataURL("image/png")
      const midUrl = midCanvas.toDataURL("image/png")
      const floatUrl = floatCanvas.toDataURL("image/png")

      const applyMask = (el: HTMLDivElement, url: string) => {
        el.style.webkitMaskImage = `url(${url})`
        el.style.maskImage = `url(${url})`
        el.style.webkitMaskRepeat = "no-repeat"
        el.style.maskRepeat = "no-repeat"
        el.style.webkitMaskSize = "100% 100%"
        el.style.maskSize = "100% 100%"
      }

      applyMask(envFogRef.current, envUrl)
      applyMask(midFogRef.current, midUrl)
      applyMask(floatFogRef.current, floatUrl)
    }

    const initMaskCanvas = (
      canvas: HTMLCanvasElement | null,
      ctxRef: { current: CanvasRenderingContext2D | null }
    ) => {
      if (!canvas) return
      const { width, height } = heroRectRef.current
      const w = Math.max(1, Math.floor(width * maskScale))
      const h = Math.max(1, Math.floor(height * maskScale))
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctxRef.current = ctx
      ctx.imageSmoothingEnabled = true

      // White/opaque mask => fog fully visible.
      ctx.globalCompositeOperation = "source-over"
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "rgba(255,255,255,1)"
      ctx.fillRect(0, 0, w, h)
    }

    const updateHeroRect = () => {
      if (!containerRef.current) return
      const r = containerRef.current.getBoundingClientRect()
      heroRectRef.current = {
        left: r.left,
        top: r.top,
        width: Math.max(1, r.width),
        height: Math.max(1, r.height),
      }

      // Initialize cursor positions at center so transforms are stable.
      mousePosition.current = {
        x: heroRectRef.current.width / 2,
        y: heroRectRef.current.height / 2,
      }
      smoothedMousePosition.current = { ...mousePosition.current }

      // Mobile/tablet uses scroll-to-clear instead of touch-path reveal.
      isMobileScrollModeRef.current = window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches

      // If user resizes, reset masks (rare), but never "restore" during a session.
      initMaskCanvas(envMaskCanvasRef.current, envMaskCtxRef)
      initMaskCanvas(midMaskCanvasRef.current, midMaskCtxRef)
      initMaskCanvas(floatMaskCanvasRef.current, floatMaskCtxRef)

      lastStampRef.current = null
      pathEnergyRef.current = 0
      clearedTargetRef.current = 0
      clearedAmountRef.current = 0
      maskDirtyRef.current = true
    }

    const tick = () => {
      const rect = heroRectRef.current
      const s = smoothedMousePosition.current
      const t = mousePosition.current
      const mobileMode = isMobileScrollModeRef.current

      // Inertia-like smoothing for natural motion.
      s.x += (t.x - s.x) * 0.14
      s.y += (t.y - s.y) * 0.14

      const dx = (s.x / rect.width - 0.5) * 2
      const dy = (s.y / rect.height - 0.5) * 2

      const hoverLocal = isHoveringHeroRef.current ? 1 : 0
      const active = hoverLocal

      // Subtle displacement to make interaction feel alive (mask is the main reveal).
      // Keep desktop fog atmosphere stable: no continuous drifting motion.
      const driftX = 0
      const driftY = 0

      if (envFogRef.current) {
        envFogRef.current.style.transform = mobileMode
          ? "translate3d(0px, 0px, 0)"
          : `translate3d(${dx * -2.8 * active}px, ${dy * -2.2 * active}px, 0)`
      }
      if (midFogRef.current) {
        midFogRef.current.style.transform = mobileMode
          ? "translate3d(0px, 0px, 0)"
          : `translate3d(${dx * -4.2 * active}px, ${dy * -3.1 * active}px, 0)`
      }
      if (floatFogRef.current) {
        if (mobileMode) {
          floatFogRef.current.style.transform = "translate3d(0px, 0px, 0)"
        } else {
          const floatX = dx * -5.4 * active + driftX
          const floatY = dy * -4.2 * active + driftY
          floatFogRef.current.style.transform = `translate3d(${floatX}px, ${floatY}px, 0)`
        }
      }

      if (mobileMode) {
        const p = mobileClearProgressRef.current
        if (envFogRef.current) envFogRef.current.style.opacity = `${0.92 - p * 0.78}`
        if (midFogRef.current) midFogRef.current.style.opacity = `${0.86 - p * 0.78}`
        if (floatFogRef.current) floatFogRef.current.style.opacity = `${0.20 - p * 0.16}`
      }

      // Desktop-only custom cursor in Hero (stable, subtle).
      if (!mobileMode && cursorCoreRef.current && cursorRingRef.current) {
        const cx = s.x
        const cy = s.y
        const isNearRoute = Math.abs(dx) < 0.16
        const isInteractive = cursorInteractiveRef.current

        cursorCoreRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${isInteractive ? 1.25 : 1})`
        cursorCoreRef.current.style.opacity = isHoveringHeroRef.current ? "0.95" : "0"

        const ringScale = isInteractive ? 1.42 : isNearRoute ? 1.16 : 1
        const ringOpacity = isInteractive ? 0.58 : isNearRoute ? 0.42 : 0.28
        cursorRingRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${ringScale})`
        cursorRingRef.current.style.opacity = isHoveringHeroRef.current ? `${ringOpacity}` : "0"
      }

      if (maskDirtyRef.current && performance.now() - lastMaskCommitAtRef.current > 96) {
        lastMaskCommitAtRef.current = performance.now()
        maskDirtyRef.current = false
        commitMasks()
      }

      rafId = requestAnimationFrame(tick)
    }

    updateHeroRect()
    window.addEventListener("resize", updateHeroRect)
    const handleScrollForMobileClear = () => {
      if (!containerRef.current) return
      if (!isMobileScrollModeRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const raw = (-rect.top + vh * 0.18) / (Math.max(1, rect.height) * 0.88)
      const progress = clamp01(raw)
      // Monotonic clear state on mobile: never restore to dense fog.
      mobileClearProgressRef.current = Math.max(mobileClearProgressRef.current, progress)
    }
    window.addEventListener("scroll", handleScrollForMobileClear, { passive: true })
    handleScrollForMobileClear()
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", updateHeroRect)
      window.removeEventListener("scroll", handleScrollForMobileClear)
    }
  }, [])

  const scrollToNext = () => {
    document.getElementById("audience")?.scrollIntoView({ behavior: "smooth" })
  }

  const stampAtPoint = useCallback(
    (x: number, y: number, mode: "mouse" | "touch") => {
      const rect = heroRectRef.current
      if (!envMaskCtxRef.current || !midMaskCtxRef.current || !floatMaskCtxRef.current) return

      // Only stamp within a central zone on touch.
      if (mode === "touch" && !inCentralZone(x, y)) return

      const envCtx = envMaskCtxRef.current
      const midCtx = midMaskCtxRef.current
      const floatCtx = floatMaskCtxRef.current

      const last = lastStampRef.current
      const isTouch = mode === "touch"

      // Larger spacing on touch reduces heavy work and avoids degrading scroll.
      const stampSpacingBase = isTouch
        ? Math.max(30, Math.min(rect.width, rect.height) * 0.04)
        : Math.max(13, Math.min(rect.width, rect.height) * 0.016)

      const stampSpacing = Math.max(10, stampSpacingBase)

      const radiusBase = Math.max(156, Math.min(rect.width, rect.height) * 0.265)
      const envRadius = radiusBase * (isTouch ? 1.02 : 1.04)
      const midRadius = radiusBase * (isTouch ? 1.18 : 1.24)
      const floatRadius = radiusBase * (isTouch ? 0.94 : 0.92)

      const centerStrengthEnv = isTouch ? 0.8 : 0.78
      const centerStrengthMid = isTouch ? 0.74 : 0.72
      const centerStrengthFloat = isTouch ? 0.52 : 0.5

      const eraseAt = (
        ctx: CanvasRenderingContext2D,
        px: number,
        py: number,
        radius: number,
        centerStrength: number
      ) => {
        const cx = px * maskScale
        const cy = py * maskScale
        const r = radius * maskScale

        ctx.globalCompositeOperation = "destination-out"
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.closePath()

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        g.addColorStop(0, `rgba(0,0,0,${centerStrength})`)
        g.addColorStop(0.18, `rgba(0,0,0,${centerStrength * 0.78})`)
        g.addColorStop(0.42, `rgba(0,0,0,${centerStrength * 0.5})`)
        g.addColorStop(0.68, `rgba(0,0,0,${centerStrength * 0.24})`)
        g.addColorStop(0.88, `rgba(0,0,0,${centerStrength * 0.08})`)
        g.addColorStop(1, `rgba(0,0,0,0)`)
        ctx.fillStyle = g
        ctx.fill()

        // Add a very soft outer feather to avoid visible seam rings.
        const gSoft = ctx.createRadialGradient(cx, cy, r * 0.36, cx, cy, r * 1.42)
        gSoft.addColorStop(0, `rgba(0,0,0,${centerStrength * 0.12})`)
        gSoft.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = gSoft
        ctx.beginPath()
        ctx.arc(cx, cy, r * 1.42, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()

        ctx.globalCompositeOperation = "source-over"
      }

      const stamp = (sx: number, sy: number) => {
        eraseAt(envCtx, sx, sy, envRadius, centerStrengthEnv)
        eraseAt(midCtx, sx, sy, midRadius, centerStrengthMid)
        eraseAt(floatCtx, sx, sy, floatRadius, centerStrengthFloat)
      }

      // Initial stamp: create an anchor so reveal feels immediate.
      if (!last) {
        lastStampRef.current = { x, y }
        stamp(x, y)
        maskDirtyRef.current = true
        return
      }

      const dist = Math.hypot(x - last.x, y - last.y)
      if (dist < stampSpacing) return

      const steps = Math.max(1, Math.floor(dist / stampSpacing))
      for (let i = 1; i <= steps; i++) {
        const k = i / steps
        stamp(last.x + (x - last.x) * k, last.y + (y - last.y) * k)
      }

      lastStampRef.current = { x, y }
      maskDirtyRef.current = true

      // Energy based on path length => drives the "almost clear" end-state.
      // Note: this never restores fog (monotonic reveal).
      pathEnergyRef.current += dist * (isTouch ? 1.1 : 1.4)
      const target = Math.max(2200, Math.max(rect.width, rect.height) * 3.2)
      clearEnergyTargetRef.current = target
      clearedTargetRef.current = Math.max(
        clearedTargetRef.current,
        Math.min(1, pathEnergyRef.current / clearEnergyTargetRef.current)
      )
    },
    // Uses only refs; stable by empty deps.
    []
  )

  const handleHeroMouseEnter = useCallback((e: any) => {
    if (isMobileScrollModeRef.current) return
    const pt = e?.pointerType
    // Only enable cursor-local / stamp reveal for fine pointers (mouse/pen).
    if (pt !== "mouse" && pt !== "pen") return
    setIsHoveringHero(true)
    isHoveringHeroRef.current = true
  }, [])

  const handleHeroMouseLeave = useCallback((e: any) => {
    if (isMobileScrollModeRef.current) return
    const pt = e?.pointerType
    if (pt !== "mouse" && pt !== "pen") return
    setIsHoveringHero(false)
    isHoveringHeroRef.current = false
    lastStampRef.current = null
  }, [])

  const handleHeroMouseMove = useCallback((e: any) => {
    if (isMobileScrollModeRef.current) return
    if (!containerRef.current) return
    if (!isHoveringHeroRef.current) return
    const pt = e?.pointerType
    if (pt !== "mouse" && pt !== "pen") return
    const now = performance.now()
    if (now - lastPointerEventAtRef.current < 18) return
    lastPointerEventAtRef.current = now

    const rect = heroRectRef.current
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top))
    mousePosition.current = { x, y }
    const target = e?.target as HTMLElement | null
    cursorInteractiveRef.current = !!target?.closest("a, button, [role='button']")
    stampAtPoint(x, y, "mouse")
  }, [])

  const getTouchXY = (e: any) => {
    const rect = heroRectRef.current
    const touches = e?.touches
    if (!touches || touches.length === 0) return null
    const targetTouch = touchIdRef.current == null ? touches[0] : Array.from(touches).find((t: any) => t.identifier === touchIdRef.current) || touches[0]

    const x = Math.max(0, Math.min(rect.width, targetTouch.clientX - rect.left))
    const y = Math.max(0, Math.min(rect.height, targetTouch.clientY - rect.top))
    return { x, y }
  }

  const handleHeroTouchStart = useCallback((e: any) => {
    if (isMobileScrollModeRef.current) return
    if (!containerRef.current) return
    const pt = e?.touches?.[0]
    if (!pt) return
    isTouchInteractingRef.current = true
    touchIdRef.current = pt.identifier ?? null

    // Start fresh for this finger; persistent reveal is stored in the mask anyway.
    lastStampRef.current = null

    const xy = getTouchXY(e)
    if (!xy) return
    stampAtPoint(xy.x, xy.y, "touch")
  }, [stampAtPoint])

  const handleHeroTouchMove = useCallback((e: any) => {
    if (isMobileScrollModeRef.current) return
    if (!containerRef.current) return
    if (!isTouchInteractingRef.current) return

    const xy = getTouchXY(e)
    if (!xy) return
    stampAtPoint(xy.x, xy.y, "touch")
  }, [stampAtPoint])

  const handleHeroTouchEnd = useCallback(() => {
    isTouchInteractingRef.current = false
    touchIdRef.current = null
    lastStampRef.current = null
    cursorInteractiveRef.current = false
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        position: "relative",
        background:
          "linear-gradient(148deg, oklch(0.2 0.058 154) 0%, oklch(0.175 0.05 156) 36%, oklch(0.162 0.045 158) 68%, oklch(0.19 0.052 155) 100%)",
      }}
      onPointerEnter={handleHeroMouseEnter}
      onPointerMove={handleHeroMouseMove}
      onPointerLeave={handleHeroMouseLeave}
      onTouchStart={handleHeroTouchStart}
      onTouchMove={handleHeroTouchMove}
      onTouchEnd={handleHeroTouchEnd}
      onTouchCancel={handleHeroTouchEnd}
    >
      {/* Desktop custom cursor (Hero-only) */}
      <div className="pointer-events-none absolute inset-0 z-[55] hidden md:block">
        <div
          ref={cursorRingRef}
          className="absolute h-7 w-7 rounded-full border border-[#cbfd3c]/55 bg-transparent transition-[transform,opacity,border-color] duration-150 ease-out"
          style={{
            opacity: 0,
            boxShadow: "0 0 14px rgba(203,253,60,0.18)",
          }}
        />
        <div
          ref={cursorCoreRef}
          className="absolute h-2.5 w-2.5 rounded-full bg-[#cbfd3c] transition-[transform,opacity] duration-100 ease-out"
          style={{
            opacity: 0,
            boxShadow: "0 0 8px rgba(203,253,60,0.42)",
          }}
        />
      </div>

      {/* ── Ambient brand composition (z-0) ──────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.26, 0.32, 0.26] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 122% 90% at 52% 46%, rgba(20,82,58,0.42) 0%, rgba(14,61,47,0.34) 44%, rgba(9,42,40,0.22) 72%, transparent 100%)",
          }}
        />
        <div
          className="absolute -left-[18%] top-[2%] h-[68%] w-[52%]"
          style={{
            clipPath: "polygon(0% 12%, 72% 0%, 100% 52%, 58% 100%, 0% 84%)",
            opacity: 0.22,
            background:
              "linear-gradient(142deg, rgba(26,110,73,0.56) 0%, rgba(18,78,61,0.34) 54%, rgba(14,58,52,0.12) 100%)",
            transform: "rotate(-8deg)",
          }}
        />
        <div
          className="absolute right-[-14%] top-[-6%] h-[74%] w-[56%]"
          style={{
            clipPath: "polygon(22% 0%, 100% 18%, 84% 100%, 0% 84%)",
            opacity: 0.18,
            background:
              "linear-gradient(132deg, rgba(28,96,70,0.44) 0%, rgba(19,72,60,0.28) 48%, rgba(12,50,55,0.12) 100%)",
            transform: "rotate(10deg)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.1,
            background:
              "linear-gradient(126deg, transparent 0%, transparent 32%, rgba(203,253,60,0.18) 44%, transparent 56%, transparent 100%)",
          }}
        />
        <div
          className="absolute -left-[18%] top-[-12%] h-[68%] w-[66%] rounded-[52px]"
          style={{
            opacity: 0.3,
            background:
              "linear-gradient(150deg, rgba(21,86,63,0.64) 0%, rgba(14,63,52,0.48) 56%, rgba(10,43,44,0.3) 100%)",
            filter: "blur(10px)",
          }}
        />
        <div
          className="absolute right-[-14%] top-[4%] h-[58%] w-[58%] rounded-[56px]"
          style={{
            opacity: 0.26,
            background:
              "linear-gradient(142deg, rgba(19,74,70,0.52) 0%, rgba(14,58,62,0.4) 42%, rgba(11,42,50,0.22) 100%)",
            filter: "blur(11px)",
          }}
        />
        <div
          className="absolute left-[6%] top-[56%] h-[28%] w-[38%] rounded-[32px]"
          style={{
            opacity: 0.2,
            transform: "rotate(-11deg)",
            background:
              "linear-gradient(135deg, rgba(10,41,31,0.48) 0%, rgba(12,59,45,0.24) 58%, rgba(12,59,45,0.02) 100%)",
            filter: "blur(8px)",
          }}
        />
        <div
          className="absolute right-[9%] top-[24%] h-[4px] w-[126px] rounded-full"
          style={{
            background: "linear-gradient(90deg, rgba(199,255,58,0) 0%, rgba(199,255,58,0.75) 42%, rgba(199,255,58,0) 100%)",
            opacity: 0.72,
            transform: "rotate(-16deg)",
          }}
        />
        <div
          className="absolute left-[18%] bottom-[22%] h-[4px] w-[120px] rounded-full"
          style={{
            background: "linear-gradient(90deg, rgba(245,189,96,0) 0%, rgba(245,189,96,0.7) 46%, rgba(245,189,96,0) 100%)",
            opacity: 0.62,
            transform: "rotate(13deg)",
          }}
        />
        <div
          className="absolute right-[14%] bottom-[16%] h-[20%] w-[24%] rounded-[28px]"
          style={{
            opacity: 0.18,
            background:
              "linear-gradient(160deg, rgba(14,56,70,0.42) 0%, rgba(10,44,58,0.22) 70%, rgba(8,34,48,0.06) 100%)",
            transform: "rotate(10deg)",
            filter: "blur(8px)",
          }}
        />
        <div className="absolute inset-0 opacity-75">
          <svg viewBox="0 0 1200 900" className="h-full w-full">
            <motion.path
              d="M 40 760 C 210 680, 250 590, 370 520 C 505 445, 620 430, 710 360"
              fill="none"
              stroke="rgba(188,245,122,0.24)"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeDasharray="7 11"
              animate={{ strokeDashoffset: [0, -36] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M 930 120 C 860 190, 835 255, 760 318 C 700 370, 655 402, 628 450"
              fill="none"
              stroke="rgba(146,214,255,0.19)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="5 10"
              animate={{ strokeDashoffset: [0, -26] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              cx="370"
              cy="520"
              r="4.2"
              fill="rgba(199,255,58,0.66)"
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.18, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="710"
              cy="360"
              r="4.6"
              fill="rgba(247,196,103,0.64)"
              animate={{ opacity: [0.45, 0.9, 0.45], scale: [1, 1.14, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
            <circle cx="760" cy="318" r="3.8" fill="rgba(176,225,255,0.42)" />
          </svg>
        </div>
        <motion.div
          className="absolute left-1/2 top-[42%] h-[52%] w-[64%] -translate-x-1/2 -translate-y-1/2"
          animate={{ opacity: [0.2, 0.26, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 62% 52% at 50% 52%, rgba(255,253,248,0.34) 0%, rgba(231,247,222,0.2) 34%, rgba(191,224,184,0.08) 58%, transparent 78%)",
            filter: "blur(11px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.05,
            background:
              "repeating-linear-gradient(120deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 22px, rgba(255,255,255,0.35) 23px, rgba(255,255,255,0.35) 24px)",
          }}
        />
      </div>

      {/* ── CONTENT (z-20) — always crisp, always visible ─────────────────── */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#cbfd3c]/35 bg-emerald-950/45 px-5 py-2.5 text-sm font-medium text-[#fffdf8] shadow-[0_0_0_1px_rgba(203,253,60,0.08)_inset]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-[#cbfd3c]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="rounded-sm bg-[#cbfd3c]/18 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-[#cbfd3c]">
              NEW
            </span>
            賦能青年選擇力
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="text-4xl font-bold leading-tight tracking-tight text-[#fffdf8] md:text-5xl lg:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.45, ease: "easeOut" }}
          >
            <span className="text-balance">撥開職涯的迷霧</span>
          </motion.h1>

          {/* H2 */}
          <motion.h2
            className="mt-4 text-3xl font-bold leading-tight text-[#fffdf8] md:text-4xl lg:text-5xl xl:text-6xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.65, ease: "easeOut" }}
          >
            <span className="text-balance">看見你的專屬藍圖</span>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#fffdf8] md:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: "easeOut" }}
          >
            讓迷惘轉化為選擇的力量
          </motion.p>

          {/* Description */}
          <motion.p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#fffdf8]/86 md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.05, ease: "easeOut" }}
          >
            鄉育陪伴大學生從自我認識到定義賽道，
            <br className="hidden sm:block" />
            在多變的環境中找到前進的方向
          </motion.p>
        </div>
      </div>

      {/* ── Cursor-local multi-layer fog (big feather, no hard hole) ── */}
      {/* Layer 1: full-screen environment fog */}
      <div
        ref={envFogRef}
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 30,
          opacity: 0.92,
          filter: "blur(24px)",
          willChange: "transform, -webkit-mask-image, mask-image",
          background: `
            linear-gradient(180deg,
              rgba(255, 255, 255, 0.78) 0%,
              rgba(253, 254, 254, 0.70) 30%,
              rgba(251, 253, 253, 0.58) 55%,
              rgba(245, 250, 248, 0.42) 78%,
              rgba(240, 248, 245, 0.28) 100%
            ),
            radial-gradient(ellipse 130% 95% at 35% 25%,
              rgba(255,255,255,0.45) 0%,
              transparent 55%
            ),
            radial-gradient(ellipse 120% 90% at 75% 65%,
              rgba(255,255,255,0.32) 0%,
              transparent 60%
            )
          `,
        }}
      />

      {/* Layer 2: thicker mid fog mass around the title */}
      <div
        ref={midFogRef}
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 31,
          opacity: 0.86,
          filter: "blur(16px)",
          willChange: "transform, -webkit-mask-image, mask-image",
          background: `
            radial-gradient(ellipse 78% 58% at 50% 45%,
              rgba(255, 255, 255, 0.98) 0%,
              rgba(253, 254, 254, 0.92) 18%,
              rgba(250, 252, 252, 0.76) 36%,
              rgba(248, 251, 250, 0.46) 58%,
              rgba(245, 250, 248, 0.20) 78%,
              transparent 96%
            ),
            radial-gradient(ellipse 120% 110% at 50% 62%,
              rgba(255,255,255,0.28) 0%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Layer 3: floating fine mist */}
      <div
        ref={floatFogRef}
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 32,
          opacity: 0.2,
          filter: "blur(34px)",
          willChange: "transform, -webkit-mask-image, mask-image",
          background: `
            radial-gradient(ellipse 38% 28% at 18% 35%,
              rgba(255,255,255,0.55) 0%,
              transparent 62%
            ),
            radial-gradient(ellipse 48% 32% at 45% 60%,
              rgba(255,255,255,0.40) 0%,
              transparent 64%
            ),
            radial-gradient(ellipse 44% 30% at 78% 40%,
              rgba(255,255,255,0.50) 0%,
              transparent 66%
            ),
            radial-gradient(ellipse 65% 45% at 60% 80%,
              rgba(255,255,255,0.22) 0%,
              transparent 68%
            )
          `,
        }}
      />

      {/* Hidden canvases for persistent fog reveal masks */}
      <canvas ref={envMaskCanvasRef} className="hidden" />
      <canvas ref={midMaskCanvasRef} className="hidden" />
      <canvas ref={floatMaskCanvasRef} className="hidden" />

      {/* ── SCROLL INDICATOR (z-40) ──────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ zIndex: 40 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-3 text-[#fffdf8] hover:text-[#cbfd3c] transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm font-medium tracking-wide">向下探索</span>
          <div className="h-12 w-px bg-gradient-to-b from-[#cbfd3c]/80 to-transparent" />
        </motion.button>
      </motion.div>

      {/* ── BOTTOM TRANSITION (z-40) ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-56">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,253,248,0) 0%, rgba(255,253,248,0.04) 34%, rgba(255,253,248,0.12) 68%, rgba(255,253,248,0.2) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,253,248,0.02) 0%, rgba(255,253,248,0.14) 38%, var(--background) 100%)",
          }}
        />
      </div>
    </section>
  )
}
