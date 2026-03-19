import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, ArrowRight, Tag } from "lucide-react"

export const metadata = {
  title: "最新消息 | 財團法人鄉育教育基金會",
  description: "了解財團法人鄉育教育基金會的最新動態、活動資訊、媒體報導與成果分享。",
}

const categories = [
  { name: "全部", slug: "all" },
  { name: "活動資訊", slug: "events" },
  { name: "媒體報導", slug: "media" },
  { name: "成果分享", slug: "results" },
  { name: "公告", slug: "announcements" },
]

const newsItems = [
  {
    id: 1,
    title: "2026 春季職涯探索營開放報名",
    excerpt: "為期五天的密集營隊，帶領大學生深度探索自我與職涯方向。名額有限，即日起開放報名。",
    date: "2026-03-01",
    category: "活動資訊",
    featured: true,
  },
  {
    id: 2,
    title: "鄉育獲選《遠見》年度教育創新機構",
    excerpt: "鄉育教育基金會以創新的職涯探索方法論，獲選《遠見雜誌》2025 年度教育創新機構。",
    date: "2026-02-15",
    category: "媒體報導",
    featured: true,
  },
  {
    id: 3,
    title: "2025 年度成果報告正式發布",
    excerpt: "回顧 2025 年度的服務成果，包括服務學生人數、成效數據與重要里程碑。",
    date: "2026-02-01",
    category: "成果分享",
    featured: false,
  },
  {
    id: 4,
    title: "與台大社科院簽訂長期合作備忘錄",
    excerpt: "鄉育與國立台灣大學社會科學院正式簽訂為期三年的合作備忘錄，將職涯課程納入正規學分。",
    date: "2026-01-20",
    category: "公告",
    featured: false,
  },
  {
    id: 5,
    title: "企業合作夥伴說明會：3月場次",
    excerpt: "想了解如何與鄉育合作，共同培育未來人才嗎？歡迎參加三月份的企業說明會。",
    date: "2026-01-15",
    category: "活動資訊",
    featured: false,
  },
  {
    id: 6,
    title: "學生故事：從迷惘到清晰的阿凱",
    excerpt: "來自政大企管系的阿凱，分享他參與鄉育後如何找到自己的職涯方向。",
    date: "2026-01-10",
    category: "成果分享",
    featured: false,
  },
]

const featuredNews = newsItems.filter(item => item.featured)
const regularNews = newsItems.filter(item => !item.featured)

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                最新消息
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                掌握鄉育的最新動態、活動資訊與成果分享
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button 
                  key={category.slug}
                  variant={category.slug === "all" ? "default" : "outline"}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured News */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-xl font-semibold text-foreground">焦點消息</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredNews.map((item) => (
                <Card key={item.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-primary/5" />
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <Tag className="h-3 w-3" />
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </span>
                    </div>
                    <CardTitle className="text-xl hover:text-primary">
                      <Link href={`/news/${item.id}`}>{item.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {item.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/news/${item.id}`}>
                        閱讀更多 <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Regular News */}
        <section className="border-t border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-xl font-semibold text-foreground">所有消息</h2>
            <div className="space-y-4">
              {regularNews.map((item) => (
                <Card key={item.id} className="transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          <Tag className="h-3 w-3" />
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground hover:text-primary">
                        <Link href={`/news/${item.id}`}>{item.title}</Link>
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0" asChild>
                      <Link href={`/news/${item.id}`}>
                        閱讀更多 <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline">載入更多</Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                訂閱電子報
              </h2>
              <p className="mt-4 text-muted-foreground">
                定期收到鄉育的最新消息、活動資訊與教育洞察
              </p>
              <div className="mt-6 flex gap-2">
                <input
                  type="email"
                  placeholder="輸入您的 Email"
                  className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button>訂閱</Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                我們尊重您的隱私，不會將您的資料分享給第三方
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
