import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Briefcase, Heart, Clock, MapPin, ArrowRight } from "lucide-react"

export const metadata = {
  title: "志工與職涯機會 | 財團法人鄉育教育基金會",
  description: "加入財團法人鄉育教育基金會團隊，用你的專業與熱情，陪伴青年走過探索旅程，一起創造改變。",
}

const openPositions = [
  {
    title: "課程設計師",
    type: "全職",
    location: "台北",
    description: "負責設計與開發職涯探索課程，將教育理念轉化為具體的學習體驗。",
    requirements: ["教育或心理相關背景", "3 年以上課程設計經驗", "熟悉 SEL 或生涯發展理論"],
  },
  {
    title: "專案經理",
    type: "全職",
    location: "台北",
    description: "統籌大學合作專案，負責客戶關係維護與專案執行品質管理。",
    requirements: ["3 年以上專案管理經驗", "優秀的溝通協調能力", "對教育領域有熱情"],
  },
  {
    title: "數據分析師",
    type: "全職",
    location: "台北 / 遠端",
    description: "負責學生成長數據的分析與視覺化，協助優化課程設計與影響力評估。",
    requirements: ["統計或資料科學背景", "熟悉 Python/R 與數據視覺化工具", "對教育數據分析有興趣"],
  },
]

const volunteerRoles = [
  {
    icon: Users,
    title: "業師志工",
    commitment: "每學期 4-6 次",
    description: "以自身職涯經驗，一對一指導學生，分享產業洞察與職涯建議。",
  },
  {
    icon: Heart,
    title: "活動志工",
    commitment: "單次或定期",
    description: "協助工作坊、營隊等活動現場執行，陪伴學生參與學習體驗。",
  },
  {
    icon: Briefcase,
    title: "專業顧問",
    commitment: "依專案需求",
    description: "提供特定領域的專業諮詢，協助組織發展與策略規劃。",
  },
]

const benefits = [
  "具競爭力的薪資福利",
  "彈性工作時間與遠端工作選項",
  "完整的教育訓練與專業發展",
  "參與有意義的教育創新工作",
  "與優秀團隊共同成長",
  "豐富的跨界合作機會",
]

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                加入鄉育，創造改變
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                我們正在尋找有熱情、有專業的夥伴，
                一起用教育的力量，幫助青年找到自己的方向。
              </p>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              開放職缺
            </h2>
            <div className="mx-auto max-w-4xl space-y-6">
              {openPositions.map((position) => (
                <Card key={position.title} className="transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{position.title}</CardTitle>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            <Briefcase className="h-3 w-3" />
                            {position.type}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {position.location}
                          </span>
                        </div>
                      </div>
                      <Button asChild className="transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                        <Link href="/contact">應徵此職位</Link>
                      </Button>
                    </div>
                    <CardDescription className="mt-4 text-base">
                      {position.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">基本條件</h4>
                      <ul className="mt-2 space-y-1">
                        {position.requirements.map((req) => (
                          <li key={req} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              沒有找到適合的職缺？歡迎主動投遞履歷，告訴我們你能為鄉育帶來什麼
            </p>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              志工機會
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              即使無法成為全職夥伴，也能用你的時間與專業支持青年成長
            </p>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {volunteerRoles.map((role) => (
                <Card key={role.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <role.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {role.commitment}
                    </div>
                    <CardDescription className="mt-2">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/contact">了解更多</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                為什麼加入鄉育？
              </h2>
              <p className="mt-4 text-muted-foreground">
                我們相信，好的工作環境能激發最好的創意與熱情
              </p>
              <div className="mt-12 grid gap-4 md:grid-cols-2">
                {benefits.map((benefit) => (
                  <div 
                    key={benefit}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                  >
                    <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                準備好加入我們了嗎？
              </h2>
              <p className="mt-4 text-muted-foreground">
                無論是全職工作還是志工參與，我們都期待認識你
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">投遞履歷</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about/team">認識團隊</Link>
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
