"use client";

import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon, GoogleLogoIcon, ArrowLeftIcon, LightbulbIcon, CodeIcon, WrenchIcon, QuotesIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { m } from "motion/react";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
};

export default function SignupPage() {
    const [role, setRole] = useState<"founder" | "mentor">("founder");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Supabase auth
        alert("Signup coming soon! 🚀");
    };

    return (
        <div className="grid min-h-screen grid-cols-1 bg-[var(--color-bg)] lg:grid-cols-2">
            <m.div 
                className="relative z-10 flex flex-col justify-center bg-[var(--color-bg)] p-8 pb-12 pt-24 lg:p-12"
                initial="hidden"
                animate="visible"
                variants={stagger}
            >
                <m.div variants={fadeUp} className="absolute left-6 top-8 lg:left-12 lg:top-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-200 hover:-translate-x-1 hover:text-foreground"
                    >
                        <ArrowLeftIcon size={18} weight="bold" /> Back to home
                    </Link>
                </m.div>

                <div className="mx-auto w-full max-w-[420px]">
                    <m.div variants={fadeUp} className="mb-10 mt-4">
                        <Link href="/" className="mb-8 inline-flex items-center gap-2 font-heading text-xl font-bold tracking-tight">
                            <WrenchIcon size={24} weight="duotone" className="text-[var(--color-primary)]" />
                            <span>Build<span className="text-[var(--color-primary)]">A</span>Tool</span>
                        </Link>
                        <h1 className="mb-3 font-heading text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
                            Create account
                        </h1>
                        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                            Join 1,200+ Nigerians building tools with AI.
                        </p>
                    </m.div>

                    <m.form variants={fadeUp} onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Role Selection */}
                        <div className="space-y-3">
                            <Label className="text-[13px] font-semibold uppercase tracking-wider opacity-60">I want to…</Label>
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant={role === "founder" ? "default" : "outline"}
                                    onClick={() => setRole("founder")}
                                    className="h-14 flex-1 gap-2"
                                >
                                    <LightbulbIcon size={20} weight={role === "founder" ? "fill" : "duotone"} /> Submit Ideas
                                </Button>
                                <Button
                                    type="button"
                                    variant={role === "mentor" ? "default" : "outline"}
                                    onClick={() => setRole("mentor")}
                                    className={`h-14 flex-1 gap-2 transition-all duration-300 ${
                                        role === "mentor" 
                                            ? "bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] shadow-[0_4px_14px_rgba(108,60,225,0.3)]" 
                                            : ""
                                    }`}
                                >
                                    <CodeIcon size={20} weight={role === "mentor" ? "fill" : "duotone"} /> Be a Mentor
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="fullName" className="text-[13px] font-semibold uppercase tracking-wider opacity-60">Full name</Label>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="e.g. Chidi Nwosu"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-[13px] font-semibold uppercase tracking-wider opacity-60">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="password" className="text-[13px] font-semibold uppercase tracking-wider opacity-60">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Minimum 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pr-12"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center p-2 text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon size={22} weight="duotone" />
                                    ) : (
                                        <EyeIcon size={22} weight="duotone" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="h-14 w-full text-base font-semibold mt-2">
                            Create Account
                        </Button>

                        <div className="my-2 flex items-center gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest before:h-px before:flex-1 before:bg-[var(--color-border)] after:h-px after:flex-1 after:bg-[var(--color-border)]">
                            <span>or</span>
                        </div>

                        <Button type="button" variant="outline" size="lg" className="h-14 w-full gap-3 font-semibold">
                            <GoogleLogoIcon size={20} weight="bold" className="text-[#4285F4]" /> Continue with Google
                        </Button>
                    </m.form>

                    <m.p variants={fadeUp} className="mt-10 text-center text-sm font-medium text-[var(--color-text-secondary)]">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-bold text-foreground underline decoration-[var(--color-primary)] decoration-2 underline-offset-4 transition-all duration-200 hover:text-[var(--color-primary)]"
                        >
                            Log in
                        </Link>
                    </m.p>
                </div>
            </m.div>

            <div className="relative hidden items-center justify-center overflow-hidden border-l border-[var(--color-border)] bg-[var(--color-bg)] p-12 lg:flex">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-40">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
                    <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[var(--color-accent)] to-transparent" />
                </div>

                <div className="relative z-10 max-w-[480px]">
                    <m.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="liquid-glass rounded-3xl p-12 shadow-[0_24px_80px_rgba(0,0,0,0.1)]"
                    >
                        <QuotesIcon size={48} weight="fill" className="mb-8 rotate-180 opacity-20 text-[var(--color-accent)]" />
                        <p className="mb-10 text-2xl font-medium leading-relaxed tracking-tight text-foreground">
                            &ldquo;The community voted for my idea. A mentor reached out the next day. Two weeks
                            later, I had a working prototype. This platform is the real deal.&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border-light)] bg-[var(--color-accent)] text-sm font-bold text-white shadow-lg">
                                FD
                            </div>
                            <div>
                                <strong className="text-lg font-bold text-foreground tracking-tight">Funke Dada</strong>
                                <p className="text-sm font-medium text-[var(--color-text-secondary)]">Entrepreneur, Lagos</p>
                            </div>
                        </div>
                    </m.div>
                </div>
            </div>
        </div>
    );
}
