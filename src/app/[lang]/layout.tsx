import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { getDictionary, isLanguage, languages } from "@/lib/i18n";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <PageShell lang={lang} dictionary={dictionary}>
      {children}
    </PageShell>
  );
}
