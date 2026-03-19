import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, FileText, Users, CheckCircle2, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata = {
  title: "報名與參與方式 | 財團法人鄉育教育基金會",
  description: "了解如何報名財團法人鄉育教育基金會大學專案，包含報名資格、流程、重要日期、以及常見問題。",
}

const eligibility = [
  "現就讀大專院校（含大學、技職、研究所）之在學學生",
  "畢業 2 年內之社會新鮮人",
  "對職涯探索有興趣，願意投入時間學習",
  "能配合 12 個月的課程時程",
  "具備基本的中文溝通與書寫能力",
]

const timeline = [
  { date: "7月1日", event: "開放報名", status: "upcoming" },
  { date: "8月15日", event: "報名截止", status: "upcoming" },
  { date: "8月20-25日", event: "面試通知", status: "upcoming" },
  { date: "8月底", event: "錄取公告", status: "upcoming" },
  { date: "9月初", event: "課程開始", status: "upcoming" },
]

const faqs = [
  {
    question: "報名需要費用嗎？",
    answer: "基本課程免費。部分進階工作坊可能酌收材料費，會在報名前說明。我們相信教育機會不應該因為經濟因素而受限。",
  },
  {
    question: "一定要是大學生才能報名嗎？",
    answer: "主要招收對象為大專院校在學生，但畢業 2 年內的社會新鮮人也可以報名。我們希望幫助正處於職涯探索階段的年輕人。",
  },
  {
    question: "我的課業很忙，能兼顧嗎？",
    answer: "我們的課程設計考量到學生的時間安排，每週約需投入 3-4 小時。線上課程可彈性觀看，實體活動會提前公告。",
  },
  {
    question: "如果中途無法繼續怎麼辦？",
    answer: "我們理解每個人的狀況都可能改變。如果需要暫停，可以與課程團隊討論，評估是否能調整或延後完成。",
  },
  {
    question: "完成課程後會獲得什麼？",
    answer: "完成全程課程的學員將獲得鄉育結業證書、個人職涯學習歷程檔案、以及加入校友社群的資格。",
  },
  {
    question: "課程是線上還是實體？",
    answer: "採用混合制。線上課程佔約 70%，可彈性安排時間觀看。每月有 1-2 次實體活動，地點主要在台北、台中、高雄。",
  },
]

export default function ProgramsApplyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Link href="/programs" className="mb-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                <ArrowRight className="h-4 w-4 rotate-180" />
                返回大學專案
              </Link>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                報名與參與方式
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                加入鄉育，開啟你的職涯探索旅程。
              </p>
              <Button size="lg" className="mt-8 gap-2" asChild>
                <a href="#apply-form">
                  立即報名
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold tracking-tight text-foreground">
                <Users className="h-6 w-6 text-primary" />
                報名資格
              </h2>
              
              <div className="space-y-3">
                {eligibility.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold tracking-tight text-foreground">
                <Calendar className="h-6 w-6 text-primary" />
                重要日期
              </h2>
              
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={item.date} className="relative flex items-center gap-6 pl-12">
                      <div className="absolute left-4 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-primary" />
                      <div className="w-24 shrink-0 font-semibold text-foreground">{item.date}</div>
                      <div className="flex-1 rounded-lg border border-border bg-card p-3">
                        <span className="text-foreground">{item.event}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold tracking-tight text-foreground">
                <FileText className="h-6 w-6 text-primary" />
                報名流程
              </h2>
              
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  { step: "1", title: "填寫表單", desc: "線上填寫基本資料" },
                  { step: "2", title: "書面審查", desc: "團隊審閱報名資料" },
                  { step: "3", title: "線上面試", desc: "15 分鐘視訊面談" },
                  { step: "4", title: "錄取通知", desc: "Email 通知結果" },
                ].map((item) => (
                  <div key={item.step} className="relative rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-8 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Apply Form Section */}
        <section id="apply-form" className="border-y border-border bg-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-xl">
              <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">線上報名表單</h2>
              
              <form className="relative space-y-6 rounded-xl border border-border bg-card p-8 transition-colors hover:border-[#C7FF3A]/20">
                <span className="pointer-events-none absolute left-6 top-6 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">姓名 *</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="請輸入姓名"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="請輸入 Email"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">手機號碼 *</label>
                  <input
                    type="tel"
                    required
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="請輸入手機號碼"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">學校 / 科系 *</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="例：台灣大學 資訊管理學系"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">年級 *</label>
                  <select
                    required
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">請選擇</option>
                    <option value="大一">大一</option>
                    <option value="大二">大二</option>
                    <option value="大三">大三</option>
                    <option value="大四">大四</option>
                    <option value="研究所">研究所</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">為什麼想參加鄉育？*</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="請簡短描述你對課程的期待與目前遇到的職涯困惑"
                  />
                </div>
                
                <Button type="submit" className="w-full transition-all hover:ring-2 hover:ring-[#C7FF3A]/40" size="lg">
                  送出報名
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  送出後，我們將在 3 個工作天內與您聯繫
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold tracking-tight text-foreground">
                <HelpCircle className="h-6 w-6 text-primary" />
                常見問題
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="rounded-lg border border-border bg-card px-4">
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
