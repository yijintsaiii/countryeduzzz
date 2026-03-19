import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Users, Lightbulb, Award, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "企業合作摘要 | 財團法人鄉育教育基金會",
  description: "了解企業與財團法人鄉育教育基金會的合作模式：贊助、導師、共創專題等多元方案。",
}

const partnershipModels = [
  {
    icon: Award,
    title: "課程贊助",
    description: "支持青年職涯探索教育，提升企業品牌形象",
    benefits: [
      "品牌露出於課程教材與活動",
      "優先接觸優秀年輕人才",
      "獲得 CSR 報告素材",
      "參與年度成果發表會",
    ],
  },
  {
    icon: Users,
    title: "導師計畫",
    description: "派遣員工擔任學員導師，培養內部人才領導力",
    benefits: [
      "員工獲得指導年輕人的經驗",
      "提升員工的領導與溝通能力",
      "發掘有潛力的未來員工",
      "建立與學術界的連結",
    ],
  },
  {
    icon: Lightbulb,
    title: "專題共創",
    description: "提供企業真實題目，讓學生團隊協助解題",
    benefits: [
      "獲得年輕人的創新觀點",
      "低成本測試新想法",
      "建立企業人才庫",
      "提前認識未來人才",
    ],
  },
]

export default function ProgramsCorporatePage() {
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
                企業合作摘要
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                與鄉育合作，提前接觸具備責任感與創新思維的年輕人才。
              </p>
            </div>
          </div>
        </section>

        {/* Why Partner */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <Building2 className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">為什麼與鄉育合作？</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="relative rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-[#C7FF3A]/30">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <p className="text-4xl font-bold text-primary">94%</p>
                  <p className="mt-2 text-sm text-muted-foreground">學員課程滿意度</p>
                </div>
                <div className="relative rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-[#C7FF3A]/30">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <p className="text-4xl font-bold text-primary">85%</p>
                  <p className="mt-2 text-sm text-muted-foreground">學員完成企業專案</p>
                </div>
                <div className="relative rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-[#C7FF3A]/30">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <p className="text-4xl font-bold text-primary">120+</p>
                  <p className="mt-2 text-sm text-muted-foreground">合作企業夥伴</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Models */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground">合作模式</h2>
              
              <div className="grid gap-8 md:grid-cols-3">
                {partnershipModels.map((model) => (
                  <div key={model.title} className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <model.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{model.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{model.description}</p>
                    <ul className="space-y-2">
                      {model.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
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
                歡迎前往企業專區，了解完整的合作方案與流程
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/for/companies">前往企業專區</Link>
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
