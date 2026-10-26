"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("beranda");

  // Scroll spy when on home page
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const sections = [
        "beranda",
        "tentang",
        "layanan",
        "portfolio",
        "tim",
        "testimoni",
        "artikel",
        "kontak",
      ];
      const scrollY = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Check if link is active
  const isActive = (key: string, route: string) => {
    if (isHome) {
      return activeSection === key;
    }
    return pathname.startsWith(route);
  };

  return (
    <aside className="sidebar">
      <Link
        className="logo-icon group flex flex-col items-center gap-1.5 no-underline !mb-6"
        href={isHome ? "#beranda" : "/"}
        title="Solvia Nova"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0b294e] to-[#04152d] border border-blue-400/40 p-1.5 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:border-cyan-400 group-hover:scale-105 transition-all duration-300">
          <img
            src="/assets/images/Solvia.png"
            alt="Solvia Nova"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-[13px] font-bold tracking-tight text-white font-['Space_Grotesk'] group-hover:text-cyan-300 transition-colors">
          Solvia<span className="text-blue-400">.</span>
        </span>
      </Link>

      <nav className="nav" aria-label="Navigasi utama">
        {/* Beranda */}
        <Link
          className={isActive("beranda", "/") && isHome ? "active" : ""}
          href={isHome ? "#beranda" : "/"}
          onClick={() => isHome && setActiveSection("beranda")}
        >
          <svg viewBox="0 0 24 24">
            <path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7" />
          </svg>
          <span>Beranda</span>
        </Link>

        {/* Tentang */}
        <Link
          className={isHome ? (activeSection === "tentang" ? "active" : "") : pathname === "/about" ? "active" : ""}
          href={isHome ? "#tentang" : "/about"}
          onClick={() => isHome && setActiveSection("tentang")}
        >
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
          <span>Tentang</span>
        </Link>

        {/* Layanan */}
        <Link
          className={isHome ? (activeSection === "layanan" ? "active" : "") : pathname.startsWith("/services") ? "active" : ""}
          href={isHome ? "#layanan" : "/services"}
          onClick={() => isHome && setActiveSection("layanan")}
        >
          <svg viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="2" />
            <rect x="14" y="3" width="7" height="7" rx="2" />
            <rect x="3" y="14" width="7" height="7" rx="2" />
            <rect x="14" y="14" width="7" height="7" rx="2" />
          </svg>
          <span>Layanan</span>
        </Link>

        {/* Portfolio */}
        <Link
          className={isHome ? (activeSection === "portfolio" ? "active" : "") : pathname.startsWith("/portfolio") ? "active" : ""}
          href={isHome ? "#portfolio" : "/portfolio"}
          onClick={() => isHome && setActiveSection("portfolio")}
        >
          <svg viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 9h18M8 4v5" />
          </svg>
          <span>Portfolio</span>
        </Link>

        {/* Tim */}
        <Link
          className={isHome ? (activeSection === "tim" ? "active" : "") : pathname === "/team" ? "active" : ""}
          href={isHome ? "#tim" : "/team"}
          onClick={() => isHome && setActiveSection("tim")}
        >
          <svg viewBox="0 0 24 24">
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2 20a7 7 0 0 1 14 0M16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 4 5" />
          </svg>
          <span>Tim</span>
        </Link>

        {/* Testimoni */}
        <Link
          className={isHome && activeSection === "testimoni" ? "active" : ""}
          href={isHome ? "#testimoni" : "/#testimoni"}
          onClick={() => isHome && setActiveSection("testimoni")}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>Testimoni</span>
        </Link>

        {/* Artikel */}
        <Link
          className={isHome ? (activeSection === "artikel" ? "active" : "") : pathname.startsWith("/articles") ? "active" : ""}
          href={isHome ? "#artikel" : "/articles"}
          onClick={() => isHome && setActiveSection("artikel")}
        >
          <svg viewBox="0 0 24 24">
            <path d="M5 3h11l4 4v14H5zM15 3v5h5M8 12h8M8 16h8" />
          </svg>
          <span>Artikel</span>
        </Link>

        {/* Kontak */}
        <Link
          className={isHome ? (activeSection === "kontak" ? "active" : "") : pathname === "/contact" ? "active" : ""}
          href={isHome ? "#kontak" : "/contact"}
          onClick={() => isHome && setActiveSection("kontak")}
        >
          <svg viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
          </svg>
          <span>Kontak</span>
        </Link>
      </nav>

      <div className="side-bottom">
        <div className="side-label">PRODUCT</div>
        <Link className="kelora" href="/services">
          <i className="kmark" />
          Kelora ›
        </Link>
        <div className="socials">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
            in
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
            ◎
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube">
            ▶
          </a>
        </div>
      </div>
    </aside>
  );
}
