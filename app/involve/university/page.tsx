import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, BookOpen, Users, Calendar, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "大學合作 | 財團法人鄉育教育基金會",
  description: "將財團法人鄉育教育基金會課程嵌入正規學分、社團活動或生涯輔導，為學生提供系統化的職涯探索體驗。",
}

const collaborationTypes = [
  {
    icon: BookOpen,
    title: "學分課程嵌入",
    description: "將鄉育課程整合進通識教育或院系必選修，以正規學分的形式提供學生完整的職涯探索體驗。",
    details: [
      "2-3 學分的完整課程設計",
      "配合學期時程規劃",
      "結合校內資源與業師網絡",
      "提供教學助理支援",
    ],
  },
  {
    icon: Users,
    title: "社團與工作坊",
    description: "與學生社團或職涯中心合作，以工作坊或短期營隊的形式，讓更多學生接觸職涯探索。",
    details: [
      "單日或週末工作坊",
      "寒暑假密集營隊",
      "社團幹部培訓",
      "彈性時段安排",
    ],
  },
  {
    icon: Calendar,
    title: "生涯輔導整合",
    description: "與學校職涯發展中心或諮商中心合作，將鄉育方法論融入現有的生涯輔導機制。",
    details: [
      "輔導老師培訓",
      "評量工具導入",
      "個案討論支援",
      "系統化追蹤機制",
    ],
  },
]

const whyPartner = [
  {
    title: "解決學生職涯迷惘",
    description: "超過 70% 大學生對未來感到迷惘，鄉育課程幫助學生建立清晰的自我認識與職涯方向。",
  },
  {
    title: "提升學校競爭力",
    description: "完善的職涯輔導機制是學生選校的重要考量，提升學校招生與口碑。",
  },
  {
    title: "降低教學負擔",
    description: "鄉育提供完整的課程教材、講師支援與評量工具，減輕教師備課壓力。",
  },
  {
    title: "數據化成效追蹤",
    description: "透過前後測評量，具體呈現學生在自我認識、職涯準備度等面向的成長。",
  },
]

const partnerSchools = [
  "國立台灣大學",
  "國立政治大學",
  "國立成功大學",
  "國立清華大學",
  "國立交通大學",
  "國立中山大學",
  "東吳大學",
  "輔仁大學",
]

export default function UniversityPartnerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                與鄉育攜手，為學生點亮職涯方向
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                將鄉育的職涯探索課程嵌入校園，
                幫助學生在畢業前就建立清晰的自我認識與職涯藍圖。
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">洽談合作</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/programs/university">了解課程內容</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Types */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              合作模式
            </h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {collaborationTypes.map((type) => (
                <Card key={type.title} className="flex flex-col">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <type.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <CardDescription className="text-base">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {type.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              為什麼選擇與鄉育合作？
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {whyPartner.map((item) => (
                <div 
                  key={item.title} 
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Schools */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                合作學校
              </h2>
              <p className="mt-4 text-muted-foreground">
                感謝全台大專院校的信任與支持
              </p>
              <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
                {partnerSchools.map((school) => (
                  <div 
                    key={school}
                    className="flex h-16 items-center justify-center rounded-lg border border-border bg-card p-3"
                  >
                    <span className="text-sm font-medium text-muted-foreground">{school}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              合作流程
            </h2>
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 md:grid-cols-4">
                {[
                  { step: "1", title: "初步洽談", desc: "了解學校需求與期待" },
                  { step: "2", title: "方案設計", desc: "量身打造合作內容" },
                  { step: "3", title: "課程執行", desc: "講師進駐與教學" },
                  { step: "4", title: "成效評估", desc: "數據分析與回饋" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
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

        {/* CTA */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                一起為學生創造更好的職涯探索體驗
              </h2>
              <p className="mt-4 text-muted-foreground">
                歡迎各大專院校洽談合作，我們將依據學校需求提供最適合的方案
              </p>
              <Button size="lg" className="mt-8" asChild>
                <Link href="/contact">預約諮詢</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
