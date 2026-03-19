import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Linkedin, Mail } from "lucide-react"

export const metadata = {
  title: "團隊與治理 | 財團法人鄉育教育基金會",
  description: "認識財團法人鄉育教育基金會（CountryEDU Charity Foundation）的團隊成員、董事會、以及顧問群。",
}

const leadership = [
  {
    name: "陳執行長",
    role: "執行長",
    bio: "擁有 15 年教育領域經驗，曾任職於多所大專院校，致力於推動創新教育。",
  },
  {
    name: "林副執行長",
    role: "副執行長暨課程總監",
    bio: "專精於課程設計與教學法，擁有豐富的企業培訓與大學教學經驗。",
  },
]

const team = [
  { name: "王小明", role: "營運經理", department: "營運" },
  { name: "李小華", role: "課程設計師", department: "課程" },
  { name: "張小美", role: "企業合作專員", department: "合作" },
  { name: "陳小龍", role: "學員服務專員", department: "服務" },
  { name: "林小芳", role: "行銷企劃", department: "行銷" },
  { name: "黃小琳", role: "數據分析師", department: "數據" },
]

const board = [
  { name: "王董事長", title: "董事長", affiliation: "某企業集團創辦人" },
  { name: "李董事", title: "董事", affiliation: "某大學教授" },
  { name: "陳董事", title: "董事", affiliation: "某基金會執行長" },
  { name: "林董事", title: "董事", affiliation: "某科技公司總經理" },
]

const advisors = [
  { name: "張顧問", expertise: "教育政策", affiliation: "某大學副校長" },
  { name: "王顧問", expertise: "企業人資", affiliation: "某企業人資長" },
  { name: "李顧問", expertise: "心理諮商", affiliation: "某醫學中心心理師" },
  { name: "陳顧問", expertise: "青年發展", affiliation: "某國際組織台灣代表" },
]

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Link href="/about" className="mb-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                <ArrowRight className="h-4 w-4 rotate-180" />
                返回認識鄉育
              </Link>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                團隊與治理
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                認識推動鄉育前進的幕後力量。我們是一群相信教育能改變未來的夥伴。
              </p>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">領導團隊</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {leadership.map((person) => (
                  <div key={person.name} className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {person.name[0]}
                      </span>
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-foreground">{person.name}</h3>
                    <p className="mb-3 text-sm text-primary">{person.role}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                    <div className="mt-4 flex gap-2">
                      <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground">
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground">
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">核心團隊</h2>
              
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {team.map((person) => (
                  <div key={person.name} className="relative rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-3 top-3 h-1 w-6 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-semibold text-primary">{person.name[0]}</span>
                    </div>
                    <h3 className="font-semibold text-foreground">{person.name}</h3>
                    <p className="text-sm text-muted-foreground">{person.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Board & Advisors */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-12 md:grid-cols-2">
                <div>
                  <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">董事會</h2>
                  <div className="space-y-4">
                    {board.map((person) => (
                      <div key={person.name} className="relative rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/30">
                        <span className="pointer-events-none absolute left-3 top-3 h-1 w-6 rounded-full bg-[#C7FF3A]" aria-hidden />
                        <h3 className="font-semibold text-foreground">{person.name}</h3>
                        <p className="text-sm text-primary">{person.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{person.affiliation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">顧問群</h2>
                  <div className="space-y-4">
                    {advisors.map((person) => (
                      <div key={person.name} className="relative rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/30">
                        <span className="pointer-events-none absolute left-3 top-3 h-1 w-6 rounded-full bg-[#C7FF3A]" aria-hidden />
                        <h3 className="font-semibold text-foreground">{person.name}</h3>
                        <p className="text-sm text-primary">{person.expertise}顧問</p>
                        <p className="mt-1 text-sm text-muted-foreground">{person.affiliation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">加入我們的團隊</h2>
              <p className="mt-3 text-muted-foreground">
                我們正在尋找對教育有熱情、願意一起為青年創造改變的夥伴。
              </p>
              <Button className="mt-6 transition-all hover:ring-2 hover:ring-[#C7FF3A]/40" asChild>
                <Link href="/involve/careers">查看職缺</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
