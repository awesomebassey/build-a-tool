"use client";

import Link from "next/link";
import { useState } from "react";
import { SparkleIcon, RocketLaunchIcon, ArrowLeftIcon, LightbulbIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { m } from "motion/react";

const CATEGORIES = [
    "E-Commerce",
    "Finance",
    "Utility",
    "Productivity",
    "Social",
    "Commerce",
    "Service",
    "Education",
    "Health",
    "Entertainment",
    "Other",
];

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

export default function NewIdeaPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [problem, setProblem] = useState("");
    const [audience, setAudience] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
                <m.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center p-8 text-center max-w-[800px]"
                >
                    <m.div 
                        initial={{ rotate: -15, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="mb-10 flex h-28 w-28 items-center justify-center rounded-[2.5rem] border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 shadow-[0_20px_40px_rgba(230,126,34,0.1)]"
                    >
                        <SparkleIcon size={56} weight="duotone" className="text-[var(--color-primary)]" />
                    </m.div>
                    <m.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-heading mb-6 text-5xl font-bold tracking-tight text-foreground md:text-7xl"
                    >
                        Idea Submitted!
                    </m.h1>
                    <m.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-14 max-w-[600px] text-xl leading-relaxed text-[var(--color-text-secondary)] opacity-80"
                    >
                        &ldquo;{title}&rdquo; is now live on the community feed. Share it to get more upvotes and attract your first mentor.
                    </m.p>
                    <m.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-6"
                    >
                        <Button asChild size="lg" className="h-16 px-10 text-lg font-bold shadow-xl shadow-[var(--color-primary)]/20">
                            <Link href="/feed" className="flex items-center gap-3">
                                View on Feed <ArrowUpRightIcon size={20} weight="bold" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => setSubmitted(false)} className="h-16 px-10 text-lg font-bold border-[var(--color-border-light)] hover:bg-[var(--color-surface-2)]">
                            Submit Another
                        </Button>
                    </m.div>
                </m.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-foreground">
            <m.nav 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-50 border-b border-[var(--color-border-light)] bg-[var(--color-surface-glass)] backdrop-blur-2xl"
            >
                <div className="container mx-auto flex h-[var(--nav-height)] items-center justify-between px-6">
                    <Link href="/feed" className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]">
                        <ArrowLeftIcon size={16} weight="bold" /> Back to Feed
                    </Link>
                </div>
            </m.nav>

            <div className="container mx-auto py-16 px-6 pb-32">
                <m.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="mx-auto max-w-[720px]"
                >
                    <m.div variants={item} className="mb-16 text-center">
                        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-1)] shadow-inner">
                            <LightbulbIcon size={40} weight="duotone" className="text-[var(--color-primary)]" />
                        </div>
                        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">Tell us everything.</h1>
                        <p className="mt-5 text-lg leading-relaxed text-[var(--color-text-secondary)] opacity-80">
                            Describe the tool you want built. The community votes, a mentor steps in, and AI builds it.
                        </p>
                        <p className="mt-4 text-[13px] font-medium text-[var(--color-text-secondary)] opacity-60">4 fields · Takes ~2 minutes</p>
                    </m.div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                        <m.div variants={item}>
                            <label htmlFor="title" className="mb-4 block text-[13px] font-bold uppercase tracking-widest opacity-60 pl-1">
                                Tool Name <span className="text-[var(--color-primary)]">*</span>
                            </label>
                            <div className="group relative">
                                <input
                                    id="title"
                                    type="text"
                                    className="h-16 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5 text-[16px] font-medium text-foreground transition-all focus:border-[var(--color-primary)] focus:outline-none"
                                    placeholder="e.g. WhatsApp Order Manager for Small Shops"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    maxLength={100}
                                />
                                <span className="absolute right-5 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold opacity-30">{title.length}/100</span>
                            </div>
                        </m.div>

                        <m.div variants={item}>
                            <label htmlFor="category" className="mb-4 block text-[13px] font-bold uppercase tracking-widest opacity-60 pl-1">
                                Category <span className="text-[var(--color-primary)]">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="category"
                                    className="h-16 w-full cursor-pointer appearance-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5 py-3 text-[16px] font-medium text-foreground transition-all focus:border-[var(--color-primary)] focus:outline-none"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 opacity-40">
                                    <ArrowUpRightIcon size={16} weight="bold" className="rotate-45" />
                                </div>
                            </div>
                        </m.div>

                        <m.div variants={item}>
                            <label htmlFor="problem" className="mb-4 block text-[13px] font-bold uppercase tracking-widest opacity-60 pl-1">
                                What problem does this solve? <span className="text-[var(--color-primary)]">*</span>
                            </label>
                            <textarea
                                id="problem"
                                className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5 text-[16px] font-medium text-foreground transition-all focus:border-[var(--color-primary)] focus:outline-none min-h-[140px] resize-none"
                                placeholder="E.g. 'Small shop owners struggle to track WhatsApp orders and often lose track of payments.'"
                                value={problem}
                                onChange={(e) => setProblem(e.target.value)}
                                required
                            />
                        </m.div>

                        <m.div variants={item}>
                            <label htmlFor="description" className="mb-4 block text-[13px] font-bold uppercase tracking-widest opacity-60 pl-1">
                                Describe your tool idea <span className="text-[var(--color-primary)]">*</span>
                            </label>
                            <div className="group relative">
                                <textarea
                                    id="description"
                                    className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5 text-[16px] font-medium text-foreground transition-all focus:border-[var(--color-primary)] focus:outline-none min-h-[200px] resize-none"
                                    placeholder="What features would it have? The more info, the better the AI can scaffold it."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                <span className="absolute right-5 bottom-5 font-mono text-[10px] font-bold opacity-30">{description.length} chars</span>
                            </div>
                        </m.div>

                        <m.div variants={item}>
                            <label htmlFor="audience" className="mb-4 block text-[13px] font-bold uppercase tracking-widest opacity-60 pl-1">
                                Who would use this? (optional)
                            </label>
                            <input
                                id="audience"
                                type="text"
                                className="h-16 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5 text-[16px] font-medium text-foreground transition-all focus:border-[var(--color-primary)] focus:outline-none"
                                placeholder="e.g. Small business owners in Lagos, University students, etc."
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                            />
                        </m.div>

                        <m.div variants={item}>
                            <Card className="p-8 border-[var(--color-border-light)] bg-[var(--color-surface-glass)] backdrop-blur-md">
                                <h4 className="mb-5 flex items-center gap-3 text-[13px] font-bold uppercase tracking-widest text-[var(--color-primary)]"><SparkleIcon size={20} weight="duotone" /> Tips for a Great Submission</h4>
                                <ul className="space-y-4">
                                    {[
                                        "Be specific about the problem — who has it and why it matters.",
                                        "Give examples of how the tool would work day-to-day.",
                                        "Don't worry about technical details — that is what mentors are for.",
                                        "Tools that help many people tend to get priority."
                                    ].map((tip, i) => (
                                        <li key={i} className="flex gap-4 text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[10px] font-bold text-[var(--color-primary)]">{i+1}</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </m.div>

                        <m.div variants={item}>
                            <button
                                type="submit"
                                className="shimmer-btn flex w-full items-center justify-center gap-3 rounded-2xl px-12 py-7 text-xl font-bold text-white shadow-xl shadow-[var(--color-primary)]/20 transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.98]"
                                id="submit-idea"
                            >
                                Submit to Community Feed <RocketLaunchIcon size={24} weight="fill" />
                            </button>
                        </m.div>
                    </form>
                </m.div>
            </div>
        </div>
    );
}
