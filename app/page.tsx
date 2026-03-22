import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { JourneyPath } from "@/components/home/journey-path"
import { ImpactStats } from "@/components/home/impact-stats"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { AudienceCards } from "@/components/home/audience-cards"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* 品牌核心主張 */}
        <HeroSection />
        
        {/* 方法與旅程說明 */}
        <JourneyPath />
        
        {/* 影響力與社會證明 */}
        <ImpactStats />
        <TestimonialsSection />
        
        {/* 用戶分流與行動呼籲 */}
        <AudienceCards />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
