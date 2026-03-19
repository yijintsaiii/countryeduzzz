import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Building2, GraduationCap, Users } from "lucide-react"

export const metadata = {
  title: "參與我們 | 財團法人鄉育教育基金會",
  description: "加入財團法人鄉育教育基金會，用你的力量支持青年成長。成為捐款人、企業合作夥伴、大學合作夥伴，或加入我們的團隊。",
}

const involveOptions = [
  {
    icon: Heart,
    title: "成為捐款人",
    description: "您的每一份支持，都是青年探索未來的燃料。無論金額大小，都能為一位年輕人點亮方向。",
    href: "/involve/donate",
    cta: "立即捐款",
    highlight: true,
  },
  {
    icon: Building2,
    title: "企業與基金會合作",
    description: "透過 CSR 專案、人才培育計畫或專題合作，讓企業資源直接支持青年成長，同時發掘潛力人才。",
    href: "/involve/corporate",
    cta: "了解合作方案",
    highlight: false,
  },
  {
    icon: GraduationCap,
    title: "大學合作",
    description: "將鄉育課程嵌入正規學分、社團活動或生涯輔導，為學生提供系統化的職涯探索體驗。",
    href: "/involve/university",
    cta: "洽談合作",
    highlight: false,
  },
  {
    icon: Users,
    title: "志工與職涯機會",
    description: "成為鄉育的一份子，用你的專業與熱情，陪伴青年走過探索旅程，一起創造改變。",
    href: "/involve/careers",
    cta: "查看機會",
    highlight: false,
  },
]

export default function InvolvePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[#F3FFD2]/80 px-4 py-2 text-sm font-medium text-primary">
                <span className="h-2 w-2 rounded-full bg-[#C7FF3A]" aria-hidden />
                參與我們
              </p>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                一起成為青年的選擇力後盾
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                改變從參與開始。無論您是個人、企業還是學校，
                都能以獨特的方式支持青年找到自己的方向。
              </p>
            </div>
          </div>
        </section>

        {/* Options Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2">
              {involveOptions.map((option) => (
                <Card 
                  key={option.title} 
                  className={`relative overflow-hidden transition-all hover:border-[#C7FF3A]/40 ${
                    option.highlight ? "border-primary/50 bg-primary/5" : ""
                  }`}
                >
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  {option.highlight && (
                    <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      最直接的支持
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription className="text-base">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant={option.highlight ? "default" : "outline"} className={option.highlight ? "transition-all hover:ring-2 hover:ring-[#C7FF3A]/40" : "transition-colors hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50"}>
                      <Link href={option.href}>{option.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Involve */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                為什麼選擇支持鄉育？
              </h2>
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-2xl font-bold text-primary">92%</span>
                  </div>
                  <h3 className="font-semibold text-foreground">學生成長顯著</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    參與學生的自我認識與職涯準備度顯著提升
                  </p>
                </div>
                <div>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-2xl font-bold text-primary">100%</span>
                  </div>
                  <h3 className="font-semibold text-foreground">捐款透明</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    每筆資金流向清楚公開，年度報告完整揭露
                  </p>
                </div>
                <div>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-2xl font-bold text-primary">5000+</span>
                  </div>
                  <h3 className="font-semibold text-foreground">累計服務學生</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    持續擴大影響力，觸及更多需要的青年
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
