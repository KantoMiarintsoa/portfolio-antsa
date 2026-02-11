"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const navKeys = [
  { key: "about", href: "#about" },
  { key: "portfolio", href: "#portfolio" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact" },
] as const;

export default function Footer() {
  const nav = useTranslations("Navigation");
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-secondary/10 px-8 py-12 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        {/* Left — name */}
        <p className="text-sm text-secondary">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>

        {/* Center — nav */}
        <nav>
          <ul className="flex items-center gap-6">
            {navKeys.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-secondary transition-colors hover:text-primary"
                >
                  {nav(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right — back to top */}
        <Link
          href="#"
          className="text-sm text-secondary transition-colors hover:text-primary"
        >
          {t("backToTop")}
        </Link>
      </div>
    </footer>
  );
}
