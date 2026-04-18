"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { WrenchIcon, ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { m, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
    { label: "Feed", href: "/feed" },
    { label: "Mentors", href: "/mentors" },
    { label: "Bookings", href: "/bookings" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <div className="fixed inset-x-0 top-0 z-[1000] flex pointer-events-none justify-center px-4 pt-6">
            <nav
                className={`pointer-events-auto w-full max-w-[1100px] h-14 rounded-full border bg-[var(--color-surface-2)] backdrop-blur-[24px] saturate-[180%] transition-all duration-300 ease-out shadow-[0_8px_32px_rgba(0,0,0,0.05)] ${
                    scrolled ? "bg-[var(--color-surface-1)] border-[var(--color-border-light)] -translate-y-1 shadow-[0_12px_40px_rgba(0,0,0,0.08)]" : "border-[var(--color-border)]"
                }`}
            >
                <div className="flex h-full items-center justify-between pl-6 pr-2">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-foreground tracking-tight">
                        <WrenchIcon size={22} weight="duotone" className="text-[var(--color-primary)]" />
                        <span className="text-lg">Build<span className="text-[var(--color-primary)] font-bold">A</span>Tool</span>
                    </Link>

                    <div className="hidden items-center gap-8 md:flex">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative text-[13px] font-medium transition-colors duration-200 hover:text-[var(--color-primary)] ${
                                        isActive
                                            ? "text-[var(--color-primary)]"
                                            : "text-[var(--color-text-secondary)]"
                                    }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <m.div 
                                            layoutId="nav-active"
                                            className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--color-primary)]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="hidden md:block">
                            <Button asChild size="sm" className="rounded-full">
                                <Link href="/ideas/new" className="flex items-center gap-2">
                                    Submit Idea <ArrowUpRightIcon size={14} weight="bold" />
                                </Link>
                            </Button>
                        </m.div>
                        <button
                            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-[var(--color-surface-3)] transition-colors md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            <ListIcon size={26} weight="regular" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay — animated with motion */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <m.div
                        className="fixed inset-0 z-[900] flex flex-col items-center justify-center bg-background/80 backdrop-blur-[40px] saturate-[200%] pointer-events-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <m.button
                            className="absolute right-6 top-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border bg-[var(--color-surface-2)] text-foreground transition-all duration-150 hover:bg-[var(--color-surface-3)]"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close Menu"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <XIcon size={32} weight="light" />
                        </m.button>
                        <m.div
                            className="flex flex-col items-center gap-8 text-center"
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                        >
                            {NAV_LINKS.map((link) => (
                                <m.div
                                    key={link.href}
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-2xl font-medium tracking-tight text-foreground"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </m.div>
                            ))}
                            <m.div
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Button asChild size="lg" className="mt-8 rounded-full shadow-[0_4px_14px_0_rgba(255,107,53,0.3)]">
                                    <Link href="/ideas/new" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                                        Submit Idea <ArrowUpRightIcon size={16} weight="bold" />
                                    </Link>
                                </Button>
                            </m.div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
