"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PanelLeftOpen } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import ChatbotNovi from "@/components/ChatbotNovi";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle search: Ctrl + K / Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      // Toggle sidebar: Ctrl + B / Cmd + B
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isAuthOrAdmin =
    pathname.startsWith("/sso") ||
    pathname.startsWith("/admin") ||
    pathname === "/login";

  if (isAuthOrAdmin) {
    return <main className="relative z-10 min-h-screen bg-[#070A12] text-slate-100 print:bg-white print:min-h-0 print:p-0 print:m-0 print:static">{children}</main>;
  }

  return (
    <div className="solvia-body min-h-screen">
      <div className="layout">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
          onSearchOpen={() => setSearchOpen(true)}
        />
        <main className={`main ${!sidebarOpen ? "sidebar-closed" : ""}`}>
          <Topbar
            isSidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            onSearchOpen={() => setSearchOpen(true)}
          />
          {children}
          <Footer />
        </main>
      </div>

      {/* Floating Re-Open Tab when Sidebar is closed (Docked cleanly at left center) */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Buka Sidebar"
          title="Buka Sidebar (Ctrl + B)"
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center gap-1.5 pl-2.5 pr-3.5 py-3 rounded-r-2xl bg-[#04152d]/95 border-y border-r border-cyan-400/60 text-cyan-300 shadow-2xl shadow-cyan-950/70 backdrop-blur-md hover:scale-105 hover:bg-[#082245] hover:border-cyan-300 hover:text-white transition-all duration-300 text-xs font-semibold group cursor-pointer animate-fade-in hover:pl-3.5"
        >
          <PanelLeftOpen className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="font-bold">Buka Menu</span>
          <span className="text-[10px] bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800 text-cyan-300 ml-1">
            Ctrl B
          </span>
        </button>
      )}

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ChatbotNovi />
    </div>
  );
}
