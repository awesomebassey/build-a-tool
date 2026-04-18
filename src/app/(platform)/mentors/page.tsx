"use client";

import Link from "next/link";
import { useState } from "react";
import { Star, CheckCircle, ChatCircle, Calendar, Users, RocketLaunch, Pulse } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Mentor {
    id: number;
    name: string;
    initials: string;
    role: string;
    bio: string;
    skills: string[];
    sessionsCompleted: number;
    rating: number;
    hourlyRate: string;
    availability: string;
    projectsShipped: number;
}

// ... keeping mentors array exactly as is, it's defined right above the component in the real file but we must include it if we are replacing the whole file content. Wait, my replacement starts from line 1... yes, I must include MENTORS.
const MENTORS: Mentor[] = [
    {
        id: 1,
        name: "Chidi Nwosu",
        initials: "CN",
        role: "Full-Stack Developer",
        bio: "5 years building web apps. Specializes in helping non-tech founders translate ideas into working prototypes using AI-assisted development.",
        skills: ["React", "Node.js", "AI/ML", "Next.js"],
        sessionsCompleted: 34,
        rating: 4.9,
        hourlyRate: "₦15,000",
        availability: "Available",
        projectsShipped: 8,
    },
    {
        id: 2,
        name: "Aisha Muhammad",
        initials: "AM",
        role: "Product Designer & Developer",
        bio: "Designer turned developer. I help you think through your product from the user's perspective AND build it. Double wahala for your competitors!",
        skills: ["UI/UX", "Flutter", "Firebase", "Figma"],
        sessionsCompleted: 28,
        rating: 4.8,
        hourlyRate: "₦12,000",
        availability: "Available",
        projectsShipped: 6,
    },
    {
        id: 3,
        name: "Oluwaseun Adeyemi",
        initials: "OA",
        role: "Backend Architect",
        bio: "I build systems that scale. From Paystack integrations to real-time features, I make sure your tool's backend is solid as rock.",
        skills: ["Python", "AWS", "PostgreSQL", "APIs"],
        sessionsCompleted: 41,
        rating: 5.0,
        hourlyRate: "₦20,000",
        availability: "Busy — next slot in 3 days",
        projectsShipped: 12,
    },
    {
        id: 4,
        name: "Nneka Okafor",
        initials: "NO",
        role: "Mobile App Developer",
        bio: "Cross-platform mobile specialist. If your tool needs to be an app on people's phones, I'm your person. Made apps used by 50K+ Nigerians.",
        skills: ["React Native", "Swift", "Kotlin", "Firebase"],
        sessionsCompleted: 22,
        rating: 4.7,
        hourlyRate: "₦18,000",
        availability: "Available",
        projectsShipped: 5,
    },
    {
        id: 5,
        name: "Yusuf Ibrahim",
        initials: "YI",
        role: "AI & Automation Specialist",
        bio: "I teach AI agents to do exactly what you want. Expert at vibecoding workflows, prompt engineering, and setting up automations that save hours.",
        skills: ["OpenAI", "LangChain", "Python", "Automation"],
        sessionsCompleted: 19,
        rating: 4.9,
        hourlyRate: "₦25,000",
        availability: "Available",
        projectsShipped: 7,
    },
    {
        id: 6,
        name: "Folake Adeniyi",
        initials: "FA",
        role: "No-Code & Low-Code Expert",
        bio: "Not everything needs custom code. I help you figure out the fastest path to your MVP — sometimes that's Bubble, sometimes it's vibecoding, sometimes both.",
        skills: ["Bubble", "Airtable", "Zapier", "Webflow"],
        sessionsCompleted: 56,
        rating: 4.8,
        hourlyRate: "₦10,000",
        availability: "Available",
        projectsShipped: 15,
    },
];

const SKILL_FILTERS = ["All", "React", "Python", "AI/ML", "Flutter", "UI/UX", "Firebase", "Node.js"];

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

export default function MentorsPage() {
    const [activeSkill, setActiveSkill] = useState("All");
    const [sortBy, setSortBy] = useState("Rating");
    const [requestedMentors, setRequestedMentors] = useState<Set<number>>(new Set());

    const handleRequest = (mentorId: number) => {
        setRequestedMentors((prev) => {
            const next = new Set(prev);
            next.add(mentorId);
            return next;
        });
    };

    const filtered = MENTORS.filter((m) => {
        return activeSkill === "All" || m.skills.includes(activeSkill);
    }).sort((a, b) => {
        const parseRate = (r: string) => parseInt(r.replace(/[^\d]/g, ""));
        if (sortBy === "Price: Low → High") return parseRate(a.hourlyRate) - parseRate(b.hourlyRate);
        if (sortBy === "Price: High → Low") return parseRate(b.hourlyRate) - parseRate(a.hourlyRate);
        if (sortBy === "Most Sessions") return b.sessionsCompleted - a.sessionsCompleted;
        return b.rating - a.rating; // default: Rating
    });

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Navbar />

            <div className="container mx-auto px-6 pb-24 pt-[calc(var(--nav-height)+3rem)]">
                {/* Page Header */}
                <m.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 max-w-[700px]"
                >
                    <h1 className="font-heading text-5xl font-semibold tracking-tight text-foreground lg:text-6xl">
                        Expert Mentors
                    </h1>
                    <p className="mt-4 text-xl leading-relaxed text-[var(--color-text-secondary)]">
                        Real humans who will guide you and the AI to build exactly what you want.
                    </p>
                </m.div>

                {/* Stats */}
                <m.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {[
                        { label: "Active Mentors", value: "48", icon: Users },
                        { label: "Sessions This Month", value: "156", icon: ChatCircle },
                        { label: "Avg Rating", value: "4.8", icon: Star, suffix: true },
                        { label: "Tools Shipped", value: "53", icon: RocketLaunch },
                    ].map((stat, idx) => (
                        <m.div key={idx} variants={item}>
                            <Card className="liquid-glass group flex flex-col justify-center p-8 transition-all duration-500 hover:shadow-[var(--shadow-md),0_0_40px_var(--color-primary-glow)]">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-2)] text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-white">
                                    <stat.icon size={20} weight={idx === 2 ? "fill" : "duotone"} />
                                </div>
                                <div className="flex items-end gap-1 text-4xl font-bold tracking-tight text-foreground">
                                    {stat.value}
                                    {stat.suffix && <Star size={20} weight="fill" className="mb-1 text-[var(--color-primary)]" />}
                                </div>
                                <div className="mt-2 text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">
                                    {stat.label}
                                </div>
                            </Card>
                        </m.div>
                    ))}
                </m.div>

                {/* Sort Buttons */}
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8 flex gap-2 overflow-x-auto pb-2"
                >
                    {[
                        { value: "Rating", label: "Top Rated" },
                        { value: "Price: Low → High", label: "Price: Low → High" },
                        { value: "Price: High → Low", label: "Price: High → Low" },
                        { value: "Most Sessions", label: "Most Sessions" },
                    ].map((opt) => (
                        <button
                            key={opt.value}
                            className={`flex h-11 shrink-0 items-center whitespace-nowrap rounded-2xl border px-6 text-[13px] font-bold uppercase tracking-widest transition-all duration-300 ${
                                sortBy === opt.value
                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_8px_20px_rgba(230,126,34,0.3)]"
                                    : "border-[var(--color-border)] bg-[var(--color-surface-glass)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-secondary)] hover:text-foreground"
                            }`}
                            onClick={() => setSortBy(opt.value)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </m.div>

                <m.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-12 flex gap-2 overflow-x-auto pb-4"
                >
                    {SKILL_FILTERS.map((skill) => (
                        <button
                            key={skill}
                            className={`flex h-11 shrink-0 items-center whitespace-nowrap rounded-2xl border px-6 text-[13px] font-bold uppercase tracking-widest transition-all duration-300 ${
                                activeSkill === skill
                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_8px_20px_rgba(230,126,34,0.3)]"
                                    : "border-[var(--color-border)] bg-[var(--color-surface-glass)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-secondary)] hover:text-foreground"
                            }`}
                            onClick={() => setActiveSkill(skill)}
                        >
                            {skill}
                        </button>
                    ))}
                </m.div>

                {/* Mentor Grid */}
                <m.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {filtered.map((mentor) => (
                        <m.div key={mentor.id} variants={item}>
                            <Card className="liquid-glass group flex h-full flex-col p-0 transition-all duration-500 hover:shadow-[var(--shadow-lg),0_0_40px_var(--color-primary-glow)]">
                                <div className="p-8">
                                    <div className="mb-6 flex items-start justify-between">
                                        <div className="relative">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-surface-3)] text-xl font-bold uppercase text-foreground shadow-inner">
                                                {mentor.initials}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-primary)] text-white shadow-sm">
                                                <CheckCircle size={14} weight="fill" />
                                            </div>
                                        </div>
                                        <div
                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                                                mentor.availability === "Available" 
                                                    ? "bg-[rgba(0,165,99,0.1)] text-[var(--color-primary-light)]" 
                                                    : "bg-[rgba(255,184,0,0.1)] text-[#FFB800]"
                                            }`}
                                        >
                                            <div className={`h-1.5 w-1.5 rounded-full ${mentor.availability === "Available" ? "bg-[var(--color-primary)] animate-pulse" : "bg-[#FFB800]"}`} />
                                            {mentor.availability}
                                        </div>
                                    </div>

                                    <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">{mentor.name}</h3>
                                    <p className="mt-1 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">{mentor.role}</p>
                                    <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">{mentor.bio}</p>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {mentor.skills.map((skill) => (
                                            <Badge key={skill} variant="outline" className="h-auto border-[var(--color-border-light)] bg-[var(--color-surface-2)] py-0.5 px-2.5 font-bold text-[10px] uppercase tracking-wider opacity-80">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="mt-8 grid grid-cols-3 gap-4 border-y border-[var(--color-border-light)] py-4 font-mono">
                                        <div className="flex flex-col">
                                            <span className="flex items-center gap-1 text-[13px] font-bold text-foreground">
                                                <Star size={14} weight="fill" className="text-[var(--color-primary)]" /> {mentor.rating}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] opacity-60">Rating</span>
                                        </div>
                                        <div className="flex flex-col border-x border-[var(--color-border-light)] px-4">
                                            <span className="flex items-center gap-1 text-[13px] font-bold text-foreground">
                                                <RocketLaunch size={14} weight="duotone" className="text-[var(--color-primary)]" /> {mentor.projectsShipped}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] opacity-60">Shipped</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="flex items-center gap-1 text-[13px] font-bold text-foreground">
                                                <ChatCircle size={14} weight="duotone" className="text-[var(--color-primary)]" /> {mentor.sessionsCompleted}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] opacity-60">Sessions</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-baseline gap-1">
                                        <span className="text-3xl font-bold tracking-tight text-foreground">{mentor.hourlyRate}</span>
                                        <span className="text-sm font-semibold text-[var(--color-text-secondary)] opacity-60">/hour</span>
                                    </div>
                                </div>

                                <div className="mt-auto border-t border-[var(--color-border-light)] bg-[var(--color-surface-glass)]/60 p-6 flex flex-col gap-3 rounded-b-2xl">
                                    {requestedMentors.has(mentor.id) ? (
                                        <Button variant="outline" className="h-12 w-full cursor-not-allowed border-[var(--color-primary)] text-[var(--color-primary)]" disabled>
                                            <CheckCircle size={18} weight="bold" /> Request Sent
                                        </Button>
                                    ) : (
                                        <Button
                                            className="h-12 w-full font-bold shadow-lg shadow-[var(--color-primary-glow)]"
                                            onClick={() => handleRequest(mentor.id)}
                                        >
                                            Request Mentor
                                        </Button>
                                    )}
                                    <Button asChild variant="outline" className="h-12 w-full font-bold">
                                        <Link href="/bookings">
                                            <Calendar size={18} weight="bold" /> Book 1:1 Session
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </m.div>
                    ))}
                </m.div>
            </div>
        </div>
    );
}
