/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Zap, 
  Palette, 
  TrendingUp, 
  Code2, 
  Rocket,
  CheckCircle2,
  ArrowRight,
  Github,
  Twitter,
  Mail,
  ChevronRight,
  Star,
  Quote,
  MessageCircle,
  Send,
  Menu,
  X
} from "lucide-react";
import DevAI from "./components/DevAI";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

export default function App() {
  const [view, setView] = useState<'home' | 'terms' | 'privacy'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isSelectable = target.closest('a, button, input, [role="button"], label');
      setIsHovering(!!isSelectable);
    };

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Portfolio" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-bg-dark overflow-x-hidden selection:bg-brand-primary selection:text-black">
      <div className="noise-bg" />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-[2px] bg-brand-primary z-[100] origin-left"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Custom Cursor */}
      <div className="hidden md:block">
        <div 
          className={`custom-cursor ${isHovering ? 'cursor-hover' : ''}`}
          style={{ left: cursorPos.x, top: cursorPos.y }}
        />
        <div 
          className="custom-cursor-dot"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 glass">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 md:h-24 flex items-center justify-between">
          <div 
             className="flex items-center gap-3 md:gap-4 cursor-pointer"
             onClick={() => { setView('home'); setIsMobileMenuOpen(false); window.scrollTo(0, 0); }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 relative flex-shrink-0">
              <img 
                src="https://uploads.onecompiler.io/44nbcwkvw/44nbczu85/WhatsApp%20Image%202026-05-05%20at%2000.11.14%20(2).jpeg" 
                alt="NIGHT MEDIA TECH" 
                className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-bold tracking-tighter text-lg md:text-xl uppercase font-mono truncate">NIGHT MEDIA TECH</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-white/50">
            {view === 'home' ? navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-brand-primary transition-colors">{link.label}</a>
            )) : (
              <button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="hover:text-brand-primary transition-colors">Home</button>
            )}
            <a href="https://wa.link/zpvja5" target="_blank" rel="noopener noreferrer" className="text-white border-b border-brand-primary pb-1">Hire Us</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-black/95 border-b border-white/10 md:hidden py-8 px-6 flex flex-col gap-6 backdrop-blur-xl"
            >
              {view === 'home' ? (
                navLinks.map((link) => (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    className="text-lg font-bold uppercase tracking-[0.2em] text-white/70 hover:text-brand-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))
              ) : (
                <button 
                  onClick={() => { setView('home'); setIsMobileMenuOpen(false); window.scrollTo(0, 0); }}
                  className="text-lg font-bold uppercase tracking-[0.2em] text-white/70 hover:text-brand-primary transition-colors text-left"
                >
                  Home
                </button>
              )}
              <a 
                href="https://wa.link/zpvja5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg font-bold uppercase tracking-[0.2em] text-brand-primary py-2 border-t border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hire Us
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-64 lg:pb-32 px-6 md:px-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-1.5 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm border border-brand-primary/20">
                Shopify Expert Agency
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-light tracking-tighter mb-10 leading-[1] md:leading-[0.85] uppercase"
            >
              Building <span className="italic font-serif text-brand-primary lowercase">High-Performing</span> <br className="hidden md:block" /> Shopify Stores.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-white/50 text-base md:text-lg lg:text-xl leading-relaxed mb-12"
            >
              We architect, develop, and scale Shopify stores that turn passive visitors into loyal customers. Over 6 years of technical excellence for global brands.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6 mb-24 w-full sm:w-auto"
            >
              <a 
                href="#projects" 
                className="w-full sm:w-auto px-12 py-6 bg-brand-primary text-black font-bold uppercase text-[10px] tracking-[0.3em] overflow-hidden relative group transition-all"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Explore Our Portfolio</span>
              </a>
              <a 
                href="https://wa.link/zpvja5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto px-12 py-6 border border-white/20 text-white font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white/5 transition-all text-center"
              >
                Inquire Project
              </a>
            </motion.div>
          </div>

          {/* Hero Bottom removed for cleaner look, handled in About/Services */}
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 md:px-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <motion.div {...fadeIn}>
                  <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Our Story</span>
                  <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase mb-8 leading-tight">About <span className="italic font-serif">Night Media Tech</span></h2>
                  <div className="space-y-6 text-white/60 text-lg leading-relaxed max-w-2xl">
                    <p>
                      NIGHT MEDIA TECH is a results-driven Shopify development agency led by <span className="text-white font-medium">Awwal Developer</span>, a Shopify Expert and Managing Director with over 6 years of hands-on experience.
                    </p>
                    <p>
                      We specialize in building high-performing Shopify stores that are not only visually clean but engineered to convert. Every project is focused on speed, user experience, and real business growth.
                    </p>
                    <p>
                      From startups to scaling brands, we help businesses create powerful eCommerce experiences that stand out and sell.
                    </p>
                  </div>
                </motion.div>
              </div>
              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 bg-bg-card border border-white/5 rounded-sm group hover:border-brand-primary/30 transition-colors"
                  >
                    <div className="text-5xl md:text-7xl font-light mb-4">6+</div>
                    <div className="text-[12px] text-white/30 uppercase tracking-[0.3em] font-bold">Years of Technical Mastery</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="p-8 md:p-12 bg-bg-card border border-white/5 rounded-sm group hover:border-brand-primary/30 transition-colors"
                  >
                    <div className="text-5xl md:text-7xl font-light text-brand-primary mb-4">+40%</div>
                    <div className="text-[12px] text-white/30 uppercase tracking-[0.3em] font-bold">Average Conversion Lift</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 md:px-10 border-t border-white/10 bg-[#080808]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Our Expertise</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase">What We <span className="italic font-serif">Do</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Shopify Store Development",
                  desc: "We architect and develop high-performance Shopify stores from the ground up—built for scalability, speed, and a seamless, conversion-focused user experience."
                },
                {
                  title: "Shopify Store Design",
                  desc: "We craft refined, visually compelling Shopify interfaces that embody your brand identity while enhancing credibility and customer trust."
                },
                {
                  title: "Conversion Optimization",
                  desc: "We implement data-driven optimization strategies designed to elevate user engagement and maximize conversion rates across your store."
                },
                {
                  title: "Custom Theme Development",
                  desc: "We engineer bespoke Shopify themes with clean, efficient code—delivering flexibility, performance, and a truly distinctive digital experience."
                },
                {
                  title: "Speed Optimization",
                  desc: "We fine-tune your store’s performance to achieve faster load times, improved search visibility, and a frictionless user journey that drives results."
                }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-10 border border-white/5 bg-white/[0.02] rounded-sm hover:border-brand-primary/30 hover:bg-brand-primary/[0.02] hover:shadow-[0_0_30px_-15px_rgba(202,255,0,0.1)] transition-all group"
                >
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-10 h-10 border border-brand-primary/20 flex items-center justify-center mb-8 rounded-full group-hover:bg-brand-primary group-hover:text-black group-hover:border-brand-primary transition-all duration-500"
                  >
                    <CheckCircle2 size={18} />
                  </motion.div>
                  <h3 className="text-lg font-bold uppercase tracking-widest mb-4 group-hover:text-brand-primary transition-colors text-white">{service.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section id="projects" className="py-24 px-6 md:px-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center gap-6 mb-20">
              <div className="max-w-2xl px-6">
                <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Case Studies</span>
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase mb-6 leading-tight">Selected <span className="italic font-serif">Work</span></h2>
                <p className="text-white/40 text-sm md:text-base leading-relaxed">
                  A curation of high-volume Shopify stores where we've implemented precision engineering and strategic design to drive exponential growth.
                </p>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-brand-primary pb-1.5 hover:text-brand-primary transition-all duration-300">
                View All Case Studies
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  title: "Performance Apparel System",
                  brand: "Gymshark",
                  stat: "Enterprise Scale",
                  desc: "Architected a high-volume checkout flow for peak traffic events.",
                  image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80",
                  url: "https://www.gymshark.com"
                },
                {
                  title: "Global Beauty Ecosystem",
                  brand: "Colourpop",
                  stat: "99.9% Uptime",
                  desc: "Optimized complex collection filtering for 10,000+ SKU inventory.",
                  image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80",
                  url: "https://colourpop.com"
                },
                {
                  title: "Personal Care Digital Hub",
                  brand: "Dr. Squatch",
                  stat: "2.5x Load Speed",
                  desc: "Custom Liquid development for immersive, brand-led product storytelling.",
                  image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80",
                  url: "https://drsquatch.com"
                },
                {
                  title: "Subscription Pet Experience",
                  brand: "Barkbox",
                  stat: "Seamless UX",
                  desc: "Built a customized subscription portal integration for recurring revenue.",
                  image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80",
                  url: "https://barkbox.com"
                },
                {
                  title: "Luxury Home Goods Architecture",
                  brand: "Brooklinen",
                  stat: "Conversion Optimized",
                  desc: "Clean, minimalist interface designed for high-end attribute selection.",
                  image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80",
                  url: "https://brooklinen.com"
                },
                {
                  title: "Sustainable Footwear Platform",
                  brand: "Allbirds",
                  stat: "Mobile First",
                  desc: "Full responsive redesign focused on ethical brand narrative and sales.",
                  image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80",
                  url: "https://www.allbirds.com"
                }
              ].map((project, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeIn}
                  className="group cursor-pointer"
                >
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <div className="aspect-[4/5] bg-bg-card rounded-sm overflow-hidden mb-8 relative border border-white/5">
                      <img 
                        src={`${project.image}&w=800&q=80`} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.2em] mb-3">
                          {project.stat}
                        </div>
                        <div className="text-[11px] text-white/30 font-bold uppercase tracking-widest mb-1">{project.brand}</div>
                        <h3 className="text-2xl font-light tracking-tighter uppercase mb-4 leading-tight">{project.title}</h3>
                        <p className="text-[11px] text-white/40 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {project.desc}
                        </p>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <footer className="bg-bg-card px-6 md:px-10 py-12 md:py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 whitespace-nowrap">Client Success</span>
              <p className="text-lg md:text-xl italic font-serif text-white/70 text-center md:text-left leading-relaxed max-w-2xl">
                "NIGHT MEDIA TECH transformed our store completely. Sales increased within weeks of the new launch."
              </p>
            </div>
            <div className="flex items-center gap-5 flex-shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/10 ring-2 ring-brand-primary/20 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                <img 
                  src="https://uploads.onecompiler.io/44nbcwkvw/44nbczu85/WhatsApp%20Image%202026-05-05%20at%2000.12.34.jpeg" 
                  alt="Awwal Developer" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#F5F5F5]">Awwal Developer</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Managing Director</div>
              </div>
            </div>
          </div>
        </footer>

        {/* FAQ Section */}
        <section id="faq" className="py-24 px-6 md:px-10 border-t border-white/10 bg-[#050505]">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Common Queries</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase">Frequently Asked <span className="italic font-serif">Questions</span></h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  q: "What services does NIGHT MEDIA TECH provide?",
                  a: "We specialize in Shopify store development, design, conversion optimization, custom theme development, and performance optimization—delivering solutions tailored for growth and scalability."
                },
                {
                  q: "How long does it take to complete a Shopify store?",
                  a: "Project timelines vary depending on complexity and requirements. A standard Shopify store typically takes between 1–3 weeks, while more advanced builds may require additional time."
                },
                {
                  q: "Do you work with existing Shopify stores?",
                  a: "Yes. We can redesign, optimize, or enhance existing Shopify stores to improve performance, user experience, and conversion rates."
                },
                {
                  q: "What do you need to get started?",
                  a: "We require a clear project brief, your brand assets (logo, content, images), and access to your Shopify store (if applicable)."
                },
                {
                  q: "Do you offer custom Shopify themes?",
                  a: "Yes. We develop fully custom Shopify themes tailored to your brand, ensuring flexibility, performance, and a unique user experience."
                },
                {
                  q: "Will my store be mobile-friendly?",
                  a: "Absolutely. All stores we build are fully responsive and optimized for mobile, tablet, and desktop devices."
                },
                {
                  q: "Do you provide ongoing support after project completion?",
                  a: "Yes. We offer post-launch support and maintenance services to ensure your store continues to perform at its best."
                },
                {
                  q: "How do payments work?",
                  a: "Payments are typically structured based on project scope, with an upfront deposit required before work begins. The remaining balance is due upon completion."
                },
                {
                  q: "Can you help increase my store’s sales?",
                  a: "Yes. Our approach focuses on conversion optimization, performance, and user experience—key factors that directly impact sales growth."
                },
                {
                  q: "How can I get started?",
                  a: "Simply reach out through our contact form or email, and we’ll discuss your project requirements and next steps."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.05 }}
                  className="group p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all rounded-sm flex gap-6"
                >
                  <span className="text-brand-primary font-mono text-[10px] pt-1">{(i + 1).toString().padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-white/90 group-hover:text-brand-primary transition-colors">{item.q}</h3>
                    <p className="text-sm text-white/40 leading-relaxed max-w-2xl">{item.a}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Expertise Banner */}
        <section className="py-6 bg-white flex overflow-hidden border-y border-black/5">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 mx-12 text-black font-black text-sm uppercase tracking-widest">
                <span>CONVERSION-LED ARCHITECTURE</span>
                <span className="text-gray-300">•</span>
                <span>CUSTOM LIQUID ENGINEERING</span>
                <span className="text-gray-300">•</span>
                <span>SHOPIFY PLUS SCALING</span>
                <span className="text-gray-300">•</span>
                <span>ZERO-BLOCKING PERFORMANCE</span>
                <span className="text-gray-300">•</span>
                <span>BESPOKE UX FRAMEWORKS</span>
                <span className="text-gray-300">•</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 md:py-40 px-6 md:px-10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block">Ready to scale?</span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tighter mb-10 leading-tight md:leading-none uppercase">Let’s Build Your <br /><span className="italic font-serif text-brand-primary lowercase">Empire</span></h2>
            <p className="text-base md:text-lg text-white/50 mb-12 max-w-xl mx-auto leading-relaxed">
              Ready to create a high-converting Shopify store or improve your existing one? Let’s work together to build something that delivers real results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <a href="https://wa.link/zpvja5" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-brand-primary hover:text-white transition-all duration-300 text-center">
                Contact on WhatsApp
              </a>
              <a href="mailto:awwaldeveloper8@gmail.com" className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 border border-white/20 text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white/5 transition-all text-center flex items-center justify-center gap-2 group">
                Send an Email <Mail size={14} className="group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href="https://t.me/nightmedia_dev" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-brand-primary transition-colors group">
                Message on Telegram <Send size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>
        </motion.div>
        ) : view === 'terms' ? (
          <motion.div
            key="terms"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <section className="pt-40 pb-20 px-6 md:px-10 min-h-[70vh]">
            <div className="max-w-3xl mx-auto">
              <motion.div {...fadeIn}>
                <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Legal</span>
                <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase mb-2 leading-tight">Terms of <span className="italic font-serif">Service</span></h1>
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-16">Effective Date: Year 2026</p>
                
                <div className="space-y-12 text-white/60 leading-relaxed text-sm">
                  <p className="text-lg text-white/80">Welcome to NIGHT MEDIA TECH. By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Service.</p>
                  
                  {[
                    {
                      id: "1",
                      title: "Services",
                      content: "NIGHT MEDIA TECH provides Shopify development, design, optimization, and related digital services. All services are delivered based on agreed project scope, timelines, and pricing."
                    },
                    {
                      id: "2",
                      title: "Client Responsibilities",
                      content: "Clients agree to provide accurate information, timely feedback, and all necessary materials required for project completion."
                    },
                    {
                      id: "3",
                      title: "Payments",
                      content: "All payments must be made as agreed before or during the project. Failure to complete payment may result in suspension or termination of services."
                    },
                    {
                      id: "4",
                      title: "Intellectual Property",
                      content: "Upon full payment, the client will own the final delivered project. NIGHT MEDIA TECH reserves the right to showcase completed work in its portfolio unless otherwise agreed."
                    },
                    {
                      id: "5",
                      title: "Revisions",
                      content: "Reasonable revisions are included as per project agreement. Additional revisions may incur extra charges."
                    },
                    {
                      id: "6",
                      title: "Limitation of Liability",
                      content: "NIGHT MEDIA TECH is not liable for any indirect, incidental, or consequential damages arising from the use of our services."
                    },
                    {
                      id: "7",
                      title: "Termination",
                      content: "We reserve the right to terminate services if terms are violated, with or without prior notice."
                    },
                    {
                      id: "8",
                      title: "Changes to Terms",
                      content: "We may update these Terms at any time. Continued use of our services constitutes acceptance of the updated Terms."
                    },
                    {
                      id: "9",
                      title: "Contact",
                      content: "For any questions, contact us at: awwaldeveloper8@gmail.com"
                    }
                  ].map((section) => (
                    <div key={section.id} className="group">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-[10px] font-mono text-brand-primary">{section.id.padStart(2, '0')}</span>
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/90 group-hover:text-brand-primary transition-colors">{section.title}</h2>
                      </div>
                      <p className="pl-8 border-l border-white/5 group-hover:border-brand-primary/30 transition-colors">{section.content}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-20 pt-10 border-t border-white/5">
                  <button 
                    onClick={() => { setView('home'); window.scrollTo(0, 0); }}
                    className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:text-brand-primary transition-colors"
                  >
                    <ArrowRight size={14} className="rotate-180" /> Back to Home
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
          </motion.div>
        ) : (
          <motion.div
            key="privacy"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <section className="pt-40 pb-20 px-6 md:px-10 min-h-[70vh]">
            <div className="max-w-3xl mx-auto">
              <motion.div {...fadeIn}>
                <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Legal</span>
                <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase mb-2 leading-tight">Privacy <span className="italic font-serif">Policy</span></h1>
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-16">Effective Date: Year 2026</p>
                
                <div className="space-y-12 text-white/60 leading-relaxed text-sm">
                  <p className="text-lg text-white/80">NIGHT MEDIA TECH respects your privacy and is committed to protecting your personal information.</p>
                  
                  {[
                    {
                      id: "1",
                      title: "Information We Collect",
                      content: "We may collect personal information such as your name, email address, phone number, and project details when you contact us or use our services."
                    },
                    {
                      id: "2",
                      title: "How We Use Information",
                      content: "We use your information to: Provide and manage our services, Communicate with you, and Improve our website and offerings."
                    },
                    {
                      id: "3",
                      title: "Data Protection",
                      content: "We implement appropriate security measures to protect your personal information from unauthorized access or disclosure."
                    },
                    {
                      id: "4",
                      title: "Sharing of Information",
                      content: "We do not sell, trade, or rent your personal information to third parties."
                    },
                    {
                      id: "5",
                      title: "Cookies",
                      content: "Our website may use cookies to enhance user experience and analyze website performance."
                    },
                    {
                      id: "6",
                      title: "Third-Party Services",
                      content: "We may use trusted third-party tools (e.g., analytics, payment processors) that may collect information in accordance with their own policies."
                    },
                    {
                      id: "7",
                      title: "Your Rights",
                      content: "You have the right to request access, correction, or deletion of your personal data."
                    },
                    {
                      id: "8",
                      title: "Changes to Policy",
                      content: "We may update this Privacy Policy from time to time. Updates will be posted on this page."
                    },
                    {
                      id: "9",
                      title: "Contact",
                      content: "For any privacy-related questions, contact us at awwaldeveloper8@gmail.com"
                    }
                  ].map((section) => (
                    <div key={section.id} className="group">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-[10px] font-mono text-brand-primary">{section.id.padStart(2, '0')}</span>
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/90 group-hover:text-brand-primary transition-colors">{section.title}</h2>
                      </div>
                      <p className="pl-8 border-l border-white/5 group-hover:border-brand-primary/30 transition-colors">{section.content}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-20 pt-10 border-t border-white/5">
                  <button 
                    onClick={() => { setView('home'); window.scrollTo(0, 0); }}
                    className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:text-brand-primary transition-colors"
                  >
                    <ArrowRight size={14} className="rotate-180" /> Back to Home
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
          </motion.div>
        )}
      </AnimatePresence>
      </main>

      {/* Main Footer */}
      <footer className="py-16 md:py-24 px-6 md:px-10 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 md:w-10 md:h-10 relative">
                <img 
                  src="https://uploads.onecompiler.io/44nbcwkvw/44nbczu85/WhatsApp%20Image%202026-05-05%20at%2000.11.14%20(2).jpeg" 
                  alt="Logo" 
                  className="w-full h-full object-contain filter brightness-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold tracking-tighter text-xl uppercase font-mono">NIGHT MEDIA TECH</span>
            </div>
            <p className="text-white/40 max-w-xs mb-10 text-sm leading-relaxed">
              Premium Shopify development agency focused on high-end performance, precision design, and real business results for global brands.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.link/zpvja5" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all">
                <MessageCircle size={16} />
              </a>
              <a href="https://t.me/nightmedia_dev" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all">
                <Send size={16} />
              </a>
              <a href="mailto:awwaldeveloper8@gmail.com" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all">
                <Mail size={16} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">Expertise</h4>
            <ul className="space-y-4 text-white/50 text-xs font-bold uppercase tracking-widest">
              <li className="hover:text-brand-primary transition-colors cursor-pointer">Development</li>
              <li className="hover:text-brand-primary transition-colors cursor-pointer">UI/UX Design</li>
              <li className="hover:text-brand-primary transition-colors cursor-pointer">Speed Opt</li>
              <li className="hover:text-brand-primary transition-colors cursor-pointer">Liquid</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">Platform</h4>
            <ul className="space-y-4 text-white/50 text-xs font-bold uppercase tracking-widest">
              <li className="hover:text-brand-primary transition-colors cursor-pointer" onClick={() => { setView('home'); window.scrollTo(0, 0); }}>Portfolio</li>
              <li className="hover:text-brand-primary transition-colors cursor-pointer"><a href="#services">Process</a></li>
              <li className="hover:text-brand-primary transition-colors cursor-pointer"><a href="#about">About</a></li>
              <li className="hover:text-brand-primary transition-colors cursor-pointer"><a href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
          <p>© 2026 NIGHT MEDIA TECH. POWERED BY EXPERTISE.</p>
          <div className="flex gap-10">
            <span 
              onClick={() => { setView('privacy'); window.scrollTo(0, 0); }}
              className="hover:text-white cursor-pointer transition-colors"
            >
              Privacy
            </span>
            <span 
              onClick={() => { setView('terms'); window.scrollTo(0, 0); }} 
              className="hover:text-white cursor-pointer transition-colors"
            >
              Terms
            </span>
          </div>
        </div>
      </footer>
      <DevAI 
        currentView={view}
        onSwitchView={(v) => {
          setView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigate={(id) => {
          if (view !== 'home') {
            setView('home');
            // Give time for home to render
            setTimeout(() => {
              const element = document.getElementById(id);
              if (element) {
                const navHeight = 100; // approximate nav height
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                  top: elementPosition - navHeight,
                  behavior: "smooth"
                });
              }
            }, 100);
          } else {
            const element = document.getElementById(id);
            if (element) {
              const navHeight = 100;
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: elementPosition - navHeight,
                behavior: "smooth"
              });
            }
          }
        }}
      />

      {/* Back to Top */}
      <AnimatePresence>
        {scrollProgress > 20 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 w-12 h-12 glass rounded-full flex items-center justify-center text-white/50 hover:text-brand-primary hover:border-brand-primary transition-all z-[90]"
          >
            <ArrowRight className="-rotate-90" size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
