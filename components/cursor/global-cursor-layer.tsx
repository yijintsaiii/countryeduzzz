"use client"

import { useEffect, useRef } from "react"

/**
 * 全站共用自訂 cursor layer（僅桌機細指標）。
 * - pointer-events: none，避免影響文字選取與一般互動
 * - 用 refs + rAF 直接操作 style，避免額外 re-render
 */
export function GlobalCursorLayer() {
  const ringRef = useRef<HTMLDivElement | null>(null)
  const coreRef = useRef<HTMLDivElement | null>(null)

  const targetRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  const interactiveRef = useRef(false)
  const visibleRef = useRef(false)
  const bgLumaRef = useRef(0.5)
  const lastLumaUpdateAtRef = useRef(0)

  const cursorGreen = "#cbfd3c"

  const parseBgLuma = (bg: string) => {
    // Supports:
    // - rgb(r,g,b)
    // - rgba(r,g,b,a)
    // Returns null if cannot parse.
    const m = bg
      .replace(/\s+/g, "")
      .match(/^rgba?\((\d+),(\d+),(\d+)(?:,([0-9.]+))?\)$/i)
    if (!m) return null
    const r = Number(m[1])
    const g = Number(m[2])
    const b = Number(m[3])
    const a = m[4] == null ? 1 : Number(m[4])
    if (!Number.isFinite(r) || !Number.isFinite(g) || !Number.isFinite(b)) return null
    // If alpha is very low, treat as "transparent".
    if (a <= 0.05) return null
    // Relative luminance (Rec. 709).
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  }

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches
    if (!finePointer) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    let rafId = 0
    let running = false

    const apply = () => {
      const core = coreRef.current
      const ring = ringRef.current
      if (!core || !ring) return

      if (!visibleRef.current) {
        core.style.opacity = "0"
        ring.style.opacity = "0"
        running = false
        return
      }

      // Inertia smoothing.
      const s = smoothRef.current
      const t = targetRef.current
      s.x += (t.x - s.x) * 0.14
      s.y += (t.y - s.y) * 0.14

      const cx = s.x
      const cy = s.y
      const isInteractive = interactiveRef.current

      const luma = bgLumaRef.current
      // Ensure the cursor stays clearly visible on both light and dark sections.
      // (Higher luma => brighter background => raise opacity/halo; lower luma => dark background => tone down.)
      const baseCore = luma >= 0.72 ? 0.62 : luma <= 0.32 ? 0.5 : 0.56
      const baseRing = luma >= 0.72 ? 0.36 : luma <= 0.32 ? 0.28 : 0.32

      const coreOpacity = isInteractive ? 0.95 : baseCore
      const ringOpacity = isInteractive ? 0.62 : baseRing

      const coreScale = isInteractive ? 1.25 : 1
      const ringScale = isInteractive ? 1.42 : 1

      core.style.opacity = String(coreOpacity)
      ring.style.opacity = String(ringOpacity)

      // Keep the green language, but strengthen the halo subtly depending on background.
      const glowA = isInteractive ? 0.42 : luma >= 0.72 ? 0.30 : luma <= 0.32 ? 0.26 : 0.28
      const ringGlowA = isInteractive ? 0.24 : luma >= 0.72 ? 0.20 : luma <= 0.32 ? 0.18 : 0.19
      core.style.boxShadow = `0 0 8px rgba(203,253,60,${glowA})`
      ring.style.boxShadow = `0 0 14px rgba(203,253,60,${ringGlowA})`

      core.style.backgroundColor = cursorGreen
      ring.style.borderColor = cursorGreen

      core.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${coreScale})`
      ring.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${ringScale})`

      rafId = requestAnimationFrame(apply)
    }

    const start = () => {
      if (running) return
      running = true
      rafId = requestAnimationFrame(apply)
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!e) return
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return

      targetRef.current = { x: e.clientX, y: e.clientY }
      visibleRef.current = true

      // Low-cost background luminance sampling (throttled) to keep cursor contrast.
      const now = performance.now()
      if (now - lastLumaUpdateAtRef.current > 120) {
        lastLumaUpdateAtRef.current = now
        const el0 = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
        let cur: HTMLElement | null = el0
        let luma: number | null = null
        for (let i = 0; i < 5 && cur; i++) {
          const style = window.getComputedStyle(cur)
          const bg = style.backgroundColor
          if (bg && bg !== "transparent") {
            const parsed = parseBgLuma(bg)
            if (parsed != null) {
              luma = parsed
              break
            }
          }
          cur = cur.parentElement
        }
        if (luma == null) {
          const bodyStyle = window.getComputedStyle(document.body)
          const parsed = parseBgLuma(bodyStyle.backgroundColor)
          luma = parsed ?? 0.5
        }
        bgLumaRef.current = luma
      }

      const target = e.target as HTMLElement | null
      interactiveRef.current = !!target?.closest(
        "a, button, [role='button'], input, textarea, select, [data-radix-link], [data-state=active]"
      )

      start()
    }

    const handlePointerLeave = () => {
      visibleRef.current = false
      interactiveRef.current = false
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("blur", handlePointerLeave)
    document.addEventListener("mouseleave", handlePointerLeave)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("blur", handlePointerLeave)
      document.removeEventListener("mouseleave", handlePointerLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block" aria-hidden>
      <div
        ref={ringRef}
        className="absolute h-7 w-7 rounded-full border bg-transparent transition-[transform,opacity,border-color] duration-150 ease-out"
        style={{
          opacity: 0,
          boxShadow: "0 0 14px rgba(203,253,60,0.18)",
          borderColor: cursorGreen,
        }}
      />
      <div
        ref={coreRef}
        className="absolute h-2.5 w-2.5 rounded-full transition-[transform,opacity] duration-100 ease-out"
        style={{
          opacity: 0,
          boxShadow: "0 0 8px rgba(203,253,60,0.42)",
          backgroundColor: cursorGreen,
        }}
      />
    </div>
  )
}

