"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, School, Building2, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 2500,
    suffix: "+",
    label: "累計服務學生",
    description: "來自全台超過 45 所大專院校",
    color: "var(--brand-green)",
    bgColor: "var(--brand-green-light)",
    glowColor: "rgba(80, 140, 100, 0.35)",
  },
  {
    icon: School,
    value: 45,
    suffix: "",
    label: "合作大專院校",
    description: "遍布北中南東各地區",
    color: "var(--brand-green-dark)",
    bgColor: "var(--brand-green-light)",
    glowColor: "rgba(60, 120, 80, 0.35)",
  },
  {
    icon: Building2,
    value: 120,
    suffix: "+",
    label: "企業夥伴",
    description: "提供實習、專案與職涯分享",
    color: "var(--brand-brown)",
    bgColor: "var(--brand-yellow-light)",
    glowColor: "rgba(180, 150, 100, 0.35)",
  },
  {
    icon: TrendingUp,
    value: 94,
    suffix: "%",
    label: "學員推薦意願",
    description: "願意推薦給學弟妹參加",
    color: "var(--brand-brown)",
    bgColor: "var(--brand-brown-light)",
    glowColor: "rgba(140, 120, 90, 0.35)",
  },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const spring = useSpring(0, { stiffness: 50, damping: 30 })
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString())

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  return (
    <div ref={ref} className="text-4xl font-bold text-foreground md:text-5xl">
      <motion.span>{display}</motion.span>
      {suffix}
    </div>
  )
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const Icon = stat.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <motion.div
        className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Background glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 100%, ${stat.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* Animated icon */}
        <motion.div
          className="relative mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl"
          style={{ backgroundColor: stat.bgColor }}
          whileHover={{ scale: 1.08, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Icon className="h-7 w-7" style={{ color: stat.color }} />
          
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ backgroundColor: stat.bgColor }}
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.div>

        {/* Number with glow on hover */}
        <motion.div
          className="relative"
          whileHover={{
            textShadow: `0 0 30px ${stat.glowColor}`,
          }}
        >
          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
        </motion.div>
        
        {/* Label */}
        <p className="relative mt-3 font-semibold text-foreground">{stat.label}</p>
        <p className="relative mt-1 text-sm text-muted-foreground">{stat.description}</p>
      </motion.div>
    </motion.div>
  )
}

export function ImpactStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="impact" className="relative overflow-hidden py-20 lg:py-28" style={{ backgroundColor: 'var(--brand-cream)' }}>
      {/* Animated background orbs - warm tones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -left-20 top-1/4 h-72 w-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--brand-green-light) 0%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: 0.5,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--brand-yellow-light) 0%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: 0.4,
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 900" preserveAspectRatio="none">
          <path
            d="M -40 180 C 210 120, 340 230, 500 280 C 700 340, 860 300, 1240 410"
            fill="none"
            stroke="rgba(37,87,56,0.15)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 11"
          />
          <motion.path
            d="M -40 180 C 210 120, 340 230, 500 280 C 700 340, 860 300, 1240 410"
            fill="none"
            stroke="rgba(116,173,92,0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 11"
            animate={{ strokeDashoffset: [0, -52], opacity: [0.26, 0.48, 0.26] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="500"
            cy="280"
            r="4"
            fill="rgba(199,255,58,0.45)"
            animate={{ opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div ref={ref} className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="mb-4 inline-block rounded-full px-5 py-2.5 text-sm font-semibold"
            style={{
              backgroundColor: 'var(--brand-yellow-light)',
              color: 'var(--brand-brown)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            鄉育的足跡
          </motion.span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">這些年，我們一起走過的路</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            每個數字背後，都是真實的陪伴與成長
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="group gap-2"
            style={{ borderColor: 'var(--brand-green)', color: 'var(--brand-green-dark)' }}
            asChild
          >
            <Link href="/impact">
              查看完整影響力報告
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
