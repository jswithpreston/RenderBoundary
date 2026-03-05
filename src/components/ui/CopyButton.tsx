"use client";

import { useRef, useState } from "react";

export function CopyButton() {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const handleCopy = async () => {
    const pre = ref.current?.closest("pre");
    const code = pre?.querySelector("code");
    const text = code?.textContent ?? pre?.textContent ?? "";

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      ref={ref}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="absolute right-3 top-3 z-10 rounded border border-neutral-700 bg-neutral-800 px-2 py-1 text-xs text-neutral-300 opacity-0 transition-opacity hover:bg-neutral-700 group-hover:opacity-100 focus:opacity-100"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
