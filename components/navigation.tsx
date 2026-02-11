import Link from "next/link";

const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
];

export default function Navigation() {
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
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-primary transition-colors hover:text-secondary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <Link
        href="#contact"
        className="hidden items-center gap-1 text-sm text-primary underline underline-offset-4 md:flex"
      >
        Book A Call
        <span className="text-xs">&#8599;</span>
      </Link>
    </nav>
  );
}
