"use client";

import { m, useInView } from "motion/react";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Delay before starting the word-by-word reveal (ms) */
  delay?: number;
}

/**
 * Words fade in one by one as the element scrolls into view.
 * Inspired by Aceternity UI text reveal.
 */
export default function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.3em" }}>
      {words.map((word, i) => (
        <m.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.4,
            delay: delay / 1000 + i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "inline-block" }}
        >
          {word}
        </m.span>
      ))}
    </p>
  );
}
