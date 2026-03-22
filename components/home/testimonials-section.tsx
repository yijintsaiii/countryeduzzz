"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote, GraduationCap } from "lucide-react"

/** 學員課程書面回饋原文（未改寫）；輪播呈現「自我發現的成長敘事」 */
const testimonials = [
  {
    id: 1,
    quote:
      "這次課程確實讓我的想法更具體。特別是課堂中提到「職業不等於職涯」這句話，令我印象深刻。\n\n以前我總習慣把「目前的職業」當作一輩子的定論，但今天的課程提醒我：人生很長，職涯應該是充滿變化與豐富可能性的，不該過早侷限自己的工作發展。",
    name: "學員",
    role: "課程書面回饋",
    year: "",
    type: "student",
    icon: GraduationCap,
    color: "var(--brand-green)",
    bgColor: "var(--brand-green-light)",
  },
  {
    id: 2,
    quote:
      "這堂課讓我最印象深刻的是，讓我們可以實際去思考自己對未來職業的想像，並以分類整理的方式嘗試去窺探自己適合的方向。其實在日常中，我們並不會去思考這類問題，或是只有大概的概念，但藉由實際去查詢產業文化、工作內容，讓我們具體去認識自己最初理想的職業，是否真的是自己想要的，是否又符合自己真正的興趣，這是我們最常忽略，但卻最重要的問題。另外，也認識到就算是理想職業，必有自己討厭的方面，但人生的容錯率很大，所以也不一定要剛就業就踏在理想的軌道，可以藉由相關產業進入。",
    name: "學員",
    role: "課程書面回饋",
    year: "",
    type: "student",
    icon: GraduationCap,
    color: "var(--brand-yellow)",
    bgColor: "var(--brand-yellow-light)",
  },
  {
    id: 3,
    quote:
      "是，其中特別喜歡H解析表，我覺得他幫助去認真思考某件事物在我心中的定位，以及還有哪一些是我能夠去發展成為我的優勢，另外也讓我認真思考我身上的特質與我過去生活的連結。最後，課堂上，我特別喜歡的一句話是：.....擁有掌握自己方向盤的能力，因為我覺得我對於自己生活的方向盤，似乎一直都有著一股不屬於我的信念推動著，操控著，脫離著，處在一種失控的邊緣，我特別不喜歡這樣的狀態，因此，聽見這句話的時候，特別觸動我的內心。",
    name: "學員",
    role: "課程書面回饋",
    year: "",
    type: "student",
    icon: GraduationCap,
    color: "var(--brand-green)",
    bgColor: "var(--brand-green-light)",
  },
  {
    id: 4,
    quote:
      "這兩週四堂課的體驗，幫助了我把原本比較模糊的想法慢慢變得更具體，而透過職業取向測驗和畫 H 圖，我更了解自己，也更清楚知道自己喜歡什麼、不喜歡什麼。印象深刻的是，老師提到測驗分數並不代表你就一定適合或不適合某一條路，我們不需要把自己侷限在單一的框架裡；到了後面，老師引導我們打破原本的想法，試著把自己喜歡和不喜歡的事情重新組合，去思考更多不同的可能性，這讓我很有啟發。",
    name: "學員",
    role: "課程書面回饋",
    year: "",
    type: "student",
    icon: GraduationCap,
    color: "var(--brand-yellow)",
    bgColor: "var(--brand-yellow-light)",
  },
  {
    id: 5,
    quote:
      "經過H分析之後，我可以更清楚自己喜歡的事物及特質，也注意到了其實我有好多事情都還沒有嘗試過。我認為這個分析方法的價值不只在於職業選擇，其對於跨域整合也提供了很多可能性。",
    name: "學員",
    role: "課程書面回饋",
    year: "",
    type: "student",
    icon: GraduationCap,
    color: "var(--brand-green)",
    bgColor: "var(--brand-green-light)",
  },
]

export function TestimonialsSection() {
  const studentTestimonials = testimonials.filter((item) => item.type === "student")
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % studentTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + studentTestimonials.length) % studentTestimonials.length)
  }

  const current = studentTestimonials[currentIndex]
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
            animate={{ strokeDashoffset: [0, -44], opacity: [0.24, 0.46, 0.24] }}
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
            自我發現的成長敘事
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            那些他們重新認識自己的時刻
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            在探索中慢慢更認識自己、釐清方向的真實過程。
          </p>
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
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="relative"
              >
                {/* Quote */}
                <blockquote className="mb-8 whitespace-pre-wrap text-base leading-relaxed text-foreground md:text-lg">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {current.quote}
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
                      {current.year ? (
                        <p className="text-sm font-semibold" style={{ color: current.color }}>
                          {current.year}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-2">
                    <motion.button
                      onClick={prevTestimonial}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="上一則"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      onClick={nextTestimonial}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="下一則"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots indicator */}
            <div className="mt-8 flex justify-center gap-3">
              {studentTestimonials.map((t, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: index === currentIndex ? '2rem' : '0.5rem',
                    backgroundColor: index === currentIndex 
                      ? studentTestimonials[index].color 
                      : 'var(--border)',
                  }}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`前往第 ${index + 1} 則`}
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
              看更多學習成果
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
