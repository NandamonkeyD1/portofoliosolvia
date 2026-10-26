"use client";

import Link from "next/link";

export default function Topbar({ onSearchOpen }: { onSearchOpen: () => void }) {
  return (
    <header className="topbar">
      <Link className="wordmark flex items-center gap-3 no-underline group" href="/">
        <img
          src="/assets/images/Solvia.png"
          alt="Solvia Nova Logo"
          className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_12px_rgba(18,169,255,0.35)]"
        />
        <span>
          Solvia<span>.Nova</span>
        </span>
      </Link>

      <div className="actions">
        <button
          type="button"
          className="search cursor-pointer text-left border-0"
          onClick={onSearchOpen}
          aria-label="Cari layanan, proyek, atau artikel"
        >
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 5 5" />
          </svg>
          <span>Cari apa hari ini?</span>
          <kbd>Ctrl K</kbd>
        </button>

        <Link className="btn-custom btn-primary" href="/contact">
          Mulai Proyek <b>→</b>
        </Link>
      </div>
    </header>
  );
}
