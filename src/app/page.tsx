"use client";

import Link from "next/link";
import {
  Lightbulb,
  TrendUp,
  ArrowRight,
  Play,
  Quotes,
  Users,
  Rocket,
  Handshake,
  Lightning,
  ShieldCheck,
  Star,
} from "@phosphor-icons/react";
import { m, useInView } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import TextReveal from "@/components/ui/TextReveal";
import GlowCard from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

/* ── Motion Presets ── */
const EASE_FLUID = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Animated Counter (uses InView from motion) ── */
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Data ── */
const HOW_IT_WORKS_STEPS = [
  {
    icon: <Lightbulb weight="duotone" size={28} />,
    title: "Describe your vision",
    description:
      "No code. No jargon. Just describe the problem you want to solve in your own words — we handle the rest.",
  },
  {
    icon: <Users weight="duotone" size={28} />,
    title: "The community reacts",
    description:
      "Your idea goes live on the community feed. The tools that solve real Nigerian problems get upvoted to the top.",
  },
  {
    icon: <Handshake weight="duotone" size={28} />,
    title: "Get matched with a mentor",
    description:
      "An elite Nigerian developer claims your idea and guides AI agents to build, test, and refine your tool live.",
  },
  {
    icon: <Rocket weight="duotone" size={28} />,
    title: "Launch and celebrate",
    description:
      "Your tool ships to real users. You join a growing network of Nigerian builders who turned ideas into impact.",
  },
];

const FEATURED_TOOLS = [
  { name: "WhatsApp Inventory Sync", author: "Chidi N.", category: "Logistics", likes: 342 },
  { name: "Naira Invoice Generator", author: "Aisha M.", category: "Finance", likes: 289 },
  { name: "Lagos Traffic Predictor", author: "Tobi O.", category: "Utility", likes: 156 },
  { name: "Local Market Prices", author: "Ngozi A.", category: "Commerce", likes: 412 },
  { name: "Pharmacy Stock Alert", author: "Dayo K.", category: "Health", likes: 198 },
];

const STATS = [
  { value: 200, suffix: "+", label: "Ideas submitted" },
  { value: 47, suffix: "", label: "Tools shipped" },
  { value: 120, suffix: "+", label: "Active builders" },
  { value: 15, suffix: "", label: "Expert mentors" },
];

const FEATURED_MENTORS = [
  {
    name: "Chidi Nwosu",
    initials: "CN",
    role: "Full-Stack Developer",
    bio: "10+ years building fintech products for Nigerian startups. Specialist in React, Node, and mobile-first architecture.",
    rating: 4.9,
    sessions: 84,
    rate: "\u20a615,000",
  },
  {
    name: "Aisha Muhammad",
    initials: "AM",
    role: "Product Designer",
    bio: "Former lead designer at a Top Nigerian bank. Passionate about making complex tools feel simple for everyday Nigerians.",
    rating: 4.8,
    sessions: 62,
    rate: "\u20a612,000",
  },
  {
    name: "Oluwaseun Adeyemi",
    initials: "OA",
    role: "Backend Architect",
    bio: "Built payment infrastructure serving millions of transactions. Expert in scalable systems and API design.",
    rating: 5.0,
    sessions: 47,
    rate: "\u20a620,000",
  },
  {
    name: "Nneka Okafor",
    initials: "NO",
    role: "Mobile Developer",
    bio: "Shipped 12+ apps on Android and iOS. Focused on building tools that work flawlessly on low-end devices.",
    rating: 4.7,
    sessions: 56,
    rate: "\u20a618,000",
  },
];

const TESTIMONIALS = [
  {
    text: "The community voted for my idea on Tuesday. A mentor reached out that night. By Friday, I had a working prototype. This platform is the absolute truth.",
    name: "Funke Dada",
    initials: "FD",
    role: "Logistics Founder, Lagos",
  },
  {
    text: "I described my pharmacy stock alert idea in plain English. Two weeks later, it\u2019s a real app my customers use daily. No coding \u2014 just vision.",
    name: "Chidi Okpara",
    initials: "CO",
    role: "Pharmacy Owner, Abuja",
  },
  {
    text: "As a mentor, I love this platform. I get to help real Nigerian founders while the AI handles the heavy lifting. It\u2019s the future of building.",
    name: "Amara Eze",
    initials: "AE",
    role: "Senior Developer & Mentor",
  },
];

/* ── Page Component ── */
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="relative w-full">
      <Navbar />

      <main className="pt-[calc(var(--nav-height)+2rem)]">
        {/* ──── HERO ──── */}
        <section className="relative flex flex-col items-center py-24 md:py-32">
          <div className="absolute left-[50%] top-[5%] z-0 h-[70vw] max-h-[800px] w-[70vw] max-w-[800px] -translate-x-1/2 bg-[radial-gradient(circle,var(--color-primary-glow)_0%,transparent_55%)] blur-[120px] pointer-events-none" style={{ animation: 'glow-pulse 4s ease-in-out infinite alternate' }} />
          <div className="container relative z-10 flex w-full flex-col items-center text-center">
            
            <m.h1
              className="mb-6 text-[clamp(2rem,8vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_FLUID, delay: 0.1 }}
            >
              Turn your wildest ideas
              <br />
              into <span className="bg-gradient-to-br from-primary to-[var(--color-primary-light)] bg-clip-text text-transparent">real tools.</span>
            </m.h1>

            <m.div
              className="mx-auto mb-12 max-w-[660px] px-2 md:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TextReveal
                text="With expert human mentors and AI by your side — non-technical builders finally ship with confidence."
                className="text-lg leading-relaxed text-muted-foreground md:text-xl"
                delay={300}
              />
            </m.div>

            <m.div
              className="mb-16 flex w-full flex-col flex-wrap items-center justify-center gap-4 px-4 md:w-auto md:flex-row md:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_FLUID, delay: 0.3 }}
            >
              <m.div whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }} className="w-full md:w-auto">
                <Button asChild size="lg" className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary to-[var(--color-primary-light)] bg-[size:200%_200%] px-8 text-base font-semibold text-[var(--color-primary-content)] shadow-[0_8px_32px_rgba(255,107,53,0.35)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,107,53,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] md:w-auto" style={{ animation: 'shimmer 4s ease infinite' }}>
                  <Link href="/ideas/new">
                    <Lightbulb size={20} weight="duotone" />
                    Submit Your Idea
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                </Button>
              </m.div>
              <m.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full md:w-auto">
                <Button asChild variant="outline" size="lg" className="flex w-full items-center justify-center gap-2 rounded-full border-border bg-transparent px-8 text-base font-medium text-foreground transition-all duration-300 hover:border-[var(--color-border-focus)] hover:bg-[var(--color-surface-2)] md:w-auto">
                  <Link href="/feed">
                    Browse Community Tools
                  </Link>
                </Button>
              </m.div>
            </m.div>

            {/* Simulated Workspace Window */}
            <m.div
              className="w-full max-w-[900px]"
              style={{ perspective: "1200px" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_FLUID, delay: 0.4 }}
            >
              <div className="group overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-surface-glass)] text-left shadow-lg backdrop-blur-[40px] saturate-[150%] transition-transform duration-500 hover:-translate-y-2 hover:rotate-x-0" style={{ transform: "rotateX(2deg) translateY(0)" }}>
                <div className="relative flex h-12 items-center justify-center border-b border-border bg-[var(--color-surface-2)]">
                  <div className="absolute left-4 flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-[var(--color-border-light)]" />
                    <span className="h-3 w-3 rounded-full bg-[var(--color-border-light)]" />
                    <span className="h-3 w-3 rounded-full bg-[var(--color-border-light)]" />
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">buildatool.app / workspace / idea-1024</div>
                </div>
                <div className="flex h-[340px]">
                  <div className="hidden w-[200px] flex-col gap-4 border-r border-border bg-[var(--color-surface-3)] p-6 md:flex">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle color="var(--color-primary)" weight="fill" /> Requirements
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle color="var(--color-primary)" weight="fill" /> MVP Code
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-[var(--color-border)] border-t-primary" style={{ animation: 'spin-smooth 1s linear infinite' }} /> Deployment
                    </div>
                  </div>
                  <div className="flex-1 bg-transparent p-6">
                    <div className="flex flex-col gap-4">
                      <div className="max-w-[85%] self-start rounded-lg rounded-bl-sm border border-border bg-[var(--color-surface-2)] p-3 px-4 text-sm text-muted-foreground">
                        <strong className="text-foreground">AI Agent:</strong> I&apos;ve generated the Next.js components for the inventory dashboard.
                      </div>
                      <div className="max-w-[85%] self-end rounded-lg rounded-br-sm border border-[rgba(255,107,53,0.3)] bg-[var(--color-primary-glow)] p-3 px-4 text-sm text-foreground">
                        <strong className="text-primary">Mentor Aisha:</strong> Good. Now implement the WhatsApp webhooks. Let&apos;s keep latency under 200ms for 3G.
                      </div>
                      <div className="max-w-[85%] self-start rounded-lg rounded-bl-sm border border-border bg-[var(--color-surface-2)] p-3 px-4 text-sm text-muted-foreground">
                        <strong className="text-foreground">AI Agent:</strong> Done. Webhooks configured and optimized. Ready to test.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* ──── SOCIAL PROOF BAR ──── */}
        <m.section
          className="py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: EASE_FLUID }}
        >
          <m.div className="liquid-glass mx-auto grid w-[calc(100%-2rem)] max-w-[1100px] grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 md:grid-cols-4 md:gap-6 md:px-6 md:py-8" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {STATS.map((stat, i) => (
              <m.div key={i} className="flex flex-col items-center gap-1 text-center" variants={fadeUp} transition={{ duration: 0.5, ease: EASE_FLUID }}>
                <span className="text-3xl font-bold leading-none tracking-tight text-foreground md:text-4xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              </m.div>
            ))}
          </m.div>
        </m.section>

        {/* ──── HOW IT WORKS ──── */}
        <m.section
          id="how-it-works"
          className="relative py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: EASE_FLUID }}
        >
          <div className="container">
            <div className="mx-auto mb-16 max-w-[640px] text-center">
              <h2 className="mb-3 text-4xl font-semibold tracking-tight text-foreground">Four simple steps. One powerful result.</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                No code required. No technical co-founder needed. Just you, your vision, and our platform.
              </p>
            </div>

            <div className="relative mx-auto flex max-w-[800px] flex-col gap-12">
              <div className="absolute bottom-0 left-[24px] top-0 z-0 w-[2px] bg-border md:left-[28px]">
                <div className="absolute left-[-2px] top-0 h-1/2 w-[6px] rounded-[3px] bg-gradient-to-b from-primary to-transparent blur-[2px]" style={{ animation: 'drop 3s infinite ease-in-out' }} />
              </div>
              <m.div className="relative z-10 flex flex-col gap-8" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {HOW_IT_WORKS_STEPS.map((step, i) => (
                  <m.div
                    key={i}
                    className="group flex flex-col items-start gap-4 md:flex-row md:gap-8"
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: EASE_FLUID }}
                  >
                    <m.div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-border-light)] bg-[var(--color-surface-2)] text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_20px_var(--color-primary-glow)] md:h-[56px] md:w-[56px]" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                      <div>{step.icon}</div>
                    </m.div>
                    <div className="flex-1 rounded-xl border border-border bg-[var(--color-surface-1)] p-6 backdrop-blur-[12px] transition-all duration-300 group-hover:translate-x-2 group-hover:border-[var(--color-border-light)] group-hover:bg-[var(--color-surface-glass)]">
                      <h3 className="mb-2 text-xl font-semibold text-foreground">{step.title}</h3>
                      <p className="text-base leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </m.div>
                ))}
              </m.div>
            </div>
          </div>
        </m.section>

        {/* ──── MEET OUR MENTORS ──── */}
        <m.section
          className="py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: EASE_FLUID }}
        >
          <div className="container">
            <div className="mx-auto mb-16 max-w-[640px] text-center">
              <h2 className="mb-3 text-4xl font-semibold tracking-tight text-foreground">Meet the experts in your corner.</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Elite Nigerian developers who guide your vision from idea to shipped product.
              </p>
            </div>

            <m.div className="grid grid-cols-1 gap-6 md:grid-cols-2" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {FEATURED_MENTORS.map((mentor, i) => (
                <GlowCard key={i} className="liquid-glass group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:border-[var(--color-border-focus)] hover:shadow-[var(--shadow-md),0_0_40px_var(--color-primary-glow)] md:p-6">
                  <m.div
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: EASE_FLUID }}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.98 }}
                    style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "relative", zIndex: 2 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[var(--color-primary-light)] text-lg font-bold text-[var(--color-primary-content)]">{mentor.initials}</div>
                      <div className="flex flex-col gap-[2px]">
                        <h4 className="text-lg font-semibold tracking-tight text-foreground">{mentor.name}</h4>
                        <span className="text-sm font-medium text-[var(--color-primary-light)]">{mentor.role}</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{mentor.bio}</p>
                    <div className="mt-2 flex items-center gap-4 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Star size={14} weight="fill" color="var(--color-gold)" /> {mentor.rating}</span>
                      <span className="flex items-center gap-1">{mentor.sessions} sessions</span>
                      <span className="ml-auto text-sm font-semibold text-foreground">{mentor.rate}/hr</span>
                    </div>
                    <Link href="/bookings" className="flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-surface-2)] text-sm font-medium text-foreground transition-all duration-200 group-hover:bg-primary group-hover:text-[var(--color-primary-content)]">
                      Book Session <ArrowRight size={14} weight="bold" />
                    </Link>
                  </m.div>
                </GlowCard>
              ))}
            </m.div>

            <div className="mt-12 flex justify-center">
              <m.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="outline" className="flex h-12 items-center gap-2 rounded-full px-6 transition-all duration-300 hover:border-[var(--color-border-focus)] hover:bg-[var(--color-surface-2)]">
                  <Link href="/mentors">
                    View All Mentors <ArrowRight size={14} weight="bold" />
                  </Link>
                </Button>
              </m.div>
            </div>
          </div>
        </m.section>

        {/* ──── FEATURED CAROUSEL ──── */}
        <m.section
          className="overflow-hidden py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: EASE_FLUID }}
        >
          <div className="container">
            <div className="mx-auto mb-16 max-w-[640px] text-center">
              <h2 className="mb-3 text-4xl font-semibold tracking-tight text-foreground">See what Nigerians are building right now.</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Real tools, built by real people, solving real problems — from Lagos to Abuja.
              </p>
            </div>
          </div>

          <div className="relative left-1/2 w-[100vw] -translate-x-1/2 overflow-hidden before:absolute before:bottom-0 before:left-0 before:top-0 before:z-[2] before:w-[5vw] before:pointer-events-none before:bg-gradient-to-r before:from-[var(--color-bg)] before:to-transparent after:absolute after:bottom-0 after:right-0 after:top-0 after:z-[2] after:w-[5vw] after:pointer-events-none after:bg-gradient-to-l after:from-[var(--color-bg)] after:to-transparent">
            <div className="carousel-track flex gap-6 pb-12 pt-4">
              {[...FEATURED_TOOLS, ...FEATURED_TOOLS].map((tool, i) => (
                <div
                  key={i}
                  className="liquid-glass group relative flex w-[280px] shrink-0 cursor-default flex-col rounded-2xl p-6 transition-all duration-300 hover:border-[var(--color-border-focus)] hover:shadow-[var(--shadow-md),0_0_32px_var(--color-primary-glow)] md:w-[320px]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{tool.category}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <TrendUp weight="bold" /> {tool.likes}
                    </div>
                  </div>
                  <h4 className="mb-1 text-lg font-semibold text-foreground">{tool.name}</h4>
                  <p className="mb-6 text-sm text-muted-foreground">Idea by {tool.author}</p>
                  <button className="mt-auto flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-surface-2)] text-sm font-medium text-foreground transition-all duration-200 group-hover:bg-foreground group-hover:text-background border-none">
                    <Play weight="fill" /> Preview App
                  </button>
                </div>
              ))}
            </div>
          </div>
        </m.section>

        {/* ──── TESTIMONIALS ──── */}
        <m.section
          className="flex justify-center py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: EASE_FLUID }}
        >
          <div className="container">
            <div className="mx-auto mb-16 max-w-[640px] text-center">
              <h2 className="mb-3 text-4xl font-semibold tracking-tight text-foreground">Builders like you are already winning.</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Don&apos;t take our word for it — hear from the community.
              </p>
            </div>

            <m.div className="grid grid-cols-1 gap-6 md:grid-cols-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {TESTIMONIALS.map((t, i) => (
                <m.div
                  key={i}
                  className="liquid-glass group relative flex flex-col gap-4 rounded-2xl p-8 transition-all duration-300 hover:shadow-[var(--shadow-md),0_0_24px_var(--color-primary-glow)]"
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: EASE_FLUID }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  <div className="pointer-events-none absolute left-[10%] right-[10%] top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent" />
                  <Quotes size={32} weight="fill" className="text-[var(--color-primary-light)] opacity-35" />
                  <p className="flex-1 text-base italic leading-relaxed text-foreground">&quot;{t.text}&quot;</p>
                  <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-[var(--color-primary-content)]">{t.initials}</div>
                    <div className="flex flex-col">
                      <strong className="text-base font-semibold text-foreground">{t.name}</strong>
                      <span className="text-sm text-muted-foreground">{t.role}</span>
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </m.section>

        {/* ──── FINAL CTA ──── */}
        <m.section
          className="relative py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE_FLUID }}
        >
          <div className="container relative overflow-hidden rounded-3xl border border-[var(--color-border-light)] bg-gradient-to-br from-[rgba(255,107,53,0.08)] to-[rgba(255,136,92,0.04)] px-6 py-16 text-center md:px-8">
            <div className="pointer-events-none absolute left-[50%] top-[-100px] h-[400px] w-[400px] -translate-x-1/2 bg-[radial-gradient(circle,var(--color-primary-glow)_0%,transparent_60%)] blur-[80px]" />
            <h2 className="relative z-10 mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Ready to turn your idea into reality?
            </h2>
            <p className="relative z-10 mx-auto mb-8 max-w-[500px] text-lg text-muted-foreground">
              Join hundreds of Nigerian builders who stopped waiting and started shipping.
            </p>
            <div className="relative z-10 flex w-full flex-col flex-wrap items-center justify-center gap-4 px-4 md:w-auto md:flex-row md:px-0">
              <m.div whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }} className="w-full md:w-auto">
                <Button asChild size="lg" className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary to-[var(--color-primary-light)] bg-[size:200%_200%] px-8 text-base font-semibold text-[var(--color-primary-content)] shadow-[0_8px_32px_rgba(255,107,53,0.35)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,107,53,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] md:w-auto" style={{ animation: 'shimmer 4s ease infinite' }}>
                  <Link href="/ideas/new">
                    <Lightbulb size={20} weight="duotone" />
                    Start Building Today
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                </Button>
              </m.div>
              <m.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full md:w-auto">
                <Button asChild variant="outline" size="lg" className="flex w-full items-center justify-center gap-2 rounded-full border-border bg-transparent px-8 text-base font-medium text-foreground transition-all duration-300 hover:border-[var(--color-border-focus)] hover:bg-[var(--color-surface-2)] md:w-auto">
                  <Link href="/feed">
                    Explore the Community
                  </Link>
                </Button>
              </m.div>
            </div>
            <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <ShieldCheck size={18} weight="duotone" />
                Paystack Secured
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Users size={18} weight="duotone" />
                200+ Active Builders
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Lightning size={18} weight="duotone" />
                Ships in Days, Not Months
              </div>
            </div>
          </div>
        </m.section>

      </main>
    </div>
  );
}

/* Icon helper */
function CheckCircle({ color, weight }: { color: string; weight: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={color} viewBox="0 0 256 256">
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path>
    </svg>
  );
}
