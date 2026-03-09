"use client";

import Link from "next/link";
import { useState } from "react";
import { MagnifyingGlass, CaretUp, ChatCircle, RocketLaunch, Lightbulb, ShareNetwork, Sparkle, CircleDashed } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import styles from "./feed.module.css";

interface Idea {
    id: number;
    title: string;
    description: string;
    author: string;
    authorInitials: string;
    votes: number;
    category: string;
    status: "Voting" | "Building" | "Shipped" | "New";
    comments: number;
    timeAgo: string;
}

const SAMPLE_IDEAS: Idea[] = [
    {
        id: 1,
        title: "WhatsApp Order Manager for Small Shops",
        description:
            "A simple tool that helps small shop owners in Lagos manage orders that come through WhatsApp. Track inventory, send receipts, see daily sales summary.",
        author: "Adaeze C.",
        authorInitials: "AC",
        votes: 147,
        category: "E-Commerce",
        status: "Building",
        comments: 23,
        timeAgo: "2d ago",
    },
    {
        id: 2,
        title: "Naira Budget Tracker for Students",
        description:
            "Monthly budget app designed for Nigerian students. Track allowances, NYSC allawee, and expenses in Naira with simple categories.",
        author: "Emeka O.",
        authorInitials: "EO",
        votes: 89,
        category: "Finance",
        status: "Voting",
        comments: 15,
        timeAgo: "5d ago",
    },
    {
        id: 3,
        title: "Generator Fuel Calculator",
        description:
            "Calculate how much fuel your generator uses per hour, predict monthly fuel costs, and get tips to reduce consumption. Every Nigerian needs this abeg!",
        author: "Fatima B.",
        authorInitials: "FB",
        votes: 203,
        category: "Utility",
        status: "Shipped",
        comments: 41,
        timeAgo: "1w ago",
    },
    {
        id: 4,
        title: "Japa Checklist & Timeline Builder",
        description:
            "Step-by-step guide for Nigerians planning to relocate abroad. Track visa applications, document prep, savings goals, and deadlines all in one place.",
        author: "Olumide K.",
        authorInitials: "OK",
        votes: 312,
        category: "Productivity",
        status: "Building",
        comments: 67,
        timeAgo: "3d ago",
    },
    {
        id: 5,
        title: "Aso-Ebi Contribution Tracker",
        description:
            "Track who has paid for aso-ebi, who owes, send reminders via WhatsApp or SMS. No more chasing people for owambe cloth money!",
        author: "Chidinma E.",
        authorInitials: "CE",
        votes: 178,
        category: "Social",
        status: "Voting",
        comments: 34,
        timeAgo: "1d ago",
    },
    {
        id: 6,
        title: "Market Price Comparison App",
        description:
            "Compare prices of food items across markets in your city (Mile 12, Balogun, Wuse). Help Nigerians find where to buy cheaper.",
        author: "Ibrahim S.",
        authorInitials: "IS",
        votes: 256,
        category: "Commerce",
        status: "New",
        comments: 45,
        timeAgo: "12h ago",
    },
    {
        id: 7,
        title: "NEPA/Electricity Bill Splitter",
        description:
            "For people sharing prepaid meters in compounds. Calculate each flat's usage, split bills fairly, and keep a history. No more wahala!",
        author: "Grace A.",
        authorInitials: "GA",
        votes: 134,
        category: "Utility",
        status: "Voting",
        comments: 28,
        timeAgo: "4d ago",
    },
    {
        id: 8,
        title: "Artisan Finder (Plumber, Electrician, etc.)",
        description:
            "Find verified, rated artisans near you. Book plumbers, electricians, carpenters, etc. Include reviews and pricing. Like Uber for handymen.",
        author: "Tola M.",
        authorInitials: "TM",
        votes: 98,
        category: "Service",
        status: "New",
        comments: 12,
        timeAgo: "6h ago",
    },
];

const CATEGORIES = [
    "All",
    "E-Commerce",
    "Finance",
    "Utility",
    "Productivity",
    "Social",
    "Commerce",
    "Service",
];

const SORT_OPTIONS = ["Most Votes", "Newest", "Most Comments"];

export default function FeedPage() {
    const [votedIdeas, setVotedIdeas] = useState<Set<number>>(new Set());
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Most Votes");

    const handleVote = (ideaId: number) => {
        setVotedIdeas((prev) => {
            const next = new Set(prev);
            if (next.has(ideaId)) {
                next.delete(ideaId);
            } else {
                next.add(ideaId);
            }
            return next;
        });
    };

    const filteredIdeas = SAMPLE_IDEAS.filter((idea) => {
        const matchesSearch =
            idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            idea.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            activeCategory === "All" || idea.category === activeCategory;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        if (sortBy === "Most Votes") return b.votes - a.votes;
        if (sortBy === "Most Comments") return b.comments - a.comments;
        return 0;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Shipped":
                return "badge-accent";
            case "Building":
                return "badge-warm";
            case "New":
                return "badge-gold";
            default:
                return "badge-primary";
        }
    };

    return (
        <div className={styles.feedPage}>
            <Navbar />

            <div className={`container ${styles.feedContent}`}>
                {/* Page Header */}
                <div className={styles.feedHeader}>
                    <div>
                        <h1 className={styles.feedTitle}>
                            <Sparkle size={28} weight="duotone" className={styles.headerIcon} />
                            Idea Feed
                        </h1>
                        <p className={styles.feedSubtitle}>
                            Upvote the tools you want built. The community decides what gets built next.
                        </p>
                    </div>
                    <Link href="/ideas/new" className="btn btn-primary">
                        Submit Your Idea <RocketLaunch size={16} weight="duotone" />
                    </Link>
                </div>

                {/* Search + Filter Bar */}
                <div className={styles.filterBar}>
                    <div className={styles.searchBox}>
                        <MagnifyingGlass size={20} className={styles.searchIcon} />
                        <input
                            type="text"
                            className="input"
                            placeholder="Search ideas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            id="search-ideas"
                        />
                    </div>

                    <div className={styles.filterControls}>
                        <select
                            className={`input ${styles.sortSelect}`}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            id="sort-ideas"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="tabs">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            className={`tab ${activeCategory === cat ? "active" : ""}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Ideas List */}
                <div className={styles.ideaList}>
                    {filteredIdeas.map((idea) => (
                        <div key={idea.id} className={`card ${styles.ideaCard}`}>
                            <button
                                className={`${styles.voteBtn} ${votedIdeas.has(idea.id) ? styles.voteBtnActive : ""}`}
                                onClick={() => handleVote(idea.id)}
                                aria-label={`Upvote ${idea.title}`}
                                id={`vote-${idea.id}`}
                            >
                                <CaretUp size={24} weight={votedIdeas.has(idea.id) ? "bold" : "regular"} className={styles.voteArrow} />
                                <span className={styles.voteCount}>
                                    {idea.votes + (votedIdeas.has(idea.id) ? 1 : 0)}
                                </span>
                            </button>

                            <div className={styles.ideaContent}>
                                <div className={styles.ideaMeta}>
                                    <span className={`${styles.statusBadge} ${styles[getStatusBadge(idea.status)]}`}>
                                        {idea.status === "Shipped" ? (
                                            <><RocketLaunch size={14} weight="fill" /> Shipped</>
                                        ) : idea.status === "Building" ? (
                                            <><CircleDashed size={14} weight="duotone" className="spin" /> Building</>
                                        ) : idea.status}
                                    </span>
                                    <span className={styles.categoryBadge}>{idea.category}</span>
                                    <span className={styles.timeAgo}>{idea.timeAgo}</span>
                                </div>

                                <Link href={`/ideas/${idea.id}`} className={styles.ideaLink}>
                                    <h3 className={styles.ideaTitle}>{idea.title}</h3>
                                </Link>
                                <p className={styles.ideaDesc}>{idea.description}</p>

                                <div className={styles.ideaFooter}>
                                    <div className={styles.ideaAuthor}>
                                        <div className="avatar">{idea.authorInitials}</div>
                                        <span>{idea.author}</span>
                                    </div>
                                    <div className={styles.ideaActions}>
                                        <span className={styles.actionItem}><ChatCircle size={18} /> {idea.comments}</span>
                                        <button className={styles.actionBtn}><ShareNetwork size={18} /> Share</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredIdeas.length === 0 && (
                        <div className={styles.emptyState}>
                            <MagnifyingGlass size={48} weight="thin" className={styles.emptyIcon} />
                            <h3 className={styles.emptyTitle}>No ideas found</h3>
                            <p className={styles.emptyText}>
                                Try a different search or category, or{" "}
                                <Link href="/ideas/new" className={styles.emptyLink}>
                                    submit your own idea
                                </Link>.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
