"use client";

import { useEffect, useRef } from "react";

type ToastType = "success" | "error";

export function dispatchToast(type: ToastType, message: string) {
  if (!message) return;
  document.dispatchEvent(new CustomEvent("matfish:toast", { detail: { type, message } }));
}

export default function ToastHost() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const onToast = (event: Event) => {
      const customEvent = event as CustomEvent<{ type?: ToastType; message?: string }>;
      const detail = customEvent.detail ?? {};
      if (!detail.message) return;

      const toast = document.createElement("div");
      const isError = detail.type === "error";

      toast.className = [
        "pointer-events-auto border bg-white px-4 py-3 text-sm leading-relaxed shadow-sm transition-opacity duration-200",
        isError ? "border-red-200 text-red-900" : "border-brand-200 text-brand-900",
      ].join(" ");

      toast.textContent = detail.message;
      host.appendChild(toast);

      window.setTimeout(() => {
        toast.style.opacity = "0";
        window.setTimeout(() => toast.remove(), 200);
      }, 3500);
    };

    document.addEventListener("matfish:toast", onToast);
    return () => document.removeEventListener("matfish:toast", onToast);
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-3"
    />
  );
}
