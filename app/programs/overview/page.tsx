import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Users, Clock, MapPin, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "專案一覽 | 財團法人鄉育教育基金會",
  description: "了解財團法人鄉育教育基金會大學專案的服務對象、課程期間、形式、以及年度架構。",
}

const targetAudience = [
  { group: "大學生", description: "大一至大四，不限科系，對職涯探索有興趣者" },
  { group: "研究生", description: "碩博士生，希望在學術與產業間找到方向者" },
  { group: "社會新鮮人", description: "畢業 1-2 年內，正在摸索職涯方向者" },
]

const programDetails = [
  { icon: Calendar, label: "課程期間", value: "12 個月（每年 9 月至隔年 8 月）" },
  { icon: Clock, label: "時間安排", value: "每週 3-4 小時，線上線下混合" },
  { icon: Users, label: "班級規模", value: "每班 20-30 人" },
  { icon: MapPin, label: "實體活動地點", value: "台北、台中、高雄" },
]

const annualSchedule = [
  { month: "9-11月", phase: "階段一", content: "Know Yourself - 個人核心探索", color: "bg-primary" },
  { month: "12-2月", phase: "階段二", content: "Make it Real - 個人實踐能力養成", color: "bg-accent" },
  { month: "3-8月", phase: "階段三", content: "Become Your Future - 企業專案實作", color: "bg-chart-4" },
]

export default function ProgramsOverviewPage() {
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
                專案一覽
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                完整了解鄉育大學專案的架構、對象、與時程安排。
              </p>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">服務對象</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {targetAudience.map((item) => (
                  <div key={item.group} className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{item.group}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Program Details */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">課程詳情</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {programDetails.map((item) => (
                  <div key={item.label} className="relative flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="mt-1 font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Annual Schedule */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">年度架構</h2>
              
              <div className="space-y-4">
                {annualSchedule.map((item) => (
                  <div key={item.month} className="flex items-stretch gap-4">
                    <div className="flex w-24 shrink-0 items-center justify-center rounded-lg bg-muted px-4 py-3">
                      <span className="text-sm font-medium text-foreground">{item.month}</span>
                    </div>
                    <div className={`flex-1 rounded-lg ${item.color} p-4`}>
                      <p className="text-sm font-medium text-primary-foreground/80">{item.phase}</p>
                      <p className="font-semibold text-primary-foreground">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="border-t border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">你將獲得</h2>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "系統化的自我探索工具與測評",
                  "業界導師一對一諮詢與回饋",
                  "真實企業專案實作經驗",
                  "個人職涯學習歷程檔案",
                  "鄉育結業證書",
                  "校友社群與持續支持",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/programs/apply">立即報名</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/programs/journey">了解學習旅程</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
