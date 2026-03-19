"use client"

import { motion } from "framer-motion"
import { Cloud, ArrowRight, Map } from "lucide-react"

const narrativeSteps = [
  {
    icon: Cloud,
    label: "迷霧",
    description: "面對未來的不確定與迷惘",
  },
  {
    icon: ArrowRight,
    label: "探索",
    description: "透過系統化的自我認識",
  },
  {
    icon: Map,
    label: "藍圖",
    description: "繪製屬於你的職涯地圖",
  },
]

export function BlueprintNarrativeSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, var(--background) 0%, var(--brand-green-light) 50%, var(--background) 100%)',
          opacity: 0.5,
        }}
      />

      <div className="container relative mx-auto max-w-5xl px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
            從迷霧到藍圖
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            每個人都值得擁有
            <br />
            <span className="text-emerald-700">清晰的職涯方向</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            許多大學生在面對職涯選擇時感到迷惘，不知道自己的方向在哪裡。
            鄉育相信，透過系統化的探索與陪伴，每個人都能找到屬於自己的道路。
          </p>
        </motion.div>

        {/* Narrative Flow */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-200 md:block" />

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {narrativeSteps.map((step, index) => (
              <motion.div
                key={step.label}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Card */}
                <div className="relative flex flex-col items-center rounded-2xl border border-emerald-100 bg-white/80 p-8 text-center shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
                  {/* Step Number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                    Step {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <step.icon className="h-8 w-8 text-emerald-600" />
                  </div>

                  {/* Label */}
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {step.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Arrow between cards (mobile) */}
                {index < narrativeSteps.length - 1 && (
                  <div className="my-4 flex justify-center md:hidden">
                    <ArrowRight className="h-6 w-6 rotate-90 text-emerald-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Message */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-amber-50/50 p-8">
            <p className="text-lg font-medium leading-relaxed text-amber-900">
              「鄉育不只是一個計畫，而是一段陪伴你從迷惘走向清晰的旅程。
              <br className="hidden sm:block" />
              我們相信，當你認識自己，你就能定義自己的未來。」
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
