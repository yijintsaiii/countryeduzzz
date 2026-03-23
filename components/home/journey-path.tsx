"use client"

import { useRef, useId } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Cloud, Compass, Flag, BarChart3, Target, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * 單一主路徑（viewBox 0 0 1200 100）
 * 底層固定虛線 + 前景循環流光（由上往下）。
 */
const TIMELINE_PATH_D =
  "M 600 0 C 475 6 475 11 600 14 C 725 18 725 23 600 28 C 475 33 475 38 600 42 C 725 47 725 52 600 57 C 475 62 475 67 600 71 C 725 76 725 81 600 85 C 476 89 538 96 600 100"

const journeyNodes = [
  {
    id: "fog",
    icon: Cloud,
    title: "迷霧期",
    subtitle: "KNOW YOURSELF｜起點",
    description:
      "多數人都從這裡開始：對未來有想像，卻還說不清楚。先停下來看看自己在意什麼、想靠近什麼，方向感就會慢慢長出來。",
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
    subtitle: "KNOW YOURSELF｜探索",
    description:
      "透過測驗、對話與探索工具，梳理興趣、價值觀與天賦，從更多角度理解自己，也為後續的選擇建立基礎。",
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
    subtitle: "MAKE IT REAL｜定錨",
    description:
      "把對未來的想像轉成可以開始的學習目標與行動方向。先有想前往的位置，後續的嘗試、調整與累積才更有意義。",
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
    subtitle: "MAKE IT REAL｜累積",
    description:
      "在課程、實作、實習與專案裡，慢慢累積問題解決、表達溝通與數位素養，並把成長整理成可說明的能力與經驗。",
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
    subtitle: "BECOME YOUR FUTURE｜聚焦",
    description:
      "當你更認識自己，也累積了行動經驗，就能開始把興趣、能力與真實場域對齊，慢慢收斂出更適合自己的下一步。",
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
    subtitle: "BECOME YOUR FUTURE｜實踐",
    description:
      "職涯藍圖不是固定答案，而是一條在真實挑戰中逐步形成的路。透過專案合作、企業回饋與實際產出，你會更知道自己想成為什麼樣的人。",
    sectionId: "cta",
    gradient: "from-brand-yellow to-brand-brown/60",
    bgColor: "var(--brand-yellow-light)",
    iconColor: "var(--brand-brown)",
    glowColor: "rgba(220, 180, 100, 0.5)",
  },
]

/** 單一路徑雙層：底虛線 + 循環流光（同一 `d`）。 */
function TimelinePathDrawing() {
  const uid = useId().replace(/:/g, "")
  const glowId = `journey-spine-glow-${uid}`
  const boltId = `journey-spine-bolt-${uid}`

  return (
    <svg
      className="absolute inset-0 z-0 h-full w-full overflow-visible"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id={glowId} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <linearGradient id={boltId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(199,255,58,0.2)" />
          <stop offset="50%" stopColor="rgba(199,255,58,0.95)" />
          <stop offset="100%" stopColor="rgba(37,87,56,0.1)" />
        </linearGradient>
      </defs>

      {/* 底層：完整虛線（初始狀態） */}
      <path
        d={TIMELINE_PATH_D}
        stroke="rgba(97, 145, 118, 0.48)"
        strokeWidth={1.2}
        strokeDasharray="6 8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.72}
        vectorEffect="non-scaling-stroke"
      />

      {/* 主流光：像閃電一樣沿虛線由上往下循環 */}
      <motion.path
        d={TIMELINE_PATH_D}
        stroke={`url(#${boltId})`}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={1}
        strokeDasharray="0.11 0.89"
        animate={{
          strokeDashoffset: [0, -1.2],
          opacity: [0.2, 0.95, 0.2],
        }}
        transition={{
          duration: 1.7,
          repeat: Infinity,
          ease: "linear",
        }}
        vectorEffect="non-scaling-stroke"
      />

      {/* 外圈光暈，讓流光更像電流掠過 */}
      <motion.path
        d={TIMELINE_PATH_D}
        stroke="rgba(199,255,58,0.55)"
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={1}
        strokeDasharray="0.11 0.89"
        filter={`url(#${glowId})`}
        animate={{
          strokeDashoffset: [0, -1.2],
          opacity: [0.04, 0.35, 0.04],
        }}
        transition={{
          duration: 1.7,
          repeat: Infinity,
          ease: "linear",
        }}
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
              className="rounded-sm bg-[#EFFFBE]/70 px-2 py-1 text-left text-[0.65rem] font-semibold leading-snug tracking-wide sm:text-xs"
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

export function JourneyPath() {
  const grainUid = useId().replace(/:/g, "")

  return (
    <section
      id="journey-path"
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
            培養你的導航能力
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">在探索中，慢慢看見自己的方向</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            鄉育陪你練習「選擇」與「導航」。就像用地圖尋找方向一樣，重要的不是一次決定所有答案，而是在一次次探索中，慢慢走出屬於自己的人生路徑。
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div className="pointer-events-none absolute inset-0 z-0 min-h-full">
            <TimelinePathDrawing />
          </div>

          <div className="relative z-10 space-y-16 py-8 md:space-y-24">
            {journeyNodes.map((node, index) => (
              <div key={node.id} className="relative">
                <JourneyNode node={node} index={index} />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button size="lg" className="group gap-2 bg-brand-green hover:bg-brand-green-dark" asChild>
            <Link href="/programs/journey">
              學習主軸三階段
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
