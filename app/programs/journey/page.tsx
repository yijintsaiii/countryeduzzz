import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search, Rocket, Target, CheckCircle2, Clock, BookOpen, Users } from "lucide-react"

export const metadata = {
  title: "學習旅程 | 財團法人鄉育教育基金會",
  description: "了解財團法人鄉育教育基金會三階段學習旅程：Know Yourself、Make it Real、Become Your Future。",
}

const stages = [
  {
    number: "01",
    icon: Search,
    title: "Know Yourself",
    subtitle: "個人核心探索",
    duration: "3 個月",
    goal: "導入生涯探索工具與實務挑戰，啟動自我覺察與職涯思維的雙軌成長",
    activities: [
      { title: "何倫碼測驗", description: "了解你的職業興趣類型" },
      { title: "職場優勢與期待分析", description: "發掘你的核心優勢" },
      { title: "個人品牌與表達力培養", description: "學習如何展現自己" },
      { title: "職涯學習目標規劃", description: "設定屬於你的成長方向" },
    ],
    outcomes: [
      "完成個人職業興趣測評報告",
      "建立初步的職涯方向假設",
      "具備自我介紹與表達的基本能力",
    ],
    color: "border-primary bg-primary/5",
    iconBg: "bg-primary text-primary-foreground",
  },
  {
    number: "02",
    icon: Rocket,
    title: "Make it Real",
    subtitle: "個人實踐能力養成",
    duration: "3 個月",
    goal: "透過業界老師領導，強化問題解決、表達溝通、數位素養、目標思維與挫折管理能力",
    activities: [
      { title: "業界導師線上課程", description: "由 2 位業界導師聯合開設" },
      { title: "實習或公益專案", description: "學生自主參與實踐" },
      { title: "個人職涯歷程累積", description: "建立成長檔案" },
      { title: "定期回饋與調整", description: "持續優化學習方向" },
    ],
    outcomes: [
      "完成至少 1 項實習或公益專案",
      "建立問題解決的實戰經驗",
      "累積個人職涯學習歷程",
    ],
    color: "border-accent bg-accent/10",
    iconBg: "bg-accent text-accent-foreground",
  },
  {
    number: "03",
    icon: Target,
    title: "Become Your Future",
    subtitle: "企業出題 × 學生解題",
    duration: "6 個月",
    goal: "結合企業真實情境，由企業推派窗口指導回饋，學生團隊共創解方",
    activities: [
      { title: "企業專案選題", description: "小組選定真實企業題目" },
      { title: "團隊分工合作", description: "5-6 人為一組協作" },
      { title: "調查研究與設計", description: "獨立完成解題方案" },
      { title: "企業夥伴回饋", description: "獲得真實職場觀點" },
    ],
    outcomes: [
      "完成 1 份完整的企業專案報告",
      "獲得企業導師的專業回饋",
      "建立團隊協作與專案管理能力",
    ],
    color: "border-chart-4 bg-chart-4/10",
    iconBg: "bg-chart-4 text-foreground",
  },
]

export default function ProgramsJourneyPage() {
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
                學習旅程
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                12 個月、三階段的系統化學習，陪伴你從自我認識走向職涯實踐。
              </p>
            </div>
          </div>
        </section>

        {/* Journey Overview */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">12 個月完整旅程</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2">
                <BookOpen className="h-4 w-4 text-accent-foreground" />
                <span className="text-sm font-medium">3 個學習階段</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-chart-4/20 px-4 py-2">
                <Users className="h-4 w-4 text-chart-4" />
                <span className="text-sm font-medium">小班制教學</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stages Detail */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-16">
              {stages.map((stage) => (
                <div key={stage.number} className={`rounded-2xl border-2 p-8 ${stage.color}`}>
                  {/* Header */}
                  <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${stage.iconBg}`}>
                        <stage.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">階段 {stage.number}</p>
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">{stage.title}</h2>
                        <p className="text-lg text-foreground">{stage.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{stage.duration}</span>
                    </div>
                  </div>

                  {/* Goal */}
                  <div className="mb-8 rounded-lg bg-card p-4">
                    <p className="text-sm font-medium text-muted-foreground">目標</p>
                    <p className="mt-1 text-foreground">{stage.goal}</p>
                  </div>

                  {/* Activities & Outcomes */}
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="mb-4 font-semibold text-foreground">課程規劃</h3>
                      <div className="space-y-3">
                        {stage.activities.map((activity) => (
                          <div key={activity.title} className="rounded-lg bg-card p-3">
                            <p className="font-medium text-foreground">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 font-semibold text-foreground">預期成果</h3>
                      <div className="space-y-3">
                        {stage.outcomes.map((outcome) => (
                          <div key={outcome} className="flex items-start gap-3 rounded-lg bg-card p-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <span className="text-foreground">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">準備好開始你的旅程了嗎？</h2>
              <p className="mt-3 text-muted-foreground">
                立即報名，成為下一屆鄉育學員
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/programs/apply">立即報名</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/impact/outcomes">看學員故事</Link>
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
