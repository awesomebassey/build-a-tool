"use client";

import Link from "next/link";
import { useState } from "react";
import { Trophy, AirplaneTilt, ShoppingCart, RocketLaunch, Handshake, Lightbulb, ChartLineUp, Users, CaretUp, Lightning, ArrowUpRight } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { m, AnimatePresence } from "motion/react";

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
        description: "Calculate fuel consumption, predict costs, and save money. Already serving 2,000+ Nigerian homes!",
        author: "Fatima B.",
        authorInitials: "FB",
        votes: 412,
        category: "Utility",
        status: "March Winner",
        icon: <Lightning size={32} weight="duotone" />,
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
        icon: <AirplaneTilt size={32} weight="duotone" />,
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
        icon: <ShoppingCart size={32} weight="duotone" />,
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

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

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
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Navbar />

            <div className="container mx-auto pb-32 pt-[calc(var(--nav-height)+4rem)] px-6">
                {/* Header */}
                <m.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-20 flex flex-col items-center text-center"
                >
                    <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] border border-[var(--color-border-light)] bg-[var(--color-surface-glass)] backdrop-blur-md shadow-inner">
                        <Users size={40} weight="duotone" className="text-[var(--color-primary)]" />
                    </div>
                    <h1 className="font-heading mb-6 text-5xl font-bold tracking-tight text-foreground md:text-7xl">Community Hub</h1>
                    <p className="mx-auto max-w-[640px] text-xl leading-relaxed text-[var(--color-text-secondary)] opacity-80">
                        Vote for the next community built tool. Top-voted ideas get priority matching with our elite mentors.
                    </p>
                </m.div>

                {/* Tool of the Month Banner */}
                <m.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="liquid-glass group relative mb-24 overflow-hidden rounded-[3rem] p-10 md:p-20 shadow-[var(--shadow-lg)]"
                >
                    <div className="absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(230,126,34,0.08),transparent_70%)] transition-transform duration-1000 group-hover:scale-110" />
                    <div className="relative z-10 flex max-w-[700px] flex-col">
                        <Badge variant="outline" className="mb-8 h-auto self-start border-[var(--color-gold)]/20 bg-[var(--color-gold)]/10 py-1.5 px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                            <Trophy size={16} weight="fill" className="mr-2" /> March Winner
                        </Badge>
                        <h2 className="font-heading mb-6 flex items-center gap-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20">
                                {TOOLS_OF_THE_MONTH[0].icon}
                            </div>
                            {TOOLS_OF_THE_MONTH[0].title}
                        </h2>
                        <p className="mb-10 text-xl leading-relaxed text-[var(--color-text-secondary)] opacity-80 md:text-2xl">{TOOLS_OF_THE_MONTH[0].description}</p>
                        <div className="flex flex-wrap items-center gap-10 border-t border-[var(--color-border-light)] pt-8">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-3)] text-sm font-bold opacity-80">{TOOLS_OF_THE_MONTH[0].authorInitials}</div>
                                <span className="text-[15px] font-bold text-foreground">by {TOOLS_OF_THE_MONTH[0].author}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xl font-black tracking-tighter text-[var(--color-primary)]">
                                <CaretUp size={24} weight="bold" /> {TOOLS_OF_THE_MONTH[0].votes}
                                <span className="ml-1 text-[10px] font-bold uppercase tracking-widest opacity-40">votes</span>
                            </div>
                        </div>
                        <Button asChild size="lg" className="mt-10 h-16 self-start px-10 text-lg font-bold shadow-xl shadow-[var(--color-primary)]/20">
                            <Link href="/feed" className="flex items-center gap-3">
                                Try It Now <ArrowUpRight size={20} weight="bold" />
                            </Link>
                        </Button>
                    </div>
                </m.div>

                <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_420px] lg:gap-24">
                    {/* Left: Rankings + Nominations */}
                    <m.div variants={container} initial="hidden" animate="show" className="space-y-24">
                        {/* Top 3 */}
                        <m.div variants={item}>
                            <h2 className="font-heading mb-10 text-3xl font-bold tracking-tight text-foreground">March Rankings</h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {TOOLS_OF_THE_MONTH.map((tool, i) => (
                                    <Card key={tool.id} className={`liquid-glass p-8 transition-all duration-300 hover:-translate-y-2 ${
                                        i === 0 ? "ring-2 ring-[var(--color-gold)] ring-offset-4 ring-offset-background" : ""
                                    }`}>
                                        <div className="mb-8 flex items-center justify-between">
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                                                i === 0
                                                ? "border-[var(--color-gold)]/20 bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                                                : "border-[var(--color-border-light)] bg-[var(--color-surface-2)] text-foreground opacity-60"
                                            }`}>{tool.icon}</div>
                                            <Badge variant="outline" className={`h-6 border-none px-0 text-[10px] font-bold uppercase tracking-widest ${i === 0 ? "text-[#FFB800]" : "opacity-40"}`}>
                                                {i === 0 && <Trophy size={14} weight="fill" className="mr-1 inline" />} {tool.status}
                                            </Badge>
                                        </div>
                                        <h3 className="mb-3 text-[18px] font-bold leading-tight text-foreground">{tool.title}</h3>
                                        <p className="mb-8 text-[14px] leading-relaxed text-[var(--color-text-secondary)] opacity-70">{tool.description}</p>
                                        <div className="mt-auto flex w-full items-center justify-between border-t border-[var(--color-border-light)] pt-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-surface-3)] text-[10px] font-bold opacity-60">{tool.authorInitials}</div>
                                                <span className="text-[13px] font-bold">{tool.author}</span>
                                            </div>
                                            <span className="flex items-center gap-1 text-[16px] font-black text-[var(--color-primary)]"><CaretUp size={18} weight="bold" /> {tool.votes}</span>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </m.div>

                        {/* Nominations for Next Month */}
                        <m.div variants={item}>
                            <div className="mb-10">
                                <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">April Nominations</h2>
                                <p className="mt-3 text-lg font-medium text-[var(--color-text-secondary)] opacity-60">Voting closes March 31. Every vote counts.</p>
                            </div>
                            <div className="space-y-4">
                                {NOMINATIONS.map((nom, i) => (
                                    <m.div 
                                        key={nom.id} 
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="liquid-glass group relative flex items-center gap-8 rounded-3xl p-6 transition-all hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-md),0_0_24px_var(--color-primary-glow)]"
                                    >
                                        <span className="font-mono text-2xl font-black text-[var(--color-text-secondary)] opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all">{i + 1}</span>
                                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                                            <h3 className="text-[18px] font-bold tracking-tight text-foreground">{nom.title}</h3>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--color-surface-3)] text-[9px] font-bold opacity-60">{nom.initials}</div>
                                                <span className="text-[13px] font-medium opacity-60">{nom.author}</span>
                                            </div>
                                        </div>
                                        <button
                                            className={`flex h-[72px] min-w-[72px] flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                                                votedTools.has(nom.id)
                                                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20"
                                                : "border-[var(--color-border-light)] bg-[var(--color-surface-glass)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] active:scale-95"
                                            }`}
                                            onClick={() => handleVote(nom.id)}
                                        >
                                            <CaretUp size={24} weight="bold" className={votedTools.has(nom.id) ? "animate-bounce" : ""} />
                                            <span className="font-mono text-[15px] font-black">
                                                {nom.votes + (votedTools.has(nom.id) ? 1 : 0)}
                                            </span>
                                        </button>
                                    </m.div>
                                ))}
                            </div>
                        </m.div>
                    </m.div>

                    {/* Right Sidebar */}
                    <m.div variants={item} className="flex flex-col gap-10 lg:sticky lg:top-[calc(var(--nav-height)+6rem)]">
                        {/* Stats */}
                        <Card className="liquid-glass p-8">
                            <h3 className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">Network Health</h3>
                            <div className="space-y-1">
                                {[
                                    { label: "Members", value: "1,247" },
                                    { label: "Ideas Submitted", value: "253" },
                                    { label: "Tools Shipped", value: "12" },
                                    { label: "Active Project", value: "8" },
                                    { label: "Mentors Online", value: "7", primary: true },
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-[var(--color-border-light)] py-5 last:border-0">
                                        <span className="text-[14px] font-bold opacity-60">{stat.label}</span>
                                        <strong className={`font-mono text-xl font-bold ${stat.primary ? "text-[var(--color-primary)]" : "text-foreground"}`}>
                                            {stat.value}
                                        </strong>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Recent Updates */}
                        <Card className="p-8 border-[var(--color-border-light)] bg-[var(--color-surface-glass)] backdrop-blur-md">
                            <h3 className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">Live Feed</h3>
                            <div className="space-y-10">
                                {RECENT_UPDATES.map((update, i) => (
                                    <div key={i} className="flex items-start gap-5 group">
                                        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] shadow-sm transition-transform group-hover:scale-110">
                                            <div className="text-[var(--color-primary)]">{update.icon}</div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <p className="text-[14px] font-bold leading-snug text-foreground opacity-90">{update.text}</p>
                                            <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-30">{update.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* CTA */}
                        <Card className="flex flex-col items-center p-10 text-center border-none bg-gradient-to-br from-[#111] to-[#1a1a1a] text-white shadow-2xl">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)] shadow-xl shadow-[var(--color-primary)]/20">
                                <Lightbulb size={32} weight="duotone" />
                            </div>
                            <h3 className="font-heading mb-4 text-2xl font-bold tracking-tight">Got a Tool Idea?</h3>
                            <p className="mb-8 text-[15px] font-medium opacity-60 leading-relaxed">Submit it and let the community vote it to life. Mentorship awaits.</p>
                            <Button asChild size="lg" className="h-14 w-full text-base font-bold shadow-xl shadow-[var(--color-primary)]/20">
                                <Link href="/ideas/new">
                                    Submit Your Idea
                                </Link>
                            </Button>
                        </Card>
                    </m.div>
                </div>
            </div>
        </div>
    );
}
