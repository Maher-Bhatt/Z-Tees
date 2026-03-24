import { useState, useEffect } from "react";
import { Instagram, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Collection", href: "#collection" },
    { label: "Sizes", href: "#sizes" },
    { label: "Order", href: "#how-to-order" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b-[3px] border-brand-yellow transition-all duration-300 ${
          scrolled ? "backdrop-blur-md bg-brand-black/80" : "bg-brand-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2">
              <span className="font-display text-4xl text-brand-yellow leading-none tracking-wider">
                Z TEES
              </span>
              <span className="text-brand-yellow text-sm font-accent">✦</span>
            </a>
            {/* Rotating EST badge */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg
                viewBox="0 0 80 80"
                className="w-10 h-10 animate-spin-slow"
                style={{ animationDuration: "10s" }}
              >
                <defs>
                  <path
                    id="circle-path"
                    d="M 40,40 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0"
                  />
                </defs>
                <text className="fill-brand-yellow" fontSize="10" fontFamily="'Space Grotesk', sans-serif" letterSpacing="3">
                  <textPath href="#circle-path">EST. 2025 ✦ EST. 2025 ✦</textPath>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-brand-yellow text-xs font-display">
                Z
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-accent text-sm font-semibold text-brand-white hover:text-brand-yellow transition-colors uppercase tracking-widest"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://instagram.com/z_tees.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full btn-hover"
              style={{
                background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <Instagram size={16} className="text-white" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-brand-yellow p-2"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[60] bg-brand-black flex flex-col transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b-[3px] border-brand-yellow">
          <span className="font-display text-4xl text-brand-yellow">Z TEES</span>
          <button onClick={() => setMenuOpen(false)} className="text-brand-yellow">
            <X size={28} />
          </button>
        </div>
        <div className="flex flex-col gap-0 mt-8 px-6">
          {navLinks.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-6xl text-brand-white hover:text-brand-yellow py-4 border-b border-white/10 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://instagram.com/z_tees.in"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="font-display text-6xl text-brand-white hover:text-brand-pink py-4 border-b border-white/10 transition-colors"
          >
            Instagram
          </a>
        </div>
        <div className="mt-auto px-6 pb-10">
          <a
            href="https://wa.me/917990407096?text=yo!%20i%20want%20to%20order%20from%20Z%20Tees%20%F0%9F%94%A5"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 text-center font-display text-3xl bg-green-500 text-white rounded-sm btn-hover"
          >
            ORDER NOW 💬
          </a>
        </div>
      </div>
    </>
  );
}
