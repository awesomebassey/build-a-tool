"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarBlank, CheckCircle, QuestionMark, MagnifyingGlass, Robot, CreditCard, CaretRight, Info, CaretLeft, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { m, AnimatePresence } from "motion/react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

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

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

/* ── Luxury DayPicker class overrides ── */
const calendarClassNames: Record<string, string> = {
    root: "w-full",
    months: "w-full relative",
    month: "w-full",
    month_caption: "flex items-center px-2 pb-6 pr-24",
    caption_label: "text-base font-bold tracking-tight text-foreground",
    nav: "absolute top-0 right-0 flex items-center gap-2 z-10",
    button_previous:
        "flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] text-muted-foreground transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
    button_next:
        "flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] text-muted-foreground transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
    month_grid: "w-full border-collapse",
    weekdays: "w-full",
    weekday: "w-[calc(100%/7)] text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground py-2",
    weeks: "w-full",
    week: "w-full",
    day: "p-0.5 text-center align-middle",
    day_button:
        "h-10 w-full rounded-xl text-sm font-semibold text-foreground transition-all duration-200 hover:bg-[var(--color-primary)] hover:text-white disabled:pointer-events-none disabled:opacity-25",
    selected:
        "bg-[var(--color-primary)] text-white rounded-xl shadow-lg shadow-[var(--color-primary)]/25",
    today: "border border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl",
    outside: "opacity-25",
    disabled: "opacity-20 cursor-not-allowed",
    hidden: "invisible",
};

export default function BookingsPage() {
    const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [sessionType, setSessionType] = useState<"1on1" | "review" | "workshop">("1on1");
    const [notes, setNotes] = useState("");
    const [booked, setBooked] = useState(false);

    const slots = generateSlots();

    const handleBook = () => {
        if (!selectedMentor || !selectedSlot) return;
        setBooked(true);
        setTimeout(() => setBooked(false), 5000);
    };

    const mentor = MENTORS.find((m) => m.id === selectedMentor);

    const formattedDate = selectedDate
        ? format(selectedDate, "EEE, MMM d")
        : "No date";

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Navbar />

            <div className="container mx-auto px-6 pb-32 pt-[calc(var(--nav-height)+4rem)]">
                <m.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20">
                        <CalendarBlank size={32} weight="duotone" />
                    </div>
                    <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground md:text-7xl">
                        Book a 1:1 Session
                    </h1>
                    <p className="mt-6 max-w-[640px] text-xl leading-relaxed text-[var(--color-text-secondary)] opacity-80">
                        Get dedicated time with an expert mentor. Discuss your idea, get guidance, or build together.
                    </p>
                </m.div>

                <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_420px] lg:gap-24">
                    {/* Left: Booking Steps */}
                    <m.div variants={container} initial="hidden" animate="show" className="space-y-24">

                        {/* Step 1: Choose Mentor */}
                        <m.div variants={item}>
                            <div className="mb-10 flex items-center gap-5">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground font-mono text-lg font-black text-background shadow-xl">
                                    1
                                </span>
                                <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                                    Choose Your Mentor
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {MENTORS.map((mentor) => (
                                    <m.button
                                        key={mentor.id}
                                        whileHover={{ scale: 1.005 }}
                                        whileTap={{ scale: 0.995 }}
                                        className={`group relative flex w-full cursor-pointer items-center gap-6 rounded-[2rem] border-2 p-6 text-left transition-all duration-300 ${
                                            selectedMentor === mentor.id
                                                ? "border-[var(--color-primary)] bg-[var(--color-surface-1)] shadow-2xl shadow-[var(--color-primary)]/5"
                                                : "border-[var(--color-border)] bg-[var(--color-surface-1)] hover:border-[var(--color-primary)]/30"
                                        }`}
                                        onClick={() => setSelectedMentor(mentor.id)}
                                    >
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-surface-3)] text-lg font-black uppercase text-foreground transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-white">
                                            {mentor.initials}
                                        </div>
                                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                                            <strong className="text-xl font-bold text-foreground">{mentor.name}</strong>
                                            <span className="text-[14px] font-medium opacity-60">{mentor.role}</span>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <div className="text-2xl font-black tracking-tighter text-foreground">{mentor.rate}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">per hour</div>
                                        </div>
                                        <div
                                            className={`absolute right-6 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                                                selectedMentor === mentor.id ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                                            }`}
                                        >
                                            <CheckCircle size={24} weight="fill" className="text-[var(--color-primary)]" />
                                        </div>
                                    </m.button>
                                ))}
                            </div>
                        </m.div>

                        {/* Step 2: Pick Date — DayPicker */}
                        <m.div variants={item}>
                            <div className="mb-10 flex items-center gap-5">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground font-mono text-lg font-black text-background shadow-xl">
                                    2
                                </span>
                                <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                                    Pick a Date
                                </h2>
                            </div>
                            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 shadow-sm">
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    hidden={{ before: new Date() }}
                                    classNames={calendarClassNames}
                                    components={{
                                        Chevron: ({ orientation }) =>
                                            orientation === "left" ? (
                                                <CaretLeftIcon size={16} weight="bold" />
                                            ) : (
                                                <CaretRightIcon size={16} weight="bold" />
                                            ),
                                    }}
                                />
                            </div>
                        </m.div>

                        {/* Step 3: Pick Time */}
                        <m.div variants={item}>
                            <div className="mb-10 flex items-center gap-5">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground font-mono text-lg font-black text-background shadow-xl">
                                    3
                                </span>
                                <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                                    Select Time
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {slots.map((slot) => (
                                    <m.button
                                        key={slot.id}
                                        whileHover={slot.available ? { scale: 1.02 } : {}}
                                        whileTap={slot.available ? { scale: 0.98 } : {}}
                                        className={`rounded-2xl border-2 p-5 text-center text-sm font-bold transition-all duration-300 ${
                                            !slot.available
                                                ? "cursor-not-allowed border-transparent bg-[var(--color-surface-2)] opacity-20 line-through"
                                                : selectedSlot === slot.id
                                                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-xl shadow-[var(--color-primary)]/20"
                                                : "border-[var(--color-border)] bg-[var(--color-surface-1)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                                        }`}
                                        onClick={() => slot.available && setSelectedSlot(slot.id)}
                                        disabled={!slot.available}
                                    >
                                        {slot.time}
                                    </m.button>
                                ))}
                            </div>
                        </m.div>

                        {/* Step 4: Session Type */}
                        <m.div variants={item}>
                            <div className="mb-10 flex items-center gap-5">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground font-mono text-lg font-black text-background shadow-xl">
                                    4
                                </span>
                                <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                                    Session Type
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {[
                                    {
                                        key: "1on1" as const,
                                        icon: <QuestionMark size={20} weight="bold" />,
                                        label: "1:1 Consultation",
                                        desc: "Discuss your idea and get advice",
                                    },
                                    {
                                        key: "review" as const,
                                        icon: <MagnifyingGlass size={20} weight="bold" />,
                                        label: "Check My Progress",
                                        desc: "Review what's been built so far",
                                    },
                                    {
                                        key: "workshop" as const,
                                        icon: <Robot size={20} weight="bold" />,
                                        label: "Development Session",
                                        desc: "Build together with AI agents live",
                                    },
                                ].map((type) => (
                                    <m.button
                                        key={type.key}
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex cursor-pointer flex-col items-start gap-5 rounded-[2rem] border-2 p-8 text-left transition-all duration-300 ${
                                            sessionType === type.key
                                                ? "border-[var(--color-primary)] bg-[var(--color-surface-1)] shadow-xl shadow-[var(--color-primary)]/5"
                                                : "border-[var(--color-border)] bg-[var(--color-surface-1)] hover:border-[var(--color-primary)]/30"
                                        }`}
                                        onClick={() => setSessionType(type.key)}
                                    >
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                                                sessionType === type.key
                                                    ? "bg-[var(--color-primary)] text-white shadow-lg"
                                                    : "bg-[var(--color-surface-3)] text-foreground opacity-60"
                                            }`}
                                        >
                                            {type.icon}
                                        </div>
                                        <div>
                                            <strong className="block text-lg font-bold text-foreground">{type.label}</strong>
                                            <span className="text-[13px] font-medium opacity-50">{type.desc}</span>
                                        </div>
                                    </m.button>
                                ))}
                            </div>
                        </m.div>
                    </m.div>

                    {/* Right: Booking Summary */}
                    <m.div variants={item} className="lg:sticky lg:top-[calc(var(--nav-height)+6rem)]">
                        <Card className="rounded-[2.5rem] border-[var(--color-border-light)] bg-[var(--color-surface-glass)] p-10 shadow-[var(--shadow-lg)] backdrop-blur-xl">
                            <h3 className="font-heading mb-10 text-2xl font-bold tracking-tight">
                                Booking Summary
                            </h3>

                            <AnimatePresence mode="wait">
                                {mentor ? (
                                    <m.div
                                        key="summary-content"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-1"
                                    >
                                        <div className="flex items-center justify-between border-b border-[var(--color-border-light)] py-5 text-[15px]">
                                            <span className="font-bold opacity-40">Expert</span>
                                            <div className="flex items-center gap-3 font-bold text-foreground">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-surface-3)] text-[10px] font-black">
                                                    {mentor.initials}
                                                </div>
                                                <span>{mentor.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-[var(--color-border-light)] py-5 text-[15px]">
                                            <span className="font-bold opacity-40">Schedule</span>
                                            <span className="font-bold text-foreground">
                                                {formattedDate}
                                                {selectedSlot && (
                                                    <> • {slots.find((s) => s.id === selectedSlot)?.time.split(" ")[0]}</>
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-[var(--color-border-light)] py-5 text-[15px]">
                                            <span className="font-bold opacity-40">Goal</span>
                                            <span className="font-bold capitalize text-foreground">
                                                {sessionType === "1on1"
                                                    ? "Consultation"
                                                    : sessionType === "review"
                                                    ? "Code Review"
                                                    : "Live Build"}
                                            </span>
                                        </div>

                                        <div className="mt-10 flex flex-col gap-3">
                                            <label className="text-[11px] font-black uppercase tracking-widest opacity-40">
                                                Specific Requirements
                                            </label>
                                            <textarea
                                                className="min-h-[100px] w-full resize-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-glass)] p-5 text-sm font-medium text-foreground outline-none transition-all focus:border-[var(--color-primary)]"
                                                placeholder="What should we focus on?"
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                            />
                                        </div>

                                        <div className="mt-10 flex items-center justify-between border-t-2 border-dashed border-[var(--color-border-light)] pt-8">
                                            <span className="text-sm font-bold uppercase tracking-widest opacity-40">
                                                Total Investment
                                            </span>
                                            <span className="text-4xl font-black tracking-tighter text-foreground">
                                                {mentor.rate}
                                            </span>
                                        </div>

                                        <Button
                                            size="lg"
                                            className="group relative mt-10 h-16 w-full overflow-hidden rounded-2xl text-lg font-bold shadow-2xl shadow-[var(--color-primary)]/20"
                                            onClick={handleBook}
                                            disabled={!selectedSlot || !selectedDate || booked}
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                {booked ? (
                                                    <m.div
                                                        initial={{ scale: 0.5 }}
                                                        animate={{ scale: 1 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <CheckCircle size={24} weight="fill" /> Session Confirmed
                                                    </m.div>
                                                ) : (
                                                    <>
                                                        Proceed to Payment <CaretRight size={20} weight="bold" />
                                                    </>
                                                )}
                                            </span>
                                            <m.div
                                                className="absolute inset-0 bg-white/20"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: "100%" }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </Button>

                                        <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-[var(--color-surface-2)] px-5 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground opacity-40">
                                            <CreditCard size={18} /> Secure via Paystack
                                        </div>
                                    </m.div>
                                ) : (
                                    <m.div
                                        key="summary-empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center gap-6 py-20 text-center"
                                    >
                                        <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[var(--color-surface-3)]">
                                            <Info size={40} weight="duotone" className="opacity-20" />
                                        </div>
                                        <p className="max-w-[200px] text-sm font-bold uppercase tracking-widest opacity-30">
                                            Select a mentor to view booking summary.
                                        </p>
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </m.div>
                </div>
            </div>

            {/* Success Toast */}
            <AnimatePresence>
                {booked && (
                    <m.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-3xl border-2 border-[var(--color-primary)] bg-[var(--color-surface-glass)] px-8 py-5 text-[var(--color-primary)] shadow-2xl shadow-[var(--color-primary)]/20 backdrop-blur-xl"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
                            <CheckCircle size={24} weight="fill" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black uppercase tracking-widest">Great Choice!</span>
                            <span className="text-[14px] font-bold opacity-70">Check your mail for the session link.</span>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
