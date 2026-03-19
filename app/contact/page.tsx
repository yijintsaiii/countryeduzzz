import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, MessageSquare, Building2, GraduationCap, Heart } from "lucide-react"

export const metadata = {
  title: "聯絡我們 | 財團法人鄉育教育基金會",
  description: "有任何問題或合作提案嗎？歡迎透過電話、信箱或表單與財團法人鄉育教育基金會聯繫。電話：02-2627-1169，地址：114台北市內湖區基湖路1號4樓之一",
}

const contactMethods = [
  {
    icon: Mail,
    title: "電子郵件",
    content: "support@countryedu.org.tw",
    description: "一般諮詢與合作提案",
  },
  {
    icon: Phone,
    title: "聯絡電話",
    content: "02-2627-1169",
    description: "週一至週五 9:00-18:00",
  },
  {
    icon: MapPin,
    title: "辦公室地址",
    content: "114台北市內湖區基湖路1號4樓之一",
    description: "歡迎預約參訪",
  },
]

const inquiryTypes = [
  {
    icon: MessageSquare,
    title: "一般諮詢",
    description: "關於鄉育的任何問題",
    email: "support@countryedu.org.tw",
  },
  {
    icon: Building2,
    title: "企業合作",
    description: "CSR、人才培育、獎學金等",
    email: "support@countryedu.org.tw",
  },
  {
    icon: GraduationCap,
    title: "大學合作",
    description: "課程嵌入、工作坊合作",
    email: "support@countryedu.org.tw",
  },
  {
    icon: Heart,
    title: "捐款相關",
    description: "捐款收據、抵稅問題",
    email: "support@countryedu.org.tw",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                與我們聯繫
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                有任何問題或想法嗎？我們很樂意聽到您的聲音。
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {contactMethods.map((method) => (
                <Card key={method.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription className="text-base font-medium text-foreground">
                      {method.content}
                    </CardDescription>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Inquiry Types */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">發送訊息</h2>
                <p className="mt-2 text-muted-foreground">
                  填寫以下表單，我們會盡快回覆您
                </p>
                <form className="mt-8 space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                        姓名 <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="您的姓名"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                        電子郵件 <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                      聯絡電話
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="0912-345-678"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                      主旨 <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="subject"
                      required
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">請選擇</option>
                      <option value="general">一般諮詢</option>
                      <option value="student">學生報名相關</option>
                      <option value="corporate">企業合作</option>
                      <option value="university">大學合作</option>
                      <option value="donate">捐款相關</option>
                      <option value="media">媒體採訪</option>
                      <option value="other">其他</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      訊息內容 <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="請詳細描述您的問題或需求..."
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <input
                      id="privacy"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-input"
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground">
                      我同意財團法人鄉育教育基金會依據隱私權政策處理我的個人資料
                    </label>
                  </div>
                  <Button type="submit" size="lg" className="w-full transition-all hover:ring-2 hover:ring-[#C7FF3A]/40">
                    送出訊息
                  </Button>
                </form>
              </div>

              {/* Inquiry Types */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">依需求聯繫</h2>
                <p className="mt-2 text-muted-foreground">
                  您也可以直接聯繫對應的窗口
                </p>
                <div className="mt-8 space-y-4">
                  {inquiryTypes.map((type) => (
                    <Card key={type.title}>
                      <CardContent className="flex items-start gap-4 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <type.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{type.title}</h3>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                          <a 
                            href={`mailto:${type.email}`}
                            className="mt-1 inline-block text-sm text-primary hover:underline"
                          >
                            {type.email}
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Office Hours */}
                <Card className="mt-8">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">服務時間</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">週一至週五</span>
                        <span className="text-foreground">09:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">週六</span>
                        <span className="text-foreground">10:00 - 16:00（預約制）</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">週日及國定假日</span>
                        <span className="text-foreground">休息</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">來訪我們</h2>
              <p className="mt-2 text-muted-foreground">
                歡迎預約參訪辦公室，認識我們的團隊
              </p>
              <div className="mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">
                      114台北市內湖區基湖路1號4樓之一
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      捷運港墘站步行約 10 分鐘
                    </p>
                  </div>
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
