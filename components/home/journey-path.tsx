"use client"

// React hooks - single import to avoid duplicate definition errors
import { useRef, useCallback } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Cloud, Compass, BarChart3, Target, Sparkles } from "lucide-react"

// Journey nodes data - display only, no click handlers
const journeyNodes = [
  {
    id: "fog",
    icon: Cloud,
    title: "迷霧期",
    subtitle: "承認不確定",
    description: "大多數人在這裡：不確定自己要什麼、能做什麼。鄉育從這裡開始陪伴你。",
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
    description: "透過職涯卡牌、性格測驗與深度對話，梳理你的興趣、價值觀與天賦。",
    sectionId: "impact",
    gradient: "from-brand-green/80 to-brand-green",
    bgColor: "var(--brand-green-light)",
    iconColor: "var(--brand-green)",
    glowColor: "rgba(80, 140, 100, 0.4)",
  },
  {
    id: "skills",
    icon: BarChart3,
    title: "能力盤點",
    subtitle: "看見成長的軌跡",
    description: "記錄你的學習歷程與專案經驗，把隱形的成長變成可見的資產。",
    sectionId: "journey",
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
    description: "結合自我認識與產業資訊，找到適合你發展的領域與方向。",
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
    description: "不是一個完美答案，而是一份你願意嘗試的行動計畫。",
    sectionId: "cta",
    gradient: "from-brand-yellow to-brand-brown/60",
    bgColor: "var(--brand-yellow-light)",
    iconColor: "var(--brand-brown)",
    glowColor: "rgba(220, 180, 100, 0.5)",
  },
]

function PathLine({ progress }: { progress: number }) {
  return (
    <svg
      className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 md:w-6"
      viewBox="0 0 24 100"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--brand-brown)" stopOpacity="0.6" />
          <stop offset="25%" stopColor="var(--brand-green)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="var(--brand-green-dark)" stopOpacity="0.9" />
          <stop offset="75%" stopColor="var(--brand-yellow)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--brand-yellow)" stopOpacity="1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Background path */}
      <path
        d="M12 0 Q12 25 12 25 Q12 50 12 50 Q12 75 12 75 Q12 100 12 100"
        stroke="var(--border)"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.5"
      />
      {/* Animated progress path */}
      <motion.path
        d="M12 0 Q12 25 12 25 Q12 50 12 50 Q12 75 12 75 Q12 100 12 100"
        stroke="url(#pathGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  )
}

function JourneyNode({ 
  node, 
  index
}: { 
  node: typeof journeyNodes[0]
  index: number
}) {
  const ref = useRef(null)
  // Once the node enters the viewport, keep it visible permanently.
  // This prevents cards from fading out again when scrolling away.
  const isInView = useInView(ref, { once: true, margin: "-40% 0px -40% 0px" })
  const Icon = node.icon

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} md:gap-12`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
    >
      {/* Content card - informational only, no click action */}
      <motion.div
        className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.article
          className={`relative w-full max-w-md rounded-2xl border border-border bg-card/90 p-6 backdrop-blur-sm transition-colors hover:border-primary/20 hover:shadow-[0_18px_34px_-24px_rgba(5,46,22,0.42)] ${
            index % 2 === 0 ? 'ml-auto' : 'mr-auto'
          }`}
          whileHover={{
            y: -2,
            boxShadow: `0 15px 40px -15px ${node.glowColor}`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span
            className={`pointer-events-none absolute top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A] ${
              index % 2 === 0 ? 'right-4' : 'left-4'
            }`}
            aria-hidden="true"
          />
          <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
            <span 
              className="rounded-sm bg-[#EFFFBE]/70 px-2 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ color: node.iconColor }}
            >
              {node.subtitle}
            </span>
          </div>
          <h3 className={`mt-2 text-2xl font-bold text-foreground ${index % 2 === 0 ? 'text-right' : ''}`}>
            {node.title}
          </h3>
          <p className={`mt-2 text-muted-foreground leading-relaxed ${index % 2 === 0 ? 'text-right' : ''}`}>
            {node.description}
          </p>
        </motion.article>
      </motion.div>

      {/* Center node */}
      <motion.div
        className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center md:h-20 md:w-20"
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: node.bgColor }}
          animate={isInView ? {
            scale: [1, 1.4, 1],
            opacity: [0.6, 0.2, 0.6],
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Node circle */}
        <motion.div
          className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg md:h-16 md:w-16"
          style={{ 
            backgroundColor: node.bgColor,
            boxShadow: `0 8px 30px -5px ${node.glowColor}`
          }}
          whileInView={{ scale: [0.9, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Icon className="h-6 w-6 md:h-7 md:w-7" style={{ color: node.iconColor }} />
        </motion.div>
      </motion.div>

      {/* Empty spacer for alignment */}
      <div className="flex-1" />
    </motion.div>
  )
}

export function JourneyPath() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Apply position:relative imperatively before Framer Motion reads it,
  // preventing the "non-static position" warning on useScroll target
  const setContainerRef = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      el.style.position = 'relative'
    }
    ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })
  
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section 
      id="journey-path" 
      ref={setContainerRef}
      className="relative overflow-hidden py-20 lg:py-32"
      style={{
        background: 'linear-gradient(180deg, var(--background) 0%, var(--brand-cream) 50%, var(--background) 100%)'
      }}
    >
      {/* Background decoration - soft organic shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-[15%] top-[20%] h-80 w-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--brand-green-light) 0%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.5,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-[10%] bottom-[25%] h-72 w-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--brand-yellow-light) 0%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.4,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-emerald-50 px-5 py-2.5 text-sm font-semibold"
            style={{ 
              backgroundColor: 'var(--brand-green-light)',
              color: 'var(--brand-green-dark)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="h-2 w-2 rounded-full bg-[#C7FF3A]" />
            鄉育的方法
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">我們怎麼陪你走這段路</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            不是給你答案，而是陪你找到屬於自己的方向
          </p>
        </motion.div>

        {/* Journey path */}
        <div className="relative mx-auto max-w-4xl">
          {/* Animated path line */}
          <motion.div className="absolute left-1/2 top-0 h-full -translate-x-1/2">
            <PathLine progress={pathProgress.get()} />
          </motion.div>

          {/* Journey nodes */}
          <div className="relative space-y-16 py-8 md:space-y-24">
            {journeyNodes.map((node, index) => (
              <JourneyNode
                key={node.id}
                node={node}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
