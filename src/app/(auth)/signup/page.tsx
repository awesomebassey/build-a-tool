"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeSlash, GoogleLogo, ArrowLeft, Lightbulb, Code } from "@phosphor-icons/react";
import styles from "../login/login.module.css";

export default function SignupPage() {
    const [role, setRole] = useState<"founder" | "mentor">("founder");;
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
        <div className={styles.authPage}>
            <div className={styles.authLeft}>
                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={16} weight="bold" /> Back to home
                </Link>
                <div className={styles.authCard}>
                    <div className={styles.authHeader}>
                        <Link href="/" className={styles.logo}>
                            Build<span className={styles.logoAccent}>A</span>Tool
                        </Link>
                        <h1 className={styles.authTitle}>Create your account</h1>
                        <p className={styles.authSubtitle}>
                            Join 1,200+ Nigerians building tools with AI.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.authForm}>
                        {/* Role Selection */}
                        <div className="input-group">
                            <label className="input-label">I want to…</label>
                            <div style={{ display: "flex", gap: "var(--space-3)" }}>
                                <button
                                    type="button"
                                    className={`btn ${role === "founder" ? "btn-primary" : "btn-outline"}`}
                                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)" }}
                                    onClick={() => setRole("founder")}
                                >
                                    <Lightbulb size={20} weight={role === "founder" ? "fill" : "duotone"} /> Submit Ideas
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${role === "mentor" ? "btn-accent" : "btn-outline"}`}
                                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)" }}
                                    onClick={() => setRole("mentor")}
                                >
                                    <Code size={20} weight={role === "mentor" ? "fill" : "duotone"} /> Be a Mentor
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="fullName" className="input-label">
                                Full name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                className="input"
                                placeholder="e.g. Chidi Nwosu"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email" className="input-label">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password" className="input-label">
                                Password
                            </label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="input"
                                    placeholder="Minimum 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeSlash size={20} weight="duotone" /> : <Eye size={20} weight="duotone" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "var(--space-2)" }}>
                            Create Account
                        </button>

                        <div className={styles.divider}>
                            <span>or continue with</span>
                        </div>

                        <button type="button" className={`btn btn-outline ${styles.socialBtn}`}>
                            <GoogleLogo size={20} weight="bold" /> Continue with Google
                        </button>
                    </form>

                    <p className={styles.authFooter}>
                        Already have an account?{" "}
                        <Link href="/login" className={styles.authLink}>
                            Log in
                        </Link>
                    </p>
                </div>
            </div>

            <div className={styles.authRight}>
                <div className={styles.authQuote}>
                    <p className={styles.quoteText}>
                        &ldquo;The community voted for my idea. A mentor reached out the next day. Two weeks
                        later, I had a working prototype. This platform is the real deal.&rdquo;
                    </p>
                    <div className={styles.quoteAuthor}>
                        <div className="avatar" style={{ background: "var(--color-primary-dark)", color: "var(--color-bg)", border: "none" }}>FD</div>
                        <div>
                            <strong>Funke Dada</strong>
                            <br />
                            <span>Entrepreneur, Lagos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
