"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle, ArrowsClockwise, Robot, PaperPlaneRight, User, Lightning } from "@phosphor-icons/react";
import styles from "./workspace.module.css";

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

export default function WorkspacePage() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [newMessage, setNewMessage] = useState("");
    const [mentorPrompt, setMentorPrompt] = useState("");
    const [mobileTab, setMobileTab] = useState<"chat" | "ai">("chat");

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
        <div className={styles.workspace}>
            {/* Top Bar */}
            <div className={styles.topBar}>
                <div className={styles.topBarLeft}>
                    <Link href="/feed" className={styles.backBtn}><ArrowLeft size={16} weight="bold" /> Back</Link>
                    <div className={styles.projectInfo}>
                        <h1 className={styles.projectTitle}>WhatsApp Order Manager</h1>
                        <div className={styles.projectMeta}>
                            <span className={styles.statusBadge}>Building</span>
                            <span className={styles.projectMembers}>
                                <span className={styles.memberAvatar}>AC</span>
                                <span className={styles.memberAvatar} style={{ marginLeft: "-8px", zIndex: 1 }}>CN</span>
                                <span className={styles.memberLabel}>2 members</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.topBarRight}>
                    <div className={styles.onlineStatus}>
                        <span className={styles.onlineDot} />
                        Mentor Online
                    </div>
                </div>
            </div>

            {/* Mobile Tab Bar */}
            <div className={styles.mobileTabBar}>
                <button
                    className={`${styles.mobileTab} ${mobileTab === "chat" ? styles.mobileTabActive : ""}`}
                    onClick={() => setMobileTab("chat")}
                >
                    <PaperPlaneRight size={16} /> Chat
                </button>
                <button
                    className={`${styles.mobileTab} ${mobileTab === "ai" ? styles.mobileTabActive : ""}`}
                    onClick={() => setMobileTab("ai")}
                >
                    <Robot size={16} /> AI Agent
                </button>
            </div>

            <div className={styles.workspaceBody}>
                {/* Chat Panel */}
                <div className={`${styles.chatPanel} ${mobileTab === "chat" ? styles.mobileVisible : styles.mobileHidden}`}>
                    <div className={styles.chatMessages}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`${styles.message} ${msg.sender === "founder"
                                    ? styles.msgFounder
                                    : msg.sender === "ai"
                                        ? styles.msgAI
                                        : styles.msgMentor
                                    }`}
                            >
                                <div
                                    className={`${styles.avatar} ${msg.sender === "ai" ? styles.aiAvatar : ""}`}
                                >
                                    {msg.sender === "ai" ? <Robot size={16} weight="fill" /> : msg.initials}
                                </div>
                                <div className={styles.msgBody}>
                                    <div className={styles.msgHeader}>
                                        <span className={styles.msgName}>{msg.name}</span>
                                        <span className={styles.msgTime}>{msg.timestamp}</span>
                                    </div>
                                    <div className={styles.msgContent}>{msg.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className={styles.chatInput}>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                className={styles.textInput}
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                id="chat-input"
                            />
                            <button type="submit" className={styles.sendBtn} disabled={!newMessage.trim()}>
                                <PaperPlaneRight size={20} weight="fill" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* AI Agent Panel */}
                <div className={`${styles.agentPanel} ${mobileTab === "ai" ? styles.mobileVisible : styles.mobileHidden}`}>
                    <div className={styles.agentHeader}>
                        <h2 className={styles.agentTitle}><Robot size={24} weight="duotone" className={styles.agentIcon} /> AI Agent Panel</h2>
                        <span className={styles.agentBadge}><span className={styles.pulseDot} /> Active</span>
                    </div>

                    <div className={styles.agentSection}>
                        <h3 className={styles.agentSubtitle}>Activity Log</h3>
                        <div className={styles.agentActivityGrid}>
                            {AI_ACTIVITIES.map((activity, i) => (
                                <div key={i} className={styles.activityItem}>
                                    <div className={styles.activityIconWrapper}>
                                        {activity.type === "success" ? (
                                            <CheckCircle size={16} weight="bold" className={styles.iconSuccess} />
                                        ) : (
                                            <ArrowsClockwise size={16} weight="bold" className={`${styles.iconLoading} spin`} />
                                        )}
                                    </div>
                                    <div className={styles.activityContentWrapper}>
                                        <span className={styles.activityText}>{activity.text}</span>
                                        <span className={styles.activityTime}>{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.agentSection}>
                        <h3 className={styles.agentSubtitle}><Lightning size={16} weight="bold" className={styles.subIcon} /> Mentor Controls</h3>
                        <p className={styles.controlsHint}>
                            Mentor-only: Guide the AI agent directly. The founder sees all progress.
                        </p>
                        <form onSubmit={handleMentorPrompt} className={styles.promptForm}>
                            <textarea
                                className={styles.promptArea}
                                placeholder="Give the AI a technical command…"
                                value={mentorPrompt}
                                onChange={(e) => setMentorPrompt(e.target.value)}
                                id="mentor-prompt"
                            />
                            <button type="submit" className={styles.actionBtn} disabled={!mentorPrompt.trim()}>
                                Send Command <PaperPlaneRight size={16} weight="bold" />
                            </button>
                        </form>
                    </div>

                    <div className={styles.agentStats}>
                        <div className={styles.agentStatItem}>
                            <span className={styles.agentStatValue}>24</span>
                            <span className={styles.agentStatLabel}>Prompts Sent</span>
                        </div>
                        <div className={styles.agentStatItem}>
                            <span className={styles.agentStatValue}>18</span>
                            <span className={styles.agentStatLabel}>Tasks Complete</span>
                        </div>
                        <div className={styles.agentStatItem}>
                            <span className={styles.agentStatValue}>89%</span>
                            <span className={styles.agentStatLabel}>Accuracy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
