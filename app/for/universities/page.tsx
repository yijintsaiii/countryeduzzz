import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, BookOpen, BarChart3, Users, CheckCircle2, FileText } from "lucide-react"

export const metadata = {
  title: "大學合作專區 | 財團法人鄉育教育基金會",
  description: "將財團法人鄉育教育基金會課程嵌入校園，為學生提供系統化的職涯探索體驗。提升學生職涯準備度，強化學校競爭力。",
}

const challenges = [
  "學生對未來感到迷惘，不知道畢業後要做什麼",
  "現有生涯輔導資源不足以回應學生需求",
  "缺乏系統化的職涯探索課程與方法",
  "難以追蹤學生職涯發展成效",
]

const solutions = [
  {
    icon: BookOpen,
    title: "完整課程體系",
    description: "從自我認識到職涯規劃，提供三階段系統化課程，可彈性嵌入學分課程或工作坊。",
  },
  {
    icon: Users,
    title: "專業師資支援",
    description: "鄉育提供經過培訓的講師，減輕學校師資負擔，確保課程品質。",
  },
  {
    icon: BarChart3,
    title: "數據化成效追蹤",
    description: "透過前後測評量，具體呈現學生在自我認識、職涯準備度等面向的成長數據。",
  },
  {
    icon: FileText,
    title: "完整教學資源",
    description: "提供教案、教材、評量工具等完整資源，方便學校後續延續與發展。",
  },
]

const collaborationFormats = [
  {
    title: "學分課程嵌入",
    description: "整合進通識教育或院系選修，2-3 學分完整課程",
    suitable: "適合：希望提供系統化職涯課程的院系",
  },
  {
    title: "短期工作坊",
    description: "單日或週末工作坊，彈性配合學校活動",
    suitable: "適合：職涯中心、學生社團活動",
  },
  {
    title: "寒暑期營隊",
    description: "密集式學習體驗，3-5 天完整旅程",
    suitable: "適合：寒暑假特別企劃",
  },
  {
    title: "輔導機制整合",
    description: "將鄉育方法論融入現有生涯輔導流程",
    suitable: "適合：諮商中心、導師制度",
  },
]

const results = [
  { value: "92%", label: "學生對自我認識提升" },
  { value: "88%", label: "學生職涯準備度提升" },
  { value: "95%", label: "學校合作滿意度" },
  { value: "30+", label: "合作大專院校" },
]

export default function UniversitiesPage() {
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
                給大專院校的夥伴
              </span>
              <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                為學生提供最好的職涯探索資源
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                超過 70% 大學生對未來感到迷惘。
                讓鄉育成為您的職涯教育夥伴，
                一起幫助學生在畢業前找到方向。
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/contact">洽談合作</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/involve/university">了解合作方案</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="border-b border-border py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {results.map((result) => (
                <div key={result.label} className="text-center">
                  <div className="text-3xl font-bold text-primary md:text-4xl">{result.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{result.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              學校常見的困擾
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              這些問題聽起來很熟悉嗎？
            </p>
            <div className="mx-auto max-w-3xl space-y-4">
              {challenges.map((challenge) => (
                <div 
                  key={challenge}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/30"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <span className="text-destructive">?</span>
                  </div>
                  <span className="text-foreground">{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              鄉育提供的解方
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              系統化的職涯探索課程，幫助學校解決學生職涯迷惘問題
            </p>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {solutions.map((solution) => (
                <Card key={solution.title} className="relative transition-colors hover:border-[#C7FF3A]/30">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <solution.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{solution.title}</CardTitle>
                    <CardDescription className="text-base">
                      {solution.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Collaboration Formats */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              合作形式
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {collaborationFormats.map((format) => (
                <div 
                  key={format.title}
                  className="relative rounded-lg border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30"
                >
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <h3 className="text-lg font-semibold text-foreground">{format.title}</h3>
                  <p className="mt-2 text-muted-foreground">{format.description}</p>
                  <p className="mt-4 text-sm text-primary">{format.suitable}</p>
                </div>
              ))}
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
              <div className="grid gap-8 md:grid-cols-4">
                {[
                  { step: "1", title: "需求了解", desc: "初步討論學校需求與目標" },
                  { step: "2", title: "方案設計", desc: "量身打造合作內容與時程" },
                  { step: "3", title: "課程執行", desc: "專業講師進駐教學" },
                  { step: "4", title: "成效評估", desc: "數據分析與成果報告" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-lg border border-border bg-primary/5 p-8 text-center">
              <GraduationCap className="mx-auto mb-6 h-12 w-12 text-primary" />
              <blockquote className="text-lg text-foreground">
                「與鄉育合作三年來，我們看到學生在職涯探索上的顯著進步。
                最重要的是，鄉育的課程真的能幫助學生找到方向，
                這是我們過去單打獨鬥很難做到的。」
              </blockquote>
              <div className="mt-6">
                <p className="font-medium text-foreground">某國立大學職涯發展中心主任</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                一起為學生創造更好的未來
              </h2>
              <p className="mt-4 text-muted-foreground">
                歡迎各大專院校洽談合作，我們將依據學校需求提供最適合的方案
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/contact">預約諮詢</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/programs/university">了解課程內容</Link>
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
