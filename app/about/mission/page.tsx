import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target, Eye, Heart, Compass, TrendingUp } from "lucide-react"

export const metadata = {
  title: "使命與願景 | 財團法人鄉育教育基金會",
  description: "了解財團法人鄉育教育基金會（CountryEDU Charity Foundation）的使命、願景、以及三大核心價值。",
}

const values = [
  {
    icon: Compass,
    title: "自我探索",
    description: "我們相信認識自己是一切的起點。透過系統化的工具與引導，幫助每位學生深入了解自己的興趣、優勢與價值觀。",
  },
  {
    icon: TrendingUp,
    title: "持續成長",
    description: "成長是一個持續的過程。我們用數據記錄每一步進步，讓學生看見自己的改變，建立持續成長的動力。",
  },
  {
    icon: Heart,
    title: "全人發展",
    description: "除了專業能力，情緒管理、人際溝通等軟實力同樣重要。我們致力於培養兼具專業與情商的全方位人才。",
  },
]

export default function MissionPage() {
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
                使命與願景
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                我們的存在，是為了讓每一位青年都能找到屬於自己的方向。
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-12 md:grid-cols-2">
                <div className="relative rounded-xl border-2 border-primary bg-primary/5 p-8">
                  <span className="pointer-events-none absolute right-6 top-6 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Target className="h-6 w-6" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">我們的使命</h2>
                  <p className="text-lg leading-relaxed text-foreground">
                    賦能青年選擇力，協助大學生從「自我認識」到「定義賽道」，
                    具備在多變環境下的決策能力。
                  </p>
                </div>

                <div className="relative rounded-xl border-2 border-accent bg-accent/10 p-8">
                  <span className="pointer-events-none absolute right-6 top-6 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">我們的願景</h2>
                  <p className="text-lg leading-relaxed text-foreground">
                    讓每一位台灣青年都能撥開職涯的迷霧，看見自己的專屬藍圖，
                    將迷惘轉化為選擇的力量。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground">三大核心價值</h2>
              
              <div className="grid gap-8 md:grid-cols-3">
                {values.map((value) => (
                  <div key={value.title} className="relative rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-[#C7FF3A]/40">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-foreground">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">為什麼這很重要？</h2>
              
              <div className="space-y-6">
                <div className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <h3 className="mb-2 font-semibold text-foreground">人才危機：探索延後，焦慮加速</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 72% 高中生學習動機低落</li>
                    <li>• 59% 大學生覺得選錯科系</li>
                    <li>• 94% 新鮮人有強烈就業焦慮</li>
                    <li>• 42% 新鮮人 1 年內轉職</li>
                  </ul>
                </div>

                <div className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <h3 className="mb-2 font-semibold text-foreground">理想與現實的夾縫</h3>
                  <p className="text-muted-foreground">
                    年輕世代期待學習的即時回饋與意義感、低風險的實踐場域、以及數據驅動的自我理解。
                    然而，傳統學制與產業變動的速度落差，讓學生在學習過程中難以看見未來的應用錨點。
                  </p>
                </div>

                <div className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  <h3 className="mb-2 font-semibold text-foreground">我們的解方</h3>
                  <p className="text-muted-foreground">
                    鄉育透過系統化的課程設計，結合 SEL 社會情緒學習與數據驅動成長，
                    在大學階段就幫助學生建立自我認識、培養實踐能力、並透過真實專案累積經驗。
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/about/approach">了解教育方法</Link>
                </Button>
                <Button variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/programs/overview">探索課程內容</Link>
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
