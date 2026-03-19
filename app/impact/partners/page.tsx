import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, School, Building2, Quote } from "lucide-react"

export const metadata = {
  title: "學校與企業回饋 | 財團法人鄉育教育基金會",
  description: "聽聽合作學校與企業對財團法人鄉育教育基金會的回饋與推薦。",
}

const schoolTestimonials = [
  {
    quote: "將鄉育的課程導入系上後，學生的學習動機明顯提升。他們開始主動思考未來，而不是被動等待畢業。",
    name: "王教授",
    role: "某國立大學系主任",
    institution: "北部知名大學",
  },
  {
    quote: "鄉育的課程設計非常紮實，結合理論與實作。學生在課後的就業表現也有明顯提升。",
    name: "李副教授",
    role: "職涯發展中心主任",
    institution: "中部知名大學",
  },
  {
    quote: "我們系上的學生常常不知道畢業後要做什麼，鄉育的課程正好補足了這個缺口。",
    name: "陳老師",
    role: "通識教育中心講師",
    institution: "南部私立大學",
  },
]

const companyTestimonials = [
  {
    quote: "鄉育的學生展現出的主動性和解決問題的能力，遠超過一般大學生。他們在專案中提出的創新方案，讓我們團隊都印象深刻。",
    name: "陳經理",
    role: "人力資源主管",
    company: "某科技公司",
  },
  {
    quote: "透過企業專案的合作，我們提前接觸到有潛力的人才。其中幾位學員畢業後已經加入我們公司。",
    name: "林總監",
    role: "產品開發總監",
    company: "某新創公司",
  },
  {
    quote: "與鄉育合作讓我們看見年輕人不一樣的面向。他們的創意和熱情，為公司注入新的活力。",
    name: "張副總",
    role: "營運副總經理",
    company: "某傳統產業",
  },
  {
    quote: "我們很欣賞鄉育培養出來的學生具備的軟實力，特別是溝通能力和團隊合作精神。",
    name: "黃經理",
    role: "人才發展經理",
    company: "某金融機構",
  },
]

export default function ImpactPartnersPage() {
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
                學校與企業回饋
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                聽聽我們的合作夥伴怎麼說。
              </p>
            </div>
          </div>
        </section>

        {/* School Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 flex items-center gap-3">
                <School className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">學校夥伴的聲音</h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-3">
                {schoolTestimonials.map((item, index) => (
                  <div key={index} className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <Quote className="mb-4 h-8 w-8 text-primary/30" />
                    <blockquote className="mb-6 text-foreground leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                      <p className="text-sm text-primary">{item.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Testimonials */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 flex items-center gap-3">
                <Building2 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">企業夥伴的聲音</h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {companyTestimonials.map((item, index) => (
                  <div key={index} className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <Quote className="mb-4 h-8 w-8 text-accent/30" />
                    <blockquote className="mb-6 text-foreground leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                      <p className="text-sm text-accent-foreground">{item.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">想成為我們的夥伴？</h2>
              <p className="mt-3 text-muted-foreground">
                無論是學校或企業，我們都歡迎您加入鄉育的行列
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/involve/corporate">企業合作</Link>
                </Button>
                <Button variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/involve/university">大學合作</Link>
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
