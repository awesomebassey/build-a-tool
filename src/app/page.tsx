"use client";

import Link from "next/link";
import { Wrench, Lightbulb, TrendUp, ArrowRight, Star, Robot, Play, Quotes } from "@phosphor-icons/react";
import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import { useEffect, useState } from "react";

const HOW_IT_WORKS_STEPS = [
  {
    icon: <Lightbulb weight="duotone" size={32} />,
    title: "1. Write Your Vision",
    description: "Don't write code. Just describe your problem in plain English. Our platform formats it into a technical spec instantly.",
  },
  {
    icon: <TrendUp weight="duotone" size={32} />,
    title: "2. The Community Reacts",
    description: "Ideas are published to the feed. The tools that help the most Nigerians get upvoted to the top of the queue.",
  },
  {
    icon: <Robot weight="duotone" size={32} />,
    title: "3. AI & Mentors Build",
    description: "An expert mentor claims your idea and orchestrates AI agents to build, test, and deploy the application live.",
  },
];

const FEATURED_TOOLS = [
  { name: "WhatsApp Inventory Sync", author: "Chidi N.", category: "Logistics", likes: 342 },
  { name: "Naira Invoice Gen", author: "Aisha M.", category: "Finance", likes: 289 },
  { name: "Lagos Traffic Predictor", author: "Tobi O.", category: "Utility", likes: 156 },
  { name: "Local Market Prices", author: "Ngozi A.", category: "Commerce", likes: 412 },
  { name: "Pharmacy Stock Alert", author: "Dayo K.", category: "Health", likes: 198 },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        {/* ---- HERO: Cinematic & Breathing ---- */}
        <section className={styles.hero}>
          <div className={styles.haloGlow} />
          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeDot} />
              The Premium Workspace for Non-Technical Founders
            </div>

            <h1 className={styles.heroTitle}>
              Your ideas, built by AI
              <br />
              <span className={styles.textHighlight}>perfected by experts.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Stop waiting for a technical co-founder. Describe your tool, get matched with an elite mentor, and launch in days using collaborative AI.
            </p>

            <div className={styles.heroInputContainer}>
              <div className={styles.liquidInputArea}>
                <div className={styles.inputPrefix}>
                  <Lightbulb size={24} weight="duotone" color="var(--color-primary)" />
                </div>
                <input
                  type="text"
                  placeholder="e.g., I need a tool that syncs WhatsApp orders to Google Sheets..."
                  className={styles.liquidInput}
                  disabled
                />
                <Link href="/ideas/new" className={styles.liquidSubmit}>
                  Launch <ArrowRight weight="bold" />
                </Link>
              </div>
            </div>

            {/* Simulated UI Window */}
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
                      <CheckCircle weight="fill" color="var(--color-primary)" /> Requirements
                    </div>
                    <div className={styles.mockupStepActive}>
                      <CheckCircle weight="fill" color="var(--color-primary)" /> MVP Code
                    </div>
                    <div className={styles.mockupStep}>
                      <span className={styles.spinner} /> Deployment
                    </div>
                  </div>
                  <div className={styles.mockupContent}>
                    <div className={styles.mockupChat}>
                      <div className={styles.chatBubbleBot}>
                        <strong>Agent Alpha:</strong> I have generated the Next.js components for the inventory dashboard.
                      </div>
                      <div className={styles.chatBubbleUser}>
                        <strong>Mentor Aisha:</strong> Good. Now implement the WhatsApp webhooks in the API route. Let's make sure latency is under 200ms for 3G networks.
                      </div>
                      <div className={styles.chatBubbleBot}>
                        <strong>Agent Beta:</strong> Webhooks configured and optimized. Ready to test.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- HOW IT WORKS (Storytelling) ---- */}
        <section id="how-it-works" className={styles.howItWorks}>
          <div className="container">
            <div className={styles.storyHeader}>
              <h2 className={styles.storyTitle}>From Idea to Production.</h2>
              <p className={styles.storySubtitle}>Execute faster than ever before with the Liquid Workflow.</p>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineLine}>
                <div className={styles.timelineGlow} />
              </div>

              <div className={styles.timelineSteps}>
                {HOW_IT_WORKS_STEPS.map((step, i) => (
                  <div key={i} className={styles.timelineStep}>
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

        {/* ---- FEATURED CAROUSEL ---- */}
        <section className={styles.featuredSection}>
          <div className="container">
            <div className={styles.storyHeader}>
              <h2 className={styles.storyTitle}>Built by the Community.</h2>
              <p className={styles.storySubtitle}>Explore tools vibecoded by non-technical founders this week.</p>
            </div>
          </div>

          <div className={styles.carouselWrapper}>
            <div className={styles.carouselTrack}>
              {FEATURED_TOOLS.map((tool, i) => (
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
              {/* Duplicate for infinite scroll */}
              {FEATURED_TOOLS.map((tool, i) => (
                <div key={`dup-${i}`} className={styles.toolCard}>
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

        {/* ---- TESTIMONIAL ORBS ---- */}
        <section className={styles.testimonialSection}>
          <div className="container">
            <div className={styles.orbContainer}>
              <div className={styles.testimonialOrb}>
                <Quotes size={48} weight="fill" className={styles.orbQuoteIcon} />
                <p className={styles.orbText}>
                  "The community voted for my idea on Tuesday. A mentor reached out that night. By Friday, I had a working prototype that solved my inventory problem. This platform is the absolute truth."
                </p>
                <div className={styles.orbAuthor}>
                  <div className={styles.orbAvatar}>FD</div>
                  <div className={styles.orbMeta}>
                    <strong>Funke Dada</strong>
                    <span>Logistics Founder, Lagos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

// Icon helper to avoid missing import
function CheckCircle({ color, weight }: { color: string, weight: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={color} viewBox="0 0 256 256">
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path>
    </svg>
  )
}
