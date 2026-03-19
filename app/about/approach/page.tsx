import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, TrendingUp, Users, Lightbulb, Target, BookOpen } from "lucide-react"

export const metadata = {
  title: "教育方法與理念 | 財團法人鄉育教育基金會",
  description: "了解財團法人鄉育教育基金會（CountryEDU Charity Foundation）獨特的教育方法論，結合 SEL 社會情緒學習、數據驅動成長、以及 PBL 專案式學習。",
}

const methodologies = [
  {
    icon: Heart,
    title: "SEL 社會情緒學習",
    subtitle: "Social Emotional Learning",
    description: "將情緒管理、壓力管理、人際溝通等軟實力與專業能力結合。這是 2025/2026 年起全球教育的大趨勢。",
    features: [
      "自我覺察：認識自己的情緒與價值觀",
      "自我管理：壓力管理與目標設定",
      "社會覺察：同理心與多元包容",
      "人際技巧：溝通與團隊合作",
      "負責任的決策：批判思考與問題解決",
    ],
    color: "border-primary bg-primary/5",
  },
  {
    icon: TrendingUp,
    title: "數據驅動成長",
    subtitle: "Data-Driven Growth",
    description: "不僅關注學歷或職位的結果，更強調透過數據記錄個人能力的動態成長過程。",
    features: [
      "能力前後測：客觀追蹤成長軌跡",
      "學習歷程記錄：累積個人成長檔案",
      "即時回饋：讓學生看見自己的進步",
      "個人化建議：基於數據的發展建議",
    ],
    color: "border-accent bg-accent/10",
  },
  {
    icon: Lightbulb,
    title: "PBL 專案式學習",
    subtitle: "Project-Based Learning",
    description: "透過真實企業專案，讓學生在實作中學習，將知識轉化為解決問題的能力。",
    features: [
      "真實情境：企業提供實際挑戰題目",
      "團隊協作：培養跨領域合作能力",
      "導師指導：業界專家全程回饋",
      "成果展現：將學習轉化為具體產出",
    ],
    color: "border-chart-4 bg-chart-4/10",
  },
]

const frameworks = [
  { name: "CASEL 社會情緒學習框架", description: "國際認可的 SEL 標準" },
  { name: "何倫職業興趣量表", description: "職涯探索經典工具" },
  { name: "成長型思維", description: "Stanford 心理學研究" },
  { name: "OECD 2030 學習指南", description: "未來人才能力框架" },
]

export default function ApproachPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Link href="/about" className="mb-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                <ArrowRight className="h-4 w-4 rotate-180" />
                返回認識鄉育
              </Link>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                教育方法與理念
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                結合國際前沿教育理論與在地實踐經驗，打造獨特的鄉育方法論。
              </p>
            </div>
          </div>
        </section>

        {/* Methodologies */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl space-y-12">
              {methodologies.map((method, index) => (
                <div
                  key={method.title}
                  className={`relative rounded-xl border-2 p-8 transition-shadow hover:shadow-[0_0_0_1px_rgba(199,255,58,0.15)] ${method.color}`}
                >
                  <span className="pointer-events-none absolute right-6 top-6 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="shrink-0">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-card shadow-sm">
                        <method.icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-sm font-medium text-muted-foreground">{method.subtitle}</p>
                      <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">{method.title}</h2>
                      <p className="mb-6 text-lg text-muted-foreground">{method.description}</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {method.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span className="text-sm text-foreground">{feature}</span>
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

        {/* Framework References */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">國際框架引用</h2>
              <p className="mb-8 text-center text-muted-foreground">
                我們的課程設計參考以下國際認可的教育框架與研究
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {frameworks.map((framework) => (
                  <div key={framework.name} className="relative flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-8 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <BookOpen className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{framework.name}</p>
                      <p className="text-sm text-muted-foreground">{framework.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">如何運作？</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">系統化測評</h3>
                    <p className="text-muted-foreground">
                      透過科學化的測評工具，幫助學生了解自己的職業興趣、性格特質與優勢能力。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">能力養成課程</h3>
                    <p className="text-muted-foreground">
                      結合 SEL 社會情緒學習，培養問題解決、表達溝通、數位素養等核心能力。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">真實專案實踐</h3>
                    <p className="text-muted-foreground">
                      透過企業真實專案，讓學生在實作中應用所學，累積可量化的成果。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    4
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">數據追蹤成長</h3>
                    <p className="text-muted-foreground">
                      全程記錄學習歷程與能力變化，讓學生看見自己的成長軌跡。
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/programs/journey">了解學習旅程</Link>
                </Button>
                <Button variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/about/team">認識團隊</Link>
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
