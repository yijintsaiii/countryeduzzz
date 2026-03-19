import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Target, Lightbulb, Users, ArrowRight } from "lucide-react"

export const metadata = {
  title: "認識鄉育 | 財團法人鄉育教育基金會",
  description: "了解財團法人鄉育教育基金會（CountryEDU Charity Foundation）的故事、使命與願景、教育方法與理念、以及我們的團隊。",
}

const sections = [
  {
    icon: BookOpen,
    title: "我們的故事",
    description: "從一個簡單的願望開始，到今日陪伴超過 2500 位學生探索自我。了解鄉育的成立背景與關鍵轉折。",
    href: "/about/story",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Target,
    title: "使命與願景",
    description: "賦能青年選擇力，讓每一位年輕人都能找到屬於自己的方向，具備在多變環境下的決策能力。",
    href: "/about/mission",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: Lightbulb,
    title: "教育方法與理念",
    description: "結合 SEL 社會情緒學習、數據驅動成長、以及 PBL 專案式學習，打造獨特的鄉育方法論。",
    href: "/about/approach",
    color: "bg-chart-4/20 text-chart-4",
  },
  {
    icon: Users,
    title: "團隊與治理",
    description: "認識我們的團隊成員、董事會、以及顧問群，了解推動鄉育前進的幕後力量。",
    href: "/about/team",
    color: "bg-chart-3/20 text-chart-3",
  },
]

export default function AboutPage() {
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
                關於我們
              </p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                認識財團法人鄉育教育基金會
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                我們相信每一位青年都有找到方向的潛力。鄉育教育基金會致力於透過系統化的課程與支持，
                協助大學生從自我認識走向職涯實踐，讓迷惘轉化為選擇的力量。
              </p>
            </div>
          </div>
        </section>

        {/* Section Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
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
        </section>

        {/* Quick Stats */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 text-center sm:grid-cols-4">
              <div>
                <p className="text-4xl font-bold text-primary">2019</p>
                <p className="mt-2 text-sm text-muted-foreground">成立年份</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">2500+</p>
                <p className="mt-2 text-sm text-muted-foreground">服務學生數</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">45</p>
                <p className="mt-2 text-sm text-muted-foreground">合作學校</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">120+</p>
                <p className="mt-2 text-sm text-muted-foreground">企業夥伴</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">想要深入了解？</h2>
              <p className="mt-3 text-muted-foreground">
                歡迎聯繫我們，或是直接參與我們的課程
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/contact">聯絡我們</Link>
                </Button>
                <Button variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/programs/apply">報名課程</Link>
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
