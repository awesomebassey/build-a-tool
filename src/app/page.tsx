"use client";

import Link from "next/link";
import {
  Lightbulb,
  TrendUp,
  ArrowRight,
  Robot,
  Play,
  Quotes,
  Users,
  Rocket,
  Handshake,
  Trophy,
  Lightning,
  ShieldCheck,
  Star,
} from "@phosphor-icons/react";
import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import { useEffect, useState, useRef, useCallback } from "react";

/* ── Scroll Reveal Hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

/* ── Animated Counter ── */
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end]);

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
    rate: "₦15,000",
  },
  {
    name: "Aisha Muhammad",
    initials: "AM",
    role: "Product Designer",
    bio: "Former lead designer at a Top Nigerian bank. Passionate about making complex tools feel simple for everyday Nigerians.",
    rating: 4.8,
    sessions: 62,
    rate: "₦12,000",
  },
  {
    name: "Oluwaseun Adeyemi",
    initials: "OA",
    role: "Backend Architect",
    bio: "Built payment infrastructure serving millions of transactions. Expert in scalable systems and API design.",
    rating: 5.0,
    sessions: 47,
    rate: "₦20,000",
  },
  {
    name: "Nneka Okafor",
    initials: "NO",
    role: "Mobile Developer",
    bio: "Shipped 12+ apps on Android and iOS. Focused on building tools that work flawlessly on low-end devices.",
    rating: 4.7,
    sessions: 56,
    rate: "₦18,000",
  },
];

/* ── Page Component ── */
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const statsReveal = useScrollReveal();
  const howItWorksReveal = useScrollReveal();
  const mentorsReveal = useScrollReveal();
  const carouselReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

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
            <div className={styles.heroBadge}>
              <span className={styles.badgeDot} />
              Nigeria&apos;s safe vibecoding community
            </div>

            <h1 className={styles.heroTitle}>
              Turn your wildest ideas
              <br />
              into <span className={styles.textHighlight}>real tools.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              With expert human mentors and AI by your side — non-technical builders finally ship with confidence.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/ideas/new" className={styles.ctaPrimary}>
                <Lightbulb size={20} weight="duotone" />
                Submit Your Idea
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link href="/feed" className={styles.ctaGhost}>
                Browse Community Tools
              </Link>
            </div>

            {/* Simulated Workspace Window */}
            <div className={styles.heroVisual}>
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
            </div>
          </div>
        </section>

        {/* ──── SOCIAL PROOF BAR ──── */}
        <section
          ref={statsReveal.ref}
          className={`${styles.statsSection} ${statsReveal.isVisible ? styles.revealed : ""}`}
        >
          <div className={`container ${styles.statsBar}`}>
            {STATS.map((stat, i) => (
              <div key={i} className={styles.statItem} style={{ animationDelay: `${i * 100}ms` }}>
                <span className={styles.statValue}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ──── HOW IT WORKS ──── */}
        <section
          id="how-it-works"
          ref={howItWorksReveal.ref}
          className={`${styles.howItWorks} ${howItWorksReveal.isVisible ? styles.revealed : ""}`}
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
              <div className={styles.timelineSteps}>
                {HOW_IT_WORKS_STEPS.map((step, i) => (
                  <div
                    key={i}
                    className={styles.timelineStep}
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className={styles.timelineIconWrapper}>
                      <div className={styles.timelineIcon}>{step.icon}</div>
                    </div>
                    <div className={styles.timelineContent}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepDesc}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──── MEET OUR MENTORS ──── */}
        <section
          ref={mentorsReveal.ref}
          className={`${styles.mentorsSection} ${mentorsReveal.isVisible ? styles.revealed : ""}`}
        >
          <div className="container">
            <div className={styles.storyHeader}>
              <h2 className={styles.storyTitle}>Meet the experts in your corner.</h2>
              <p className={styles.storySubtitle}>
                Elite Nigerian developers who guide your vision from idea to shipped product.
              </p>
            </div>

            <div className={styles.mentorsGrid}>
              {FEATURED_MENTORS.map((mentor, i) => (
                <div
                  key={i}
                  className={styles.mentorCard}
                  style={{ animationDelay: `${i * 100}ms` }}
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
                </div>
              ))}
            </div>

            <div className={styles.mentorsFooter}>
              <Link href="/mentors" className={styles.ctaGhost}>
                View All Mentors <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </section>

        {/* ──── FEATURED CAROUSEL ──── */}
        <section
          ref={carouselReveal.ref}
          className={`${styles.featuredSection} ${carouselReveal.isVisible ? styles.revealed : ""}`}
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
                <div key={i} className={styles.toolCard}>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──── TESTIMONIALS ──── */}
        <section
          ref={testimonialReveal.ref}
          className={`${styles.testimonialSection} ${testimonialReveal.isVisible ? styles.revealed : ""}`}
        >
          <div className="container">
            <div className={styles.storyHeader}>
              <h2 className={styles.storyTitle}>Builders like you are already winning.</h2>
              <p className={styles.storySubtitle}>
                Don&apos;t take our word for it — hear from the community.
              </p>
            </div>

            <div className={styles.testimonialsGrid}>
              {[
                {
                  text: "The community voted for my idea on Tuesday. A mentor reached out that night. By Friday, I had a working prototype. This platform is the absolute truth.",
                  name: "Funke Dada",
                  initials: "FD",
                  role: "Logistics Founder, Lagos",
                },
                {
                  text: "I described my pharmacy stock alert idea in plain English. Two weeks later, it's a real app my customers use daily. No coding — just vision.",
                  name: "Chidi Okpara",
                  initials: "CO",
                  role: "Pharmacy Owner, Abuja",
                },
                {
                  text: "As a mentor, I love this platform. I get to help real Nigerian founders while the AI handles the heavy lifting. It's the future of building.",
                  name: "Amara Eze",
                  initials: "AE",
                  role: "Senior Developer & Mentor",
                },
              ].map((t, i) => (
                <div key={i} className={styles.testimonialCard} style={{ animationDelay: `${i * 100}ms` }}>
                  <Quotes size={32} weight="fill" className={styles.testimonialQuoteIcon} />
                  <p className={styles.testimonialText}>&quot;{t.text}&quot;</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.orbAvatar}>{t.initials}</div>
                    <div className={styles.orbMeta}>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──── FINAL CTA ──── */}
        <section
          ref={ctaReveal.ref}
          className={`${styles.finalCta} ${ctaReveal.isVisible ? styles.revealed : ""}`}
        >
          <div className={`container ${styles.finalCtaInner}`}>
            <h2 className={styles.finalCtaTitle}>
              Ready to turn your idea into reality?
            </h2>
            <p className={styles.finalCtaSubtitle}>
              Join hundreds of Nigerian builders who stopped waiting and started shipping.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/ideas/new" className={styles.ctaPrimary}>
                <Lightbulb size={20} weight="duotone" />
                Start Building Today
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link href="/feed" className={styles.ctaGhost}>
                Explore the Community
              </Link>
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
        </section>

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
