"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

/* ==================== FOOTER MATURE TREE STRUCTURE ==================== */
export function FooterTreeGraphic() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" })

  return (
    <div ref={ref} className="relative w-full h-64 flex items-center justify-center pointer-events-none opacity-40 mb-8">
      <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice">
        {/* Root system foundation - subtle */}
        <motion.path
          d="M 200 280 Q 180 260 150 240 Q 120 220 100 200"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M 600 280 Q 620 260 650 240 Q 680 220 700 200"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
        />

        {/* Main trunk */}
        <motion.path
          d="M 400 280 Q 398 220 400 140 Q 402 80 400 20"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          opacity="0.35"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
        />

        {/* Left primary branch */}
        <motion.path
          d="M 400 160 Q 340 140 280 120"
          stroke="currentColor"
          strokeWidth="0.9"
          fill="none"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.5 }}
        />

        {/* Right primary branch */}
        <motion.path
          d="M 400 160 Q 460 140 520 120"
          stroke="currentColor"
          strokeWidth="0.9"
          fill="none"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.5 }}
        />

        {/* Left secondary branches */}
        <motion.path
          d="M 280 120 L 240 100"
          stroke="currentColor"
          strokeWidth="0.7"
          fill="none"
          opacity="0.25"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
        />
        <motion.path
          d="M 280 120 L 250 80"
          stroke="currentColor"
          strokeWidth="0.7"
          fill="none"
          opacity="0.25"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.1 }}
        />

        {/* Right secondary branches */}
        <motion.path
          d="M 520 120 L 560 100"
          stroke="currentColor"
          strokeWidth="0.7"
          fill="none"
          opacity="0.25"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
        />
        <motion.path
          d="M 520 120 L 550 80"
          stroke="currentColor"
          strokeWidth="0.7"
          fill="none"
          opacity="0.25"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.1 }}
        />

        {/* Upper branches - more delicate */}
        <motion.path
          d="M 400 100 Q 370 80 340 60"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: "easeOut", delay: 1.3 }}
        />
        <motion.path
          d="M 400 100 Q 430 80 460 60"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: "easeOut", delay: 1.3 }}
        />

        {/* Node points - knowledge/growth dots */}
        {[
          { x: 280, y: 120, delay: 1.4 },
          { x: 520, y: 120, delay: 1.4 },
          { x: 240, y: 100, delay: 1.6 },
          { x: 560, y: 100, delay: 1.6 },
          { x: 340, y: 60, delay: 1.8 },
          { x: 460, y: 60, delay: 1.8 },
        ].map((node, idx) => (
          <motion.circle
            key={idx}
            cx={node.x}
            cy={node.y}
            r="2"
            fill="currentColor"
            opacity="0.25"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: node.delay, duration: 0.5, ease: "easeOut" }}
          />
        ))}

        {/* Top apex - completion point */}
        <motion.circle
          cx="400"
          cy="20"
          r="3"
          fill="currentColor"
          opacity="0.3"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.3 } : {}}
          transition={{ delay: 2.2, duration: 0.6, ease: "easeOut" }}
        />
      </svg>

      {/* Supporting text or caption */}
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <motion.p
          className="text-xs text-muted-foreground opacity-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          成長的路徑，從種子到森林
        </motion.p>
      </div>
    </div>
  )
}

/* ==================== FOOTER CONNECTING ELEMENTS ==================== */
export function FooterGrowthBridge() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px 0px 0px" })

  return (
    <div ref={ref} className="relative w-full h-20 pointer-events-none flex items-center justify-center">
      {/* Vertical connecting line */}
      <motion.svg
        width="1"
        height="100%"
        className="block"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100%"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.15"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  )
}
