"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkle, RocketLaunch, ArrowLeft, Lightbulb, ChatText, ArrowUpRight } from "@phosphor-icons/react";
import styles from "./new-idea.module.css";

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
            <div className={styles.page}>
                <div className={styles.successScreen}>
                    <div className={styles.successIconWrapper}>
                        <Sparkle size={48} weight="duotone" className={styles.successIcon} />
                    </div>
                    <h1 className={styles.successTitle}>E don land! Your Idea is Live.</h1>
                    <p className={styles.successText}>
                        &ldquo;{title}&rdquo; is now on the community feed. Share it to get more upvotes and attract a mentor.
                    </p>
                    <div className={styles.successActions}>
                        <Link href="/feed" className="btn btn-primary btn-lg">
                            View on Feed <ArrowUpRight size={18} weight="bold" />
                        </Link>
                        <button className="btn btn-ghost" onClick={() => setSubmitted(false)}>
                            Submit Another
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <nav className={styles.nav}>
                <div className={`container ${styles.navInner}`}>
                    <Link href="/feed" className={styles.backBtn}>
                        <ArrowLeft size={20} weight="regular" /> Back to Feed
                    </Link>
                </div>
            </nav>

            <div className={`container ${styles.content}`}>
                <div className={styles.formWrapper}>
                    <div className={styles.header}>
                        <div className={styles.headerIconWrapper}>
                            <Lightbulb size={32} weight="duotone" className={styles.headerIcon} />
                        </div>
                        <h1 className={styles.title}>Tell us everything.</h1>
                        <p className={styles.subtitle}>
                            Describe the tool you want built. The community votes, a mentor steps in, and AI builds it.
                        </p>
                        <p className={styles.progressHint}>4 fields · Takes ~2 minutes</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className="input-group">
                            <label htmlFor="title" className="input-label">
                                Tool Name *
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="input"
                                placeholder="e.g. WhatsApp Order Manager for Small Shops"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                maxLength={100}
                            />
                            <span className={styles.charCount}>{title.length}/100</span>
                        </div>

                        <div className="input-group">
                            <label htmlFor="category" className="input-label">
                                Category *
                            </label>
                            <select
                                id="category"
                                className={`input ${styles.select}`}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select a category</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="problem" className="input-label">
                                What problem does this solve? *
                            </label>
                            <textarea
                                id="problem"
                                className="input textarea"
                                placeholder="Describe the problem in simple terms. E.g. 'Small shop owners struggle to track WhatsApp orders and often lose track of payments.'"
                                value={problem}
                                onChange={(e) => setProblem(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="description" className="input-label">
                                Describe your tool idea *
                            </label>
                            <textarea
                                id="description"
                                className="input textarea"
                                placeholder="What should it do? What features would it have? Be as detailed as you want — the more info, the better your mentor can help."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                style={{ minHeight: "160px" }}
                            />
                            <span className={styles.charCount}>{description.length} characters</span>
                        </div>

                        <div className="input-group">
                            <label htmlFor="audience" className="input-label">
                                Who would use this? (optional)
                            </label>
                            <input
                                id="audience"
                                type="text"
                                className="input"
                                placeholder="e.g. Small business owners in Lagos, University students, etc."
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                            />
                        </div>

                        <div className={styles.tipBox}>
                            <h4 className={styles.tipTitle}><Sparkle size={18} weight="duotone" /> Tips for a Great Submission</h4>
                            <ul className={styles.tipList}>
                                <li>Be specific about the problem — who has it and why it matters.</li>
                                <li>Give examples of how the tool would work day-to-day.</li>
                                <li>Don&apos;t worry about technical details — that is what mentors are for.</li>
                                <li>Tools that help many people tend to get priority.</li>
                            </ul>
                        </div>

                        <button type="submit" className={`btn btn-primary btn-lg ${styles.submitBtn}`} id="submit-idea">
                            Oya, Submit to Community Feed <RocketLaunch size={20} weight="fill" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
