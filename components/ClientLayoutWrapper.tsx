"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import ChatbotNovi from "@/components/ChatbotNovi";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  const isAuthOrAdmin =
    pathname.startsWith("/sso") ||
    pathname.startsWith("/admin") ||
    pathname === "/login";

  if (isAuthOrAdmin) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="solvia-body min-h-screen">
      <div className="layout">
        <Sidebar onSearchOpen={() => setSearchOpen(true)} />
        <main className="main">
          <Topbar onSearchOpen={() => setSearchOpen(true)} />
          {children}
          <Footer />
        </main>
      </div>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ChatbotNovi />
    </div>
  );
}
