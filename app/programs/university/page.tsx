import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, School, BookOpen, Users, Award, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "大學合作摘要 | 財團法人鄉育教育基金會",
  description: "了解財團法人鄉育教育基金會課程如何嵌入校內、大學合作形式與流程。",
}

const integrationModes = [
  {
    icon: BookOpen,
    title: "正式學分課程",
    description: "將鄉育課程納入校內選修課程，學生修課可獲得學分認可",
    features: [
      "與系所共同設計課綱",
      "鄉育提供師資與教材",
      "學生獲得學分認可",
      "每學期固定開課",
    ],
  },
  {
    icon: Users,
    title: "工作坊系列",
    description: "舉辦短期工作坊，讓更多學生體驗鄉育的學習方式",
    features: [
      "彈性安排時間場次",
      "可配合系所活動規劃",
      "適合試辦與推廣",
      "3-6 小時精華課程",
    ],
  },
  {
    icon: Award,
    title: "實習 / 專題合作",
    description: "將鄉育課程與系上的實習或專題課程結合",
    features: [
      "搭配企業專案實作",
      "導師制度支持",
      "累積實務作品集",
      "強化就業競爭力",
    ],
  },
]

export default function ProgramsUniversityPage() {
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
                大學合作摘要
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                將系統化的職涯探索課程導入校內，為學生提供更完整的學習資源。
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">45</p>
                <p className="text-sm text-muted-foreground">合作學校</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">2500+</p>
                <p className="text-sm text-muted-foreground">受惠學生</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">92%</p>
                <p className="text-sm text-muted-foreground">教師滿意度</p>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Modes */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 text-center">
                <School className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">課程嵌入方式</h2>
                <p className="mt-3 text-muted-foreground">根據學校需求，我們提供多元的合作模式</p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-3">
                {integrationModes.map((mode) => (
                  <div key={mode.title} className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <mode.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{mode.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{mode.description}</p>
                    <ul className="space-y-2">
                      {mode.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits for Schools */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">學校的收穫</h2>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "提升學生的學習動機與目標感",
                  "補足校內職涯探索資源的不足",
                  "建立與產業界的連結",
                  "提升學生就業競爭力與就業率",
                  "獲得系統化的課程教材與師資",
                  "降低學生休退學比例",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">想了解更多合作細節？</h2>
              <p className="mt-3 text-muted-foreground">
                歡迎前往大學合作專區，了解完整的合作方案與流程
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/for/universities">前往大學專區</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">聯絡我們</Link>
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
