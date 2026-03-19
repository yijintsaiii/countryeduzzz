"use client"

import { motion } from "framer-motion"

/* ==================== SEED ELEMENT ==================== */
export function Seed({ 
  size = 24, 
  variant = "resting",
  animate = true 
}: { 
  size?: number
  variant?: "resting" | "germinating" 
  animate?: boolean 
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-70"
      animate={animate ? {
        scale: variant === "germinating" ? [1, 1.05, 0.98, 1] : 1,
      } : undefined}
      transition={animate ? {
        duration: 2.2,
        delay: 0.3,
        repeat: 0,
        ease: "easeInOut",
      } : undefined}
    >
      {/* Seed body - organic capsule shape */}
      <ellipse cx="12" cy="12" rx="7" ry="9" stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
      {/* Germination crack - appears on variant */}
      {variant === "germinating" && (
        <path d="M 12 8 Q 11.5 10 12 12" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      )}
    </motion.svg>
  )
}

/* ==================== SOIL / GROUND LINE ==================== */
export function SoilLine({ opacity = 0.15 }: { opacity?: number }) {
  return (
    <svg width="100%" height="100" viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute bottom-0">
      {/* Stratified soil layers - very subtle */}
      <path d="M 0 30 Q 360 35 720 30 T 1440 30" stroke="currentColor" strokeWidth="0.5" opacity={opacity} fill="none" />
      <path d="M 0 50 Q 360 48 720 50 T 1440 50" stroke="currentColor" strokeWidth="0.4" opacity={opacity * 0.6} fill="none" />
      <path d="M 0 70 Q 360 72 720 70 T 1440 70" stroke="currentColor" strokeWidth="0.4" opacity={opacity * 0.4} fill="none" />
    </svg>
  )
}

/* ==================== SPROUT / SEEDLING ==================== */
export function Sprout({ 
  size = 40,
  grow = false 
}: { 
  size?: number
  grow?: boolean 
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 50"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={grow ? { pathLength: 1, opacity: 1 } : undefined}
      transition={grow ? { duration: 1.2, ease: "easeOut", delay: 0.4 } : undefined}
    >
      {/* Thin stem */}
      <path d="M 20 50 Q 20 35 18 20" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      {/* Left leaf - minimal geometric shape */}
      <path d="M 18 22 Q 12 18 10 12" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M 10 12 Q 12 14 14 16" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      {/* Right leaf */}
      <path d="M 18 22 Q 24 18 26 12" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M 26 12 Q 24 14 22 16" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
    </motion.svg>
  )
}

/* ==================== GROWTH STEM / BRANCH ==================== */
export function GrowthStem({ 
  length = 120,
  branching = 0,
  opacity = 0.4,
  delay = 0,
  draw = false
}: { 
  length?: number
  branching?: number 
  opacity?: number
  delay?: number
  draw?: boolean
}) {
  // Create SVG path data for organic growth curve
  const pathData = `M 20 ${length} 
    Q ${20 + Math.sin(branching * 0.5) * 15} ${length - 40}
    ${20 + Math.sin(branching * 0.3) * 25} ${length - 80}
    Q ${20 + Math.cos(branching * 0.4) * 20} ${length - 100}
    20 ${length - 120}`

  return (
    <motion.svg
      width="100"
      height={length}
      viewBox={`0 0 100 ${length}`}
      fill="none"
      initial={{ pathLength: draw ? 0 : 1 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.4, delay, ease: "easeInOut" }}
    >
      {/* Main stem */}
      <path d={pathData} stroke="currentColor" strokeWidth="0.9" opacity={opacity} strokeLinecap="round" />
      
      {/* Small branches for higher branching values */}
      {branching > 0 && (
        <>
          <path d={`M ${20 + Math.sin(branching * 0.5) * 15} ${length - 60} L ${15 + Math.sin(branching * 0.5) * 20} ${length - 75}`} stroke="currentColor" strokeWidth="0.6" opacity={opacity * 0.5} />
          <path d={`M ${20 + Math.sin(branching * 0.5) * 15} ${length - 60} L ${25 + Math.sin(branching * 0.5) * 20} ${length - 75}`} stroke="currentColor" strokeWidth="0.6" opacity={opacity * 0.5} />
        </>
      )}
    </motion.svg>
  )
}

/* ==================== LEAF NODE ACCENT ==================== */
export function LeafNode({ 
  size = 16,
  opacity = 0.5,
  delay = 0,
  appear = false
}: { 
  size?: number
  opacity?: number
  delay?: number
  appear?: boolean
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      initial={{ scale: 0, opacity: 0 }}
      animate={appear ? { scale: 1, opacity } : undefined}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {/* Minimal leaf shape - two curves forming organic form */}
      <path d="M 8 2 Q 4 6 8 14 Q 12 6 8 2" stroke="currentColor" strokeWidth="0.8" opacity={opacity} />
      <path d="M 8 4 L 8 12" stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.4} />
    </motion.svg>
  )
}

/* ==================== SECTION TRANSITION LINE ==================== */
export function TransitionLine({ 
  fromBottom = false,
  reveal = false,
  duration = 1.2
}: { 
  fromBottom?: boolean
  reveal?: boolean
  duration?: number
}) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 0.35 },
  }

  return (
    <motion.svg
      width="2"
      height="80"
      viewBox="0 0 2 80"
      fill="none"
      className="mx-auto"
      initial={reveal ? "hidden" : undefined}
      animate={reveal ? "visible" : undefined}
      variants={pathVariants}
      transition={{ duration, ease: "easeInOut" }}
    >
      {/* Organic curved line - slightly branching */}
      <path d="M 1 0 Q 1.5 20 1 40 Q 0.5 60 1 80" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </motion.svg>
  )
}
