"use client";

import Link from "next/link";
import { useState } from "react";
import { Trophy, AirplaneTilt, ShoppingCart, RocketLaunch, Handshake, Lightbulb, ChartLineUp, Users, CaretUp, Lightning } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import styles from "./community.module.css";

interface CommunityTool {
    id: number;
    title: string;
    description: string;
    author: string;
    authorInitials: string;
    votes: number;
    category: string;
    status: string;
    icon: React.ReactNode;
}

const TOOLS_OF_THE_MONTH: CommunityTool[] = [
    {
        id: 1,
        title: "Generator Fuel Calculator",
        description: "Calculate fuel consumption, predict costs, save money. Already serving 2,000+ Nigerian homes!",
        author: "Fatima B.",
        authorInitials: "FB",
        votes: 412,
        category: "Utility",
        status: "March Winner",
        icon: <Lightning size={32} weight="duotone" className={styles.toolIcon} />,
    },
    {
        id: 2,
        title: "Japa Checklist & Timeline",
        description: "Track your relocation journey step-by-step. Visa, docs, savings — all in one dashboard.",
        author: "Olumide K.",
        authorInitials: "OK",
        votes: 356,
        category: "Productivity",
        status: "Runner-up",
        icon: <AirplaneTilt size={32} weight="duotone" className={styles.toolIcon} />,
    },
    {
        id: 3,
        title: "Market Price Tracker",
        description: "Compare food prices across Lagos markets in real-time. Save up to ₦15,000/month on groceries.",
        author: "Ibrahim S.",
        authorInitials: "IS",
        votes: 298,
        category: "Commerce",
        status: "3rd Place",
        icon: <ShoppingCart size={32} weight="duotone" className={styles.toolIcon} />,
    },
];

const NOMINATIONS = [
    { id: 4, title: "WhatsApp Order Manager", votes: 247, author: "Adaeze C.", initials: "AC" },
    { id: 5, title: "Aso-Ebi Contribution Tracker", votes: 198, author: "Chidinma E.", initials: "CE" },
    { id: 6, title: "NEPA Bill Splitter", votes: 167, author: "Grace A.", initials: "GA" },
    { id: 7, title: "Artisan Finder", votes: 142, author: "Tola M.", initials: "TM" },
    { id: 8, title: "POS Receipt Manager", votes: 118, author: "Blessing E.", initials: "BE" },
];

const RECENT_UPDATES = [
    { icon: <RocketLaunch size={20} weight="duotone" />, text: "Generator Fuel Calculator shipped and went live!", time: "2 hours ago" },
    { icon: <Trophy size={20} weight="duotone" />, text: "March voting period is now closed — results are in!", time: "5 hours ago" },
    { icon: <Handshake size={20} weight="duotone" />, text: "Olumide K. got matched with mentor Yusuf Ibrahim", time: "1 day ago" },
    { icon: <Lightbulb size={20} weight="duotone" />, text: "12 new ideas submitted this week", time: "2 days ago" },
    { icon: <ChartLineUp size={20} weight="duotone" />, text: "Community hit 1,200 members!", time: "3 days ago" },
];

export default function CommunityPage() {
    const [votedTools, setVotedTools] = useState<Set<number>>(new Set());

    const handleVote = (id: number) => {
        setVotedTools((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <div className={styles.page}>
            <Navbar />

            <div className={`container ${styles.content}`}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerIconWrapper}>
                        <Users size={32} weight="duotone" className={styles.headerIcon} />
                    </div>
                    <h1 className={styles.title}>Community Hub</h1>
                    <p className={styles.subtitle}>
                        Vote for the Community Tool of the Month. Top-voted tools get priority-built!
                    </p>
                </div>

                {/* Tool of the Month Banner */}
                <div className={styles.winnerBanner}>
                    <div className={styles.winnerGlow} />
                    <div className={styles.winnerContent}>
                        <span className={styles.winnerBadge}><Trophy size={16} weight="fill" /> Tool of the Month — March 2026</span>
                        <h2 className={styles.winnerTitle}>
                            <div className={styles.winnerIconContainer}>{TOOLS_OF_THE_MONTH[0].icon}</div>
                            {TOOLS_OF_THE_MONTH[0].title}
                        </h2>
                        <p className={styles.winnerDesc}>{TOOLS_OF_THE_MONTH[0].description}</p>
                        <div className={styles.winnerMeta}>
                            <div className={styles.winnerAuthor}>
                                <div className={styles.avatarMini}>{TOOLS_OF_THE_MONTH[0].authorInitials}</div>
                                <span>by {TOOLS_OF_THE_MONTH[0].author}</span>
                            </div>
                            <span className={styles.winnerVotes}><CaretUp size={16} weight="bold" /> {TOOLS_OF_THE_MONTH[0].votes} votes</span>
                        </div>
                        <Link href="/feed" className="btn btn-accent" style={{ marginTop: "var(--space-6)", alignSelf: "flex-start", padding: "var(--space-3) var(--space-6)" }}>
                            Try It Now
                        </Link>
                    </div>
                </div>

                <div className={styles.communityGrid}>
                    {/* Left: Rankings + Nominations */}
                    <div className={styles.mainCol}>
                        {/* Top 3 */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>March Rankings</h2>
                            <div className={styles.rankingsGrid}>
                                {TOOLS_OF_THE_MONTH.map((tool, i) => (
                                    <div key={tool.id} className={`${styles.rankCard} ${i === 0 ? styles.rankFirst : ""}`}>
                                        <div className={styles.rankHeader}>
                                            <div className={styles.rankIconContainer}>{tool.icon}</div>
                                            <span className={styles.rankBadge}>
                                                {i === 0 && <Trophy size={14} weight="fill" />} {tool.status}
                                            </span>
                                        </div>
                                        <h3 className={styles.rankTitle}>{tool.title}</h3>
                                        <p className={styles.rankDesc}>{tool.description}</p>
                                        <div className={styles.rankFooter}>
                                            <div className={styles.rankAuthor}>
                                                <div className={styles.avatarMini}>{tool.authorInitials}</div>
                                                <span>{tool.author}</span>
                                            </div>
                                            <span className={styles.rankVotes}><CaretUp size={16} weight="bold" /> {tool.votes}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nominations for Next Month */}
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>April Nominations</h2>
                                <p className={styles.sectionSubtitle}>Voting closes March 31. Cast your votes!</p>
                            </div>
                            <div className={styles.nominationsList}>
                                {NOMINATIONS.map((nom, i) => (
                                    <div key={nom.id} className={styles.nominationCard}>
                                        <span className={styles.nomRank}>{i + 1}</span>
                                        <div className={styles.nomInfo}>
                                            <h3 className={styles.nomTitle}>{nom.title}</h3>
                                            <div className={styles.nomAuthor}>
                                                <div className={styles.avatarMicro}>{nom.initials}</div>
                                                <span>{nom.author}</span>
                                            </div>
                                        </div>
                                        <button
                                            className={`${styles.voteBtn} ${votedTools.has(nom.id) ? styles.voted : ""}`}
                                            onClick={() => handleVote(nom.id)}
                                        >
                                            <CaretUp size={18} weight="bold" />
                                            <span className={styles.voteCount}>
                                                {nom.votes + (votedTools.has(nom.id) ? 1 : 0)}
                                            </span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className={styles.sidebar}>
                        {/* Stats */}
                        <div className={styles.statsCard}>
                            <h3 className={styles.sidebarTitle}>Community Stats</h3>
                            <div className={styles.statsList}>
                                <div className={styles.statRow}><span>Members</span><strong>1,247</strong></div>
                                <div className={styles.statRow}><span>Ideas Submitted</span><strong>253</strong></div>
                                <div className={styles.statRow}><span>Tools Shipped</span><strong>12</strong></div>
                                <div className={styles.statRow}><span>Active Projects</span><strong>8</strong></div>
                                <div className={styles.statRow}><span>Mentors Online</span><strong className={styles.online}>7</strong></div>
                            </div>
                        </div>

                        {/* Recent Updates */}
                        <div className={styles.updatesCard}>
                            <h3 className={styles.sidebarTitle}>Recent Updates</h3>
                            <div className={styles.updatesList}>
                                {RECENT_UPDATES.map((update, i) => (
                                    <div key={i} className={styles.updateItem}>
                                        <div className={styles.updateIconWrapper}>{update.icon}</div>
                                        <div className={styles.updateBody}>
                                            <p className={styles.updateText}>{update.text}</p>
                                            <span className={styles.updateTime}>{update.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className={styles.ctaCard}>
                            <div className={styles.ctaIcon}><Lightbulb size={24} weight="duotone" /></div>
                            <h3>Got a Tool Idea?</h3>
                            <p>Submit it and the community might vote it to the top!</p>
                            <Link href="/ideas/new" className="btn btn-accent" style={{ width: "100%", marginTop: "var(--space-2)" }}>
                                Submit Your Idea
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
