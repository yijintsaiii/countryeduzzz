import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building2, Users, Target, Award, ArrowRight } from "lucide-react"

export const metadata = {
  title: "企業與基金會合作 | 財團法人鄉育教育基金會",
  description: "與財團法人鄉育教育基金會合作，透過 CSR 專案、人才培育計畫，支持青年成長並發掘潛力人才。",
}

const partnershipTypes = [
  {
    icon: Target,
    title: "CSR 專案合作",
    description: "將企業社會責任與青年教育結合，創造品牌影響力同時為社會帶來正向改變。",
    features: [
      "專屬命名課程或計畫",
      "員工志工參與機會",
      "影響力報告與成果展示",
      "媒體曝光與品牌聯名",
    ],
  },
  {
    icon: Users,
    title: "人才培育計畫",
    description: "透過實務專題、企業參訪或業師媒合，提前認識並培育符合企業文化的潛力人才。",
    features: [
      "學生專題合作機會",
      "企業參訪與文化體驗",
      "業師一對一指導",
      "優先面試管道",
    ],
  },
  {
    icon: Award,
    title: "獎學金贊助",
    description: "以企業名義設立獎學金，支持優秀學生完成學習旅程，建立長期人才連結。",
    features: [
      "企業冠名獎學金",
      "得獎學生交流活動",
      "年度頒獎典禮參與",
      "學生追蹤與回饋",
    ],
  },
]

const benefits = [
  {
    title: "ESG 目標達成",
    description: "直接對應 SDG 4（優質教育）與 SDG 8（尊嚴工作），強化 ESG 報告內容",
  },
  {
    title: "人才競爭優勢",
    description: "提前接觸具備軟實力與自我認識的潛力人才，降低招募成本",
  },
  {
    title: "品牌形象提升",
    description: "展現企業對青年發展的承諾，建立正向品牌聯想",
  },
  {
    title: "員工參與平台",
    description: "提供員工有意義的志工參與機會，提升員工向心力",
  },
]

const partners = [
  "台積電文教基金會",
  "聯發科技教育基金會",
  "富邦文教基金會",
  "國泰金控",
  "中華電信基金會",
  "研華文教基金會",
]

export default function CorporatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                與鄉育攜手，培育未來人才
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                企業的力量可以創造深遠的社會影響。透過與鄉育合作，
                您不只是支持青年教育，更是在投資未來的人才資本。
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">洽談合作方案</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/impact/partners">查看合作案例</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              合作模式
            </h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {partnershipTypes.map((type) => (
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
                      {type.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              合作效益
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {benefits.map((benefit) => (
                <div 
                  key={benefit.title} 
                  className="flex gap-4 rounded-lg border border-border bg-card p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                他們都選擇與鄉育同行
              </h2>
              <p className="mt-4 text-muted-foreground">
                感謝眾多企業與基金會的信任與支持
              </p>
              <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3">
                {partners.map((partner) => (
                  <div 
                    key={partner}
                    className="flex h-20 items-center justify-center rounded-lg border border-border bg-card p-4"
                  >
                    <span className="text-sm font-medium text-muted-foreground">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                開始探索合作可能
              </h2>
              <p className="mt-4 text-muted-foreground">
                讓我們一起討論最適合貴公司的合作方案
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
