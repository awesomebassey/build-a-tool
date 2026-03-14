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
import { m, useMotionValue, useTransform, useInView } from "motion/react";
import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import TextReveal from "@/components/ui/TextReveal";
import GlowCard from "@/components/ui/GlowCard";
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
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        {/* ──── HERO ──── */}
        <section className={styles.hero}>
          <div className={styles.haloGlow} />
          <div className={`container ${styles.heroContainer}`}>
            <m.div
              className={styles.heroBadge}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_FLUID }}
            >
              <span className={styles.badgeDot} />
              Nigeria&apos;s safe vibecoding community
            </m.div>

            <m.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_FLUID, delay: 0.1 }}
            >
              Turn your wildest ideas
              <br />
              into <span className={styles.textHighlight}>real tools.</span>
            </m.h1>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TextReveal
                text="With expert human mentors and AI by your side — non-technical builders finally ship with confidence."
                className={styles.heroSubtitle}
                delay={300}
              />
            </m.div>

            <m.div
              className={styles.heroCtas}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_FLUID, delay: 0.3 }}
            >
              <m.div whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link href="/ideas/new" className={styles.ctaPrimary}>
                  <Lightbulb size={20} weight="duotone" />
                  Submit Your Idea
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </m.div>
              <m.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/feed" className={styles.ctaGhost}>
                  Browse Community Tools
                </Link>
              </m.div>
            </m.div>

            {/* Simulated Workspace Window */}
            <m.div
              className={styles.heroVisual}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_FLUID, delay: 0.4 }}
            >
              <div className={styles.mockupWindow}>
                <div className={styles.mockupHeader}>
                  <div className={styles.mockupDots}>
                    <span /> <span /> <span />
                  </div>
                  <div className={styles.mockupTitle}>buildatool.app / workspace / idea-1024</div>
                </div>
                <div className={styles.mockupBody}>
                  <div className={styles.mockupSidebar}>
                    <div className={styles.mockupStepActive}>
                      <CheckCircle color="var(--color-primary)" weight="fill" /> Requirements
                    </div>
                    <div className={styles.mockupStepActive}>
                      <CheckCircle color="var(--color-primary)" weight="fill" /> MVP Code
                    </div>
                    <div className={styles.mockupStep}>
                      <span className={styles.spinner} /> Deployment
                    </div>
                  </div>
                  <div className={styles.mockupContent}>
                    <div className={styles.mockupChat}>
                      <div className={styles.chatBubbleBot}>
                        <strong>AI Agent:</strong> I&apos;ve generated the Next.js components for the inventory dashboard.
                      </div>
                      <div className={styles.chatBubbleUser}>
                        <strong>Mentor Aisha:</strong> Good. Now implement the WhatsApp webhooks. Let&apos;s keep latency under 200ms for 3G.
                      </div>
                      <div className={styles.chatBubbleBot}>
                        <strong>AI Agent:</strong> Done. Webhooks configured and optimized. Ready to test.
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
          className={styles.statsSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: EASE_FLUID }}
        >
          <m.div className={`container ${styles.statsBar}`} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {STATS.map((stat, i) => (
              <m.div key={i} className={styles.statItem} variants={fadeUp} transition={{ duration: 0.5, ease: EASE_FLUID }}>
                <span className={styles.statValue}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </m.div>
            ))}
          </m.div>
        </m.section>

        {/* ──── HOW IT WORKS ──── */}
        <m.section
          id="how-it-works"
          className={styles.howItWorks}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: EASE_FLUID }}
        >
          <div className="container">
            <div className={styles.storyHeader}>
              <h2 className={styles.storyTitle}>Four simple steps. One powerful result.</h2>
              <p className={styles.storySubtitle}>
                No code required. No technical co-founder needed. Just you, your vision, and our platform.
              </p>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineLine}>
                <div className={styles.timelineGlow} />
              </div>
              <m.div className={styles.timelineSteps} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {HOW_IT_WORKS_STEPS.map((step, i) => (
                  <m.div
                    key={i}
                    className={styles.timelineStep}
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: EASE_FLUID }}
                  >
                    <m.div className={styles.timelineIconWrapper} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                      <div className={styles.timelineIcon}>{step.icon}</div>
                    </m.div>
                    <div className={styles.timelineContent}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepDesc}>{step.description}</p>
                    </div>
                  </m.div>
                ))}
              </m.div>
            </div>
          </div>
        </m.section>

        {/* ──── MEET OUR MENTORS ──── */}
        <m.section
          className={styles.mentorsSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: EASE_FLUID }}
        >
          <div className="container">
            <div className={styles.storyHeader}>
              <h2 className={styles.storyTitle}>Meet the experts in your corner.</h2>
              <p className={styles.storySubtitle}>
                Elite Nigerian developers who guide your vision from idea to shipped product.
              </p>
            </div>

            <m.div className={styles.mentorsGrid} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {FEATURED_MENTORS.map((mentor, i) => (
                <GlowCard key={i} className={styles.mentorCard}>
                  <m.div
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: EASE_FLUID }}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.98 }}
                    style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", position: "relative", zIndex: 2 }}
                  >
                    <div className={styles.mentorCardTop}>
                      <div className={styles.mentorAvatar}>{mentor.initials}</div>
                      <div className={styles.mentorInfo}>
                        <h4 className={styles.mentorName}>{mentor.name}</h4>
                        <span className={styles.mentorRole}>{mentor.role}</span>
                      </div>
                    </div>
                    <p className={styles.mentorBio}>{mentor.bio}</p>
                    <div className={styles.mentorStats}>
                      <span><Star size={14} weight="fill" color="var(--color-gold)" /> {mentor.rating}</span>
                      <span>{mentor.sessions} sessions</span>
                      <span className={styles.mentorRate}>{mentor.rate}/hr</span>
                    </div>
                    <Link href="/bookings" className={styles.mentorCta}>
                      Book Session <ArrowRight size={14} weight="bold" />
                    </Link>
                  </m.div>
                </GlowCard>
              ))}
            </m.div>

            <div className={styles.mentorsFooter}>
              <m.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/mentors" className={styles.ctaGhost}>
                  View All Mentors <ArrowRight size={14} weight="bold" />
                </Link>
              </m.div>
            </div>
          </div>
        </m.section>

        {/* ──── FEATURED CAROUSEL ──── */}
        <m.section
          className={styles.featuredSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: EASE_FLUID }}
        >
          <div className="container">
            <div className={styles.storyHeader}>
              <h2 className={styles.storyTitle}>See what Nigerians are building right now.</h2>
              <p className={styles.storySubtitle}>
                Real tools, built by real people, solving real problems — from Lagos to Abuja.
              </p>
            </div>
          </div>

          <div className={styles.carouselWrapper}>
            <div className={styles.carouselTrack}>
              {[...FEATURED_TOOLS, ...FEATURED_TOOLS].map((tool, i) => (
                <m.div
                  key={i}
                  className={styles.toolCard}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3, ease: EASE_FLUID }}
                >
                  <div className={styles.toolHeader}>
                    <span className={styles.toolCategory}>{tool.category}</span>
                    <div className={styles.toolLikes}>
                      <TrendUp weight="bold" /> {tool.likes}
                    </div>
                  </div>
                  <h4 className={styles.toolName}>{tool.name}</h4>
                  <p className={styles.toolAuthor}>Idea by {tool.author}</p>
                  <button className={styles.toolAction}>
                    <Play weight="fill" /> Preview App
                  </button>
                </m.div>
              ))}
            </div>
          </div>
        </m.section>

        {/* ──── TESTIMONIALS ──── */}
        <m.section
          className={styles.testimonialSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: EASE_FLUID }}
        >
          <div className="container">
            <div className={styles.storyHeader}>
              <h2 className={styles.storyTitle}>Builders like you are already winning.</h2>
              <p className={styles.storySubtitle}>
                Don&apos;t take our word for it — hear from the community.
              </p>
            </div>

            <m.div className={styles.testimonialsGrid} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {TESTIMONIALS.map((t, i) => (
                <m.div
                  key={i}
                  className={styles.testimonialCard}
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: EASE_FLUID }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  <Quotes size={32} weight="fill" className={styles.testimonialQuoteIcon} />
                  <p className={styles.testimonialText}>&quot;{t.text}&quot;</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.orbAvatar}>{t.initials}</div>
                    <div className={styles.orbMeta}>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </m.section>

        {/* ──── FINAL CTA ──── */}
        <m.section
          className={styles.finalCta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE_FLUID }}
        >
          <div className={`container ${styles.finalCtaInner}`}>
            <h2 className={styles.finalCtaTitle}>
              Ready to turn your idea into reality?
            </h2>
            <p className={styles.finalCtaSubtitle}>
              Join hundreds of Nigerian builders who stopped waiting and started shipping.
            </p>
            <div className={styles.heroCtas}>
              <m.div whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link href="/ideas/new" className={styles.ctaPrimary}>
                  <Lightbulb size={20} weight="duotone" />
                  Start Building Today
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </m.div>
              <m.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/feed" className={styles.ctaGhost}>
                  Explore the Community
                </Link>
              </m.div>
            </div>
            <div className={styles.trustBadges}>
              <div className={styles.trustBadge}>
                <ShieldCheck size={18} weight="duotone" />
                Paystack Secured
              </div>
              <div className={styles.trustBadge}>
                <Users size={18} weight="duotone" />
                200+ Active Builders
              </div>
              <div className={styles.trustBadge}>
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
