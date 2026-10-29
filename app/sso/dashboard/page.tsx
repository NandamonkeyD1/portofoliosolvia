"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Mail,
  Plus,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Users,
  Smartphone,
  Globe,
  Radio,
  Layers,
  Quote,
  Search,
  ExternalLink,
  Zap,
  CheckCircle2,
  ScrollText,
  FileSpreadsheet,
  Tag,
  Image as ImageIcon
} from "lucide-react";

export default function SSODashboardPage() {
  const [portfolioCount, setPortfolioCount] = useState<number>(13);
  const [leadsCount, setLeadsCount] = useState<number>(33);
  const [latestLeads, setLatestLeads] = useState<any[]>([]);

  // Hydrate real counts from localStorage
  useEffect(() => {
    try {
      const savedPorto = localStorage.getItem("solvia_portfolio_data");
      if (savedPorto) {
        const parsed = JSON.parse(savedPorto);
        if (Array.isArray(parsed)) setPortfolioCount(parsed.length);
      }

      const savedMsgs = localStorage.getItem("solvia_messages_data");
      if (savedMsgs) {
        const parsed = JSON.parse(savedMsgs);
        if (Array.isArray(parsed)) {
          setLeadsCount(parsed.length);
          setLatestLeads(parsed.slice(0, 3));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const trafficSources = [
    { name: "Direct Visit / Website", percentage: 42, count: "520 Pengunjung", color: "bg-blue-500" },
    { name: "WhatsApp & Chat Direct", percentage: 32, count: "396 Pengunjung", color: "bg-emerald-500" },
    { name: "Google Search (SEO)", percentage: 16, count: "198 Pengunjung", color: "bg-purple-500" },
    { name: "Social Media (Instagram)", percentage: 10, count: "126 Pengunjung", color: "bg-pink-500" },
  ];

  const serviceDemand = [
    { name: "ERP & System Integration Custom", percentage: 38, count: "13 Leads (Tinggi)", color: "bg-[#4c91ff]" },
    { name: "Sistem IoT & Smart Automation", percentage: 28, count: "9 Leads (Tinggi)", color: "bg-emerald-400" },
    { name: "E-Commerce & WhatsApp Bot", percentage: 20, count: "7 Leads (Sedang)", color: "bg-purple-400" },
    { name: "Website & Company Profile", percentage: 14, count: "4 Leads (Stabil)", color: "bg-[#ffde59]" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard Overview & Business Analytics</h1>
          <p className="text-slate-400 text-xs mt-1">
            Ringkasan performa analitik, tren pengunjung, dan kendali data terpusat Solvia Nova.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Analytics Active
          </span>
        </div>
      </div>

      {/* 4 Stat Metric Cards (Clickable to respective pages) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          href="/sso/portfolio"
          className="bg-[#0E1526]/80 hover:bg-[#131c33] border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-5 space-y-3 backdrop-blur-md shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold group-hover:text-white transition-colors">
              Total Portfolio
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{portfolioCount}</div>
          <div className="text-emerald-400 text-[11px] font-medium flex items-center gap-1">
            <span>Lihat & kelola semua proyek →</span>
          </div>
        </Link>

        <Link
          href="/sso/seo"
          className="bg-[#0E1526]/80 hover:bg-[#131c33] border border-slate-800/80 hover:border-purple-500/50 rounded-2xl p-5 space-y-3 backdrop-blur-md shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold group-hover:text-white transition-colors">
              Pengunjung Bulan Ini
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">1,240</div>
          <div className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
            <span>↑ 24% dari bulan lalu (SEO & Direct)</span>
          </div>
        </Link>

        <Link
          href="/sso/messages"
          className="bg-[#0E1526]/80 hover:bg-[#131c33] border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-5 space-y-3 backdrop-blur-md shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold group-hover:text-white transition-colors">
              Total Leads / Pesan
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{leadsCount}</div>
          <div className="text-slate-400 text-[11px] font-medium group-hover:text-cyan-300 transition-colors">
            Form Konsultasi & WhatsApp →
          </div>
        </Link>

        <Link
          href="/sso/messages"
          className="bg-[#0E1526]/80 hover:bg-[#131c33] border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl p-5 space-y-3 backdrop-blur-md shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold group-hover:text-white transition-colors">
              Status Respon Klien
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">100%</div>
          <div className="text-emerald-400/90 text-[11px] font-bold">
            ✓ Cepat via WA & Email Direct
          </div>
        </Link>
      </div>

      {/* ANALYTICS CHARTS SECTION */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Bar Chart */}
        <div className="lg:col-span-8 bg-[#0E1526]/80 border border-slate-800 rounded-3xl p-6 space-y-6 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span>Grafik Tren Pengunjung & Conversion Leads (Mingguan)</span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">Pertumbuhan pengunjung unik dan peningkatan leads per minggu</p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold">
              Oktober 2026
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4 h-48 pt-6 px-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 relative">
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-10">
                <div className="border-b border-white w-full" />
                <div className="border-b border-white w-full" />
                <div className="border-b border-white w-full" />
              </div>

              {[
                { week: "Minggu 1", visitors: 340, leads: 5, height: "40%" },
                { week: "Minggu 2", visitors: 520, leads: 8, height: "60%" },
                { week: "Minggu 3", visitors: 890, leads: 12, height: "82%" },
                { week: "Minggu 4", visitors: 1240, leads: 33, height: "100%" },
              ].map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 z-10 group">
                  <div className="text-[10px] font-mono text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    {data.visitors} Visit ({data.leads} Leads)
                  </div>
                  <div className="w-full max-w-[48px] bg-slate-900 border border-slate-700/80 rounded-xl p-1 flex items-end justify-center h-full">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 via-blue-400 to-[#61adff] rounded-lg group-hover:brightness-125 transition-all duration-300"
                      style={{ height: data.height }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                    {data.week}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 px-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-500" />
                  <span>Pengunjung Unik</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-400" />
                  <span>Konsultasi / Leads</span>
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">Rata-rata Konversi: 2.6%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Traffic Sources Breakdown */}
        <div className="lg:col-span-4 bg-[#0E1526]/80 border border-slate-800 rounded-3xl p-6 space-y-6 backdrop-blur-md shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Sumber Traffic (Acquisition)</span>
            </h3>
            <p className="text-slate-400 text-xs mt-2 mb-4">Saluran utama tempat calon klien menemukan Solvia.Nova</p>

            <div className="space-y-4">
              {trafficSources.map((source, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-200 font-semibold">{source.name}</span>
                    <span className="text-slate-400 font-mono font-bold">{source.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full ${source.color} rounded-full transition-all duration-500`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 text-right">{source.count}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-300 space-y-1">
            <span className="font-bold text-white block">💡 Insight Acquisition:</span>
            <span>42% lalu lintas langsung berasal dari rekomendasi klien & portofolio publik.</span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS & KELOLA DATA TERPUSAT */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Quick Actions Grid (All sub-menus represented) */}
        <div className="lg:col-span-6 bg-[#0E1526]/80 border border-slate-800/80 rounded-3xl p-6 space-y-4 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Quick Action Tambah Data</span>
            </h3>
            <span className="text-slate-400 text-xs">Akses Kilat</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/sso/portfolio"
              className="flex items-center gap-2 p-3 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-300 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold"
            >
              <FolderKanban className="w-4 h-4" />
              <span>+ Portfolio Proyek</span>
            </Link>

            <Link
              href="/sso/services"
              className="flex items-center gap-2 p-3 rounded-xl bg-cyan-600/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-600 hover:text-white transition-all text-xs font-bold"
            >
              <Layers className="w-4 h-4" />
              <span>+ Paket Layanan</span>
            </Link>

            <Link
              href="/sso/categories"
              className="flex items-center gap-2 p-3 rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold"
            >
              <Tag className="w-4 h-4" />
              <span>+ Kategori Baru</span>
            </Link>

            <Link
              href="/sso/gallery"
              className="flex items-center gap-2 p-3 rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all text-xs font-bold"
            >
              <ImageIcon className="w-4 h-4" />
              <span>+ Upload Galeri</span>
            </Link>

            <Link
              href="/sso/team"
              className="flex items-center gap-2 p-3 rounded-xl bg-amber-600/15 border border-amber-500/30 text-amber-300 hover:bg-amber-600 hover:text-white transition-all text-xs font-bold"
            >
              <Users className="w-4 h-4" />
              <span>+ Anggota Tim</span>
            </Link>

            <Link
              href="/sso/articles"
              className="flex items-center gap-2 p-3 rounded-xl bg-purple-600/15 border border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:text-white transition-all text-xs font-bold"
            >
              <FileText className="w-4 h-4" />
              <span>+ Tulis Artikel</span>
            </Link>

            <Link
              href="/sso/invoice/create"
              className="flex items-center gap-2 p-3 rounded-xl bg-yellow-600/15 border border-yellow-500/30 text-yellow-300 hover:bg-yellow-600 hover:text-white transition-all text-xs font-bold"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>+ Buat Invoice</span>
            </Link>

            <Link
              href="/sso/messages"
              className="flex items-center gap-2 p-3 rounded-xl bg-pink-600/15 border border-pink-500/30 text-pink-300 hover:bg-pink-600 hover:text-white transition-all text-xs font-bold"
            >
              <MessageSquare className="w-4 h-4" />
              <span>+ Catat Pesan / Lead</span>
            </Link>

            <Link
              href="/sso/letters/create"
              className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-600/25 to-indigo-600/25 border border-blue-500/40 text-blue-300 hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all text-xs font-bold shadow-md"
            >
              <ScrollText className="w-4 h-4" />
              <span>+ Buat Dokumen &amp; Surat Resmi Berkop</span>
            </Link>
          </div>
        </div>

        {/* Pesan Terbaru */}
        <div className="lg:col-span-6 bg-[#0E1526]/80 border border-slate-800/80 rounded-3xl p-6 space-y-4 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Pesan &amp; Leads Terbaru</span>
              </h3>
              <Link
                href="/sso/messages"
                className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
              >
                <span>Lihat semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3 mt-4">
              {latestLeads.length > 0 ? (
                latestLeads.map((m, idx) => (
                  <Link
                    key={m.id || idx}
                    href="/sso/messages"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 transition-colors block group"
                  >
                    <div className="space-y-0.5 min-w-0 pr-3">
                      <div className="text-white text-xs font-bold group-hover:text-cyan-300 transition-colors truncate">
                        {m.sender}
                      </div>
                      <div className="text-slate-400 text-[11px] truncate max-w-sm">
                        {m.subject || m.message}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full font-bold border whitespace-nowrap shrink-0 ${
                        m.unread
                          ? "text-amber-300 bg-amber-500/15 border-amber-500/30"
                          : "text-emerald-400 bg-emerald-500/15 border-emerald-500/30"
                      }`}
                    >
                      {m.unread ? "Belum Dibaca" : "Ter-Followup"}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="text-slate-500 text-xs text-center py-6">
                  Belum ada pesan yang tersimpan.
                </div>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Respon klien cepat via integrasi tombol WhatsApp:</span>
            <Link
              href="/sso/messages"
              className="text-emerald-400 hover:text-emerald-300 font-bold text-xs inline-flex items-center gap-1"
            >
              <span>Buka Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
