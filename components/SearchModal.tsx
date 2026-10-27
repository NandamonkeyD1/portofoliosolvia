"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { servicesData, portfolioData, articlesData } from "@/lib/data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredServices = servicesData.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredPortfolio = portfolioData.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredArticles = articlesData.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#04152d] border border-blue-500/40 rounded-2xl shadow-2xl overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-blue-500/30">
          <svg
            className="w-5 h-5 text-blue-400 mr-3 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 5 5" />
          </svg>
          <input
            type="text"
            className="w-full bg-transparent text-white placeholder-blue-300/50 text-sm focus:outline-none"
            placeholder="Ketik layanan, proyek, atau artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button
            type="button"
            className="text-xs bg-blue-950 px-2.5 py-1 rounded-lg border border-blue-500/30 text-blue-300 hover:text-white ml-2"
            onClick={onClose}
          >
            ESC
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto space-y-3">
          {filteredServices.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2">
                Layanan
              </div>
              <div className="space-y-1">
                {filteredServices.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services#${s.id}`}
                    className="block p-2 rounded-lg hover:bg-blue-900/40 transition-colors"
                    onClick={onClose}
                  >
                    <div className="text-sm font-semibold text-white">{s.name}</div>
                    <div className="text-xs text-blue-200 line-clamp-1">{s.shortDesc}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredPortfolio.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-2">
                Portofolio
              </div>
              <div className="space-y-1">
                {filteredPortfolio.map((p) => (
                  <Link
                    key={p.id}
                    href={`/portfolio/${p.id}`}
                    className="block p-2 rounded-lg hover:bg-blue-900/40 transition-colors"
                    onClick={onClose}
                  >
                    <div className="text-sm font-semibold text-white">{p.name}</div>
                    <div className="text-xs text-blue-200 line-clamp-1">{p.shortDesc}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredArticles.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">
                Artikel
              </div>
              <div className="space-y-1">
                {filteredArticles.map((a) => (
                  <Link
                    key={a.id}
                    href={`/articles/${a.slug}`}
                    className="block p-2 rounded-lg hover:bg-blue-900/40 transition-colors"
                    onClick={onClose}
                  >
                    <div className="text-sm font-semibold text-white">{a.title}</div>
                    <div className="text-xs text-blue-200 line-clamp-1">{a.summary}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredServices.length === 0 &&
            filteredPortfolio.length === 0 &&
            filteredArticles.length === 0 && (
              <div className="text-center py-8 text-blue-300 text-sm">
                Tidak ada hasil untuk &quot;{searchQuery}&quot;
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
