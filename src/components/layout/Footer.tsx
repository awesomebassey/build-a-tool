"use client";

import Link from "next/link";
import { Wrench, GithubLogo, TwitterLogo, InstagramLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="relative mt-24 overflow-hidden border-t border-border bg-[var(--color-surface-1)] pb-8 pt-16">
            <div className="container relative z-10 flex flex-col gap-12">
                <div className="flex flex-col justify-between gap-12 md:flex-row">
                    <div className="max-w-[360px]">
                        <Link href="/" className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                            <Wrench size={24} weight="duotone" className="text-[var(--color-primary)]" />
                            <span>Build<span className="text-[var(--color-primary)] font-bold">A</span>Tool</span>
                        </Link>
                        <p className="mb-8 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                            Nigeria&apos;s safe vibecoding community where non-technical builders finally ship with confidence.
                        </p>

                        {/* Newsletter */}
                        <div className="mt-4">
                            <h4 className="mb-3 text-[13px] font-semibold text-foreground uppercase tracking-wider opacity-60">Stay in the loop</h4>
                            <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                                <div className="relative flex-1">
                                    <EnvelopeSimple size={18} weight="duotone" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-glass)] pl-11 pr-4 text-sm backdrop-blur-md transition-all outline-none focus:border-[var(--color-primary)]"
                                    />
                                </div>
                                <Button type="submit" className="rounded-xl">
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12">
                        <div className="flex flex-col gap-3">
                            <h4 className="mb-2 text-sm font-semibold text-foreground">Platform</h4>
                            <Link href="/feed" className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">Community Feed</Link>
                            <Link href="/mentors" className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">Hire Mentors</Link>
                            <Link href="/community" className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">Community Awards</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="mb-2 text-sm font-semibold text-foreground">Resources</h4>
                            <Link href="/ideas/new" className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">Submit an Idea</Link>
                            <Link href="/bookings" className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">Book Consultation</Link>
                            <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">How it Works</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="mb-2 text-sm font-semibold text-foreground">Legal</h4>
                            <Link href="#" className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">Privacy Policy</Link>
                            <Link href="#" className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">Terms of Service</Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-8 text-center md:flex-row border-opacity-50">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Build A Tool. Crafted with ❤️ in Lagos, Nigeria.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[var(--color-surface-2)] text-muted-foreground transition-all duration-150 hover:-translate-y-0.5 hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground">
                            <TwitterLogo size={20} weight="fill" />
                        </Link>
                        <Link href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[var(--color-surface-2)] text-muted-foreground transition-all duration-150 hover:-translate-y-0.5 hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground">
                            <InstagramLogo size={20} weight="fill" />
                        </Link>
                        <Link href="#" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[var(--color-surface-2)] text-muted-foreground transition-all duration-150 hover:-translate-y-0.5 hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground">
                            <LinkedinLogo size={20} weight="fill" />
                        </Link>
                        <Link href="#" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[var(--color-surface-2)] text-muted-foreground transition-all duration-150 hover:-translate-y-0.5 hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground">
                            <GithubLogo size={20} weight="fill" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
