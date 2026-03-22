"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Building2, Heart, School, ArrowRight } from "lucide-react"

const audiences = [
  {
    icon: GraduationCap,
    title: "大學生",
    description: "對未來感到迷惘？鄉育陪你從認識自己開始，一步步找到方向。",
    href: "/for/students",
    cta: "了解課程",
    color: "var(--brand-green)",
    lightColor: "var(--brand-green-light)",
  },
  {
    icon: Building2,
    title: "企業夥伴",
    description: "尋找有自我覺察力、願意成長的年輕人才？和我們合作。",
    href: "/for/companies",
    cta: "企業合作",
    color: "var(--brand-yellow)",
    lightColor: "var(--brand-yellow-light)",
  },
  {
    icon: Heart,
    title: "捐款者",
    description: "讓更多青年有機會探索自己、找到方向，你的支持是改變的起點。",
    href: "/for/donors",
    cta: "捐款支持",
    color: "var(--brand-brown)",
    lightColor: "var(--brand-brown-light)",
  },
  {
    icon: School,
    title: "大學合作",
    description: "將職涯探索課程導入校園，為學生提供系統化的成長支持。",
    href: "/for/universities",
    cta: "校園合作",
    color: "var(--brand-green)",
    lightColor: "var(--brand-green-light)",
  },
]

function AudienceCard({ audience, index }: { audience: typeof audiences[0]; index: number }) {
  const Icon = audience.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={audience.href}>
        <motion.div
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Subtle background accent on hover */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${audience.lightColor} 0%, transparent 70%)`,
            }}
          />

          {/* Icon */}
          <motion.div
            className="relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl"
            style={{ backgroundColor: audience.lightColor }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon className="h-7 w-7" style={{ color: audience.color }} />
          </motion.div>

          {/* Content */}
          <h3 className="relative mb-2 text-xl font-bold text-foreground">
            {audience.title}
          </h3>
          <p className="relative mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
            {audience.description}
          </p>

          {/* CTA */}
          <div className="relative flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-primary">
            <span style={{ color: audience.color }}>
              {audience.cta}
            </span>
            <ArrowRight 
              className="h-4 w-4 transition-transform group-hover:translate-x-1" 
              style={{ color: audience.color }} 
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function AudienceCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="audience" className="relative overflow-hidden py-20 lg:py-28 bg-background">
      {/* Subtle organic pattern */}
      <div className="absolute inset-0 opacity-40">
        <svg className="absolute top-0 left-0 w-full h-24" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path
            d="M0,40 Q300,80 600,50 T1200,60"
            fill="none"
            stroke="var(--brand-green-light)"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 900" preserveAspectRatio="none">
          <path
            d="M 60 120 C 220 180, 280 260, 420 300 C 590 350, 740 300, 920 360 C 1030 398, 1120 478, 1240 540"
            fill="none"
            stroke="rgba(56,121,75,0.12)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 12"
          />
          <motion.path
            d="M 60 120 C 220 180, 280 260, 420 300 C 590 350, 740 300, 920 360 C 1030 398, 1120 478, 1240 540"
            fill="none"
            stroke="rgba(138,191,103,0.24)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 12"
            animate={{ strokeDashoffset: [0, -48], opacity: [0.66, 0.78, 0.66] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="920"
            cy="360"
            r="3.8"
            fill="rgba(199,255,58,0.4)"
            animate={{ opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div ref={ref} className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="mb-4 inline-block rounded-full bg-brand-green-light px-4 py-2 text-sm font-medium text-brand-green-dark"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            加入我們
          </motion.span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">你想用什麼方式參與？</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            不同的角色，同樣相信青年可以成長
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, index) => (
            <AudienceCard key={audience.title} audience={audience} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
