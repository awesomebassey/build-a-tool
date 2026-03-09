"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeSlash, GoogleLogo, ArrowLeft } from "@phosphor-icons/react";
import styles from "./login.module.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Supabase auth
        alert("Login coming soon! 🚀");
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
                        <h1 className={styles.authTitle}>Welcome back!</h1>
                        <p className={styles.authSubtitle}>
                            Log in to continue building amazing tools.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.authForm}>
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
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
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

                        <div className={styles.authOptions}>
                            <label className={styles.checkbox}>
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link href="/forgot-password" className={styles.forgotLink}>
                                Forgot password?
                            </Link>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "var(--space-2)" }}>
                            Log In
                        </button>

                        <div className={styles.divider}>
                            <span>or continue with</span>
                        </div>

                        <button type="button" className={`btn btn-outline ${styles.socialBtn}`}>
                            <GoogleLogo size={20} weight="bold" /> Continue with Google
                        </button>
                    </form>

                    <p className={styles.authFooter}>
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className={styles.authLink}>
                            Sign up free
                        </Link>
                    </p>
                </div>
            </div>

            <div className={styles.authRight}>
                <div className={styles.authQuote}>
                    <p className={styles.quoteText}>
                        &ldquo;I had zero coding experience. My mentor and the AI built my inventory tracker
                        in 3 days. Now my shop runs smoother than ever.&rdquo;
                    </p>
                    <div className={styles.quoteAuthor}>
                        <div className="avatar">AO</div>
                        <div>
                            <strong>Amara Obi</strong>
                            <br />
                            <span>Shop Owner, Aba</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
