import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, TrendingUp, Shield, FileText, Users, ArrowRight } from "lucide-react"

export const metadata = {
  title: "捐款者專區 | 財團法人鄉育教育基金會",
  description: "您的每一份支持，都在幫助年輕人找到自己的方向。了解您對財團法人鄉育教育基金會的捐款如何創造改變。",
}

const impactMetrics = [
  { value: "5,000+", label: "累計服務學生" },
  { value: "92%", label: "學生職涯準備度提升" },
  { value: "85%", label: "學生對自我認識提升" },
  { value: "30+", label: "合作大專院校" },
]

const donationImpact = [
  {
    amount: "NT$ 500",
    impact: "支持一位學生完成自我探索工作坊",
    detail: "讓一位學生有機會透過系統化的方法認識自己",
  },
  {
    amount: "NT$ 1,500",
    impact: "支持一位學生完成完整階段課程",
    detail: "陪伴一位學生走過 6 週的深度成長旅程",
  },
  {
    amount: "NT$ 5,000",
    impact: "支持一位學生完成整年度學習計畫",
    detail: "為一位學生提供完整的三階段培育，從認識自己到定義未來",
  },
  {
    amount: "NT$ 15,000",
    impact: "支持一個班級的職涯探索課程",
    detail: "讓 30 位學生共同開啟職涯探索之旅",
  },
]

const transparencyPoints = [
  {
    icon: FileText,
    title: "年度報告公開",
    description: "每年公開詳細的年度報告，包含財務報表、服務成果與未來計畫",
  },
  {
    icon: Shield,
    title: "政府立案團體",
    description: "鄉育為政府立案之教育公益團體，捐款可依法申請列舉扣除",
  },
  {
    icon: TrendingUp,
    title: "數據驅動成效",
    description: "所有課程都有前後測評量，用數據證明每一分錢的價值",
  },
]

const fundAllocation = [
  { category: "課程開發與執行", percentage: 60, color: "bg-primary" },
  { category: "學生補助與獎學金", percentage: 25, color: "bg-chart-2" },
  { category: "行政與營運", percentage: 15, color: "bg-chart-3" },
]

export default function DonorsPage() {
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
                給支持青年的你
              </span>
              <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                您的支持，正在改變年輕人的未來
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                感謝每一位支持者。您的捐款不只是數字，
                而是一個又一個年輕人找到方向的起點。
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/involve/donate">立即捐款</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/impact/reports">查看年度報告</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="border-b border-border py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {impactMetrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-3xl font-bold text-primary md:text-4xl">{metric.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Impact */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              您的捐款創造的改變
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              每一筆捐款都直接轉化為學生的成長機會
            </p>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {donationImpact.map((item) => (
                <Card key={item.amount} className="relative transition-colors hover:border-[#C7FF3A]/30">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <CardHeader>
                    <div className="text-2xl font-bold text-primary">{item.amount}</div>
                    <CardTitle className="text-lg">{item.impact}</CardTitle>
                    <CardDescription>{item.detail}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Fund Allocation */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              資金運用方式
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              我們確保每一分錢都用在最有價值的地方
            </p>
            <div className="mx-auto max-w-xl">
              <div className="mb-6 flex h-8 overflow-hidden rounded-full">
                {fundAllocation.map((item) => (
                  <div 
                    key={item.category}
                    className={`${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                ))}
              </div>
              <div className="space-y-3">
                {fundAllocation.map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-4 w-4 rounded ${item.color}`} />
                      <span className="text-foreground">{item.category}</span>
                    </div>
                    <span className="font-medium text-foreground">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              透明與信任
            </h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {transparencyPoints.map((point) => (
                <Card key={point.title} className="relative text-center transition-colors hover:border-[#C7FF3A]/30">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <CardHeader>
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <point.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{point.title}</CardTitle>
                    <CardDescription>{point.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Donor Story */}
        <section className="border-t border-border bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Users className="mx-auto mb-6 h-12 w-12 text-primary" />
              <blockquote className="text-lg text-foreground">
                「看到學生從迷惘變得有方向，是我持續支持鄉育的原因。
                每次收到學生的感謝信，都讓我覺得這筆捐款非常值得。」
              </blockquote>
              <div className="mt-6">
                <p className="font-medium text-foreground">王先生</p>
                <p className="text-sm text-muted-foreground">定期定額捐款人</p>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              捐款者資源
            </h2>
            <div className="mx-auto grid max-w-3xl gap-4">
              {[
                { title: "年度報告下載", href: "/impact/reports" },
                { title: "捐款收據與抵稅說明", href: "/involve/donate" },
                { title: "捐款常見問題", href: "/involve/donate" },
              ].map((item) => (
                <Link 
                  key={item.title}
                  href={item.href}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/40 hover:bg-[#EFFFBE]/30"
                >
                  <span className="font-medium text-foreground">{item.title}</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <Heart className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                繼續支持青年的選擇力
              </h2>
              <p className="mt-4 text-muted-foreground">
                每一份支持，都是青年探索未來的燃料
              </p>
              <Button size="lg" className="mt-8 transition-all hover:ring-2 hover:ring-[#C7FF3A]/40" asChild>
                <Link href="/involve/donate">立即捐款</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
