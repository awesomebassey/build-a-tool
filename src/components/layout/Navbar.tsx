"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, ArrowUpRight, List } from "@phosphor-icons/react";
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
                        <Link href="/ideas/new" className={styles.ctaPill}>
                            Submit Idea <ArrowUpRight size={14} weight="bold" />
                        </Link>
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

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
                <div className={styles.mobileMenuLinks}>
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={styles.mobileNavLink}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/ideas/new" className="btn btn-primary btn-lg" style={{ marginTop: "var(--space-8)" }} onClick={() => setIsMobileMenuOpen(false)}>
                        Submit Idea <ArrowUpRight size={16} weight="bold" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
