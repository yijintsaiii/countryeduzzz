import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Download, Calendar, BookOpen } from "lucide-react"

export const metadata = {
  title: "年報與研究 | 財團法人鄉育教育基金會",
  description: "下載財團法人鄉育教育基金會的年報、評估報告、以及相關研究摘要。",
}

const annualReports = [
  { year: "2024", title: "2024 年度報告", pages: 48, fileSize: "5.2 MB" },
  { year: "2023", title: "2023 年度報告", pages: 42, fileSize: "4.8 MB" },
  { year: "2022", title: "2022 年度報告", pages: 36, fileSize: "4.2 MB" },
  { year: "2021", title: "2021 年度報告", pages: 28, fileSize: "3.5 MB" },
]

const researchPapers = [
  {
    title: "大學生職涯探索課程成效評估報告",
    year: "2024",
    description: "針對 2023-2024 年度課程的成效進行系統化評估，包含前後測數據分析與質性訪談結果。",
    type: "評估報告",
  },
  {
    title: "SEL 社會情緒學習在職涯教育的應用",
    year: "2023",
    description: "探討社會情緒學習如何整合進職涯探索課程，以及對學生的影響。",
    type: "研究摘要",
  },
  {
    title: "數據驅動的職涯發展追蹤系統",
    year: "2023",
    description: "介紹鄉育如何運用數據記錄學生的能力成長過程。",
    type: "方法論說明",
  },
]

export default function ImpactReportsPage() {
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
                年報與研究
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                下載我們的年度報告與研究成果，深入了解鄉育的工作與成效。
              </p>
            </div>
          </div>
        </section>

        {/* Annual Reports */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">年度報告</h2>
              </div>
              
              <div className="space-y-4">
                {annualReports.map((report) => (
                  <div key={report.year} className="relative flex items-center justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-6 top-6 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.pages} 頁 · {report.fileSize}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      下載 PDF
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Research Papers */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">評估報告與研究</h2>
              </div>
              
              <div className="space-y-4">
                {researchPapers.map((paper) => (
                  <div key={paper.title} className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#C7FF3A]/30">
                    <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-10 rounded-full bg-[#C7FF3A]" aria-hidden />
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {paper.type}
                      </span>
                      <span className="text-sm text-muted-foreground">{paper.year}</span>
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{paper.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{paper.description}</p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      下載
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Request Access */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">需要更多資料？</h2>
              <p className="mt-3 text-muted-foreground">
                如果您需要特定的數據或研究資料，歡迎與我們聯繫
              </p>
              <Button className="mt-6 transition-all hover:ring-2 hover:ring-[#C7FF3A]/40" asChild>
                <Link href="/contact">聯絡我們</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
