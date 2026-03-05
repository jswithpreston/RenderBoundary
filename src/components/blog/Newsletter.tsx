"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect to your newsletter provider (ConvertKit, Buttondown, etc.)
    // For now, just show success state
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="my-12 rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        Subscribe for updates
      </h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Get new posts delivered to your inbox. No spam, unsubscribe anytime.
      </p>
      {status === "success" ? (
        <p className="mt-4 text-sm text-green-600 dark:text-green-400">
          Thanks for subscribing.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-neutral-500"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
