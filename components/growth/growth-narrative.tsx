"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

/* ==================== HERO GROWTH INTRO ==================== */
export function HeroGrowthElements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" })

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Soil line at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <motion.path 
            d="M 0 40 Q 360 35 720 40 T 1440 40" 
            stroke="currentColor" 
            strokeWidth="1" 
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* Seed icon - bottom right corner */}
      <motion.div
        className="absolute bottom-24 right-12 text-primary opacity-60"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.6, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
          <ellipse cx="12" cy="12" rx="7" ry="9" />
        </svg>
      </motion.div>

      {/* Sprout appearing near scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary opacity-50"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 0.5, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
      >
        <svg width="24" height="40" viewBox="0 0 40 50" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M 20 50 Q 20 35 18 20" strokeLinecap="round" />
          <path d="M 18 22 Q 12 18 10 12" strokeLinecap="round" />
          <path d="M 18 22 Q 24 18 26 12" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  )
}

/* ==================== GROWTH PROGRESS TRACKER ==================== */
export function GrowthProgressLine({ 
  sections = [] 
}: { 
  sections?: { id: string; title: string; stage: "seed" | "sprout" | "growth" | "branch" | "tree" }[] 
}) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, margin: "0px 0px -40% 0px" })

  // Calculate which stage to show based on view
  const visibleStages = sections.slice(0, 3)

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center gap-0 py-4">
      {/* Vertical growth line with stage markers */}
      <svg width="1" height="200" className="block">
        <motion.line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="200"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </svg>

      {/* Stage markers - appear as you scroll */}
      <div className="flex flex-col gap-12 items-center mt-2">
        {visibleStages.map((section, idx) => (
          <motion.div
            key={section.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            transition={{ delay: idx * 0.3, duration: 0.6 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary opacity-40" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ==================== SECTION TRANSITION GROWTH ==================== */
export function SectionGrowthBridge() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" })

  return (
    <div ref={ref} className="relative h-24 flex items-center justify-center pointer-events-none">
      <motion.svg
        width="80"
        height="160"
        viewBox="0 0 80 160"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Main stem growth */}
        <motion.path
          d="M 40 160 Q 40 120 42 80 Q 42 40 40 0"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        />

        {/* Branch left */}
        <motion.path
          d="M 42 100 L 20 90"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        />

        {/* Branch right */}
        <motion.path
          d="M 42 100 L 60 90"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        />

        {/* Small leaf nodes */}
        <motion.circle
          cx="20"
          cy="88"
          r="2"
          opacity="0.3"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
        />
        <motion.circle
          cx="60"
          cy="88"
          r="2"
          opacity="0.3"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
        />
      </motion.svg>
    </div>
  )
}

/* ==================== CARD HOVER GROWTH ==================== */
export function CardGrowthHover({ 
  position = "bottom-right" 
}: { 
  position?: "bottom-right" | "top-left" | "bottom-left" 
}) {
  const positionClasses = {
    "bottom-right": "bottom-2 right-2",
    "top-left": "top-2 left-2",
    "bottom-left": "bottom-2 left-2",
  }

  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className={`absolute ${positionClasses[position]} pointer-events-none`}
      initial={{ opacity: 0, scale: 0 }}
      whileHover={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Tiny sprout emergence */}
      <path d="M 20 40 L 20 28" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
      <path d="M 20 30 L 15 24" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <path d="M 20 30 L 25 24" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
    </motion.svg>
  )
}
