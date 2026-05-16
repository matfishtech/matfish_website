import Link from "next/link";

interface CtaSectionProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export default function CtaSection({
  title,
  description,
  buttonLabel,
  buttonHref,
}: CtaSectionProps) {
  return (
    <section className="bg-brand-900 py-18 md:py-20 lg:py-24">
      <div className="site-container">
        <div className="border border-white/15 bg-white/6 px-8 py-12 text-center text-white md:px-12 md:py-14 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl lg:text-6xl">{title}</h2>
            <p className="text-lg leading-relaxed text-blue-100 md:text-[1.15rem]">{description}</p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link href={buttonHref} className="cta-link-light">
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
