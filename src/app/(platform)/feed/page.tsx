"use client";

import Link from "next/link";
import { useState } from "react";
import { MagnifyingGlass, CaretUp, ChatCircle, RocketLaunch, ShareNetwork, CircleDashed } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { m, AnimatePresence } from "motion/react";
import { Card } from "@/components/ui/card";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function FeedPage() {
    const [votedIdeas, setVotedIdeas] = useState<Set<number>>(new Set());
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
        return activeCategory === "All" || idea.category === activeCategory;
    }).sort((a, b) => {
        if (sortBy === "Most Votes") return b.votes - a.votes;
        if (sortBy === "Most Comments") return b.comments - a.comments;
        return 0;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Shipped":
                return "text-emerald-600 border-emerald-200/60 bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800/60 dark:bg-emerald-950/30";
            case "Building":
                return "text-[var(--color-accent-light)] border-[rgba(108,60,225,0.25)] bg-[rgba(108,60,225,0.06)]";
            case "New":
                return "text-[var(--color-gold)] border-[rgba(255,184,0,0.25)] bg-[rgba(255,184,0,0.06)]";
            default:
                return "text-muted-foreground border-[var(--color-border-light)] bg-[var(--color-surface-2)]";
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Navbar />

            <div className="container mx-auto max-w-[850px] px-6 pb-24 pt-[calc(var(--nav-height)+3rem)]">
                {/* Page Header */}
                <m.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
                >
                    <div className="max-w-[500px]">
                        <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
                            Idea Feed
                        </h1>
                        <p className="mt-3 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                            Upvote the tools you want built. The community decides what gets built next.
                        </p>
                    </div>
                    <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button asChild size="lg" className="h-14 rounded-2xl px-8 shadow-xl">
                            <Link href="/ideas/new" className="flex items-center gap-2">
                                Submit Your Idea <RocketLaunch size={18} weight="duotone" />
                            </Link>
                        </Button>
                    </m.div>
                </m.div>

                {/* Sort Tabs */}
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 flex gap-2 overflow-x-auto pb-2"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <button
                            key={opt}
                            className={`flex h-11 shrink-0 items-center whitespace-nowrap rounded-2xl border px-6 text-[13px] font-bold uppercase tracking-widest transition-all duration-300 ${
                                sortBy === opt
                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_8px_20px_rgba(230,126,34,0.3)]"
                                    : "border-[var(--color-border-light)] bg-[var(--color-surface-glass)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-secondary)] hover:text-foreground"
                            }`}
                            onClick={() => setSortBy(opt)}
                        >
                            {opt}
                        </button>
                    ))}
                </m.div>

                {/* Category Tabs */}
                <m.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12 flex gap-2 overflow-x-auto pb-4"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            className={`flex h-11 shrink-0 items-center whitespace-nowrap rounded-2xl border px-6 text-[13px] font-bold uppercase tracking-widest transition-all duration-300 ${
                                activeCategory === cat
                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_8px_20px_rgba(230,126,34,0.3)]"
                                    : "border-[var(--color-border-light)] bg-[var(--color-surface-glass)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-secondary)] hover:text-foreground"
                            }`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </m.div>

                {/* Ideas List */}
                <m.div 
                    className="flex flex-col gap-6"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {filteredIdeas.map((idea) => (
                        <m.div key={idea.id} variants={item}>
                            <Card className="liquid-glass group relative overflow-hidden p-0 transition-all duration-500 hover:shadow-[var(--shadow-md),0_0_40px_var(--color-primary-glow)]">
                                {/* Hover Glow */}
                                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-primary-glow)] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                
                                <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
                                    <m.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${
                                            votedIdeas.has(idea.id)
                                                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_8px_20px_rgba(230,126,34,0.3)]"
                                                : "border-[var(--color-border-light)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                                        }`}
                                        onClick={() => handleVote(idea.id)}
                                        aria-label={`Upvote ${idea.title}`}
                                        id={`vote-${idea.id}`}
                                    >
                                        <CaretUp
                                            size={28}
                                            weight={votedIdeas.has(idea.id) ? "bold" : "regular"}
                                            className={`transition-transform duration-300 ${
                                                votedIdeas.has(idea.id) ? "-translate-y-1" : "group-hover:-translate-y-1"
                                            }`}
                                        />
                                        <span className="mt-1 font-mono text-base font-bold">
                                            {idea.votes + (votedIdeas.has(idea.id) ? 1 : 0)}
                                        </span>
                                    </m.button>

                                    <div className="min-w-0 flex-1">
                                        <div className="mb-4 flex flex-wrap items-center gap-3">
                                            <Badge variant="outline" className={`h-7 gap-1.5 px-3 font-bold uppercase tracking-widest text-[10px] ${getStatusStyle(idea.status)}`}>
                                                {idea.status === "Shipped" ? (
                                                    <><RocketLaunch size={14} weight="fill" /> Shipped</>
                                                ) : idea.status === "Building" ? (
                                                    <><CircleDashed size={14} weight="bold" className="animate-spin" /> Building</>
                                                ) : (
                                                    idea.status
                                                )}
                                            </Badge>
                                            <div className="h-1 w-1 rounded-full bg-[var(--color-border)]" />
                                            <span className="text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
                                                {idea.category}
                                            </span>
                                            <div className="h-1 w-1 rounded-full bg-[var(--color-border)]" />
                                            <span className="text-[13px] font-medium text-[var(--color-text-secondary)] opacity-60">{idea.timeAgo}</span>
                                        </div>

                                        <Link href={`/ideas/${idea.id}`} className="group/title block">
                                            <h3 className="mb-3 font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover/title:text-[var(--color-primary)]">
                                                {idea.title}
                                            </h3>
                                        </Link>
                                        <p className="mb-6 line-clamp-2 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                                            {idea.description}
                                        </p>

                                        <div className="flex flex-col gap-6 border-t border-[var(--color-border-light)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-3)] text-xs font-bold uppercase text-foreground shadow-inner">
                                                    {idea.authorInitials}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-foreground">{idea.author}</span>
                                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] opacity-60">Contributor</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="flex h-10 items-center gap-2 rounded-xl bg-[var(--color-surface-2)] px-4 text-[13px] font-bold text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-surface-3)] hover:text-foreground">
                                                    <ChatCircle size={20} weight="duotone" className="text-[var(--color-primary)]" /> {idea.comments}
                                                </button>
                                                <button className="flex h-10 items-center gap-2 rounded-xl bg-[var(--color-surface-2)] px-4 text-[13px] font-bold text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-surface-3)] hover:text-foreground">
                                                    <ShareNetwork size={20} weight="duotone" className="text-[var(--color-primary)]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </m.div>
                    ))}

                    {filteredIdeas.length === 0 && (
                        <m.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="liquid-glass mt-12 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[var(--color-border)] p-20 text-center"
                        >
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]">
                                <MagnifyingGlass size={40} weight="thin" />
                            </div>
                            <h3 className="mb-3 font-heading text-2xl font-semibold text-foreground">No ideas found</h3>
                            <p className="max-w-[400px] text-lg text-[var(--color-text-secondary)]">
                                Try a different search or category, or{" "}
                                <Link href="/ideas/new" className="font-bold text-[var(--color-primary)] underline decoration-[var(--color-primary)] decoration-2 underline-offset-4 transition-opacity hover:opacity-80">
                                    submit your own idea
                                </Link>.
                            </p>
                        </m.div>
                    )}
                </m.div>
            </div>
        </div>
    );
}
