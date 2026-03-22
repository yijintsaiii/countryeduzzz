"use client"

import { useRef, useCallback, useId, useLayoutEffect, useMemo } from "react"
import type { MotionValue } from "framer-motion"
import { motion, useTransform, useInView, useMotionValue } from "framer-motion"
import { Cloud, Compass, Flag, BarChart3, Target, Sparkles } from "lucide-react"

/** 蜿蜒主路徑（viewBox 0 0 1200 100；末段與前一段 C¹ 銜接，避免直線收口／直角感） */
const WINDING_PATH_D =
  "M 600 0 C 475 6 475 11 600 14 C 725 18 725 23 600 28 C 475 33 475 38 600 42 C 725 47 725 52 600 57 C 475 62 475 67 600 71 C 725 76 725 81 600 85 C 476 89 538 96 600 100"

// Journey nodes — 「策略／導航／選擇」敘事；「目標設定」在「能力盤點」之前（Make it real）
const journeyNodes = [
  {
    id: "fog",
    icon: Cloud,
    title: "迷霧期",
    subtitle: "承認不確定",
    description:
      "多數人在這裡：不確定自己要什麼、能做什麼。先停下來辨識位置，才有辦法開啟導航——鄉育從這裡陪你把「不確定」變成下一步。",
    sectionId: "audience",
    gradient: "from-brand-brown/80 to-brand-brown",
    bgColor: "var(--brand-brown-light)",
    iconColor: "var(--brand-brown)",
    glowColor: "rgba(120, 100, 80, 0.4)",
  },
  {
    id: "explore",
    icon: Compass,
    title: "自我探索",
    subtitle: "認識自己的多面向",
    description:
      "用職涯卡牌、測驗與深度對話，梳理興趣、價值觀與天賦；像更新地圖資料，讓後續的路線建議更貼近你。",
    sectionId: "impact",
    gradient: "from-brand-green/80 to-brand-green",
    bgColor: "var(--brand-green-light)",
    iconColor: "var(--brand-green)",
    glowColor: "rgba(80, 140, 100, 0.4)",
  },
  {
    id: "goals",
    icon: Flag,
    title: "目標設定",
    subtitle: "Make it real",
    description:
      "專案第二階段強調實作：先訂出可嘗試的小目標與行動，在真實情境裡試錯、調整——有了具體經驗，盤點才有意義。",
    sectionId: "goal-setting",
    gradient: "from-emerald-600/85 to-emerald-700",
    bgColor: "oklch(0.9 0.05 165)",
    iconColor: "oklch(0.38 0.1 165)",
    glowColor: "rgba(50, 130, 110, 0.38)",
  },
  {
    id: "skills",
    icon: BarChart3,
    title: "能力盤點",
    subtitle: "看見成長的軌跡",
    description:
      "在嘗試與目標推進後，回頭整理學習與專案經驗，把隱形成長轉成可說明的資產——這是「走過路」之後才看得清楚的風景。",
    sectionId: "skills-inventory",
    gradient: "from-brand-green to-brand-green-dark",
    bgColor: "var(--brand-green-light)",
    iconColor: "var(--brand-green-dark)",
    glowColor: "rgba(60, 120, 80, 0.4)",
  },
  {
    id: "direction",
    icon: Target,
    title: "定義賽道",
    subtitle: "做出有根據的選擇",
    description:
      "結合自我認識與產業資訊，收斂方向；像選下一條建議路線——重點不是一次就對，而是依據證據持續校正。",
    sectionId: "testimonials",
    gradient: "from-brand-yellow/90 to-brand-yellow",
    bgColor: "var(--brand-yellow-light)",
    iconColor: "var(--brand-brown)",
    glowColor: "rgba(200, 170, 100, 0.4)",
  },
  {
    id: "future",
    icon: Sparkles,
    title: "職涯藍圖",
    subtitle: "帶著方向前進",
    description:
      "不是一份完美劇本，而是一組你願意採取的行動與實驗；路線可以改，持續參與、持續行動，比「不嘗試」更重要。",
    sectionId: "cta",
    gradient: "from-brand-yellow to-brand-brown/60",
    bgColor: "var(--brand-yellow-light)",
    iconColor: "var(--brand-brown)",
    glowColor: "rgba(220, 180, 100, 0.5)",
  },
]

function WindingPathLine({ progress }: { progress: MotionValue<number> }) {
  const uid = useId().replace(/:/g, "")
  const gradId = `journey-wind-grad-${uid}`
  const measureRef = useRef<SVGPathElement>(null)
  const pathLenMv = useMotionValue(0)

  useLayoutEffect(() => {
    const el = measureRef.current
    if (!el) return
    const len = el.getTotalLength()
    if (len > 0) pathLenMv.set(len)
  }, [pathLenMv])

  /** 捲動 0→1：dashoffset 由 L→0，線條隨捲動「長出來」 */
  const scrollDashOffset = useTransform([progress, pathLenMv], ([p, L]) => {
    const len = typeof L === "number" ? L : 0
    if (len <= 0) return 0
    const t = Math.min(1, Math.max(0, typeof p === "number" ? p : 0))
    return len * (1 - t)
  })

  return (
    <svg
      className="absolute inset-0 z-0 h-full w-full overflow-visible"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--brand-brown)" stopOpacity={0.5} />
          <stop offset="22%" stopColor="var(--brand-green)" stopOpacity={0.72} />
          <stop offset="48%" stopColor="oklch(0.55 0.12 165)" stopOpacity={0.82} />
          <stop offset="72%" stopColor="var(--brand-yellow)" stopOpacity={0.82} />
          <stop offset="100%" stopColor="var(--brand-yellow)" stopOpacity={0.9} />
        </linearGradient>
      </defs>
      {/* 隱藏量測用（與可見路徑同 d，供 getTotalLength；無 stroke 不顯示） */}
      <path ref={measureRef} d={WINDING_PATH_D} className="pointer-events-none opacity-0" stroke="none" fill="none" />

      {/* 底層虛線：乾淨、無 blur */}
      <path
        d={WINDING_PATH_D}
        stroke="oklch(0.78 0.02 150)"
        strokeWidth={1.15}
        strokeDasharray="5 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.42}
        vectorEffect="non-scaling-stroke"
      />
      {/* 背景流光（較淡，避免蓋過捲動主線） */}
      <motion.path
        d={WINDING_PATH_D}
        stroke={`url(#${gradId})`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 10"
        initial={{ strokeDashoffset: 0, opacity: 0.22 }}
        animate={{
          strokeDashoffset: [0, -32],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        vectorEffect="non-scaling-stroke"
      />
      {/* 捲動進度主線：dash 描繪，保證與捲動連動 */}
      <motion.path
        d={WINDING_PATH_D}
        stroke={`url(#${gradId})`}
        strokeWidth={3.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray={pathLenMv}
        strokeDashoffset={scrollDashOffset}
        opacity={0.92}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function JourneyNode({
  node,
  index,
}: {
  node: (typeof journeyNodes)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40% 0px -40% 0px" })
  const Icon = node.icon

  return (
    <motion.div
      ref={ref}
      className={`relative z-10 flex flex-col items-center gap-4 md:gap-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
    >
      <motion.div
        className={`order-2 w-full md:order-none md:flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} text-left`}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.article
          className={`relative w-full max-w-none rounded-2xl border border-border/80 bg-card/85 p-5 shadow-sm backdrop-blur-md transition-colors hover:border-primary/25 hover:shadow-[0_18px_34px_-24px_rgba(5,46,22,0.35)] md:max-w-md md:p-6 ${
            index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
          }`}
          whileHover={{
            y: -2,
            boxShadow: `0 15px 40px -15px ${node.glowColor}`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span
            className={`pointer-events-none absolute top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A] ${
              index % 2 === 0 ? "right-4" : "left-4"
            }`}
            aria-hidden="true"
          />
          <div className={`flex items-center gap-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
            <span
              className="rounded-sm bg-[#EFFFBE]/70 px-2 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ color: node.iconColor }}
            >
              {node.subtitle}
            </span>
          </div>
          <h3 className={`mt-2 text-2xl font-bold text-foreground ${index % 2 === 0 ? "md:text-right" : ""}`}>
            {node.title}
          </h3>
          <p className={`mt-2 leading-relaxed text-muted-foreground ${index % 2 === 0 ? "md:text-right" : ""}`}>
            {node.description}
          </p>
        </motion.article>
      </motion.div>

      <motion.div
        className="relative z-10 order-1 mt-1 flex h-12 w-12 shrink-0 items-center justify-center md:order-none md:mt-0 md:h-20 md:w-20"
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: node.bgColor }}
          animate={
            isInView
              ? {
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0.2, 0.6],
                }
              : {}
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative flex h-10 w-10 items-center justify-center rounded-full shadow-lg md:h-16 md:w-16"
          style={{
            backgroundColor: node.bgColor,
            boxShadow: `0 8px 30px -5px ${node.glowColor}`,
          }}
          whileInView={{ scale: [0.9, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Icon className="h-6 w-6 md:h-7 md:w-7" style={{ color: node.iconColor }} />
        </motion.div>
      </motion.div>

      <div className="hidden md:block md:flex-1" />
    </motion.div>
  )
}

/**
 * 將節點內插出的線性進度略為「加壓」，避免實線永遠追不上閱讀節奏。
 * 1 = 不變；>1 愈快滿條（仍 clamp 在 1）。
 */
function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function boostPathProgress(linear: number, gain = 1.22) {
  const t = clamp01(linear)
  return Math.min(1, t * gain)
}

/**
 * 僅依「時間軸區塊」在視窗中的位置算進度（不含標題區）：
 * - 區塊頂剛從視窗底部進入 → 0
 * - 區塊底對齊視窗底（讀到最後一卡底部）→ 1
 * 這樣實線能畫滿到職涯藍圖最底，不會卡在「最後節點中心」才滿條。
 */
function progressFromTimelineRect(rect: DOMRectReadOnly, vh: number) {
  const h = rect.height
  if (h <= 0) return 0
  return clamp01((vh - rect.top) / h)
}

/** 依節點垂直中心與「閱讀線」內插 0～1，讓實線弧長進度與時間軸節點同步 */
function progressFromNodeCenters(
  nodeEls: (HTMLElement | null)[],
  viewportMarkerY: number
): number | null {
  const centers: number[] = []
  for (const el of nodeEls) {
    if (!el) return null
    const r = el.getBoundingClientRect()
    if (r.height <= 0 && r.width <= 0) return null
    centers.push(r.top + r.height / 2)
  }
  if (centers.length < 2) return null

  const n = centers.length
  const last = n - 1

  if (viewportMarkerY <= centers[0]) return 0
  if (viewportMarkerY >= centers[last]) return 1

  for (let i = 0; i < last; i++) {
    const a = centers[i]
    const b = centers[i + 1]
    if (viewportMarkerY >= a && viewportMarkerY <= b) {
      const span = b - a
      const t = span < 1e-6 ? 0 : (viewportMarkerY - a) / span
      return (i + t) / last
    }
  }
  // 落在兩中心之間的縫隙（理論上不應發生）
  return Math.min(1, Math.max(0, (viewportMarkerY - centers[0]) / (centers[last] - centers[0])))
}

export function JourneyPath() {
  const containerRef = useRef<HTMLDivElement>(null)
  /** 僅時間軸（路徑＋節點）— 進度依此區塊計算，不含上方標題，實線才與節點對齊 */
  const timelineRef = useRef<HTMLDivElement>(null)
  /** 每個節點列的外層，用於量測中心 Y，驅動路徑進度 */
  const nodeRowRefs = useRef<(HTMLDivElement | null)[]>([])
  const grainUid = useId().replace(/:/g, "")
  const nodeCount = journeyNodes.length

  const setNodeRowRef = useCallback((index: number, el: HTMLDivElement | null) => {
    nodeRowRefs.current[index] = el
  }, [])

  const nodeRefCallbacks = useMemo(
    () => journeyNodes.map((_, i) => (el: HTMLDivElement | null) => setNodeRowRef(i, el)),
    [setNodeRowRef]
  )

  const setContainerRef = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      el.style.position = "relative"
    }
    ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
  }, [])

  /**
   * 路徑進度：max(時間軸捲動比例, 節點閱讀線內插)，兼顧「畫到最底」與「對齊圓點」。
   */
  const pathProgress = useMotionValue(0)

  useLayoutEffect(() => {
    const el = timelineRef.current
    if (!el) return

    const update = () => {
      const vh = window.innerHeight
      const rect = el.getBoundingClientRect()
      const pScroll = progressFromTimelineRect(rect, vh)

      /**
       * 閱讀線（視窗 Y）：與節點中心內插用；略偏下讓節點對齊較自然。
       */
      const viewportMarkerY = vh * 0.52

      const nodeEls = nodeRowRefs.current.slice(0, nodeCount)
      const fromNodes = progressFromNodeCenters(nodeEls, viewportMarkerY)
      const pNode = fromNodes != null ? boostPathProgress(fromNodes) : 0

      /** 捲動為主確保捲到最後一區時線能滿條；節點為輔讓中段較貼圓點 */
      pathProgress.set(Math.min(1, Math.max(pScroll, pNode)))
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null
    if (ro) ro.observe(el)

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      if (ro) ro.disconnect()
    }
  }, [nodeCount])

  return (
    <section
      id="journey-path"
      ref={setContainerRef}
      className="relative overflow-hidden py-20 lg:py-32"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 10% 15%, rgba(194, 242, 228, 0.45) 0%, transparent 55%),
          radial-gradient(ellipse 100% 70% at 90% 20%, rgba(237, 247, 190, 0.35) 0%, transparent 50%),
          radial-gradient(ellipse 90% 60% at 50% 85%, rgba(53, 200, 180, 0.12) 0%, transparent 45%),
          linear-gradient(180deg,
            rgba(232, 248, 242, 0.95) 0%,
            rgba(245, 252, 248, 0.98) 35%,
            oklch(0.97 0.018 155) 70%,
            oklch(0.985 0.01 90) 100%
          )
        `,
      }}
    >
      {/* 粒子／底片噪點（呼應 Hero 質感） */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.14] mix-blend-soft-light">
        <svg className="h-full w-full" aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <filter id={`journey-grain-${grainUid}`} x="0" y="0" width="1200" height="800" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" result="g" />
              <feColorMatrix in="g" type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="1200" height="800" fill="#fff" filter={`url(#journey-grain-${grainUid})`} />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full md:h-96 md:w-96"
          style={{
            background: "radial-gradient(circle, rgba(194, 242, 228, 0.55) 0%, transparent 72%)",
            filter: "blur(72px)",
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.45, 0.65, 0.45],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[8%] h-80 w-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(164, 207, 74, 0.22) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-800/12 px-5 py-2.5 text-sm font-semibold shadow-sm backdrop-blur-sm md:px-6 md:py-3 md:text-base"
            style={{
              backgroundColor: "rgba(194, 242, 228, 0.45)",
              color: "var(--brand-green-dark)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#C7FF3A]" />
            召喚你的選擇天賦
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">探索迷霧過程中的導航</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            鄉育陪你練習「選擇」與「導航」。就像用地圖導航一樣，沒有「走錯路」，只有不斷 rerouting，多嘗試找到屬於自己的人生路線。
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative mx-auto max-w-4xl">
          <div className="pointer-events-none absolute inset-0 z-0 min-h-full">
            <WindingPathLine progress={pathProgress} />
          </div>

          <div className="relative z-10 space-y-16 py-8 md:space-y-24">
            {journeyNodes.map((node, index) => (
              <div key={node.id} ref={nodeRefCallbacks[index]} className="relative">
                <JourneyNode node={node} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
