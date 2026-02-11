"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const navKeys = [
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "portfolio", href: "#portfolio" },
  { key: "contact", href: "#contact" },
] as const;

export default function Navigation() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();

  function switchLocale(next: string) {
    document.cookie = `locale=${next};path=/;max-age=31536000`;
    router.refresh();
  }

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-8 py-5 lg:px-12">
      {/* Logo */}
      <div className="flex items-center gap-10">
        <Link href="/" aria-label="Home">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2L14 10L8 6L12 16L2 18L12 20L8 30L14 26L20 38L26 26L32 30L28 20L38 18L28 16L32 6L26 10L20 2Z"
              fill="#222222"
            />
            <path
              d="M20 10L17 15L14 13L16 18L10 19L16 20L14 25L17 23L20 30L23 23L26 25L24 20L30 19L24 18L26 13L23 15L20 10Z"
              fill="white"
            />
          </svg>
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navKeys.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-primary transition-colors hover:text-secondary"
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-6">
        {/* Language switcher */}
        <div className="flex items-center gap-1 text-sm">
          <button
            type="button"
            onClick={() => switchLocale("fr")}
            className={`transition-colors ${locale === "fr" ? "font-medium text-primary" : "text-secondary hover:text-primary"}`}
          >
            FR
          </button>
          <span className="text-secondary/30">/</span>
          <button
            type="button"
            onClick={() => switchLocale("en")}
            className={`transition-colors ${locale === "en" ? "font-medium text-primary" : "text-secondary hover:text-primary"}`}
          >
            EN
          </button>
        </div>

        {/* CTA */}
        <Link
          href="#contact"
          className="hidden items-center gap-1 text-sm text-primary underline underline-offset-4 md:flex"
        >
          {t("cta")}
          <span className="text-xs">&#8599;</span>
        </Link>
      </div>
    </nav>
  );
}
