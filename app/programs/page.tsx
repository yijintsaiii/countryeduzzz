import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, Building2, School, Clock, Users, Award, ArrowRight } from "lucide-react"

export const metadata = {
  title: "大學專案 | 財團法人鄉育教育基金會",
  description: "探索財團法人鄉育教育基金會的大學專案，為大學生、高中老師提供專業培訓，協助青年進行系統化的職涯探索。",
}

const highlights = [
  { icon: Clock, value: "12 個月", label: "完整學習旅程" },
  { icon: Users, value: "小班制", label: "20-30 人/班" },
  { icon: Award, value: "認證", label: "結業證書" },
]

export default function ProgramsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
                大學專案
              </p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                從迷惘到清晰的學習旅程
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                12 個月的系統化課程，結合自我探索、能力養成、與真實專案，
                協助大學生找到職涯方向。
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/programs/apply">立即報名</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/programs/journey">了解課程內容</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {highlights.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Program Overview Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground">探索專案內容</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Link
                  href="/programs/overview"
                  className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-[#C7FF3A]/40 hover:shadow-[0_0_0_1px_rgba(199,255,58,0.2)]"
                >
                  <span className="pointer-events-none absolute left-6 top-6 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <GraduationCap className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-3 text-xl font-semibold text-foreground">專案一覽</h3>
                  <p className="mb-4 text-muted-foreground">
                    了解服務對象、課程期間、形式、以及年度架構。
                  </p>
                  <span className="flex items-center gap-2 text-sm font-medium text-primary">
                    了解更多 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>

                <Link
                  href="/programs/journey"
                  className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-[#C7FF3A]/40 hover:shadow-[0_0_0_1px_rgba(199,255,58,0.2)]"
                >
                  <span className="pointer-events-none absolute left-6 top-6 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <Award className="mb-4 h-8 w-8 text-accent-foreground" />
                  <h3 className="mb-3 text-xl font-semibold text-foreground">學習旅程</h3>
                  <p className="mb-4 text-muted-foreground">
                    三階段成長路徑：Know Yourself、Make it Real、Become Your Future。
                  </p>
                  <span className="flex items-center gap-2 text-sm font-medium text-primary">
                    了解更多 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>

                <Link
                  href="/programs/corporate"
                  className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-[#C7FF3A]/40 hover:shadow-[0_0_0_1px_rgba(199,255,58,0.2)]"
                >
                  <span className="pointer-events-none absolute left-6 top-6 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <Building2 className="mb-4 h-8 w-8 text-chart-4" />
                  <h3 className="mb-3 text-xl font-semibold text-foreground">企業合作摘要</h3>
                  <p className="mb-4 text-muted-foreground">
                    了解贊助、導師、共創專題等企業合作模式。
                  </p>
                  <span className="flex items-center gap-2 text-sm font-medium text-primary">
                    了解更多 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>

                <Link
                  href="/programs/university"
                  className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-[#C7FF3A]/40 hover:shadow-[0_0_0_1px_rgba(199,255,58,0.2)]"
                >
                  <span className="pointer-events-none absolute left-6 top-6 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <School className="mb-4 h-8 w-8 text-chart-3" />
                  <h3 className="mb-3 text-xl font-semibold text-foreground">大學合作摘要</h3>
                  <p className="mb-4 text-muted-foreground">
                    了解課程如何嵌入校內、合作形式與流程。
                  </p>
                  <span className="flex items-center gap-2 text-sm font-medium text-primary">
                    了解更多 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-primary-foreground">準備好開始探索了嗎？</h2>
              <p className="mt-3 text-primary-foreground/80">
                報名下一期課程，開啟你的職涯探索旅程
              </p>
              <Button size="lg" variant="secondary" className="mt-6 transition-all hover:ring-2 hover:ring-[#C7FF3A]/50" asChild>
                <Link href="/programs/apply">查看報名資訊</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
