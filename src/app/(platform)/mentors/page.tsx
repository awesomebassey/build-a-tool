"use client";

import Link from "next/link";
import { useState } from "react";
import { MagnifyingGlass, Star, CheckCircle, ChatCircle, Calendar, Users, RocketLaunch, CaretDown, Pulse } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import styles from "./mentors.module.css";

interface Mentor {
    id: number;
    name: string;
    initials: string;
    role: string;
    bio: string;
    skills: string[];
    sessionsCompleted: number;
    rating: number;
    hourlyRate: string;
    availability: string;
    projectsShipped: number;
}

const MENTORS: Mentor[] = [
    {
        id: 1,
        name: "Chidi Nwosu",
        initials: "CN",
        role: "Full-Stack Developer",
        bio: "5 years building web apps. Specializes in helping non-tech founders translate ideas into working prototypes using AI-assisted development.",
        skills: ["React", "Node.js", "AI/ML", "Next.js"],
        sessionsCompleted: 34,
        rating: 4.9,
        hourlyRate: "₦15,000",
        availability: "Available",
        projectsShipped: 8,
    },
    {
        id: 2,
        name: "Aisha Muhammad",
        initials: "AM",
        role: "Product Designer & Developer",
        bio: "Designer turned developer. I help you think through your product from the user's perspective AND build it. Double wahala for your competitors!",
        skills: ["UI/UX", "Flutter", "Firebase", "Figma"],
        sessionsCompleted: 28,
        rating: 4.8,
        hourlyRate: "₦12,000",
        availability: "Available",
        projectsShipped: 6,
    },
    {
        id: 3,
        name: "Oluwaseun Adeyemi",
        initials: "OA",
        role: "Backend Architect",
        bio: "I build systems that scale. From Paystack integrations to real-time features, I make sure your tool's backend is solid as rock.",
        skills: ["Python", "AWS", "PostgreSQL", "APIs"],
        sessionsCompleted: 41,
        rating: 5.0,
        hourlyRate: "₦20,000",
        availability: "Busy — next slot in 3 days",
        projectsShipped: 12,
    },
    {
        id: 4,
        name: "Nneka Okafor",
        initials: "NO",
        role: "Mobile App Developer",
        bio: "Cross-platform mobile specialist. If your tool needs to be an app on people's phones, I'm your person. Made apps used by 50K+ Nigerians.",
        skills: ["React Native", "Swift", "Kotlin", "Firebase"],
        sessionsCompleted: 22,
        rating: 4.7,
        hourlyRate: "₦18,000",
        availability: "Available",
        projectsShipped: 5,
    },
    {
        id: 5,
        name: "Yusuf Ibrahim",
        initials: "YI",
        role: "AI & Automation Specialist",
        bio: "I teach AI agents to do exactly what you want. Expert at vibecoding workflows, prompt engineering, and setting up automations that save hours.",
        skills: ["OpenAI", "LangChain", "Python", "Automation"],
        sessionsCompleted: 19,
        rating: 4.9,
        hourlyRate: "₦25,000",
        availability: "Available",
        projectsShipped: 7,
    },
    {
        id: 6,
        name: "Folake Adeniyi",
        initials: "FA",
        role: "No-Code & Low-Code Expert",
        bio: "Not everything needs custom code. I help you figure out the fastest path to your MVP — sometimes that's Bubble, sometimes it's vibecoding, sometimes both.",
        skills: ["Bubble", "Airtable", "Zapier", "Webflow"],
        sessionsCompleted: 56,
        rating: 4.8,
        hourlyRate: "₦10,000",
        availability: "Available",
        projectsShipped: 15,
    },
];

const SKILL_FILTERS = ["All", "React", "Python", "AI/ML", "Flutter", "UI/UX", "Firebase", "Node.js"];

export default function MentorsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSkill, setActiveSkill] = useState("All");
    const [sortBy, setSortBy] = useState("Rating");
    const [requestedMentors, setRequestedMentors] = useState<Set<number>>(new Set());

    const handleRequest = (mentorId: number) => {
        setRequestedMentors((prev) => {
            const next = new Set(prev);
            next.add(mentorId);
            return next;
        });
    };

    const filtered = MENTORS.filter((m) => {
        const matchesSearch =
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesSkill =
            activeSkill === "All" || m.skills.includes(activeSkill);
        return matchesSearch && matchesSkill;
    }).sort((a, b) => {
        const parseRate = (r: string) => parseInt(r.replace(/[^\d]/g, ""));
        if (sortBy === "Price: Low → High") return parseRate(a.hourlyRate) - parseRate(b.hourlyRate);
        if (sortBy === "Price: High → Low") return parseRate(b.hourlyRate) - parseRate(a.hourlyRate);
        if (sortBy === "Most Sessions") return b.sessionsCompleted - a.sessionsCompleted;
        return b.rating - a.rating; // default: Rating
    });

    return (
        <div className={styles.page}>
            <Navbar />

            <div className={`container ${styles.content}`}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            Expert Mentors <Users size={32} weight="duotone" className={styles.headerIcon} />
                        </h1>
                        <p className={styles.subtitle}>
                            Real humans who will guide you and the AI to build exactly what you want.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className={styles.statsRow}>
                    <div className={`card ${styles.statCard}`}>
                        <div className={styles.statValue}>48</div>
                        <div className={styles.statLabel}>Active Mentors</div>
                    </div>
                    <div className={`card ${styles.statCard}`}>
                        <div className={styles.statValue}>156</div>
                        <div className={styles.statLabel}>Sessions This Month</div>
                    </div>
                    <div className={`card ${styles.statCard}`}>
                        <div className={styles.statValue}>4.8<Star size={20} weight="fill" className={styles.statIcon} /></div>
                        <div className={styles.statLabel}>Avg Rating</div>
                    </div>
                    <div className={`card ${styles.statCard}`}>
                        <div className={styles.statValue}>53</div>
                        <div className={styles.statLabel}>Tools Shipped</div>
                    </div>
                </div>

                {/* Filters */}
                <div className={styles.filterBar}>
                    <div className={styles.searchBox}>
                        <MagnifyingGlass size={20} className={styles.searchIcon} />
                        <input
                            type="text"
                            className="input"
                            placeholder="Search mentors by name, role, or skill..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            id="search-mentors"
                        />
                    </div>
                    <div className={styles.selectWrapper}>
                        <select
                            className={`input ${styles.sortSelect}`}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            id="sort-mentors"
                        >
                            <option value="Rating">Top Rated</option>
                            <option value="Price: Low → High">Price: Low → High</option>
                            <option value="Price: High → Low">Price: High → Low</option>
                            <option value="Most Sessions">Most Sessions</option>
                        </select>
                        <CaretDown size={14} weight="bold" className={styles.selectIcon} />
                    </div>
                </div>

                <div className="tabs">
                    {SKILL_FILTERS.map((skill) => (
                        <button
                            key={skill}
                            className={`tab ${activeSkill === skill ? "active" : ""}`}
                            onClick={() => setActiveSkill(skill)}
                        >
                            {skill}
                        </button>
                    ))}
                </div>

                {/* Mentor Grid */}
                <div className={styles.mentorGrid}>
                    {filtered.map((mentor) => (
                        <div key={mentor.id} className={`card ${styles.mentorCard}`}>
                            <div className={styles.mentorTop}>
                                <div className="avatar avatar-lg">{mentor.initials}</div>
                                <div
                                    className={`${styles.availabilityBadge} ${mentor.availability === "Available" ? styles.badgeAvailable : styles.badgeBusy
                                        }`}
                                >
                                    {mentor.availability === "Available" ? <><Pulse size={12} weight="bold" className="spin" /> Available</> : <><Pulse size={12} weight="bold" /> Busy</>}
                                </div>
                            </div>

                            <h3 className={styles.mentorName}>{mentor.name}</h3>
                            <p className={styles.mentorRole}>{mentor.role}</p>
                            <p className={styles.mentorBio}>{mentor.bio}</p>

                            <div className={styles.mentorSkills}>
                                {mentor.skills.map((skill) => (
                                    <span key={skill} className={styles.skillBadge}>{skill}</span>
                                ))}
                            </div>

                            <div className={styles.mentorMeta}>
                                <span className={styles.metaItem}><Star size={14} weight="fill" /> {mentor.rating}</span>
                                <span className={styles.metaItem}><RocketLaunch size={14} weight="fill" /> {mentor.projectsShipped} shipped</span>
                                <span className={styles.metaItem}><ChatCircle size={14} weight="fill" /> {mentor.sessionsCompleted} sessions</span>
                            </div>

                            <div className={styles.mentorPrice}>
                                {mentor.hourlyRate}<span className={styles.priceUnit}>/hour</span>
                            </div>

                            <div className={styles.mentorActions}>
                                {requestedMentors.has(mentor.id) ? (
                                    <button className="btn btn-outline" style={{ width: "100%" }} disabled>
                                        <CheckCircle size={16} weight="bold" /> Request Sent
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        style={{ width: "100%" }}
                                        onClick={() => handleRequest(mentor.id)}
                                    >
                                        Request Mentor
                                    </button>
                                )}
                                <Link href="/bookings" className="btn btn-outline" style={{ width: "100%" }}>
                                    <Calendar size={16} weight="bold" /> Book 1:1 Session
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
