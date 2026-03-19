"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Sparkles } from "lucide-react"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="cta" className="group py-20 lg:py-28 bg-background">
      <div ref={ref} className="container mx-auto px-4">
        <motion.div
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16 md:py-24"
          style={{
            background: `linear-gradient(145deg, 
              oklch(0.38 0.09 145) 0%, 
              oklch(0.48 0.1 145) 35%,
              oklch(0.42 0.08 140) 65%,
              oklch(0.35 0.08 145) 100%
            )`,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Animated background elements - warm, organic */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Soft golden glow */}
            <motion.div
              className="absolute -right-20 -top-20 h-80 w-80 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,240,200,0.25) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Subtle cream mist */}
            <motion.div
              className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,252,245,0.2) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Floating seed-like particles - deterministic positions */}
            {[
              { left: 20, top: 25, duration: 4, delay: 0.2, size: 3 },
              { left: 40, top: 50, duration: 4.5, delay: 1.0, size: 2 },
              { left: 65, top: 30, duration: 4.2, delay: 0.6, size: 3 },
              { left: 30, top: 70, duration: 5, delay: 1.4, size: 2 },
              { left: 55, top: 40, duration: 3.8, delay: 0.4, size: 4 },
              { left: 80, top: 60, duration: 4.3, delay: 1.8, size: 2 },
            ].map((particle, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: particle.size,
                  height: particle.size,
                  background: 'rgba(255,250,235,0.5)',
                  boxShadow: '0 0 8px rgba(255,240,200,0.4)',
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="none">
              <path
                d="M -20 520 C 130 500, 250 450, 360 410 C 500 358, 620 365, 760 320 C 860 288, 980 210, 1220 170"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 10"
              />
              <motion.path
                d="M -20 520 C 130 500, 250 450, 360 410 C 500 358, 620 365, 760 320 C 860 288, 980 210, 1220 170"
                fill="none"
                stroke="rgba(203,253,60,0.36)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 10"
                animate={{ strokeDashoffset: [0, -42], opacity: [0.32, 0.54, 0.32] }}
                transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
                className="transition-opacity duration-500 group-hover:opacity-100"
              />
              <motion.circle
                cx="760"
                cy="320"
                r="4.2"
                fill="rgba(203,253,60,0.5)"
                animate={{ opacity: [0.35, 0.85, 0.35], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </div>

          <div className="relative">
            {/* Badge */}
            <motion.div
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/12 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.span>
              <span>成為改變的一部分</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="mx-auto max-w-3xl text-balance text-3xl font-bold text-white md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{ textShadow: '0 3px 30px rgba(0,0,0,0.15)' }}
            >
              相信每個青年都值得被好好陪伴
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg"
              style={{ color: 'rgba(255,255,255,0.85)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              你可以報名課程、成為企業夥伴、或是捐款支持——
              每一種參與，都是在為青年的未來撐開更多可能。
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="group gap-2.5 bg-white px-8 py-6 text-base font-semibold shadow-xl hover:bg-white/95"
                  style={{ color: 'var(--brand-green-dark)' }}
                  asChild
                >
                  <Link href="/involve/donate">
                    <Heart className="h-4 w-4 transition-transform group-hover:scale-110" />
                    立即支持
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="group gap-2.5 border-white/30 bg-transparent px-8 py-6 text-base font-semibold text-white hover:bg-white/12"
                  asChild
                >
                  <Link href="/programs/apply">
                    報名課程
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
