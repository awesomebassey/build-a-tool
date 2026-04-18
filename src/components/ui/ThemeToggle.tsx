"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ width: 32, height: 32 }} />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-toggle"
            aria-label="Toggle theme"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--color-surface-2)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.background = "var(--color-surface-3)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "var(--color-surface-2)";
            }}
            onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.95)";
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
            }}
        >
            {theme === "dark" ? (
                <MoonIcon size={18} weight="duotone" />
            ) : (
                <SunIcon size={18} weight="duotone" />
            )}
        </button>
    );
}
