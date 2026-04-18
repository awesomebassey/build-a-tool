"use client";

import Link from "next/link";
import { ArrowLeft, CaretUp, ChatCircle, CheckCircle, CircleDashed, RocketLaunch, ArrowRight, Lightning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { m, AnimatePresence } from "motion/react";

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

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function IdeaDetailPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <m.nav 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-50 border-b border-[var(--color-border-light)] bg-[var(--color-surface-glass)] backdrop-blur-2xl"
            >
                <div className="container mx-auto flex h-[var(--nav-height)] items-center justify-between px-6">
                    <Link href="/feed" className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] transition-all hover:text-[var(--color-primary)]">
                        <ArrowLeft size={20} weight="bold" /> Back to Feed
                    </Link>
                </div>
            </m.nav>

            <m.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="container mx-auto py-16 px-6 pb-32"
            >
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
                    <div>
                        {/* Header */}
                        <m.div variants={item} className="mb-14">
                            <div className="mb-6 flex gap-3">
                                <Badge variant="outline" className="h-6 border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                                    {IDEA.status}
                                </Badge>
                                <Badge variant="outline" className="h-6 border-[#FFB800]/20 bg-[#FFB800]/10 px-3 text-[10px] font-bold uppercase tracking-widest text-[#FFB800]">
                                    {IDEA.category}
                                </Badge>
                            </div>
                            <h1 className="font-heading mb-8 text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">{IDEA.title}</h1>
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-surface-3)] text-sm font-bold shadow-sm">
                                    {IDEA.authorInitials}
                                </div>
                                <div>
                                    <div className="text-[15px] font-bold text-foreground">{IDEA.author}</div>
                                    <div className="mt-0.5 text-[13px] font-medium text-[var(--color-text-secondary)] opacity-60">Submitted 2 days ago</div>
                                </div>
                            </div>
                        </m.div>

                        <div className="space-y-20">
                            {/* Problem */}
                            <m.div variants={item}>
                                <h2 className="font-heading mb-6 text-2xl font-bold tracking-tight text-foreground">
                                    The Problem
                                </h2>
                                <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl lg:leading-loose">{IDEA.problem}</p>
                            </m.div>

                            {/* Description */}
                            <m.div variants={item}>
                                <h2 className="font-heading mb-6 text-2xl font-bold tracking-tight text-foreground">
                                    The Solution
                                </h2>
                                <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl lg:leading-loose">{IDEA.description}</p>
                            </m.div>

                            {/* Comments */}
                            <m.div variants={item} className="pt-10 border-t border-[var(--color-border-light)]">
                                <h2 className="font-heading mb-10 flex items-center gap-4 text-2xl font-bold tracking-tight text-foreground">
                                    <ChatCircle size={28} weight="duotone" className="text-[var(--color-primary)]" />
                                    Discussion ({IDEA.comments.length})
                                </h2>
                                <div className="space-y-10">
                                    {IDEA.comments.map((c) => (
                                        <div key={c.id} className="flex gap-6 group">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-3)] text-xs font-bold text-foreground transition-transform group-hover:scale-105">
                                                {c.initials}
                                            </div>
                                            <div className="flex-1">
                                                <div className="mb-2 flex items-baseline gap-4">
                                                    <span className="text-[15px] font-bold text-foreground">{c.author}</span>
                                                    <span className="font-mono text-[11px] font-medium opacity-40 uppercase tracking-wider">{c.time}</span>
                                                </div>
                                                <p className="text-[16px] leading-[1.6] text-[var(--color-text-secondary)]">{c.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 group">
                                    <div className="relative flex gap-4 p-1.5 pl-6 bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-2xl transition-all focus-within:border-[var(--color-primary)]">
                                        <textarea 
                                            className="flex-1 bg-transparent py-4 text-base font-medium text-foreground placeholder:opacity-40 focus:outline-none min-h-[50px] resize-none" 
                                            placeholder="Join the conversation..." 
                                            rows={1} 
                                        />
                                        <Button className="h-[50px] px-8 font-bold shadow-lg shadow-[var(--color-primary)]/20">
                                            Reply
                                        </Button>
                                    </div>
                                </div>
                            </m.div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--nav-height)+4rem)]">
                        <m.div variants={item}>
                            <Card className="flex flex-col items-center gap-6 p-10 border-[var(--color-border)] bg-[var(--color-surface-1)] shadow-xl shadow-[var(--color-primary-glow)]/5">
                                <div className="flex flex-col items-center gap-1">
                                    <CaretUp size={40} weight="bold" className="mb-2 text-[var(--color-primary)]" />
                                    <span className="text-6xl font-black leading-none tracking-tighter text-foreground">{IDEA.votes}</span>
                                    <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] opacity-60">Total Upvotes</span>
                                </div>
                                <Button className="h-14 w-full text-base font-bold shadow-xl shadow-[var(--color-primary)]/20 transition-all hover:scale-[1.02] hover:brightness-110">
                                    Upvote Idea <Lightning size={20} weight="fill" className="ml-2" />
                                </Button>
                            </Card>
                        </m.div>

                        <m.div variants={item}>
                            <Card className="p-8 border-[var(--color-border-light)] bg-[var(--color-surface-glass)] backdrop-blur-md">
                                <h3 className="mb-8 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] opacity-60">Project Roadmap</h3>
                                <div className="space-y-8">
                                    {[
                                        { label: "Idea Submitted", icon: CheckCircle, status: "complete" },
                                        { label: "Community Voted", icon: CheckCircle, status: "complete" },
                                        { label: "Mentor Matched", icon: CircleDashed, status: "current" },
                                        { label: "Building", icon: CircleDashed, status: "upcoming" },
                                        { label: "Shipped", icon: RocketLaunch, status: "upcoming" },
                                    ].map((step, i) => (
                                        <div key={i} className="relative flex items-center gap-5 group last:after:hidden">
                                            {i < 4 && (
                                                <div className={`absolute left-3 top-8 bottom-[-16px] w-0.5 ${step.status === "complete" ? "bg-[var(--color-primary)]" : "bg-[var(--color-border-light)]"}`} />
                                            )}
                                            <div className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${
                                                step.status === "complete" ? "bg-[var(--color-primary)] text-white" : 
                                                step.status === "current" ? "border-2 border-[var(--color-primary)] bg-[var(--color-surface-1)] text-[var(--color-primary)] animate-pulse" :
                                                "border-2 border-[var(--color-border-light)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] opacity-40"
                                            }`}>
                                                <step.icon size={14} weight={step.status === "complete" ? "bold" : "regular"} />
                                            </div>
                                            <span className={`text-[14px] font-bold tracking-tight transition-all ${
                                                step.status === "complete" ? "text-foreground" : 
                                                step.status === "current" ? "text-[var(--color-primary)]" : 
                                                "text-[var(--color-text-secondary)] opacity-40"
                                            }`}>{step.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </m.div>

                        <m.div variants={item}>
                            <Card className="p-8 border-[var(--color-border)] bg-[var(--color-surface-1)]">
                                <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] opacity-60">Assigned Mentor</h3>
                                <div className="mb-6 flex items-center gap-5">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-3)] text-base font-bold shadow-inner">
                                        CN
                                    </div>
                                    <div>
                                        <div className="text-[16px] font-bold text-foreground">Chidi Nwosu</div>
                                        <div className="mt-0.5 text-[13px] font-medium text-[var(--color-text-secondary)] opacity-60">Full-Stack Architect</div>
                                    </div>
                                </div>
                                <Button asChild variant="outline" className="h-12 w-full font-bold border-[var(--color-border-light)] hover:bg-[var(--color-surface-2)]">
                                    <Link href="/workspace/1" className="flex items-center gap-2">
                                        Open Workspace <ArrowRight size={18} weight="bold" />
                                    </Link>
                                </Button>
                            </Card>
                        </m.div>
                    </div>
                </div>
            </m.div>
        </div>
    );
}
