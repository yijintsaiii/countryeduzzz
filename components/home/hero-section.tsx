"use client"

import { useEffect, useLayoutEffect, useRef, useState, useCallback, useId } from "react"
import { motion } from "framer-motion"

/**
 * 主旅程路徑（與 L3 描邊／動畫原點共用）
 * - C¹ 銜接；迴圈略上移，右側最後一段控制點拉遠以接近「圓弧」掃掠
 * - 仍為：繞一圈後，再以單一 cubic 大弧接至終點
 */
const HERO_JOURNEY_PATH =
  "M -40 820 C 120 680 160 480 340 460 C 520 440 480 260 280 290 C 100 320 140 120 420 150 C 700 180 620 420 520 620 C 420 820 720 860 940 560 C 1160 260 1040 280 920 340 C 800 400 920 440 1000 380 C 1080 320 1200 255 1280 292"

// Hero Section：單層 canvas 霧 + 指標路徑撥開（無 mask-image / toDataURL，避免閃爍）
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

  // Raw cursor position (relative to the hero); optional future use
  const mousePosition = useRef({ x: 0, y: 0 })

  const heroRectRef = useRef({ left: 0, top: 0, width: 1, height: 1 })

  /** 單層霧：直接畫在 canvas 上並以 destination-out 撥開，不使用 mask-image / toDataURL，避免閃爍 */
  const fogCanvasRef = useRef<HTMLCanvasElement>(null)
  const fogCtxRef = useRef<CanvasRenderingContext2D | null>(null)

  const lastStampRef = useRef<{ x: number; y: number } | null>(null)
  const lastPointerEventAtRef = useRef(0)
  const isMobileScrollModeRef = useRef(false)
  /** 手機／粗指：點一下即關閉互動霧（不再依捲動漸隱） */
  const mobileFogDismissedRef = useRef(false)

  // For "almost clear" end-state (still persistent, never recovers).
  const pathEnergyRef = useRef(0)
  const clearedTargetRef = useRef(0)
  const clearedAmountRef = useRef(0)
  const clearEnergyTargetRef = useRef(3200)

  /** 主路徑：供 getPointAtLength 動畫原點 */
  const journeyPathRef = useRef<SVGPathElement>(null)
  const journeyDotRef = useRef<SVGCircleElement>(null)
  const journeyRingRef = useRef<SVGCircleElement>(null)
  const journeyRing2Ref = useRef<SVGCircleElement>(null)

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
    /** 合併原三層霧的視覺權重在單一 bitmap（再由 CSS blur 柔化邊緣） */
    const drawFogBase = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.globalCompositeOperation = "source-over"
      ctx.clearRect(0, 0, w, h)
      ctx.imageSmoothingEnabled = true

      /** 互動霧：帶極淡 mint / brume 色偏，與背景色場一致 */
      const lg = ctx.createLinearGradient(0, 0, 0, h)
      lg.addColorStop(0, "rgba(248, 252, 250, 0.78)")
      lg.addColorStop(0.3, "rgba(232, 248, 242, 0.7)")
      lg.addColorStop(0.55, "rgba(220, 244, 236, 0.56)")
      lg.addColorStop(0.78, "rgba(210, 240, 232, 0.4)")
      lg.addColorStop(1, "rgba(200, 236, 228, 0.28)")
      ctx.globalAlpha = 1
      ctx.fillStyle = lg
      ctx.fillRect(0, 0, w, h)

      const r1 = ctx.createRadialGradient(w * 0.35, h * 0.25, 0, w * 0.35, h * 0.25, w * 0.72)
      r1.addColorStop(0, "rgba(255,255,255,0.45)")
      r1.addColorStop(0.55, "rgba(255,255,255,0)")
      ctx.fillStyle = r1
      ctx.fillRect(0, 0, w, h)

      const r2 = ctx.createRadialGradient(w * 0.75, h * 0.65, 0, w * 0.75, h * 0.65, w * 0.68)
      r2.addColorStop(0, "rgba(255,255,255,0.32)")
      r2.addColorStop(0.6, "rgba(255,255,255,0)")
      ctx.fillStyle = r2
      ctx.fillRect(0, 0, w, h)

      const r3 = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, w * 0.48)
      r3.addColorStop(0, "rgba(255, 255, 255, 0.98)")
      r3.addColorStop(0.18, "rgba(253, 254, 254, 0.92)")
      r3.addColorStop(0.36, "rgba(250, 252, 252, 0.76)")
      r3.addColorStop(0.58, "rgba(248, 251, 250, 0.46)")
      r3.addColorStop(0.78, "rgba(245, 250, 248, 0.20)")
      r3.addColorStop(0.96, "rgba(245, 250, 248, 0)")
      ctx.globalAlpha = 0.94
      ctx.fillStyle = r3
      ctx.fillRect(0, 0, w, h)

      ctx.globalAlpha = 0.32
      const r4 = ctx.createRadialGradient(w * 0.5, h * 0.62, 0, w * 0.5, h * 0.62, w * 0.85)
      r4.addColorStop(0, "rgba(255,255,255,0.28)")
      r4.addColorStop(0.7, "rgba(255,255,255,0)")
      ctx.fillStyle = r4
      ctx.fillRect(0, 0, w, h)

      const floats: [number, number, number][] = [
        [0.18, 0.35, 0.22],
        [0.45, 0.6, 0.28],
        [0.78, 0.4, 0.26],
        [0.6, 0.8, 0.32],
      ]
      ctx.globalAlpha = 0.45
      for (const [fx, fy, fr] of floats) {
        const g = ctx.createRadialGradient(w * fx, h * fy, 0, w * fx, h * fy, w * fr)
        g.addColorStop(0, "rgba(255,255,255,0.52)")
        g.addColorStop(0.62, "rgba(255,255,255,0)")
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }
      ctx.globalAlpha = 1
    }

    const syncFogCanvasOpacity = () => {
      const el = fogCanvasRef.current
      if (!el) return
      if (isMobileScrollModeRef.current && mobileFogDismissedRef.current) {
        el.style.opacity = "0"
        return
      }
      el.style.opacity = "0.92"
    }

    const initFogCanvas = () => {
      const canvas = fogCanvasRef.current
      if (!canvas) return
      const { width: cssW, height: cssH } = heroRectRef.current
      const w = Math.max(1, cssW)
      const h = Math.max(1, cssH)
      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2)

      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const ctx = canvas.getContext("2d", { alpha: true })
      if (!ctx) return
      fogCtxRef.current = ctx
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawFogBase(ctx, w, h)
      syncFogCanvasOpacity()
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

      mousePosition.current = {
        x: heroRectRef.current.width / 2,
        y: heroRectRef.current.height / 2,
      }

      isMobileScrollModeRef.current = window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches
      if (!isMobileScrollModeRef.current) {
        mobileFogDismissedRef.current = false
      }

      lastStampRef.current = null
      pathEnergyRef.current = 0
      clearedTargetRef.current = 0
      clearedAmountRef.current = 0

      initFogCanvas()
    }

    updateHeroRect()
    window.addEventListener("resize", updateHeroRect)

    return () => {
      window.removeEventListener("resize", updateHeroRect)
    }
  }, [])

  const scrollToNext = () => {
    document.getElementById("audience")?.scrollIntoView({ behavior: "smooth" })
  }

  const dismissMobileFog = useCallback(() => {
    if (!isMobileScrollModeRef.current) return
    if (mobileFogDismissedRef.current) return
    mobileFogDismissedRef.current = true
    const el = fogCanvasRef.current
    if (el) el.style.opacity = "0"
  }, [])

  /** 手機／粗指：第一次點擊畫面即立刻關閉迷霧（不依捲動） */
  const handleHeroPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!isMobileScrollModeRef.current) return
      if (mobileFogDismissedRef.current) return
      if (e.pointerType === "mouse") return
      dismissMobileFog()
    },
    [dismissMobileFog]
  )

  const stampAtPoint = useCallback(
    (x: number, y: number, mode: "mouse" | "touch") => {
      const rect = heroRectRef.current
      const ctx = fogCtxRef.current
      if (!ctx) return

      // Only stamp within a central zone on touch.
      if (mode === "touch" && !inCentralZone(x, y)) return

      const last = lastStampRef.current
      const isTouch = mode === "touch"

      // Larger spacing on touch reduces heavy work and avoids degrading scroll.
      const stampSpacingBase = isTouch
        ? Math.max(30, Math.min(rect.width, rect.height) * 0.04)
        : Math.max(13, Math.min(rect.width, rect.height) * 0.016)

      const stampSpacing = Math.max(10, stampSpacingBase)

      const radiusBase = Math.max(156, Math.min(rect.width, rect.height) * 0.265)
      // 單層：取原中層與環境層之間的半徑，一次柔軟撥開
      const radius = radiusBase * (isTouch ? 1.12 : 1.18)
      const centerStrength = isTouch ? 0.76 : 0.74

      const eraseAt = (px: number, py: number) => {
        const cx = px
        const cy = py
        const r = radius

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
        eraseAt(sx, sy)
      }

      // Initial stamp: create an anchor so reveal feels immediate.
      if (!last) {
        lastStampRef.current = { x, y }
        stamp(x, y)
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
  }, [])

  /** 原點沿主旅程 path 循環移動（layout 後量測；path 長度為 0 時下一幀重試） */
  useLayoutEffect(() => {
    let raf = 0
    let cancelled = false
    const durationMs = 26000
    const t0 = performance.now()

    const loop = (now: number) => {
      if (cancelled) return
      const path = journeyPathRef.current
      const dot = journeyDotRef.current
      const ring = journeyRingRef.current
      const ring2 = journeyRing2Ref.current
      if (!path || !dot) {
        raf = requestAnimationFrame(loop)
        return
      }
      const len = path.getTotalLength()
      if (len > 0) {
        const u = (now - t0) / durationMs
        const progress = u - Math.floor(u)
        const pt = path.getPointAtLength(progress * len)
        dot.setAttribute("cx", String(pt.x))
        dot.setAttribute("cy", String(pt.y))
        if (ring) {
          ring.setAttribute("cx", String(pt.x))
          ring.setAttribute("cy", String(pt.y))
        }
        if (ring2) {
          ring2.setAttribute("cx", String(pt.x))
          ring2.setAttribute("cy", String(pt.y))
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [])

  const heroBgUid = useId().replace(/:/g, "")
  /** 多層 grain：底片感 + 細微粒 + 極細高光微粒 */
  const grainFilmId = `hero-grain-film-${heroBgUid}`
  const grainFineId = `hero-grain-fine-${heroBgUid}`
  const grainSparkId = `hero-grain-spark-${heroBgUid}`
  const grainHiId = `hero-grain-hi-${heroBgUid}`

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        position: "relative",
        /* 與底層橫向漸層右側收斂色一致 */
        backgroundColor: "#060f12",
      }}
      onPointerEnter={handleHeroMouseEnter}
      onPointerMove={handleHeroMouseMove}
      onPointerLeave={handleHeroMouseLeave}
      onPointerDown={handleHeroPointerDown}
      onTouchStart={handleHeroTouchStart}
      onTouchMove={handleHeroTouchMove}
      onTouchEnd={handleHeroTouchEnd}
      onTouchCancel={handleHeroTouchEnd}
    >
      {/* ── Hero 背景視覺（z-0）：底層橫向色帶 + 星點 + mint-aqua 色場 + grain（不碰互動霧、文案、路徑幾何） ─ */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* L0a 最底：橫向亮檸檬綠 → 橄欖綠 → 深青綠／海軍（參考圖 2 條狀霧面色帶） */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(92deg,
                #d8ef72 0%,
                #a8d06a 14%,
                #6a9a72 38%,
                #355a52 62%,
                #142824 82%,
                #060f12 100%
              )
            `,
          }}
        />
        {/* L0a-grain：底層全畫面細噪（強化圖 2 的顆粒／霧面，與上層 L2 疊加） */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.28] mix-blend-soft-light"
          aria-hidden
          viewBox="0 0 1200 900"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id={`hero-base-grain-${heroBgUid}`} x="0" y="0" width="1200" height="900" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" result="bn" />
              <feColorMatrix in="bn" type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="1200" height="900" fill="#fff" filter={`url(#hero-base-grain-${heroBgUid})`} opacity={0.95} />
        </svg>
        {/* L0a-stars：四芒星點綴（參考圖 1，置於色帶之上、mesh 之下） */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.55]"
          aria-hidden
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id={`hero-star-glow-${heroBgUid}`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g fill="rgba(255,255,255,0.88)" filter={`url(#hero-star-glow-${heroBgUid})`}>
            {/* 四芒星（羅盤星）24×24，中心 (12,12) */}
            <g transform="translate(180 120) scale(1.1)">
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(420 200) scale(0.45)" opacity={0.7}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(680 160) scale(0.75)" opacity={0.85}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(920 240) scale(0.38)" opacity={0.55}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(280 380) scale(0.55)" opacity={0.65}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(540 320) scale(0.95)" opacity={0.9}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(780 400) scale(0.42)" opacity={0.5}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(150 520) scale(0.5)" opacity={0.6}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(360 580) scale(0.35)" opacity={0.45}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(620 500) scale(0.68)" opacity={0.75}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(900 560) scale(0.4)" opacity={0.5}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(1050 140) scale(0.48)" opacity={0.58}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(240 680) scale(0.52)" opacity={0.62}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(480 720) scale(0.33)" opacity={0.42}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(720 780) scale(0.58)" opacity={0.68}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
            <g transform="translate(980 680) scale(0.44)" opacity={0.52}>
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" transform="translate(-12,-12)" />
            </g>
          </g>
        </svg>
        {/* L0：mint / aqua / lemonade / chartreuse 霧化 mesh（參考色：#C2F2E4 #35C8B4 #EDF7BE #A4CF4A）— 疊在底層色帶上，略透讓橫向層次保留 */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.88,
            mixBlendMode: "soft-light" as const,
            background: `
              radial-gradient(ellipse 150% 105% at 6% 8%, rgba(237, 247, 190, 0.42) 0%, rgba(194, 242, 228, 0.18) 32%, transparent 58%),
              radial-gradient(ellipse 145% 100% at 96% 4%, rgba(194, 242, 228, 0.5) 0%, rgba(53, 200, 180, 0.14) 38%, transparent 60%),
              radial-gradient(ellipse 130% 120% at 92% 92%, rgba(53, 200, 180, 0.22) 0%, rgba(15, 40, 38, 0.06) 48%, transparent 58%),
              radial-gradient(ellipse 128% 115% at 8% 90%, rgba(164, 207, 74, 0.2) 0%, rgba(53, 200, 180, 0.12) 42%, transparent 56%),
              radial-gradient(ellipse 100% 82% at 88% 28%, rgba(194, 242, 228, 0.16) 0%, transparent 55%),
              radial-gradient(ellipse 175% 92% at 50% 100%, rgba(12, 38, 36, 0.38) 0%, rgba(15, 32, 30, 0.12) 42%, transparent 62%),
              radial-gradient(ellipse 92% 72% at 14% 96%, rgba(10, 42, 40, 0.28) 0%, transparent 54%),
              radial-gradient(ellipse 92% 72% at 86% 96%, rgba(10, 42, 40, 0.28) 0%, transparent 54%),
              radial-gradient(ellipse 62% 56% at 48% 42%, rgba(194, 242, 228, 0.12) 0%, transparent 64%),
              linear-gradient(188deg,
                oklch(0.38 0.065 168) 0%,
                oklch(0.32 0.058 172) 22%,
                oklch(0.28 0.05 178) 48%,
                oklch(0.24 0.045 185) 72%,
                oklch(0.22 0.042 192) 100%
              )
            `,
          }}
        />
        {/* L0b 毛玻璃「+」光暈：四角皆有類左上光感（強 blur） */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ opacity: 0.92 }}
        >
          {/* 左上：主光（與先前一致，blur 略增） */}
          <div
            className="absolute -left-[14%] -top-[8%] h-[62%] w-[62%]"
            style={{
              filter: "blur(88px)",
              opacity: 0.52,
              transform: "rotate(-11deg)",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-[72%] w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(237, 247, 190, 0.55) 40%, rgba(194, 242, 228, 0.42) 100%)",
                boxShadow: "0 0 90px 48px rgba(164, 207, 74, 0.22)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[22%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(194, 242, 228, 0.62) 50%, transparent 100%)",
                boxShadow: "0 0 78px 40px rgba(53, 200, 180, 0.18)",
              }}
            />
          </div>
          {/* 右上 */}
          <div
            className="absolute -right-[10%] -top-[6%] h-[44%] w-[44%]"
            style={{
              filter: "blur(76px)",
              opacity: 0.42,
              transform: "rotate(9deg)",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-[70%] w-[21%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(237, 247, 190, 0.5) 50%, transparent 100%)",
                boxShadow: "0 0 60px 32px rgba(53, 200, 180, 0.16)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[21%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(194, 242, 228, 0.62) 50%, transparent 100%)",
              }}
            />
          </div>
          {/* 左下 */}
          <div
            className="absolute -left-[6%] bottom-[2%] h-[42%] w-[42%]"
            style={{
              filter: "blur(70px)",
              opacity: 0.4,
              transform: "rotate(-8deg)",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-[69%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(53, 200, 180, 0.38) 50%, transparent 100%)",
                boxShadow: "0 0 56px 28px rgba(53, 200, 180, 0.14)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[20%] w-[73%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(194, 242, 228, 0.45) 50%, transparent 100%)",
              }}
            />
          </div>
          {/* 右下 */}
          <div
            className="absolute -right-[8%] bottom-[4%] h-[38%] w-[38%]"
            style={{
              filter: "blur(68px)",
              opacity: 0.4,
              transform: "rotate(7deg)",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-[68%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(164, 207, 74, 0.32) 50%, transparent 100%)",
                boxShadow: "0 0 52px 28px rgba(164, 207, 74, 0.12)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[20%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(194, 242, 228, 0.42) 50%, transparent 100%)",
              }}
            />
          </div>
        </div>
        {/* L1 柔焦擴散：全區空氣感（強 blur + 慢速位移） */}
        <motion.div
          className="absolute -left-[22%] top-[-10%] h-[74%] w-[60%] rounded-[64px]"
          style={{
            background:
              "radial-gradient(ellipse 72% 62% at 48% 44%, rgba(194, 242, 228, 0.28) 0%, rgba(53, 200, 180, 0.12) 48%, transparent 74%)",
            filter: "blur(76px)",
            opacity: 0.78,
          }}
          animate={{ x: [0, 14, 0], y: [0, 8, 0], opacity: [0.65, 0.85, 0.65] }}
          transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[16%] top-[-6%] h-[52%] w-[48%] rounded-[56px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 58% at 52% 42%, rgba(237, 247, 190, 0.26) 0%, rgba(194, 242, 228, 0.14) 50%, transparent 74%)",
            filter: "blur(72px)",
            opacity: 0.62,
          }}
          animate={{ x: [0, -10, 0], y: [0, 6, 0], opacity: [0.52, 0.72, 0.52] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        <motion.div
          className="absolute -right-[18%] bottom-[8%] h-[58%] w-[54%] rounded-[52px]"
          style={{
            background:
              "radial-gradient(ellipse 68% 58% at 52% 52%, rgba(53, 200, 180, 0.18) 0%, rgba(15, 42, 40, 0.06) 52%, transparent 74%)",
            filter: "blur(70px)",
            opacity: 0.58,
          }}
          animate={{ x: [0, -12, 0], y: [0, 10, 0], opacity: [0.48, 0.65, 0.48] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
        <motion.div
          className="absolute left-[14%] top-[36%] h-[44%] w-[46%] rounded-[44px]"
          style={{
            background:
              "radial-gradient(ellipse 62% 54% at 50% 50%, rgba(164, 207, 74, 0.1) 0%, transparent 68%)",
            filter: "blur(82px)",
            opacity: 0.52,
          }}
          animate={{ opacity: [0.42, 0.58, 0.42] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
        <motion.div
          className="absolute -left-[8%] bottom-[4%] h-[48%] w-[50%] rounded-[48px]"
          style={{
            background:
              "radial-gradient(ellipse 68% 60% at 40% 55%, rgba(53, 200, 180, 0.14) 0%, rgba(12, 38, 36, 0.08) 55%, transparent 76%)",
            filter: "blur(74px)",
            opacity: 0.55,
          }}
          animate={{ x: [0, 8, 0], opacity: [0.48, 0.62, 0.48] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
        />
        {/* 中心：略壓暗以托字，改為冷綠霧（減厚重） */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 92% 86% at 50% 45%, rgba(8, 32, 30, 0.28) 0%, rgba(10, 38, 36, 0.14) 38%, rgba(12, 42, 40, 0.06) 62%, transparent 84%)",
            opacity: 0.72,
          }}
        />
        {/* L1b 霧面柔光：mint / brume 擴散 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 75% at 50% 28%, rgba(194, 242, 228, 0.14) 0%, rgba(237, 247, 190, 0.06) 32%, transparent 58%), radial-gradient(ellipse 80% 60% at 18% 72%, rgba(53, 200, 180, 0.08) 0%, transparent 55%), radial-gradient(ellipse 75% 55% at 84% 68%, rgba(194, 242, 228, 0.1) 0%, transparent 52%), radial-gradient(ellipse 120% 90% at 50% 100%, rgba(12, 36, 34, 0.12) 0%, transparent 55%)",
            filter: "blur(48px)",
            opacity: 0.82,
            mixBlendMode: "soft-light" as const,
          }}
        />
        {/* L2 多層 grain：粒子感加強（底片＋細粉＋閃點） */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.14] mix-blend-soft-light"
          aria-hidden
          viewBox="0 0 1200 900"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id={grainFilmId} x="0" y="0" width="1200" height="900" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="0.52" numOctaves="4" stitchTiles="stitch" result="n" />
              <feColorMatrix in="n" type="saturate" values="0" />
            </filter>
            <filter id={grainFineId} x="0" y="0" width="1200" height="900" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="1.75" numOctaves="2" stitchTiles="stitch" result="f" />
              <feColorMatrix in="f" type="saturate" values="0" />
            </filter>
            <filter id={grainSparkId} x="0" y="0" width="1200" height="900" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="2.6" numOctaves="1" stitchTiles="stitch" result="s" />
              <feColorMatrix in="s" type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="1200" height="900" filter={`url(#${grainFilmId})`} opacity={0.92} />
          <rect width="1200" height="900" filter={`url(#${grainFineId})`} opacity={0.58} />
          <rect width="1200" height="900" filter={`url(#${grainSparkId})`} opacity={0.34} />
        </svg>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.062] mix-blend-overlay"
          aria-hidden
          viewBox="0 0 1200 900"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id={grainHiId} x="0" y="0" width="1200" height="900" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="3.2" numOctaves="1" stitchTiles="stitch" result="h" />
              <feColorMatrix in="h" type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="1200" height="900" filter={`url(#${grainHiId})`} />
        </svg>
        {/* L2c 地圖感：極淡街網（亮底上略提亮線條，不搶主路徑） */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.62]">
          <svg viewBox="0 0 1200 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <defs>
              <pattern id={`map-blocks-${heroBgUid}`} width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(194, 242, 228, 0.11)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1200" height="900" fill={`url(#map-blocks-${heroBgUid})`} opacity={0.38} />
            <g opacity={0.1} fill="none" stroke="rgba(53, 200, 180, 0.35)" strokeWidth="0.55" strokeLinecap="round">
              <path d="M 0 360 L 1200 330" strokeDasharray="3 18" />
              <path d="M 0 520 L 1200 560" strokeDasharray="4 20" />
              <path d="M 420 0 L 400 900" strokeDasharray="3 22" />
              <path d="M 780 0 L 800 900" strokeDasharray="3 22" />
              <path d="M 140 0 L 120 900" strokeDasharray="4 24" />
              <path d="M 1080 0 L 1100 900" strokeDasharray="4 24" />
              <path d="M 0 180 Q 600 240 1200 200" strokeDasharray="2 16" opacity={0.8} />
            </g>
          </svg>
        </div>
        {/* L3 主路徑：起伏旅程線 + 外層光暈 + 漸層描邊 + 沿線移動原點 */}
        <div className="absolute inset-0 opacity-[0.95]">
          <svg viewBox="0 0 1200 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <defs>
              <filter id={`path-aura-${heroBgUid}`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                </feMerge>
              </filter>
              <linearGradient id={`ribbon-a-${heroBgUid}`} x1="0" y1="100%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(215, 255, 95, 0.55)" />
                <stop offset="35%" stopColor="rgba(195, 248, 175, 0.42)" />
                <stop offset="100%" stopColor="rgba(120, 220, 235, 0.5)" />
              </linearGradient>
            </defs>
            {/* 主旅程：中左迴圈（上移）+ 右側近圓弧至終點（C¹） */}
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* 最外柔光（迷霧中透出） */}
              <path
                d={HERO_JOURNEY_PATH}
                stroke="rgba(185, 235, 220, 0.22)"
                strokeWidth="28"
                opacity={0.9}
                filter={`url(#path-aura-${heroBgUid})`}
              />
              <path
                d={HERO_JOURNEY_PATH}
                stroke="rgba(230, 255, 200, 0.18)"
                strokeWidth="16"
                opacity={0.85}
              />
              {/* 主線：漸層描邊（ref 供原點動畫量測） */}
              <path
                ref={journeyPathRef}
                d={HERO_JOURNEY_PATH}
                stroke={`url(#ribbon-a-${heroBgUid})`}
                strokeWidth="5.2"
              />
            </g>
          </svg>
        </div>
        {/* L4 色域裝飾：淺檸檬 / mint 高光，不搶字 */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.09,
            background:
              "linear-gradient(124deg, transparent 0%, transparent 28%, rgba(237, 247, 190, 0.14) 44%, rgba(194, 242, 228, 0.06) 54%, transparent 62%, transparent 100%)",
          }}
        />
        <div
          className="absolute -left-[16%] top-[-8%] h-[64%] w-[58%] rounded-[56px]"
          style={{
            opacity: 0.12,
            background:
              "linear-gradient(148deg, rgba(53, 200, 180, 0.18) 0%, rgba(194, 242, 228, 0.08) 55%, rgba(12, 38, 36, 0.04) 100%)",
            filter: "blur(12px)",
          }}
        />
        <div
          className="absolute right-[-12%] bottom-[2%] h-[52%] w-[54%] rounded-[52px]"
          style={{
            opacity: 0.11,
            background:
              "linear-gradient(138deg, rgba(164, 207, 74, 0.12) 0%, rgba(53, 200, 180, 0.1) 50%, rgba(10, 36, 34, 0.05) 100%)",
            filter: "blur(14px)",
          }}
        />
        {/* L6 主標區可讀性：微亮芯 + 較輕的底部收斂 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 58% 48% at 50% 44%, rgba(255,253,248,0.07) 0%, transparent 62%), radial-gradient(ellipse 120% 100% at 50% 50%, transparent 42%, rgba(8, 28, 26, 0.16) 100%)",
            opacity: 0.92,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.032,
            background:
              "repeating-linear-gradient(118deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 24px, rgba(255,255,255,0.3) 25px, rgba(255,255,255,0.3) 26px)",
          }}
        />
        {/* L3b 旅程原點：疊在 L4/L6 之上，避免被全畫面霧面／暗角層遮住 */}
        <svg
          className="pointer-events-none absolute inset-0 z-[12] h-full w-full overflow-visible"
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <g pointerEvents="none">
            <circle
              ref={journeyRingRef}
              cx={-40}
              cy={820}
              r="18"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.8"
              opacity={0.8}
            />
            <circle
              ref={journeyRing2Ref}
              cx={-40}
              cy={820}
              r="11"
              fill="none"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="0.7"
              opacity={0.88}
            />
            <circle
              ref={journeyDotRef}
              cx={-40}
              cy={820}
              r="5.5"
              fill="#fde047"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="1"
              style={{ filter: "drop-shadow(0 0 10px rgba(250,204,21,0.9))" }}
            />
          </g>
        </svg>
      </div>

      {/* ── CONTENT (z-20) — always crisp, always visible ─────────────────── */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            className="mb-10 inline-flex items-center gap-3.5 rounded-full border border-[#cbfd3c]/35 bg-emerald-950/45 px-7 py-3.5 text-base font-medium text-[#fffdf8] shadow-[0_0_0_1px_rgba(203,253,60,0.08)_inset] md:mb-12 md:gap-4 md:px-9 md:py-4 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <motion.span
              className="h-3 w-3 shrink-0 rounded-full bg-[#cbfd3c] md:h-3.5 md:w-3.5"
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="rounded-md bg-[#cbfd3c]/18 px-2.5 py-1 text-xs font-bold tracking-wide text-[#cbfd3c] md:px-3 md:py-1.5 md:text-sm">
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

      {/* ── 單層互動霧：bitmap 直接繪製 + 柔邊 blur；不使用 mask-image / toDataURL，避免閃爍 ── */}
      <canvas
        ref={fogCanvasRef}
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 30,
          opacity: 0.92,
          filter: "blur(22px)",
        }}
      />

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
