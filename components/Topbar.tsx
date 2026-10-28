"use client";

import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface TopbarProps {
  onSearchOpen: () => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export default function Topbar({
  onSearchOpen,
  isSidebarOpen = true,
  onToggleSidebar,
}: TopbarProps) {
  return (
    <header className="topbar">
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            title={isSidebarOpen ? "Tutup Sidebar (Ctrl + B)" : "Buka Sidebar (Ctrl + B)"}
            aria-label="Toggle Sidebar"
            className="p-2 sm:p-2.5 rounded-xl bg-[#092244]/80 hover:bg-[#103463] border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all duration-200 flex items-center justify-center group shadow-sm active:scale-95 shrink-0"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-5 h-5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            ) : (
              <PanelLeftOpen className="w-5 h-5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
            )}
          </button>
        )}

        <Link className="wordmark flex items-center gap-2 sm:gap-3 no-underline group shrink-0" href="/">
          <img
            src="/assets/images/Solvia.png"
            alt="Solvia Nova Logo"
            className="h-8 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_12px_rgba(18,169,255,0.35)]"
          />
          <span className="text-white font-bold font-['Space_Grotesk'] text-lg sm:text-2xl tracking-tight">
            Solvia<span className="text-[#38bdf8]">.Nova</span>
          </span>
        </Link>
      </div>

      <div className="actions shrink-0">
        <button
          type="button"
          className="search cursor-pointer text-left border-0 shrink-0"
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

        <Link
          className="btn-custom btn-primary shrink-0 whitespace-nowrap !py-2.5 sm:!py-3.5 !px-3.5 sm:!px-6"
          href="/contact"
        >
          <span className="hidden xs:inline sm:inline">Mulai Proyek</span>
          <span className="xs:hidden sm:hidden">Proyek</span>
          <b className="ml-1">→</b>
        </Link>
      </div>
    </header>
  );
}
