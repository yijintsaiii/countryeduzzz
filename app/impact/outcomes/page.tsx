import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Quote } from "lucide-react"

export const metadata = {
  title: "學生的改變 | 財團法人鄉育教育基金會",
  description: "了解財團法人鄉育教育基金會學員的真實改變：前後測結果、能力成長、以及學員故事。",
}

const abilityChanges = [
  { ability: "自我認識", before: 45, after: 78, description: "對自己的興趣、優勢有更清晰的認識" },
  { ability: "職涯方向感", before: 38, after: 72, description: "對未來職涯有較明確的方向" },
  { ability: "問題解決能力", before: 52, after: 81, description: "能有系統地分析與解決問題" },
  { ability: "溝通表達", before: 48, after: 76, description: "能清楚表達自己的想法" },
  { ability: "團隊協作", before: 55, after: 85, description: "能有效地與團隊成員合作" },
  { ability: "抗壓性", before: 42, after: 68, description: "面對壓力時的調適能力" },
]

const studentStories = [
  {
    name: "林同學",
    school: "台灣大學資管系",
    year: "2024 屆學員",
    quote: "在鄉育的課程中，我第一次認真思考「我是誰」這個問題。透過系統化的探索，我發現自己真正熱愛的是設計結合數據分析，這讓我找到了職涯的方向。",
    change: "從迷惘到確定方向",
    outcome: "目前在知名科技公司擔任產品設計師",
  },
  {
    name: "張同學",
    school: "政治大學企管系",
    year: "2023 屆學員",
    quote: "課程結束後，我不再害怕做選擇。因為我知道每一個選擇都是了解自己的過程，而不是對或錯的二分法。",
    change: "從猶豫不決到果斷行動",
    outcome: "成功轉換跑道，現為行銷顧問",
  },
  {
    name: "王同學",
    school: "成功大學工程系",
    year: "2024 屆學員",
    quote: "我本來以為工程師就是我的唯一出路，但在企業專案中，我發現自己對專案管理更有熱情。感謝鄉育讓我看見更多可能。",
    change: "從單一視野到多元探索",
    outcome: "進入科技新創擔任專案經理",
  },
  {
    name: "陳同學",
    school: "中山大學社會系",
    year: "2023 屆學員",
    quote: "社會科系的學生常被問『畢業要做什麼？』，這個問題曾讓我很焦慮。但鄉育幫助我把焦慮轉化為行動，找到結合專業的職涯路徑。",
    change: "從焦慮到自信",
    outcome: "現為社會企業的營運專員",
  },
]

export default function ImpactOutcomesPage() {
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
                學生的改變
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                每一位學員的成長，都是我們最大的成就。
              </p>
            </div>
          </div>
        </section>

        {/* Ability Changes */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">能力前後測結果</h2>
              </div>
              <p className="mb-8 text-muted-foreground">
                基於學員自評與客觀評量，呈現課程前後的能力變化
              </p>
              
              <div className="space-y-6">
                {abilityChanges.map((item) => (
                  <div key={item.ability} className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{item.ability}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary">+{item.after - item.before}%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <span className="w-12 text-sm text-muted-foreground">課前</span>
                        <div className="flex-1 h-3 rounded-full bg-muted">
                          <div 
                            className="h-full rounded-full bg-muted-foreground/50" 
                            style={{ width: `${item.before}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-sm text-muted-foreground">{item.before}%</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="w-12 text-sm text-muted-foreground">課後</span>
                        <div className="flex-1 h-3 rounded-full bg-muted">
                          <div 
                            className="h-full rounded-full bg-primary" 
                            style={{ width: `${item.after}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-sm font-medium text-primary">{item.after}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Student Stories */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground">學員故事</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {studentStories.map((story) => (
                  <div key={story.name} className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <Quote className="mb-4 h-8 w-8 text-primary/30" />
                    <blockquote className="mb-6 text-foreground leading-relaxed">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>
                    <div className="mb-4 border-t border-border pt-4">
                      <p className="font-semibold text-foreground">{story.name}</p>
                      <p className="text-sm text-muted-foreground">{story.school}</p>
                      <p className="text-sm text-primary">{story.year}</p>
                    </div>
                    <div className="space-y-2 rounded-lg bg-muted p-3">
                      <p className="text-sm"><span className="font-medium text-foreground">改變：</span><span className="text-muted-foreground">{story.change}</span></p>
                      <p className="text-sm"><span className="font-medium text-foreground">現況：</span><span className="text-muted-foreground">{story.outcome}</span></p>
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
              <h2 className="text-2xl font-bold tracking-tight text-foreground">想成為下一個改變的故事？</h2>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/programs/apply">立即報名</Link>
                </Button>
                <Button variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/impact/partners">看夥伴回饋</Link>
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
