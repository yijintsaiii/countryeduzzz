"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Youtube, Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const footerLinks = {
  about: [
    { title: "我們的故事", href: "/about/story" },
    { title: "使命與願景", href: "/about/mission" },
    { title: "教育方法與理念", href: "/about/approach" },
    { title: "團隊與治理", href: "/about/team" },
  ],
  programs: [
    { title: "專案一覽", href: "/programs/overview" },
    { title: "學習旅程", href: "/programs/journey" },
    { title: "報名與參與", href: "/programs/apply" },
  ],
  involve: [
    { title: "成為捐款人", href: "/involve/donate" },
    { title: "企業合作", href: "/involve/corporate" },
    { title: "大學合作", href: "/involve/university" },
    { title: "加入團隊", href: "/involve/careers" },
  ],
  resources: [
    { title: "最新消息", href: "/news" },
    { title: "媒體報導", href: "/news/press" },
    { title: "聯絡我們", href: "/contact" },
  ],
}

const socialLinks = [
  { 
    icon: Facebook, 
    href: "https://www.facebook.com/profile.php?id=100083306854169", 
    label: "Facebook",
    hoverColor: "hover:bg-[#1877F2] hover:text-white"
  },
  { 
    icon: Youtube, 
    href: "https://www.youtube.com/@user-bd3nm5vn7i", 
    label: "YouTube",
    hoverColor: "hover:bg-[#FF0000] hover:text-white"
  },
  { 
    icon: MessageCircle, 
    href: "https://liff.line.me/1645278921-kWRPP32q/?accountId=537kaevk", 
    label: "LINE",
    hoverColor: "hover:bg-[#06C755] hover:text-white"
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Decorative top border - organic curved line */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-brown opacity-60" />
      
      {/* Main Footer Content */}
      <div className="border-t border-border/50 bg-gradient-to-b from-brand-cream to-background">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            
            {/* Brand & Contact - Takes 5 columns */}
            <div className="lg:col-span-5">
              {/* Logo */}
              <Link href="/" className="inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Countryedu_LOGO%202023-04-NbVDmnNBZinzzwjQLnJ9pTJuSDPU3O.png"
                  alt="財團法人鄉育教育基金會 CountryEDU Charity Foundation"
                  width={280}
                  height={70}
                  className="h-auto w-[240px] lg:w-[280px]"
                  priority
                />
              </Link>
              
              {/* Mission Statement */}
              <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
                撥開職涯的迷霧，看見你的專屬藍圖，讓迷惘轉化為選擇的力量。
              </p>
              
              {/* Contact Info */}
              <div className="mt-8 space-y-4">
                <a 
                  href="mailto:support@countryedu.org.tw"
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <span>support@countryedu.org.tw</span>
                </a>
                <a 
                  href="tel:02-2627-1169"
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <span>02-2627-1169</span>
                </a>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <span>114台北市內湖區基湖路1號4樓之一</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-8">
                <p className="mb-3 text-sm font-medium text-foreground">關注我們</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all ${social.hoverColor}`}
                      aria-label={social.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links - Takes 7 columns */}
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-4 lg:pl-8">
              <div>
                <h3 className="mb-4 text-sm font-semibold text-foreground">認識鄉育</h3>
                <ul className="space-y-3">
                  {footerLinks.about.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-muted-foreground transition-colors hover:text-brand-green"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-foreground">大學專案</h3>
                <ul className="space-y-3">
                  {footerLinks.programs.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-muted-foreground transition-colors hover:text-brand-green"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-foreground">參與我們</h3>
                <ul className="space-y-3">
                  {footerLinks.involve.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-muted-foreground transition-colors hover:text-brand-green"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-foreground">最新資訊</h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-muted-foreground transition-colors hover:text-brand-green"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm md:flex md:items-center md:justify-between md:p-8">
            <div>
              <h3 className="text-base font-semibold text-foreground">訂閱鄉育電子報</h3>
              <p className="mt-1 text-sm text-muted-foreground">接收最新活動資訊與青年成長故事</p>
            </div>
            <div className="mt-4 flex gap-3 md:mt-0">
              <input
                type="email"
                placeholder="輸入電子郵件"
                className="h-10 flex-1 rounded-lg border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green md:w-64"
              />
              <Button className="bg-brand-green hover:bg-brand-green-dark">訂閱</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 bg-brand-cream/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright & Registration */}
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} 財團法人鄉育教育基金會 CountryEDU Charity Foundation
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                立案字號 臺教社（三）字第1100106099號
              </p>
            </div>
            
            {/* Legal Links */}
            <div className="flex gap-6">
              <Link 
                href="/privacy" 
                className="text-sm text-muted-foreground transition-colors hover:text-brand-green"
              >
                隱私權政策
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-muted-foreground transition-colors hover:text-brand-green"
              >
                使用條款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
