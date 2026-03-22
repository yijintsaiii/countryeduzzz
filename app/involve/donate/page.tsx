import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Gift, Calendar, Shield, ChevronRight } from "lucide-react"

export const metadata = {
  title: "成為捐款人 | 財團法人鄉育教育基金會",
  description: "您的支持，是青年探索未來的最大動力。立即捐款支持財團法人鄉育教育基金會，為年輕人點亮職涯方向。",
}

const donationTiers = [
  {
    amount: 500,
    title: "種子支持者",
    description: "支持一位學生完成自我探索工作坊",
    impact: "提供 1 位學生 2 小時的探索體驗",
  },
  {
    amount: 1000,
    title: "成長夥伴",
    description: "支持一位學生完成完整的階段課程",
    impact: "陪伴 1 位學生走過 6 週的成長旅程",
    popular: true,
  },
  {
    amount: 800,
    title: "選擇力推手",
    description: "支持一位學生完成整年度的學習計畫",
    impact: "為 1 位學生提供完整的三階段培育",
  },
  {
    amount: 2000,
    title: "未來領航者",
    description: "支持一個班級的職涯探索課程",
    impact: "幫助 30 位學生開啟職涯視野",
  },
]

const donationMethods = [
  {
    icon: Heart,
    title: "單筆捐款",
    description: "一次性的愛心支持，立即為青年帶來改變",
  },
  {
    icon: Calendar,
    title: "定期定額",
    description: "每月穩定的支持，持續陪伴青年成長",
  },
  {
    icon: Gift,
    title: "紀念捐款",
    description: "以特別的方式紀念重要的人或時刻",
  },
]

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                您的支持，是青年最好的禮物
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                每一份捐款都將直接用於支持青年的職涯探索旅程。
                您的愛心，將轉化為年輕人的選擇力。
              </p>
            </div>
          </div>
        </section>

        {/* Donation Tiers */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              選擇您的支持方式
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {donationTiers.map((tier) => (
                <Card 
                  key={tier.amount} 
                  className={`relative transition-all hover:border-[#C7FF3A]/40 ${
                    tier.popular ? "border-primary shadow-md" : ""
                  }`}
                >
                  <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                      最多人選擇
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <div className="mb-2 text-3xl font-bold text-primary">
                      NT$ {tier.amount.toLocaleString()}
                    </div>
                    <CardTitle className="text-lg">{tier.title}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="mb-4 text-sm text-muted-foreground">{tier.impact}</p>
                    <Button
                      className={`w-full transition-all ${tier.popular ? "hover:ring-2 hover:ring-[#C7FF3A]/40" : "hover:border-[#C7FF3A] hover:bg-[#EFFFBE]/50"}`}
                      variant={tier.popular ? "default" : "outline"}
                      asChild
                    >
                      <a
                        href="https://countryedu.oen.tw/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        立即捐款
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              您也可以自訂捐款金額，每一分錢都是對青年的支持
            </p>
          </div>
        </section>

        {/* Donation Methods */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              捐款方式
            </h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {donationMethods.map((method) => (
                <Card key={method.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="relative flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">透明與信任</h3>
                  <p className="mt-2 text-muted-foreground">
                    鄉育教育基金會為政府立案之公益團體，捐款可依法申請抵稅。
                    我們每年公開年度報告與財務報表，確保每一分錢都用在刀口上。
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-primary">
                    查看年報與財務報告 <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                常見問題
              </h2>
              <div className="mt-8 space-y-4 text-left">
                <details className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/30 [&[open]]:border-[#C7FF3A]/40">
                  <summary className="cursor-pointer font-medium text-foreground">
                    捐款可以抵稅嗎？
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    是的，鄉育教育基金會為政府立案之教育公益團體，您的捐款可依所得稅法規定申請列舉扣除。
                  </p>
                </details>
                <details className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/30 [&[open]]:border-[#C7FF3A]/40">
                  <summary className="cursor-pointer font-medium text-foreground">
                    我的捐款會如何被使用？
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    捐款主要用於：課程開發與執行（60%）、學生補助與獎學金（25%）、行政與營運（15%）。詳細資金運用請參閱年度報告。
                  </p>
                </details>
                <details className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-[#C7FF3A]/30 [&[open]]:border-[#C7FF3A]/40">
                  <summary className="cursor-pointer font-medium text-foreground">
                    如何取得捐款收據？
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    完成捐款後，我們將於 7 個工作天內寄送電子收據至您的信箱。如需紙本收據，請於捐款時註明。
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
