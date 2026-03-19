"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

// Partner categories with detailed partner lists
const partnerCategories = [
  { 
    label: "國立大學", 
    count: "15+",
    partners: [
      "國立臺灣大學", "國立政治大學", "國立清華大學", "國立成功大學",
      "國立中山大學", "國立中央大學", "國立臺灣師範大學", "國立陽明交通大學",
      "國立中興大學", "國立臺北大學", "國立東華大學", "國立暨南國際大學",
      "國立高雄大學", "國立嘉義大學", "國立屏東大學"
    ]
  },
  { 
    label: "私立大學", 
    count: "20+",
    partners: [
      "輔仁大學", "東吳大學", "淡江大學", "中原大學", "逢甲大學",
      "東海大學", "靜宜大學", "長庚大學", "元智大學", "中國文化大學",
      "世新大學", "銘傳大學", "實踐大學", "大同大學", "中華大學",
      "義守大學", "南華大學", "慈濟大學", "亞洲大學", "明志科技大學"
    ]
  },
  { 
    label: "科技產業", 
    count: "30+",
    partners: [
      "台積電", "聯發科技", "鴻海精密", "廣達電腦", "華碩電腦",
      "宏碁", "緯創資通", "仁寶電腦", "日月光半導體", "聯電",
      "台達電子", "研華科技", "群創光電", "友達光電", "瑞昱半導體"
    ]
  },
  { 
    label: "金融服務", 
    count: "18+",
    partners: [
      "國泰金控", "富邦金控", "中信金控", "玉山金控", "台新金控",
      "元大金控", "永豐金控", "第一金控", "華南金控", "合庫金控",
      "新光金控", "兆豐金控", "凱基證券", "統一證券", "群益金鼎證券"
    ]
  },
  { 
    label: "傳統製造", 
    count: "22+",
    partners: [
      "台塑集團", "統一企業", "遠東集團", "長榮集團", "中鋼公司",
      "正新橡膠", "巨大機械", "裕隆汽車", "和泰汽車", "光陽工業",
      "大立光電", "可成科技", "鑽石精工", "台灣水泥", "亞泥企業"
    ]
  },
  { 
    label: "社會企業", 
    count: "12+",
    partners: [
      "社企流", "若水國際", "鄰鄉良食", "格外農品", "人生百味",
      "藍眼淚創藝", "點點善", "好牧人基金會", "喜憨兒基金會", "陽光基金會",
      "伊甸基金會", "家扶基金會"
    ]
  },
  { 
    label: "公益基金會", 
    count: "8+",
    partners: [
      "時代基金會", "台灣公益聯盟", "中華民國企業永續發展協會",
      "誠致教育基金會", "均一平台教育基金會", "為台灣而教",
      "台灣社會創新實驗中心", "Impact Hub Taipei"
    ]
  },
]

// Partner card component with expandable list
function PartnerCard({ 
  category, 
  index, 
  isInView,
  isActive,
  onToggle
}: { 
  category: typeof partnerCategories[0]
  index: number
  isInView: boolean
  isActive: boolean
  onToggle: () => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
      whileHover={{ y: -2 }}
      onClick={onToggle}
      aria-expanded={isActive}
      className={`group relative flex w-full flex-col items-center justify-center rounded-xl border bg-card p-4 pb-6 text-center transition-all ${
        isActive 
          ? 'border-primary/40 bg-primary/5 shadow-md ring-1 ring-[#C7FF3A]/40' 
          : 'border-border hover:border-primary/20'
      }`}
    >
      <span className="pointer-events-none absolute left-3 top-3 h-1.5 w-8 rounded-full bg-[#C7FF3A]/70" aria-hidden="true" />
      <span className="text-2xl font-bold text-foreground">{category.count}</span>
      <span className="mt-1 text-xs text-muted-foreground">{category.label}</span>
      <span 
        className={`mt-3 text-xs transition-colors ${
          isActive ? 'text-primary' : 'text-muted-foreground/60'
        }`}
      >
        {isActive ? '收起名單' : '查看名單'}
      </span>
    </motion.button>
  )
}

export function PartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleToggle = (label: string) => {
    setActiveCategory(prev => prev === label ? null : label)
  }

  const activePartnerList = activeCategory 
    ? partnerCategories.find(c => c.label === activeCategory)?.partners || []
    : []

  return (
    <section className="group relative border-t border-border py-16 lg:py-20 bg-background">
      {/* Subtle background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, var(--brand-green-light) 0%, transparent 70%)',
          opacity: 0.15,
        }}
        animate={{
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="none">
          <path
            d="M -30 460 C 150 430, 280 360, 430 370 C 560 380, 690 470, 860 450 C 1020 432, 1130 365, 1230 310"
            fill="none"
            stroke="rgba(52,109,67,0.13)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 11"
          />
          <motion.path
            d="M -30 460 C 150 430, 280 360, 430 370 C 560 380, 690 470, 860 450 C 1020 432, 1130 365, 1230 310"
            fill="none"
            stroke="rgba(131,186,99,0.26)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 11"
            animate={{ strokeDashoffset: [0, -36] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          />
        </svg>
      </div>

      <div ref={ref} className="container relative mx-auto px-4">
        {/* Section header with proper hierarchy */}
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-900/15 px-4 py-2 text-sm font-semibold"
            style={{ 
              backgroundColor: 'var(--brand-green-light)',
              color: 'var(--brand-green-dark)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="h-2 w-2 rounded-full bg-[#C7FF3A]" />
            共同成長
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            合作夥伴網絡
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            超過 120 間企業與 45 所大專院校共同支持青年成長
          </p>
        </motion.div>

        {/* Partner category cards */}
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {partnerCategories.map((category, index) => (
              <PartnerCard 
                key={category.label}
                category={category}
                index={index}
                isInView={isInView}
                isActive={activeCategory === category.label}
                onToggle={() => handleToggle(category.label)}
              />
            ))}
          </motion.div>
        </div>

        {/* Expanded partner list panel - positioned below the grid */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mx-auto mt-6 max-w-4xl overflow-hidden"
            >
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    {activeCategory}
                  </h3>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    收起
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
                    {activePartnerList.map((partner, i) => (
                      <motion.div
                        key={partner}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="text-sm text-muted-foreground py-1"
                      >
                        {partner}
                      </motion.div>
                    ))}
                  </div>
                </div>
                {activePartnerList.length > 12 && (
                  <p className="mt-4 text-xs text-muted-foreground/60 text-center">
                    及更多合作夥伴持續加入中
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint text */}
        <motion.p
          className="mt-6 text-center text-xs text-muted-foreground/60"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          點擊分類查看合作夥伴名單
        </motion.p>
      </div>
    </section>
  )
}
