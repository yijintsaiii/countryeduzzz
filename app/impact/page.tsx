import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Building2, FileText, ArrowRight } from "lucide-react"

export const metadata = {
  title: "影響力 | 財團法人鄉育教育基金會",
  description: "了解財團法人鄉育教育基金會的影響力：關鍵數據、學生改變、合作方回饋、年報與研究。",
}

const sections = [
  {
    icon: BarChart3,
    title: "關鍵數據總覽",
    description: "學生數、學校與企業數、出席率、滿意度等指標一覽",
    href: "/impact/data",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "學生的改變",
    description: "前後測結果圖表、代表性學生改變摘要",
    href: "/impact/outcomes",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: Building2,
    title: "學校與企業回饋",
    description: "老師、學校、企業的推薦語與案例",
    href: "/impact/partners",
    color: "bg-chart-4/20 text-chart-4",
  },
  {
    icon: FileText,
    title: "年報與研究",
    description: "年報 PDF、評估報告、研究摘要與下載",
    href: "/impact/reports",
    color: "bg-chart-3/20 text-chart-3",
  },
]

const quickStats = [
  { value: "2,500+", label: "累計服務學生" },
  { value: "94%", label: "學員滿意度" },
  { value: "85%", label: "專案完成率" },
  { value: "45", label: "合作學校" },
]

export default function ImpactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[#F3FFD2]/80 px-4 py-2 text-sm font-medium uppercase tracking-wider text-primary">
                <span className="h-2 w-2 rounded-full bg-[#C7FF3A]" aria-hidden />
                我們的影響力
              </p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                用數據見證改變的力量
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                每一個數字背後，都是一個青年找到方向的故事。
                我們用透明的數據，展現教育帶來的真實改變。
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {quickStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 md:grid-cols-2">
                {sections.map((section) => (
                  <Link
                    key={section.href}
                    href={section.href}
                    className="group relative flex flex-col rounded-xl border border-border bg-card p-8 transition-all hover:border-[#C7FF3A]/40 hover:shadow-[0_0_0_1px_rgba(199,255,58,0.2)]"
                  >
                    <span className="pointer-events-none absolute left-6 top-6 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${section.color}`}>
                      <section.icon className="h-6 w-6" />
                    </div>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">{section.title}</h2>
                    <p className="mb-4 flex-1 text-muted-foreground">{section.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      了解更多
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-primary-foreground">想要支持更多青年找到方向？</h2>
              <p className="mt-3 text-primary-foreground/80">
                您的支持將幫助更多學生獲得探索自我的機會
              </p>
              <Button size="lg" variant="secondary" className="mt-6 transition-all hover:ring-2 hover:ring-[#C7FF3A]/50" asChild>
                <Link href="/involve/donate">立即支持</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
