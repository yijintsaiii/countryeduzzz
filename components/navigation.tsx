"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const aboutLinks = [
  { title: "我們的故事", href: "/about/story", description: "成立背景與起心動念" },
  { title: "使命與願景", href: "/about/mission", description: "核心價值與目標" },
  { title: "教育方法與理念", href: "/about/approach", description: "鄉育方法論" },
  { title: "團隊與治理", href: "/about/team", description: "認識我們的團隊" },
]

const programLinks = [
  { title: "專案一覽", href: "/programs/overview", description: "服務對象與架構" },
  { title: "學習旅程", href: "/programs/journey", description: "三階段成長路徑" },
  { title: "報名與參與", href: "/programs/apply", description: "如何加入我們" },
  { title: "企業合作摘要", href: "/programs/corporate", description: "企業合作模式" },
  { title: "大學合作摘要", href: "/programs/university", description: "學校課程嵌入" },
]

const impactLinks = [
  { title: "關鍵數據總覽", href: "/impact/data", description: "成效指標與數據" },
  { title: "學生的改變", href: "/impact/outcomes", description: "前後測結果" },
  { title: "學校與企業回饋", href: "/impact/partners", description: "合作夥伴見證" },
  { title: "年報與研究", href: "/impact/reports", description: "年報與評估報告" },
]

const involveLinks = [
  { title: "成為捐款人", href: "/involve/donate", description: "支持青年成長" },
  { title: "企業與基金會合作", href: "/involve/corporate", description: "企業夥伴方案" },
  { title: "大學合作", href: "/involve/university", description: "學校導入方式" },
  { title: "志工與職涯機會", href: "/involve/careers", description: "加入我們的團隊" },
]

const audienceLinks = [
  { title: "大學生專區", href: "/for/students", description: "開啟你的職涯探索" },
  { title: "企業專區", href: "/for/companies", description: "找到理想人才" },
  { title: "捐款者專區", href: "/for/donors", description: "支持青年選擇力" },
  { title: "大學合作專區", href: "/for/universities", description: "課程合作方案" },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [desktopMenuValue, setDesktopMenuValue] = useState<string>("")

  const { scrollY } = useScroll()
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 252, 248, 0)", "rgba(255, 252, 248, 0.97)"]
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex min-h-16 items-center justify-between px-4 py-2 lg:min-h-[4.25rem] lg:py-2.5">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={cn(
              "rounded-lg transition-[box-shadow,background-color]",
              !isScrolled &&
                "bg-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_28px_-12px_rgba(0,0,0,0.35)] backdrop-blur-[2px]"
            )}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Countryedu_LOGO%202023-04-NbVDmnNBZinzzwjQLnJ9pTJuSDPU3O.png"
              alt="財團法人鄉育教育基金會"
              width={180}
              height={45}
              className="h-auto w-[140px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] lg:w-[180px]"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu
          className="hidden lg:flex"
          delayDuration={0}
          skipDelayDuration={0}
          value={desktopMenuValue}
          onValueChange={setDesktopMenuValue}
        >
          <NavigationMenuList className="gap-1.5">
            <NavigationMenuItem value="about">
              <NavigationMenuTrigger className={cn(
                "h-11 min-h-11 bg-transparent px-5 text-base font-medium transition-colors relative after:absolute after:left-1/2 after:bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[#C7FF3A] after:transition-all data-[state=open]:after:w-7",
                isScrolled ? "text-foreground" : "text-white/90 hover:text-white hover:bg-white/10"
              )} onPointerEnter={() => setDesktopMenuValue("about")}>
                認識鄉育
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] gap-3 rounded-xl border border-emerald-900/10 bg-white/95 p-4 shadow-[0_16px_38px_-24px_rgba(5,46,22,0.45)] md:w-[520px] md:grid-cols-2">
                  {aboutLinks.map((link) => (
                    <ListItem key={link.href} href={link.href} title={link.title}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem value="programs">
              <NavigationMenuTrigger className={cn(
                "h-11 min-h-11 bg-transparent px-5 text-base font-medium transition-colors relative after:absolute after:left-1/2 after:bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[#C7FF3A] after:transition-all data-[state=open]:after:w-7",
                isScrolled ? "text-foreground" : "text-white/90 hover:text-white hover:bg-white/10"
              )} onPointerEnter={() => setDesktopMenuValue("programs")}>
                大學專案
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] gap-3 rounded-xl border border-emerald-900/10 bg-white/95 p-4 shadow-[0_16px_38px_-24px_rgba(5,46,22,0.45)] md:w-[520px] md:grid-cols-2">
                  {programLinks.map((link) => (
                    <ListItem key={link.href} href={link.href} title={link.title}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem value="impact">
              <NavigationMenuTrigger className={cn(
                "h-11 min-h-11 bg-transparent px-5 text-base font-medium transition-colors relative after:absolute after:left-1/2 after:bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[#C7FF3A] after:transition-all data-[state=open]:after:w-7",
                isScrolled ? "text-foreground" : "text-white/90 hover:text-white hover:bg-white/10"
              )} onPointerEnter={() => setDesktopMenuValue("impact")}>
                影響力
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] gap-3 rounded-xl border border-emerald-900/10 bg-white/95 p-4 shadow-[0_16px_38px_-24px_rgba(5,46,22,0.45)] md:w-[520px] md:grid-cols-2">
                  {impactLinks.map((link) => (
                    <ListItem key={link.href} href={link.href} title={link.title}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem value="involve">
              <NavigationMenuTrigger className={cn(
                "h-11 min-h-11 bg-transparent px-5 text-base font-medium transition-colors relative after:absolute after:left-1/2 after:bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[#C7FF3A] after:transition-all data-[state=open]:after:w-7",
                isScrolled ? "text-foreground" : "text-white/90 hover:text-white hover:bg-white/10"
              )} onPointerEnter={() => setDesktopMenuValue("involve")}>
                參與我們
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] gap-3 rounded-xl border border-emerald-900/10 bg-white/95 p-4 shadow-[0_16px_38px_-24px_rgba(5,46,22,0.45)] md:w-[520px] md:grid-cols-2">
                  {involveLinks.map((link) => (
                    <ListItem key={link.href} href={link.href} title={link.title}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem value="audience">
              <NavigationMenuTrigger className={cn(
                "h-11 min-h-11 bg-transparent px-5 text-base font-medium transition-colors relative after:absolute after:left-1/2 after:bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[#C7FF3A] after:transition-all data-[state=open]:after:w-7",
                isScrolled ? "text-foreground" : "text-white/90 hover:text-white hover:bg-white/10"
              )} onPointerEnter={() => setDesktopMenuValue("audience")}>
                依身分瀏覽
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] gap-3 rounded-xl border border-emerald-900/10 bg-white/95 p-4 shadow-[0_16px_38px_-24px_rgba(5,46,22,0.45)] md:w-[520px] md:grid-cols-2">
                  {audienceLinks.map((link) => (
                    <ListItem key={link.href} href={link.href} title={link.title}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link 
                  href="/news" 
                  className={cn(
                    "group inline-flex h-11 min-h-11 w-max items-center justify-center rounded-md bg-transparent px-5 !text-base font-medium leading-none transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:shadow-[0_0_0_1px_rgba(199,255,58,0.45)_inset]",
                    isScrolled 
                      ? "text-foreground hover:bg-accent hover:text-accent-foreground" 
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  最新消息
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <Button 
            variant="ghost" 
            className={cn(
              "h-11 min-h-11 px-5 text-base font-medium transition-colors",
              isScrolled ? "" : "text-white/90 hover:text-white hover:bg-white/10"
            )}
            asChild
          >
            <Link href="/contact">聯絡我們</Link>
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button 
              className={cn(
                "h-11 min-h-11 px-6 text-base font-medium transition-all",
                isScrolled 
                  ? "" 
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"
              )}
              asChild
            >
              <Link href="/involve/donate">立即支持</Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                isScrolled ? "" : "text-white hover:bg-white/10"
              )}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">開啟選單</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetTitle className="sr-only">導航選單</SheetTitle>
            <div className="flex flex-col gap-4 px-6 py-4">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Countryedu_LOGO%202023-04-NbVDmnNBZinzzwjQLnJ9pTJuSDPU3O.png"
                  alt="財團法人鄉育教育基金會"
                  width={160}
                  height={40}
                  className="h-auto w-[160px]"
                />
              </Link>

              <nav className="flex flex-col gap-2 rounded-xl border border-emerald-900/10 bg-white/80 p-3 pt-4">
                <MobileSubmenu 
                  title="認識鄉育" 
                  links={aboutLinks} 
                  isOpen={openSubmenu === 'about'}
                  onToggle={() => setOpenSubmenu(openSubmenu === 'about' ? null : 'about')}
                  onLinkClick={() => setMobileOpen(false)}
                />
                <MobileSubmenu 
                  title="大學專案" 
                  links={programLinks}
                  isOpen={openSubmenu === 'programs'}
                  onToggle={() => setOpenSubmenu(openSubmenu === 'programs' ? null : 'programs')}
                  onLinkClick={() => setMobileOpen(false)}
                />
                <MobileSubmenu 
                  title="影響力" 
                  links={impactLinks}
                  isOpen={openSubmenu === 'impact'}
                  onToggle={() => setOpenSubmenu(openSubmenu === 'impact' ? null : 'impact')}
                  onLinkClick={() => setMobileOpen(false)}
                />
                <MobileSubmenu 
                  title="參與我們" 
                  links={involveLinks}
                  isOpen={openSubmenu === 'involve'}
                  onToggle={() => setOpenSubmenu(openSubmenu === 'involve' ? null : 'involve')}
                  onLinkClick={() => setMobileOpen(false)}
                />
                <MobileSubmenu 
                  title="依身分瀏覽" 
                  links={audienceLinks}
                  isOpen={openSubmenu === 'audience'}
                  onToggle={() => setOpenSubmenu(openSubmenu === 'audience' ? null : 'audience')}
                  onLinkClick={() => setMobileOpen(false)}
                />
                <Link 
                  href="/news" 
                  className="rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-[#EFFFBE]/45 hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  最新消息
                </Link>
                <Link 
                  href="/contact" 
                  className="rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-[#EFFFBE]/45 hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  聯絡我們
                </Link>
              </nav>

              <Button className="mt-4 border border-[#C7FF3A]/55 bg-emerald-900 text-white shadow-[0_0_0_2px_rgba(199,255,58,0.2)] hover:bg-emerald-950" asChild>
                <Link href="/involve/donate" onClick={() => setMobileOpen(false)}>立即支持</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}

function ListItem({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { href: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "group relative block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground before:absolute before:left-1 before:top-1/2 before:h-0 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-[#C7FF3A] before:transition-all hover:before:h-7",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

function MobileSubmenu({ 
  title, 
  links, 
  isOpen, 
  onToggle,
  onLinkClick 
}: { 
  title: string
  links: { title: string; href: string; description: string }[]
  isOpen: boolean
  onToggle: () => void
  onLinkClick: () => void
}) {
  return (
    <div>
      <button 
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-[#EFFFBE]/35 hover:text-primary"
      >
        {title}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="ml-4 flex flex-col gap-2 border-l border-[#C7FF3A]/45 pl-4 pb-2">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="rounded-sm px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-[#EFFFBE]/30 hover:text-primary"
              onClick={onLinkClick}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
