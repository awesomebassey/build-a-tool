"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, ArrowUpRight, List, X } from "@phosphor-icons/react";
import { m, AnimatePresence } from "motion/react";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
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
        <div className={styles.navWrapper}>
            <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
                <div className={styles.navInner}>
                    <Link href="/" className={styles.logo}>
                        <Wrench size={20} weight="duotone" className={styles.logoIcon} />
                        <span className={styles.logoText}>Build<span className={styles.logoAccent}>A</span>Tool</span>
                    </Link>

                    <div className={styles.navLinksDesktop}>
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${styles.navLink} ${pathname === link.href || pathname.startsWith(link.href + "/") ? styles.navLinkActive : ""}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.navRight}>
                        <ThemeToggle />
                        <m.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/ideas/new" className={styles.ctaPill}>
                                Submit Idea <ArrowUpRight size={14} weight="bold" />
                            </Link>
                        </m.div>
                        <button
                            className={styles.mobileMenuBtn}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            <List size={24} weight="light" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay — animated with motion */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <m.div
                        className={`${styles.mobileMenuOverlay} ${styles.mobileMenuOpen}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <m.button
                            className={styles.mobileMenuCloseBtn}
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close Menu"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X size={32} weight="light" />
                        </m.button>
                        <m.div
                            className={styles.mobileMenuLinks}
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
                                        className={styles.mobileNavLink}
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
                                <Link href="/ideas/new" className="btn btn-primary btn-lg" style={{ marginTop: "var(--space-8)" }} onClick={() => setIsMobileMenuOpen(false)}>
                                    Submit Idea <ArrowUpRight size={16} weight="bold" />
                                </Link>
                            </m.div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
