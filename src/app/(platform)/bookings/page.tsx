"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarBlank, CheckCircle, QuestionMark, MagnifyingGlass, Robot, CreditCard } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import styles from "./bookings.module.css";

interface TimeSlot {
    id: string;
    time: string;
    available: boolean;
}

interface Mentor {
    id: number;
    name: string;
    initials: string;
    role: string;
    rate: string;
    rating: number;
}

const MENTORS: Mentor[] = [
    { id: 1, name: "Chidi Nwosu", initials: "CN", role: "Full-Stack Developer", rate: "₦15,000", rating: 4.9 },
    { id: 2, name: "Aisha Muhammad", initials: "AM", role: "Product Designer", rate: "₦12,000", rating: 4.8 },
    { id: 3, name: "Oluwaseun A.", initials: "OA", role: "Backend Architect", rate: "₦20,000", rating: 5.0 },
    { id: 4, name: "Nneka Okafor", initials: "NO", role: "Mobile Developer", rate: "₦18,000", rating: 4.7 },
    { id: 5, name: "Yusuf Ibrahim", initials: "YI", role: "AI Specialist", rate: "₦25,000", rating: 4.9 },
    { id: 6, name: "Folake Adeniyi", initials: "FA", role: "No-Code Expert", rate: "₦10,000", rating: 4.8 },
];

const generateSlots = (): TimeSlot[] => [
    { id: "1", time: "9:00 AM WAT", available: true },
    { id: "2", time: "10:00 AM WAT", available: true },
    { id: "3", time: "11:00 AM WAT", available: false },
    { id: "4", time: "12:00 PM WAT", available: true },
    { id: "5", time: "1:00 PM WAT", available: false },
    { id: "6", time: "2:00 PM WAT", available: true },
    { id: "7", time: "3:00 PM WAT", available: true },
    { id: "8", time: "4:00 PM WAT", available: true },
    { id: "9", time: "5:00 PM WAT", available: false },
];

const DAYS = ["Mon, Mar 10", "Tue, Mar 11", "Wed, Mar 12", "Thu, Mar 13", "Fri, Mar 14", "Sat, Mar 15"];

export default function BookingsPage() {
    const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState("Wed, Mar 12");
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [sessionType, setSessionType] = useState<"1on1" | "review" | "workshop">("1on1");
    const [notes, setNotes] = useState("");
    const [booked, setBooked] = useState(false);

    const slots = generateSlots();

    const handleBook = () => {
        if (!selectedMentor || !selectedSlot) return;
        setBooked(true);
        setTimeout(() => setBooked(false), 3000);
    };

    const mentor = MENTORS.find((m) => m.id === selectedMentor);

    return (
        <div className={styles.page}>
            <Navbar />

            <div className={`container ${styles.content}`}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        <CalendarBlank size={32} weight="duotone" className={styles.headerIcon} />
                        Book a 1:1 Session
                    </h1>
                    <p className={styles.subtitle}>
                        Get dedicated time with an expert mentor. Discuss your idea, get guidance, or build together.
                    </p>
                </div>

                <div className={styles.bookingLayout}>
                    {/* Left: Mentor Selection + Calendar */}
                    <div className={styles.bookingMain}>
                        {/* Step 1: Choose Mentor */}
                        <div className={styles.step}>
                            <h2 className={styles.stepTitle}>
                                <span className={styles.stepNum}>1</span>
                                Choose Your Mentor
                            </h2>
                            <div className={styles.mentorPicker}>
                                {MENTORS.map((m) => (
                                    <button
                                        key={m.id}
                                        className={`${styles.mentorOption} ${selectedMentor === m.id ? styles.mentorSelected : ""}`}
                                        onClick={() => setSelectedMentor(m.id)}
                                    >
                                        <div className="avatar">{m.initials}</div>
                                        <div className={styles.mentorOptionInfo}>
                                            <strong>{m.name}</strong>
                                            <span>{m.role}</span>
                                        </div>
                                        <div className={styles.mentorOptionRate}>{m.rate}/hr</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 2: Pick Date */}
                        <div className={styles.step}>
                            <h2 className={styles.stepTitle}>
                                <span className={styles.stepNum}>2</span>
                                Pick a Date
                            </h2>
                            <div className={styles.dayPicker}>
                                {DAYS.map((day) => (
                                    <button
                                        key={day}
                                        className={`${styles.dayBtn} ${selectedDay === day ? styles.daySelected : ""}`}
                                        onClick={() => setSelectedDay(day)}
                                    >
                                        <span className={styles.dayName}>{day.split(", ")[0]}</span>
                                        <span className={styles.dayDate}>{day.split(", ")[1]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 3: Pick Time */}
                        <div className={styles.step}>
                            <h2 className={styles.stepTitle}>
                                <span className={styles.stepNum}>3</span>
                                Pick a Time
                            </h2>
                            <div className={styles.timeSlots}>
                                {slots.map((slot) => (
                                    <button
                                        key={slot.id}
                                        className={`${styles.timeSlot} ${selectedSlot === slot.id ? styles.slotSelected : ""} ${!slot.available ? styles.slotUnavailable : ""
                                            }`}
                                        onClick={() => slot.available && setSelectedSlot(slot.id)}
                                        disabled={!slot.available}
                                    >
                                        {slot.time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Session Type */}
                        <div className={styles.step}>
                            <h2 className={styles.stepTitle}>
                                <span className={styles.stepNum}>4</span>
                                Session Type
                            </h2>
                            <div className={styles.sessionTypes}>
                                {[
                                    { key: "1on1" as const, icon: <QuestionMark size={20} weight="duotone" />, label: "1:1 Consultation", desc: "Discuss your idea and get advice" },
                                    { key: "review" as const, icon: <MagnifyingGlass size={20} weight="duotone" />, label: "Check My Progress", desc: "Review what's been built so far" },
                                    { key: "workshop" as const, icon: <Robot size={20} weight="duotone" />, label: "Development Session", desc: "Build together with AI agents live" },
                                ].map((type) => (
                                    <button
                                        key={type.key}
                                        className={`${styles.sessionType} ${sessionType === type.key ? styles.sessionSelected : ""}`}
                                        onClick={() => setSessionType(type.key)}
                                    >
                                        <div className={styles.sessionIconWrapper}>{type.icon}</div>
                                        <div className={styles.sessionTypeInfo}>
                                            <strong>{type.label}</strong>
                                            <span className={styles.sessionDesc}>{type.desc}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className={styles.bookingSidebar}>
                        <div className={`card ${styles.summaryCard}`}>
                            <h3 className={styles.summaryTitle}>Booking Summary</h3>

                            {mentor ? (
                                <>
                                    <div className={styles.summaryRow}>
                                        <span className={styles.summaryLabel}>Mentor</span>
                                        <div className={styles.summaryMentor}>
                                            <div className="avatar avatar-sm">{mentor.initials}</div>
                                            <span>{mentor.name}</span>
                                        </div>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span className={styles.summaryLabel}>Date</span>
                                        <span>{selectedDay}, March 2026</span>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span className={styles.summaryLabel}>Time</span>
                                        <span>{selectedSlot ? slots.find((s) => s.id === selectedSlot)?.time : "Not selected"}</span>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span className={styles.summaryLabel}>Type</span>
                                        <span style={{ textTransform: "capitalize" }}>
                                            {sessionType === "1on1" ? "1:1 Consultation" : sessionType === "review" ? "Code Review" : "Vibecoding"}
                                        </span>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span className={styles.summaryLabel}>Duration</span>
                                        <span>1 hour</span>
                                    </div>

                                    <div className="input-group" style={{ marginTop: "var(--space-8)" }}>
                                        <label className="input-label">Notes for mentor (optional)</label>
                                        <textarea
                                            className="input textarea"
                                            placeholder="Tell the mentor what you'd like to discuss..."
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            style={{ minHeight: "80px" }}
                                        />
                                    </div>

                                    <div className={styles.summaryTotal}>
                                        <span>Total</span>
                                        <span className={styles.totalPrice}>{mentor.rate}</span>
                                    </div>

                                    <button
                                        className="btn btn-primary btn-lg"
                                        style={{ width: "100%", marginTop: "var(--space-6)" }}
                                        onClick={handleBook}
                                        disabled={!selectedSlot}
                                        id="confirm-booking"
                                    >
                                        {booked ? <><CheckCircle size={20} weight="bold" /> Booked!</> : "Confirm Booking"}
                                    </button>

                                    <div className={styles.paymentBadge}>
                                        <CreditCard size={16} /> Paystack · Card or Transfer
                                    </div>
                                </>
                            ) : (
                                <div className={styles.summaryEmpty}>
                                    <MagnifyingGlass size={32} weight="thin" className={styles.emptyIcon} />
                                    <p>Select a mentor to view booking summary.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {booked && (
                <div className="toast" style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-focus)", color: "var(--color-primary-light)" }}>
                    <CheckCircle size={20} weight="fill" /> Session booked successfully. Check your email for details.
                </div>
            )}
        </div>
    );
}
