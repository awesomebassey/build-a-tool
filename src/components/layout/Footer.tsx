import Link from "next/link";
import { Wrench, GithubLogo, TwitterLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerInner}`}>
                <div className={styles.footerTop}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <Wrench size={24} weight="duotone" className={styles.logoIcon} />
                            <span className={styles.logoText}>Build<span className={styles.logoAccent}>A</span>Tool</span>
                        </Link>
                        <p className={styles.tagline}>
                            The premier collaborative workspace for non-technical Nigerian builders and elite engineering mentors.
                        </p>
                    </div>

                    <div className={styles.linksGrid}>
                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Platform</h4>
                            <Link href="/feed">Community Feed</Link>
                            <Link href="/mentors">Hire Mentors</Link>
                            <Link href="/community">Community Awards</Link>
                        </div>
                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Resources</h4>
                            <Link href="/ideas/new">Submit an Idea</Link>
                            <Link href="/bookings">Book Consultation</Link>
                            <Link href="#">How it Works</Link>
                        </div>
                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Legal</h4>
                            <Link href="#">Privacy Policy</Link>
                            <Link href="#">Terms of Service</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Build A Tool. Crafted in Lagos, Nigeria.
                    </p>
                    <div className={styles.socials}>
                        <Link href="#" aria-label="Twitter">
                            <TwitterLogo size={20} weight="fill" />
                        </Link>
                        <Link href="#" aria-label="GitHub">
                            <GithubLogo size={20} weight="fill" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
