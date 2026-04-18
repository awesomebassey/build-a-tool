"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon, CheckCircleIcon, ArrowsClockwiseIcon, RobotIcon, PaperPlaneRightIcon, LightningIcon } from "@phosphor-icons/react";

interface Message {
    id: number;
    sender: "founder" | "mentor" | "ai";
    name: string;
    initials: string;
    content: string;
    timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: 1,
        sender: "mentor",
        name: "Chidi Nwosu",
        initials: "CN",
        content: "Hey! I've reviewed your WhatsApp Order Manager idea. Great concept — very needed in Lagos markets. Let me set up the AI agents and we can start building. 🚀",
        timestamp: "2:30 PM",
    },
    {
        id: 2,
        sender: "founder",
        name: "You",
        initials: "AC",
        content: "Amazing! Yes, every shop owner I know struggles with this. The key features I want are: order tracking, inventory count, and daily sales summary sent to WhatsApp.",
        timestamp: "2:32 PM",
    },
    {
        id: 3,
        sender: "mentor",
        name: "Chidi Nwosu",
        initials: "CN",
        content: "Perfect. Let me prompt the AI agent to scaffold the data model and basic UI. I'll adjust the prompts based on what you've described. Watch the AI panel on the right.",
        timestamp: "2:33 PM",
    },
    {
        id: 4,
        sender: "ai",
        name: "AI Agent",
        initials: "AI",
        content: "I've created a basic data schema for the Order Manager:\n\n• **Products**: name, price, stock count\n• **Orders**: customer name, items, total, status\n• **Daily Summary**: total orders, revenue, top products\n\nShall I proceed with generating the frontend components for the order dashboard?",
        timestamp: "2:34 PM",
    },
    {
        id: 5,
        sender: "founder",
        name: "You",
        initials: "AC",
        content: "This looks great! But can we also add a field for the customer's WhatsApp number? So we can send them receipts directly.",
        timestamp: "2:36 PM",
    },
    {
        id: 6,
        sender: "mentor",
        name: "Chidi Nwosu",
        initials: "CN",
        content: "Good thinking! I'll update the prompt. @AI Agent, add a WhatsApp number field to the Orders model, and include a 'Send Receipt' action button that generates a shareable receipt link.",
        timestamp: "2:37 PM",
    },
    {
        id: 7,
        sender: "ai",
        name: "AI Agent",
        initials: "AI",
        content: "Updated! I've added the WhatsApp number field and created a receipt generation utility. The receipt includes:\n\n• Shop name & logo\n• Order items with prices\n• Total amount\n• Payment status\n• Shareable link format\n\nGenerating the dashboard UI now...",
        timestamp: "2:38 PM",
    },
];

const AI_ACTIVITIES = [
    { type: "success", text: "Data schema created", time: "2:34 PM" },
    { type: "loading", text: "Updating order model...", time: "2:37 PM" },
    { type: "success", text: "Receipt generator added", time: "2:38 PM" },
    { type: "loading", text: "Building dashboard UI...", time: "2:39 PM" },
];

import { m, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

export default function WorkspacePage() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [newMessage, setNewMessage] = useState("");
    const [mentorPrompt, setMentorPrompt] = useState("");
    const [mobileTab, setMobileTab] = useState<"chat" | "ai">("chat");

    // Lock body scroll so the footer doesn't peek through on mobile
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg: Message = {
            id: messages.length + 1,
            sender: "founder",
            name: "You",
            initials: "AC",
            content: newMessage,
            timestamp: new Date().toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" }),
        };
        setMessages([...messages, msg]);
        setNewMessage("");
    };

    const handleMentorPrompt = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mentorPrompt.trim()) return;

        const mentorMsg: Message = {
            id: messages.length + 1,
            sender: "mentor",
            name: "Chidi Nwosu",
            initials: "CN",
            content: `@AI Agent: ${mentorPrompt}`,
            timestamp: new Date().toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" }),
        };

        const aiReply: Message = {
            id: messages.length + 2,
            sender: "ai",
            name: "AI Agent",
            initials: "🤖",
            content: "Processing your request... I'll have the results ready shortly. ⏳",
            timestamp: new Date().toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" }),
        };

        setMessages([...messages, mentorMsg, aiReply]);
        setMentorPrompt("");
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[var(--color-bg)] text-foreground">
            {/* Top Bar */}
            <m.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="z-50 flex shrink-0 items-center justify-between border-b border-[var(--color-border-light)] bg-[var(--color-surface-glass)] p-4 px-6 backdrop-blur-2xl"
            >
                <div className="flex items-center gap-6">
                    <Link href="/feed" className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]">
                        <ArrowLeftIcon size={16} weight="bold" /> Back
                    </Link>
                    <div className="h-6 w-px bg-[var(--color-border-light)]" />
                    <div className="flex flex-col gap-0.5">
                        <h1 className="font-heading text-lg font-bold tracking-tight md:text-xl">WhatsApp Order Manager</h1>
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="h-5 border-[rgba(255,184,0,0.3)] bg-[rgba(255,184,0,0.1)] px-2 text-[9px] font-bold uppercase tracking-wider text-[#FFB800]">
                                Building
                            </Badge>
                            <div className="flex items-center -space-x-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-surface-3)] text-[9px] font-bold">AC</div>
                                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-surface-3)] text-[9px] font-bold">CN</div>
                                <span className="ml-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] opacity-60">2 Members</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden items-center gap-4 md:flex">
                    <div className="flex items-center gap-2 rounded-full border border-[var(--color-border-light)] bg-[var(--color-surface-glass)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-[var(--color-primary-light)]">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]" />
                        Mentor Online
                    </div>
                </div>
            </m.div>

            {/* Mobile Tab Bar */}
            <div className="flex shrink-0 border-b border-[var(--color-border-light)] bg-[var(--color-surface-1)] md:hidden">
                <button
                    className={`flex flex-1 items-center justify-center gap-2 py-4 text-[11px] font-bold uppercase tracking-widest transition-all ${mobileTab === "chat" ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]" : "text-[var(--color-text-secondary)] opacity-60"}`}
                    onClick={() => setMobileTab("chat")}
                >
                    <PaperPlaneRightIcon size={16} /> Chat
                </button>
                <button
                    className={`flex flex-1 items-center justify-center gap-2 py-4 text-[11px] font-bold uppercase tracking-widest transition-all ${mobileTab === "ai" ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]" : "text-[var(--color-text-secondary)] opacity-60"}`}
                    onClick={() => setMobileTab("ai")}
                >
                    <RobotIcon size={16} /> AI Agent
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden bg-[var(--color-bg)] md:grid md:grid-cols-[1fr_420px]">
                {/* Chat Panel */}
                <div className={`relative flex flex-col border-r border-[var(--color-border-light)] bg-[var(--color-surface-1)]/50 ${mobileTab === "chat" ? "flex" : "hidden md:flex"}`}>
                    <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-8 pb-[120px]">
                        <AnimatePresence initial={false}>
                            {messages.map((msg) => (
                                <m.div
                                    key={msg.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className={`flex max-w-[85%] gap-4 ${msg.sender === "founder" ? "ml-auto flex-row-reverse" : ""}`}
                                >
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-sm ${
                                            msg.sender === "ai" ? "border border-[var(--color-border-light)] bg-[var(--color-surface-glass)] text-[var(--color-primary)]" : 
                                            msg.sender === "founder" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-3)] text-foreground"
                                        }`}
                                    >
                                        {msg.sender === "ai" ? <RobotIcon size={20} weight="fill" /> : msg.initials}
                                    </div>
                                    <div className={`flex flex-1 flex-col gap-1.5 ${msg.sender === "founder" ? "items-end" : ""}`}>
                                        <div className={`flex items-center gap-3 ${msg.sender === "founder" ? "flex-row-reverse" : ""}`}>
                                            <span className="text-[11px] font-bold uppercase tracking-widest opacity-60">{msg.name}</span>
                                            <span className="font-mono text-[10px] opacity-40">{msg.timestamp}</span>
                                        </div>
                                        <div className={`shadow-sm whitespace-pre-wrap rounded-2xl p-4 text-[15px] leading-relaxed transition-all ${
                                            msg.sender === "founder" ? "rounded-tr-sm bg-[var(--color-primary)] text-white" : 
                                            msg.sender === "ai" ? "rounded-tl-sm border border-[var(--color-border-light)] bg-[var(--color-surface-glass)] backdrop-blur-md text-foreground shadow-[0_4px_20px_rgba(230,126,34,0.05)]" : 
                                            "rounded-tl-sm border border-[var(--color-border-light)] bg-[var(--color-surface-1)] text-[var(--color-text-secondary)]"
                                        }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </m.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <form onSubmit={handleSend} className="absolute bottom-6 left-8 right-8">
                        <m.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="flex gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-glass)] p-1.5 pl-5 backdrop-blur-xl transition-all focus-within:border-[var(--color-primary)]"
                        >
                            <input
                                type="text"
                                className="flex-1 bg-transparent text-[15px] text-foreground focus:outline-none"
                                placeholder="Message your team..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                id="chat-input"
                            />
                            <Button type="submit" size="icon" className="h-10 w-10 shrink-0 rounded-xl" disabled={!newMessage.trim()}>
                                <PaperPlaneRightIcon size={18} weight="fill" />
                            </Button>
                        </m.div>
                    </form>
                </div>

                {/* AI Agent Panel */}
                <m.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`flex flex-col gap-8 overflow-y-auto bg-[var(--color-bg)] p-8 ${mobileTab === "ai" ? "flex" : "hidden md:flex"}`}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="font-heading flex items-center gap-3 text-lg font-bold tracking-tight text-foreground">
                            <RobotIcon size={24} weight="duotone" className="text-[var(--color-primary)]" /> Command Center
                        </h2>
                        <Badge className="gap-1.5 rounded-full px-3 py-1 font-bold uppercase tracking-widest text-[10px]">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live
                        </Badge>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-secondary)] opacity-60">Activity Stream</h3>
                        <m.div 
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col gap-3"
                        >
                            {AI_ACTIVITIES.map((activity, i) => (
                                <m.div key={i} variants={item}>
                                    <Card className="flex gap-4 border-[var(--color-border-light)] p-4 shadow-none hover:bg-[var(--color-surface-2)]">
                                        <div className="mt-0.5">
                                            {activity.type === "success" ? (
                                                <CheckCircleIcon size={18} weight="fill" className="text-[var(--color-primary)]" />
                                            ) : (
                                                <ArrowsClockwiseIcon size={18} weight="bold" className="animate-spin text-[var(--color-text-secondary)] opacity-40" />
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[14px] font-bold text-foreground">{activity.text}</span>
                                            <span className="font-mono text-[10px] opacity-40">{activity.time}</span>
                                        </div>
                                    </Card>
                                </m.div>
                            ))}
                        </m.div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-secondary)] opacity-60">Mentor Console</h3>
                        <Card className="border-[var(--color-border-light)] bg-[var(--color-surface-glass)] p-6 backdrop-blur-md">
                            <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">Direct technical overrides. These commands are executed by the AI agent in real-time.</p>
                            <form onSubmit={handleMentorPrompt} className="flex flex-col gap-3">
                                <textarea
                                    className="min-h-[120px] resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-4 text-[14px] leading-relaxed text-foreground transition-all focus:border-[var(--color-primary)] focus:outline-none"
                                    placeholder="e.g. @AI scaffold the Prisma schema with WhatsApp fields..."
                                    value={mentorPrompt}
                                    onChange={(e) => setMentorPrompt(e.target.value)}
                                    id="mentor-prompt"
                                />
                                <Button type="submit" className="h-12 w-full font-bold shadow-lg" disabled={!mentorPrompt.trim()}>
                                    Queue Task <LightningIcon size={16} weight="fill" />
                                </Button>
                            </form>
                        </Card>
                    </div>

                    <div className="mt-auto grid grid-cols-3 gap-6 border-t border-[var(--color-border-light)] pt-8">
                        {[
                            { label: "Prompts", value: "24" },
                            { label: "Tasks", value: "18" },
                            { label: "Accuracy", value: "89%" },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</span>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </m.div>
            </div>
        </div>
    );
}
