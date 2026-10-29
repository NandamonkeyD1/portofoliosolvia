"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Layers,
  Tag,
  Image as ImageIcon,
  Users,
  FileText,
  Star,
  Mail,
  Search,
  FileSpreadsheet,
  ScrollText,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function SSOLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Auto-close on route navigation
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile sidebar is active
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  // If on the login page /sso (exact), do not render the sidebar layout
  if (pathname === "/sso" || pathname === "/sso/") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/sso/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/sso/portfolio", label: "Portfolio", icon: Globe },
    { href: "/sso/services", label: "Services", icon: Layers },
    { href: "/sso/categories", label: "Kategori", icon: Tag },
    { href: "/sso/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/sso/team", label: "Team", icon: Users },
    { href: "/sso/articles", label: "Articles", icon: FileText },
    { href: "/sso/testimonials", label: "Testimonials", icon: Star },
    { href: "/sso/messages", label: "Messages", icon: Mail },
    { href: "/sso/seo", label: "SEO", icon: Search },
    { href: "/sso/invoice", label: "Invoice", icon: FileSpreadsheet },
    { href: "/sso/letters", label: "Surat Menyurat", icon: ScrollText },
    { href: "/sso/settings", label: "Settings", icon: Settings },
  ];

  // Mobile Bottom Bar core navigation links
  const mobileBottomItems = [
    { href: "/sso/dashboard", label: "Beranda", icon: LayoutDashboard },
    { href: "/sso/portfolio", label: "Portofolio", icon: Globe },
    { href: "/sso/invoice", label: "Invoice", icon: FileSpreadsheet },
    { href: "/sso/messages", label: "Pesan", icon: Mail },
  ];

  const getPageTitle = () => {
    if (pathname.includes("/seo")) return "SEO Management";
    if (pathname.includes("/settings")) return "Settings — Admin Solvia Nova";
    if (pathname.includes("/letters")) return "Surat Menyurat & Dokumen Resmi";
    if (pathname.includes("/invoice")) return "Invoice";
    if (pathname.includes("/messages")) return "Messages";
    if (pathname.includes("/portfolio")) return "Portfolio Management";
    if (pathname.includes("/services")) return "Services Management";
    if (pathname.includes("/categories")) return "Kategori Management";
    if (pathname.includes("/gallery")) return "Gallery Management";
    if (pathname.includes("/team")) return "Team Management";
    if (pathname.includes("/articles")) return "Articles Management";
    if (pathname.includes("/testimonials")) return "Testimonials Management";
    return "Dashboard";
  };

  return (
    <div className="relative z-10 min-h-screen bg-[#070A12] text-slate-100 flex flex-col md:flex-row antialiased font-sans">
      {/* Sidebar Overlay for Mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Left Sidebar (Desktop Fixed + Mobile Slide-Over Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-64 h-[100dvh] bg-[#0A0E1A] border-r border-slate-800 flex flex-col justify-between transition-transform duration-250 ease-out print:hidden ${
          mobileSidebarOpen ? "translate-x-0 shadow-2xl shadow-blue-900/30" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header Brand */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
            <Link href="/sso/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 p-1 flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                <img
                  src="/assets/images/Solvia.png"
                  alt="Solvia Nova Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight leading-tight">
                  Solvia <span className="text-blue-400">Nova</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Admin Control Center</span>
              </div>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto overscroll-contain">
            <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Navigasi Admin
            </div>
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              const IconComp = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 md:py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    active
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <IconComp className={`w-4 h-4 shrink-0 ${active ? "text-blue-400" : "text-slate-400"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />}
                </Link>
              );
            })}
          </nav>

          {/* Logout & Quick Site Footer */}
          <div className="p-3 sm:p-4 border-t border-slate-800 space-y-1">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>Lihat Web Publik</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <Link
              href="/sso"
              onClick={() => {
                try {
                  localStorage.removeItem("solvia_admin_logged");
                  localStorage.removeItem("solvia_admin_email");
                } catch (e) {
                  console.error(e);
                }
              }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Keluar (Logout)</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Right Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64 min-h-screen print:pl-0 print:min-h-0 print:block">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#0A0E1A]/95 backdrop-blur-md border-b border-slate-800 px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-800/90 text-slate-300 hover:text-white shrink-0 cursor-pointer active:scale-95 transition-transform"
              aria-label="Buka Menu Navigasi"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide truncate">
                {getPageTitle()}
              </h1>
              <span className="hidden xs:block md:hidden text-[10px] text-slate-400 font-mono">
                Solvia Nova Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Lihat Web</span>
            </a>
            <Link
              href="/sso/settings"
              title="Pengaturan Admin Solvia Nova"
              className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 p-1 flex items-center justify-center shadow-md transition-colors cursor-pointer shrink-0"
            >
              <img
                src="/assets/images/Solvia.png"
                alt="Solvia Admin Settings"
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content with Responsive Padding & Bottom Spacing for Mobile Bottom Bar */}
        <main className="relative z-10 flex-1 px-3.5 py-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-12 print:p-0 print:m-0 print:max-w-none print:w-full">
          {children}
        </main>

        {/* Bottom Navigation Bar for Mobile (Hidden on Desktop & Print) */}
        <nav
          className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#0A0E1A]/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around print:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
          style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
          aria-label="Navigasi Bawah Mobile"
        >
          {mobileBottomItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/sso/dashboard" && pathname.startsWith(item.href));
            const IconComp = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                  active
                    ? "text-blue-400 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <div
                  className={`p-1 rounded-lg transition-colors ${
                    active ? "bg-blue-600/20 text-blue-400" : ""
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 leading-none">{item.label}</span>
              </Link>
            );
          })}

          {/* "Menu" button to open the full drawer containing all 13 sub-menus */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              mobileSidebarOpen
                ? "text-blue-400 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
            aria-label="Buka Semua Menu"
          >
            <div className={`p-1 rounded-lg ${mobileSidebarOpen ? "bg-blue-600/20 text-blue-400" : ""}`}>
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 leading-none">Semua Menu</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
