import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-secondary/10 px-8 py-12 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        {/* Left — name */}
        <p className="text-sm text-secondary">
          &copy; {new Date().getFullYear()} Antsa Ratolojanahary
        </p>

        {/* Center — nav */}
        <nav>
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-secondary transition-colors hover:text-primary"
                >
                  {link.label}
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
          Back to top &uarr;
        </Link>
      </div>
    </footer>
  );
}
