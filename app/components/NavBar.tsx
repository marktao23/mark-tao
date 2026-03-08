import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/aboutme", label: "About Me" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="brand">
          Mark Tao
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}