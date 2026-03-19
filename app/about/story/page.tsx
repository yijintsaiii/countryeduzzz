import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "我們的故事 | 財團法人鄉育教育基金會",
  description: "了解財團法人鄉育教育基金會（CountryEDU Charity Foundation）的成立背景、起心動念、以及關鍵轉折故事。",
}

const timeline = [
  {
    year: "2019",
    title: "播下種子",
    description: "創辦人在大學任教時，發現許多學生對未來感到迷惘，卻缺乏系統化的探索資源。這個觀察成為鄉育誕生的起點。",
  },
  {
    year: "2020",
    title: "第一屆學員",
    description: "在資源有限的情況下，我們迎來了第一批 50 位學員。看到他們在課程中的改變，讓我們更確信這條路是對的。",
  },
  {
    year: "2021",
    title: "企業夥伴加入",
    description: "第一批企業夥伴加入，提供真實專案讓學生實踐。這不僅豐富了課程內容，也讓企業看見年輕人才的潛力。",
  },
  {
    year: "2022",
    title: "課程系統化",
    description: "我們將課程發展為三階段學習旅程，結合 SEL 社會情緒學習與數據驅動成長，打造獨特的鄉育方法論。",
  },
  {
    year: "2023",
    title: "大學合作擴展",
    description: "與多所大學建立正式合作，將課程嵌入校內，讓更多學生能夠接觸到職涯探索資源。",
  },
  {
    year: "2024",
    title: "持續成長",
    description: "累計服務超過 2500 位學生，與 45 所學校、120 家企業建立合作關係。我們的影響力持續擴大。",
  },
]

export default function StoryPage() {
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
                我們的故事
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                每一個改變的開始，都來自一個簡單的願望：讓年輕人不再為未來感到迷惘。
              </p>
            </div>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">起心動念</h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  「老師，我不知道自己喜歡什麼。」「我覺得選錯科系了，但不知道該怎麼辦。」
                  「我快畢業了，但對找工作感到很徬徨。」
                </p>
                <p>
                  這些來自學生的聲音，一直縈繞在創辦人的心中。根據調查，有 59% 的大學生覺得選錯科系，
                  40% 的大四生對找工作感到徬徨。這些數字背後，是無數個在迷霧中摸索的年輕靈魂。
                </p>
                <p>
                  我們開始思考：是否有一種方式，能夠幫助年輕人在進入職場前，
                  先好好認識自己、探索不同的可能性、並具備做出選擇的能力？
                </p>
                <p>
                  這個思考，成為了鄉育教育基金會的起點。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground">我們走過的路</h2>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div
                      key={item.year}
                      className={`relative flex flex-col md:flex-row ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Dot */}
                      <div className="absolute left-4 top-0 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-4 border-background bg-primary md:left-1/2" />
                      
                      {/* Content */}
                      <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                        <p className="mb-2 text-sm font-semibold text-primary">{item.year}</p>
                        <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                      
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Looking Forward */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">展望未來</h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  鄉育的故事還在繼續。我們相信，每一位年輕人都有找到方向的潛力，
                  只是需要適當的引導與支持。
                </p>
                <p>
                  未來，我們將持續優化課程內容、擴大合作網絡、
                  並運用科技讓更多學生能夠接觸到優質的職涯探索資源。
                </p>
                <p>
                  如果你也認同我們的理念，歡迎加入我們，一起為青年的未來創造更多可能。
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                  <Link href="/involve/donate">支持我們</Link>
                </Button>
                <Button variant="outline" asChild className="transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50">
                  <Link href="/about/mission">了解使命與願景</Link>
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
