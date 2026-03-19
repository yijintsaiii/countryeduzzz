import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building2, Users, Target, TrendingUp, Award, Handshake } from "lucide-react"

export const metadata = {
  title: "企業專區 | 財團法人鄉育教育基金會",
  description: "找到真正了解自己、準備好進入職場的優秀人才。與財團法人鄉育教育基金會合作，提前接觸並培育未來員工。",
}

const challenges = [
  {
    problem: "新人不知道自己要什麼",
    solution: "鄉育學生經過自我探索，清楚自己的職涯方向與價值觀",
  },
  {
    problem: "軟實力難以在面試中評估",
    solution: "我們提供學生的特質報告與成長數據，幫助企業更全面了解人才",
  },
  {
    problem: "招募成本高、留任率低",
    solution: "學生對自己和職涯有清楚認識，更容易找到適合的位置並長期投入",
  },
]

const collaborationWays = [
  {
    icon: Users,
    title: "專題合作",
    description: "讓學生為企業解決真實問題，同時觀察潛力人才的表現。",
    benefits: ["取得年輕世代洞察", "低成本試用潛力人才", "提升品牌好感度"],
  },
  {
    icon: Target,
    title: "業師計畫",
    description: "企業主管擔任學生的業師，分享職涯經驗並建立人才關係。",
    benefits: ["提前認識優秀學生", "員工成長與回饋社會", "強化僱主品牌"],
  },
  {
    icon: Building2,
    title: "企業參訪",
    description: "邀請學生到企業參訪，認識企業文化與工作內容。",
    benefits: ["展示企業文化與價值", "建立人才庫", "促進產學交流"],
  },
  {
    icon: Award,
    title: "獎學金贊助",
    description: "設立企業冠名獎學金，支持優秀學生完成學習旅程。",
    benefits: ["企業品牌曝光", "得獎學生優先連結", "履行社會責任"],
  },
]

const stats = [
  { value: "92%", label: "學生對職涯方向更清晰" },
  { value: "85%", label: "企業對學生表現滿意" },
  { value: "30+", label: "合作企業夥伴" },
  { value: "500+", label: "完成企業專題的學生" },
]

export default function CompaniesPage() {
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
                給正在找人才的你
              </span>
              <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                找到真正準備好的人才
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                鄉育培育的學生不只有專業能力，更具備清晰的自我認識與職涯方向。
                這樣的人才，進入職場後更快上手、更能長期投入。
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/involve/corporate">了解合作方案</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/contact">預約諮詢</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              我們理解企業的痛點
            </h2>
            <div className="mx-auto max-w-4xl space-y-6">
              {challenges.map((item) => (
                <div 
                  key={item.problem}
                  className="relative grid gap-4 rounded-lg border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30 md:grid-cols-2"
                >
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      企業常見困擾
                    </span>
                    <p className="mt-1 font-medium text-foreground">{item.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-primary">
                      鄉育的解方
                    </span>
                    <p className="mt-1 text-muted-foreground">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaboration Ways */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              合作方式
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              根據企業需求，選擇最適合的合作模式
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {collaborationWays.map((way) => (
                <Card key={way.title} className="relative transition-colors hover:border-[#C7FF3A]/30">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <way.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{way.title}</CardTitle>
                    <CardDescription>{way.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {way.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-lg border border-border bg-primary/5 p-8 text-center">
              <Handshake className="mx-auto mb-6 h-12 w-12 text-primary" />
              <blockquote className="text-lg text-foreground">
                「透過鄉育的專題合作，我們不只找到了解決問題的方案，
                更發現了幾位非常有潛力的學生。其中一位後來成為我們的正職員工，
                表現非常出色。」
              </blockquote>
              <div className="mt-6">
                <p className="font-medium text-foreground">某科技公司人資長</p>
                <p className="text-sm text-muted-foreground">鄉育企業合作夥伴</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                開始與鄉育合作
              </h2>
              <p className="mt-4 text-muted-foreground">
                讓我們一起討論最適合貴公司的人才策略
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/contact">預約諮詢</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/impact/partners">查看合作案例</Link>
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
