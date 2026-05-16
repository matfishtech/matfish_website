"use client";

import Link from "next/link";
import { useState } from "react";
import { dispatchToast } from "@/components/ui/ToastHost";
import { getLocalizedPath, type Dictionary, type Language } from "@/lib/i18n";

interface ContactFormSectionProps {
  lang: Language;
  dictionary: Dictionary;
}

export default function ContactFormSection({ lang, dictionary }: ContactFormSectionProps) {
  const formCopy = dictionary.contactpage.form;
  const [statusMessage, setStatusMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [formStartedAt] = useState(() => Date.now());

  return (
    <section className="bg-brand-50 py-20 md:py-24 lg:py-32">
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              {formCopy.title}
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 md:text-xl">{formCopy.description}</p>
          </div>

          <form
            action={process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/REPLACE_ME"}
            method="post"
            className="space-y-6"
            onSubmit={async (event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const honeypot = (form.elements.namedItem("companyWebsite") as HTMLInputElement | null)?.value;
              if (honeypot) {
                form.reset();
                setStatusMessage(formCopy.success);
                dispatchToast("success", formCopy.success);
                return;
              }
              if (Date.now() - formStartedAt < 1500) {
                setStatusMessage(formCopy.error);
                dispatchToast("error", formCopy.error);
                return;
              }
              setStatusMessage(formCopy.sending);
              setSending(true);

              try {
                const formData = new FormData(form);

                const response = await fetch(form.action, {
                  method: "POST",
                  body: formData,
                  headers: {
                    Accept: "application/json",
                  },
                });

                if (!response.ok) {
                  throw new Error("Contact form submission failed");
                }

                form.reset();
                setStatusMessage(formCopy.success);
                dispatchToast("success", formCopy.success);
              } catch {
                setStatusMessage(formCopy.error);
                dispatchToast("error", formCopy.error);
              } finally {
                setSending(false);
              }
            }}
          >
            <input type="hidden" name="lang" value={lang} />
            <input
              type="text"
              name="companyWebsite"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  {formCopy.name}
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={120}
                  className="w-full border-0 border-b border-brand-200 bg-transparent px-0 py-3 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-brand-700"
                  autoComplete="name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  {formCopy.email}
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={254}
                  className="w-full border-0 border-b border-brand-200 bg-transparent px-0 py-3 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-brand-700"
                  autoComplete="email"
                />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  {formCopy.company}
                </span>
                <input
                  type="text"
                  name="company"
                  maxLength={160}
                  className="w-full border-0 border-b border-brand-200 bg-transparent px-0 py-3 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-brand-700"
                  autoComplete="organization"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  {formCopy.phone}
                </span>
                <input
                  type="tel"
                  name="phone"
                  maxLength={40}
                  className="w-full border-0 border-b border-brand-200 bg-transparent px-0 py-3 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-brand-700"
                  autoComplete="tel"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                {formCopy.subject}
              </span>
              <input
                type="text"
                name="subject"
                required
                maxLength={160}
                className="w-full border-0 border-b border-brand-200 bg-transparent px-0 py-3 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-brand-700"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                {formCopy.message}
              </span>
              <textarea
                name="message"
                required
                maxLength={4000}
                rows={6}
                className="w-full resize-y border-0 border-b border-brand-200 bg-transparent px-0 py-3 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-brand-700"
              />
            </label>

            <div className="flex flex-col gap-4 pt-4">
              <button type="submit" className="cta-link w-full justify-center md:w-auto" disabled={sending}>
                {formCopy.submit}
              </button>

              <p className="max-w-2xl text-sm leading-relaxed text-slate-600">{formCopy.privacy}</p>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                <Link href={getLocalizedPath(lang, "privacy")} className="font-semibold text-brand-900">
                  {dictionary.navigation.privacy}
                </Link>
              </p>
            </div>

            <p className="min-h-6 text-sm text-slate-600" aria-live="polite">
              {statusMessage}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
