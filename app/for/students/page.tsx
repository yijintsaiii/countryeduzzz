import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Compass, Target, Rocket, Users, CheckCircle2, ArrowRight, Quote } from "lucide-react"

export const metadata = {
  title: "大學生專區 | 財團法人鄉育教育基金會",
  description: "不知道未來要做什麼？讓財團法人鄉育教育基金會陪你一起探索，從認識自己開始，找到屬於你的職涯藍圖。",
}

const painPoints = [
  "不知道自己適合什麼工作",
  "覺得學校學的跟職場好像沒關係",
  "看到同學都有目標，自己卻很迷惘",
  "想嘗試但不知道從何開始",
  "擔心選錯科系或方向",
]

const journeyStages = [
  {
    icon: Compass,
    stage: "第一階段",
    title: "認識自己",
    description: "透過系統化的自我探索，了解你的特質、價值觀與興趣，建立選擇的基礎。",
    outcomes: ["完成個人特質報告", "釐清核心價值觀", "發現潛在興趣領域"],
  },
  {
    icon: Target,
    stage: "第二階段",
    title: "探索世界",
    description: "透過實際專案、企業參訪與業師對談，認識真實的職場樣貌與多元的職涯可能。",
    outcomes: ["完成一個實務專題", "累積企業參訪經驗", "建立業師人脈網絡"],
  },
  {
    icon: Rocket,
    stage: "第三階段",
    title: "定義未來",
    description: "整合所學，規劃你的職涯藍圖，並開始採取具體行動，讓夢想成為現實。",
    outcomes: ["制定職涯行動計畫", "準備個人作品集", "明確近期職涯目標"],
  },
]

const testimonials = [
  {
    content: "參加鄉育之前，我覺得自己什麼都可以，但也什麼都不確定。現在我終於知道自己要的是什麼了。",
    author: "小芳",
    school: "台大社會系",
    year: "大三",
  },
  {
    content: "業師分享讓我發現，原來我的興趣可以變成工作。這給了我很大的信心。",
    author: "阿凱",
    school: "政大企管系",
    year: "大二",
  },
]

export default function StudentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[#F3FFD2]/80 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-2 w-2 rounded-full bg-[#C7FF3A]" aria-hidden />
                寫給正在探索中的你
              </span>
              <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                不知道未來要做什麼？
                <br />
                <span className="text-primary">我們懂。</span>
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                你不是唯一一個對未來感到迷惘的人。
                鄉育陪伴超過 5,000 位大學生走過這段路，
                現在輪到你了。
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/programs/apply">開始我的探索旅程</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/programs/journey">了解學習旅程</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                這些困擾聽起來很熟悉嗎？
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {painPoints.map((point) => (
                  <span 
                    key={point}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
                  >
                    {point}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-muted-foreground">
                如果你對任何一點有共鳴，你來對地方了。
              </p>
            </div>
          </div>
        </section>

        {/* Journey Stages */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              我們會帶你走過的旅程
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              三個階段，一步步帶你從迷惘走向清晰
            </p>
            <div className="grid gap-8 lg:grid-cols-3">
              {journeyStages.map((stage, index) => (
                <Card key={stage.title} className="relative overflow-hidden transition-colors hover:border-[#C7FF3A]/40">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <div className="absolute -top-3 left-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    {stage.stage}
                  </div>
                  <CardHeader className="pt-8">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <stage.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{stage.title}</CardTitle>
                    <CardDescription className="text-base">
                      {stage.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="mb-2 text-sm font-medium text-foreground">你會獲得</h4>
                    <ul className="space-y-2">
                      {stage.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  {index < journeyStages.length - 1 && (
                    <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                      <ArrowRight className="h-8 w-8 text-primary/30" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              學長姐怎麼說
            </h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.author} className="relative bg-primary/5 transition-colors hover:border-[#C7FF3A]/30">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <CardContent className="pt-6">
                    <Quote className="mb-4 h-8 w-8 text-primary/30" />
                    <p className="text-foreground">{testimonial.content}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.school} {testimonial.year}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              常見問題
            </h2>
            <div className="mx-auto max-w-3xl space-y-4">
              <details className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/30 [&[open]]:border-[#C7FF3A]/40">
                <summary className="cursor-pointer font-medium text-foreground">
                  我需要花多少時間參與？
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  每個階段約需 6-8 週，每週投入 2-4 小時。我們會配合大學生的作息，提供彈性的參與時段。
                </p>
              </details>
              <details className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/30 [&[open]]:border-[#C7FF3A]/40">
                <summary className="cursor-pointer font-medium text-foreground">
                  需要付費嗎？
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  我們提供不同的參與方案，部分課程需要付費，但也有獎學金與免費資源。詳情請見報名頁面。
                </p>
              </details>
              <details className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/30 [&[open]]:border-[#C7FF3A]/40">
                <summary className="cursor-pointer font-medium text-foreground">
                  我科系很冷門，也適合參加嗎？
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  當然！我們的課程不限科系，重點是幫助你認識自己。過去有各科系的學生參加，都獲得很好的收穫。
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                準備好開始探索了嗎？
              </h2>
              <p className="mt-4 text-muted-foreground">
                你的職涯藍圖，由你自己畫。我們只是陪你走這段路的人。
              </p>
              <Button size="lg" className="mt-8 transition-all hover:ring-2 hover:ring-[#C7FF3A]/40" asChild>
                <Link href="/programs/apply">立即報名</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
