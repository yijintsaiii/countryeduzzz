"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote, GraduationCap, Building2, School } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "在鄉育的課程中，我第一次認真思考「我是誰」這個問題。透過系統化的探索，我發現自己真正熱愛的是設計結合數據分析，這讓我找到了職涯的方向。",
    name: "宜臻",
    role: "台大資管系大三",
    year: "2024 春季班學員",
    type: "student",
    icon: GraduationCap,
    color: "var(--brand-green)",
    bgColor: "var(--brand-green-light)",
  },
  {
    id: 2,
    quote: "鄉育的學生展現出的主動性和自我覺察能力，讓我們在面試中很快就能感受到。他們對自己的優勢與發展方向有清楚的論述，這是很難得的。",
    name: "人資夥伴",
    role: "科技業人才發展部門",
    year: "長期企業合作夥伴",
    type: "corporate",
    icon: Building2,
    color: "var(--brand-brown)",
    bgColor: "var(--brand-yellow-light)",
  },
  {
    id: 3,
    quote: "將鄉育的課程導入系上後，學生開始主動來找我討論職涯規劃，而不是只問考試重點。這個改變讓我很欣慰。",
    name: "合作教師",
    role: "北部國立大學管理學院",
    year: "課程合作夥伴",
    type: "university",
    icon: School,
    color: "var(--brand-green-dark)",
    bgColor: "var(--brand-green-light)",
  },
  {
    id: 4,
    quote: "課程結束後，我不再害怕做選擇。因為我知道每一個選擇都是了解自己的過程，而不是對或錯的二分法。",
    name: "品瑄",
    role: "政大企管系大四",
    year: "2023 秋季班學員",
    type: "student",
    icon: GraduationCap,
    color: "var(--brand-yellow)",
    bgColor: "var(--brand-yellow-light)",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]
  const Icon = current.icon

  return (
    <section id="testimonials" className="group relative overflow-hidden py-20 lg:py-28" style={{ backgroundColor: 'var(--brand-cream)' }}>
      {/* Background decoration - warm organic shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-[20%] top-[20%] h-64 w-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--brand-green-light) 0%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: 0.5,
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-[15%] bottom-[25%] h-56 w-56 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--brand-yellow-light) 0%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: 0.4,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 900" preserveAspectRatio="none">
          <path
            d="M 1010 140 C 920 220, 860 320, 760 390 C 670 455, 610 520, 560 620"
            fill="none"
            stroke="rgba(40,94,61,0.12)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 10"
          />
          <motion.path
            d="M 1010 140 C 920 220, 860 320, 760 390 C 670 455, 610 520, 560 620"
            fill="none"
            stroke="rgba(110,167,93,0.28)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 10"
            animate={{ strokeDashoffset: [0, -34], opacity: [0.26, 0.42, 0.26] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="760"
            cy="390"
            r="3.5"
            fill="rgba(199,255,58,0.4)"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-900/15 px-5 py-2.5 text-sm font-semibold"
            style={{
              backgroundColor: 'var(--brand-yellow-light)',
              color: 'var(--brand-brown)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="h-2 w-2 rounded-full bg-[#C7FF3A]" />
            來自現場的聲音
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            聽聽他們這麼說
          </h2>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-border bg-card/95 p-8 backdrop-blur-sm md:p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="pointer-events-none absolute left-8 top-8 h-1.5 w-14 rounded-full bg-[#C7FF3A]" aria-hidden="true" />
            {/* Decorative quote icon */}
            <motion.div
              className="absolute right-8 top-8"
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Quote className="h-16 w-16" style={{ color: 'var(--brand-green-light)' }} />
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Quote */}
                <blockquote className="mb-8 text-xl leading-relaxed text-foreground md:text-2xl">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    &ldquo;{current.quote}&rdquo;
                  </motion.span>
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: current.bgColor }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="h-6 w-6" style={{ color: current.color }} />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-foreground">{current.name}</p>
                      <p className="text-sm text-muted-foreground">{current.role}</p>
                      <p 
                        className="text-sm font-semibold"
                        style={{ color: current.color }}
                      >
                        {current.year}
                      </p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-2">
                    <motion.button
                      onClick={prevTestimonial}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="上一則見證"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      onClick={nextTestimonial}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="下一則見證"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots indicator */}
            <div className="mt-8 flex justify-center gap-3">
              {testimonials.map((t, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: index === currentIndex ? '2rem' : '0.5rem',
                    backgroundColor: index === currentIndex 
                      ? testimonials[index].color 
                      : 'var(--border)',
                  }}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`前往第 ${index + 1} 則見證`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
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
            <Link href="/impact/outcomes">
              看更多學生故事
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
