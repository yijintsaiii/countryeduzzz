import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, School, Building2, TrendingUp, Clock, Award } from "lucide-react"

export const metadata = {
  title: "關鍵數據總覽 | 財團法人鄉育教育基金會",
  description: "財團法人鄉育教育基金會的關鍵成效數據：學生數、學校與企業數、出席率、滿意度等指標。",
}

const coreStats = [
  { icon: Users, value: "2,500+", label: "累計服務學生", description: "自 2019 年成立以來" },
  { icon: School, value: "45", label: "合作學校", description: "遍布北中南東各地區" },
  { icon: Building2, value: "120+", label: "企業夥伴", description: "跨產業企業支持" },
  { icon: Clock, value: "8,000+", label: "課程時數", description: "累計授課與活動時數" },
]

const performanceStats = [
  { label: "學員滿意度", value: 94, unit: "%" },
  { label: "課程出席率", value: 89, unit: "%" },
  { label: "專案完成率", value: 85, unit: "%" },
  { label: "推薦意願", value: 91, unit: "%" },
]

const yearlyGrowth = [
  { year: "2020", students: 50, schools: 5, companies: 10 },
  { year: "2021", students: 200, schools: 12, companies: 25 },
  { year: "2022", students: 600, schools: 25, companies: 50 },
  { year: "2023", students: 1200, schools: 38, companies: 85 },
  { year: "2024", students: 2500, schools: 45, companies: 120 },
]

export default function ImpactDataPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Link href="/impact" className="mb-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                <ArrowRight className="h-4 w-4 rotate-180" />
                返回影響力
              </Link>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                關鍵數據總覽
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                透明公開我們的成效指標，讓數據說話。
              </p>
            </div>
          </div>
        </section>

        {/* Core Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">核心數據</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {coreStats.map((stat) => (
                  <div key={stat.label} className="relative rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <stat.icon className="h-7 w-7 text-primary" />
                    </div>
                    <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-2 font-medium text-foreground">{stat.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">課程成效指標</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {performanceStats.map((stat) => (
                  <div key={stat.label} className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-4xl font-bold text-primary">{stat.value}{stat.unit}</p>
                    <div className="mt-3 h-2 w-full rounded-full bg-muted">
                      <div 
                        className="h-full rounded-full bg-primary" 
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Yearly Growth */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">年度成長軌跡</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">年度</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">累計學生數</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">合作學校</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">企業夥伴</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyGrowth.map((row) => (
                      <tr key={row.year} className="border-b border-border">
                        <td className="px-4 py-3 font-medium text-foreground">{row.year}</td>
                        <td className="px-4 py-3 text-right text-foreground">{row.students.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-foreground">{row.schools}</td>
                        <td className="px-4 py-3 text-right text-foreground">{row.companies}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">想了解更多學生的真實改變？</h2>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/impact/outcomes">看學生故事</Link>
                </Button>
                <Button variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/impact/reports">下載年報</Link>
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
