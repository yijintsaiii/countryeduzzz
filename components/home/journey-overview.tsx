"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Rocket, Target, ArrowRight, Clock, CheckCircle2 } from "lucide-react"

const stages = [
  {
    number: "01",
    icon: Search,
    title: "Know Yourself",
    subtitle: "個人核心探索",
    duration: "3 個月",
    description: "導入生涯探索工具與實務挑戰，啟動自我覺察與職涯思維的雙軌成長",
    highlights: [
      "何倫碼測驗 × 職場優勢分析",
      "個人品牌與表達力培養",
      "規劃設定職涯學習目標",
    ],
    color: "var(--brand-green)",
    bgColor: "var(--brand-green-light)",
    glowColor: "rgba(80, 140, 100, 0.3)",
    checkColor: "var(--brand-green)",
  },
  {
    number: "02",
    icon: Rocket,
    title: "Make it Real",
    subtitle: "個人實踐能力養成",
    duration: "3 個月",
    description: "透過業界老師領導，強化問題解決、表達溝通、數位素養、目標思維與挫折管理能力",
    highlights: [
      "業界導師聯合開設線上課程",
      "學生自主參與實習或公益專案",
      "累積個人職涯學習歷程",
    ],
    color: "var(--brand-yellow)",
    bgColor: "var(--brand-yellow-light)",
    glowColor: "rgba(200, 170, 100, 0.3)",
    checkColor: "var(--brand-brown)",
  },
  {
    number: "03",
    icon: Target,
    title: "Become Your Future",
    subtitle: "企業出題 × 學生解題",
    duration: "6 個月",
    description: "結合企業真實情境，由企業推派窗口指導回饋，學生團隊共創解方",
    highlights: [
      "小組為單位，選定專案題目分工合作",
      "獨立完成調查研究、構思設計、風險評估",
      "真實企業夥伴回饋，轉化為價值產出",
    ],
    color: "var(--brand-brown)",
    bgColor: "var(--brand-brown-light)",
    glowColor: "rgba(140, 120, 90, 0.3)",
    checkColor: "var(--brand-brown)",
  },
]

function StageCard({ stage, index }: { stage: typeof stages[0]; index: number }) {
  const Icon = stage.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className={`relative flex items-center gap-8 lg:gap-16 ${
        isEven ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Content card */}
      <div className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
        <motion.div
          className={`group relative overflow-hidden rounded-2xl border border-border bg-card/90 p-6 backdrop-blur-sm lg:p-8 ${
            isEven ? 'ml-auto' : 'mr-auto'
          } max-w-lg`}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Background glow on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${isEven ? '100%' : '0%'} 50%, ${stage.glowColor} 0%, transparent 60%)`,
            }}
          />

          {/* Header */}
          <div className={`mb-4 flex items-center gap-3 ${isEven ? 'flex-row-reverse' : ''}`}>
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: stage.bgColor }}
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon className="h-6 w-6" style={{ color: stage.color }} />
            </motion.div>
            <div className={isEven ? 'text-right' : ''}>
              <p 
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: stage.color }}
              >
                階段 {stage.number}
              </p>
              <h3 className="text-xl font-bold text-foreground">{stage.title}</h3>
            </div>
          </div>

          {/* Subtitle and duration */}
          <p className="mb-2 text-lg font-semibold text-foreground">{stage.subtitle}</p>
          <div className={`mb-4 flex items-center gap-2 text-sm text-muted-foreground ${isEven ? 'justify-end' : ''}`}>
            <Clock className="h-4 w-4" />
            {stage.duration}
          </div>

          {/* Description */}
          <p className="mb-5 text-muted-foreground leading-relaxed">{stage.description}</p>

          {/* Highlights */}
          <ul className={`space-y-2.5 ${isEven ? 'items-end' : ''}`}>
            {stage.highlights.map((highlight, i) => (
              <motion.li
                key={highlight}
                initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`flex items-start gap-2.5 text-sm text-foreground ${isEven ? 'flex-row-reverse' : ''}`}
              >
                <CheckCircle2 
                  className="mt-0.5 h-4 w-4 shrink-0" 
                  style={{ color: stage.checkColor }} 
                />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Center timeline node */}
      <div className="relative z-10 flex shrink-0 flex-col items-center">
        {/* Connecting line */}
        {index < stages.length - 1 && (
          <motion.div
            className="absolute top-16 h-32 w-0.5 lg:h-40"
            style={{
              background: `linear-gradient(to bottom, ${stage.bgColor}, var(--border))`,
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        )}

        {/* Node */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: stage.bgColor }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="relative flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg md:h-16 md:w-16"
            style={{ 
              backgroundColor: stage.color,
              boxShadow: `0 8px 30px -5px ${stage.glowColor}`
            }}
          >
            {stage.number}
          </motion.div>
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />
    </motion.div>
  )
}

export function JourneyOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="journey" className="relative overflow-hidden py-20 lg:py-32 bg-background">
      {/* Background elements - warm organic shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-0 top-1/3 h-96 w-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--brand-green-light) 0%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.4,
          }}
          animate={{
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-0 bottom-1/3 h-80 w-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--brand-yellow-light) 0%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.35,
          }}
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div ref={ref} className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mx-auto mb-20 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="mb-4 inline-block rounded-full px-5 py-2.5 text-sm font-semibold"
            style={{
              backgroundColor: 'var(--brand-green-light)',
              color: 'var(--brand-green-dark)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            三階段學習旅程
          </motion.span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">從自我認識到實踐成長</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            12 個月的系統化課程，陪伴你走過職涯探索的每一步
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-5xl space-y-16 lg:space-y-24">
          {stages.map((stage, index) => (
            <StageCard key={stage.number} stage={stage} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button size="lg" className="group gap-2" asChild>
            <Link href="/programs/journey">
              了解完整課程內容
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
