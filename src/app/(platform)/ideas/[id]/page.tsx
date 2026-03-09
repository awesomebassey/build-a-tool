"use client";

import Link from "next/link";
import { ArrowLeft, CaretUp, ChatCircle, CheckCircle, CircleDashed, RocketLaunch, ArrowRight } from "@phosphor-icons/react";
import styles from "./idea-detail.module.css";

const IDEA = {
    id: 1,
    title: "WhatsApp Order Manager for Small Shops",
    description:
        "A simple tool that helps small shop owners in Lagos manage orders that come through WhatsApp. Track inventory, send receipts, and see daily sales summary. The tool would integrate with WhatsApp Business API to automatically capture orders from customer messages, organize them into a clean dashboard, and generate daily reports.",
    problem:
        "Small shop owners in Nigeria receive dozens of orders via WhatsApp daily. They struggle to keep track of what's been ordered, what's been paid for, and what's left in stock. Most use pen and paper or just their memory, which leads to lost orders and angry customers.",
    author: "Adaeze C.",
    authorInitials: "AC",
    votes: 147,
    category: "E-Commerce",
    status: "Building",
    comments: [
        { id: 1, author: "Emeka O.", initials: "EO", content: "This would save my mum's shop so much time! She spends 2 hours daily just tracking orders manually.", time: "3 days ago" },
        { id: 2, author: "Chidi N.", initials: "CN", content: "I'd love to be the mentor on this one. The WhatsApp Business API integration is very doable. Let me know!", time: "2 days ago" },
        { id: 3, author: "Fatima B.", initials: "FB", content: "Can we also add a feature to send payment reminders? Some customers order but forget to pay 😅", time: "1 day ago" },
        { id: 4, author: "Adaeze C.", initials: "AC", content: "@Chidi Yes please! And @Fatima great idea, payment reminders would be super useful!", time: "1 day ago" },
    ],
};

export default function IdeaDetailPage() {
    return (
        <div className={styles.page}>
            <nav className={styles.nav}>
                <div className={`container ${styles.navInner}`}>
                    <Link href="/feed" className={styles.backBtn}>
                        <ArrowLeft size={20} /> Back to Feed
                    </Link>
                </div>
            </nav>

            <div className={`container ${styles.content}`}>
                <div className={styles.ideaLayout}>
                    <div className={styles.mainCol}>
                        {/* Header */}
                        <div className={styles.ideaHeader}>
                            <div className={styles.ideaMeta}>
                                <span className="badge badge-warm">{IDEA.status}</span>
                                <span className="badge badge-gold">{IDEA.category}</span>
                            </div>
                            <h1 className={styles.ideaTitle}>{IDEA.title}</h1>
                            <div className={styles.ideaAuthor}>
                                <div className="avatar">{IDEA.authorInitials}</div>
                                <div>
                                    <strong>{IDEA.author}</strong>
                                    <span className={styles.authorSub}>Submitted 2 days ago</span>
                                </div>
                            </div>
                        </div>

                        {/* Problem */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>The Problem</h2>
                            <p className={styles.sectionText}>{IDEA.problem}</p>
                        </div>

                        {/* Description */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>The Solution</h2>
                            <p className={styles.sectionText}>{IDEA.description}</p>
                        </div>

                        {/* Comments */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <div className={styles.sectionIconWrapper}><ChatCircle size={20} weight="duotone" /></div>
                                Discussion ({IDEA.comments.length})
                            </h2>
                            <div className={styles.commentsList}>
                                {IDEA.comments.map((c) => (
                                    <div key={c.id} className={styles.comment}>
                                        <div className="avatar avatar-sm">{c.initials}</div>
                                        <div className={styles.commentBody}>
                                            <div className={styles.commentHeader}>
                                                <strong>{c.author}</strong>
                                                <span className={styles.commentTime}>{c.time}</span>
                                            </div>
                                            <p className={styles.commentText}>{c.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.commentForm}>
                                <textarea className="input textarea" placeholder="Add a comment..." rows={2} style={{ flex: 1, minHeight: "60px" }} />
                                <button className="btn btn-primary">Post</button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className={styles.sidebar}>
                        <div className={`card ${styles.voteCard}`}>
                            <div className={styles.voteCount}>
                                <CaretUp size={32} weight="bold" className={styles.voteArrow} />
                                <span className={styles.voteNumber}>{IDEA.votes}</span>
                                <span className={styles.voteLabel}>upvotes</span>
                            </div>
                            <button className="btn btn-primary" style={{ width: "100%" }}>
                                <CaretUp size={16} weight="bold" /> Upvote Idea
                            </button>
                        </div>

                        <div className={`card ${styles.statusCard}`}>
                            <h3 className={styles.sidebarTitle}>Project Status</h3>
                            <div className={styles.statusTimeline}>
                                <div className={`${styles.statusStep} ${styles.statusDone}`}>
                                    <div className={styles.statusIcon}><CheckCircle size={20} weight="fill" /></div>
                                    <span>Idea Submitted</span>
                                </div>
                                <div className={`${styles.statusStep} ${styles.statusDone}`}>
                                    <div className={styles.statusIcon}><CheckCircle size={20} weight="fill" /></div>
                                    <span>Community Voted</span>
                                </div>
                                <div className={`${styles.statusStep} ${styles.statusActive}`}>
                                    <div className={styles.statusIcon}><CircleDashed size={20} weight="bold" /></div>
                                    <span>Mentor Matched</span>
                                </div>
                                <div className={styles.statusStep}>
                                    <div className={styles.statusIcon}><CircleDashed size={20} /></div>
                                    <span>Building</span>
                                </div>
                                <div className={styles.statusStep}>
                                    <div className={styles.statusIcon}><RocketLaunch size={20} /></div>
                                    <span>Shipped</span>
                                </div>
                            </div>
                        </div>

                        <div className={`card ${styles.mentorCard}`}>
                            <h3 className={styles.sidebarTitle}>Assigned Mentor</h3>
                            <div className={styles.assignedMentor}>
                                <div className="avatar">CN</div>
                                <div>
                                    <div className={styles.mentorName}>Chidi Nwosu</div>
                                    <div className={styles.mentorRole}>Full-Stack Developer</div>
                                </div>
                            </div>
                            <Link href="/workspace/1" className="btn btn-outline" style={{ width: "100%", marginTop: "var(--space-4)" }}>
                                Open Workspace <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
