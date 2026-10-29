"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Building2,
  Sparkles,
  Layers,
  Phone,
  Mail,
  Image as ImageIcon,
  Check,
  AlertCircle
} from "lucide-react";
import { portfolioData, Portfolio } from "@/lib/data";

export default function PortfolioDetailPage() {
  const params = useParams();
  const rawId = (params?.id as string) || "";
  const decodedId = decodeURIComponent(rawId).trim();

  const [project, setProject] = useState<Portfolio | null>(() => {
    // Initial server/static match
    return (
      portfolioData.find(
        (p) =>
          p.slug === decodedId ||
          p.id === decodedId ||
          p.slug.toLowerCase() === decodedId.toLowerCase()
      ) || null
    );
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("solvia_portfolio_data");
      let allProjects = portfolioData;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          allProjects = parsed;
        }
      }

      const found = allProjects.find(
        (p) =>
          p.slug === decodedId ||
          p.id === decodedId ||
          p.slug?.toLowerCase() === decodedId.toLowerCase() ||
          p.id?.toString() === decodedId
      );

      if (found) {
        setProject(found);
      } else if (!project && allProjects.length > 0) {
        // Fallback to first item if completely unmatched
        setProject(allProjects[0]);
      }
    } catch (e) {
      console.error("Failed to load portfolio detail:", e);
    } finally {
      setLoading(false);
    }
  }, [decodedId]);

  if (!project) {
    return (
      <div className="py-16 sm:py-24 text-center max-w-xl mx-auto space-y-6 px-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Portofolio Tidak Ditemukan</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Proyek yang Anda cari tidak tersedia atau belum dipublikasikan.
          </p>
        </div>
        <div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Portofolio
          </Link>
        </div>
      </div>
    );
  }

  const caseStudy = project.caseStudy || {
    problem: `Kebutuhan digitalisasi dan efisiensi alur operasional pada ${project.client || "bisnis klien"}.`,
    analysis: `Perancangan arsitektur sistem modern yang adaptif, aman, dan mudah dioperasikan.`,
    solution: `Implementasi platform ${project.name} dengan integrasi teknologi mutakhir.`,
    technology: project.techStack?.join(", ") || "Next.js, React, Node.js",
    result: `Peningkatan efisiensi kerja, proses transaksi lebih cepat, dan kontrol data terpusat.`
  };

  return (
    <div className="py-6 sm:py-10 pb-20 max-w-4xl mx-auto space-y-8 sm:space-y-10 px-4 sm:px-6">
      {/* Navigation Back */}
      <div className="flex items-center justify-between">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors p-2 -ml-2 rounded-lg hover:bg-blue-900/30"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Semua Portofolio</span>
        </Link>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
          ID: {project.id}
        </span>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-cyan-300 text-xs font-extrabold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.status || "Production Selesai"}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
          {project.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 pt-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Klien: <strong className="text-white font-bold">{project.client}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Tahun Rilis: <strong className="text-white font-bold">{project.year}</strong></span>
          </div>
        </div>
      </div>

      {/* ================= FOTO VISUAL / GAMBAR PROJECT (PROMINENT HERO BANNER) ================= */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-blue-400/30 bg-[#020611] shadow-2xl group">
        <div className="relative w-full h-64 sm:h-96 md:h-[420px] bg-slate-950 overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-transparent to-transparent opacity-60" />

          {/* Floating Photo Tag */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#020611]/85 backdrop-blur-md border border-blue-400/40 text-white text-xs font-bold shadow-lg">
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dokumentasi Visual Resmi</span>
            </span>
            <span className="text-xs font-mono text-cyan-300 bg-blue-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-blue-400/30">
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* ================= CONTENT & CASE STUDY ================= */}
      <div className="bg-gradient-to-b from-[#0a274d] to-[#04152d] border border-blue-400/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
        {/* Deskripsi Proyek */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Deskripsi &amp; Gambaran Sistem</span>
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
            {project.description || project.shortDesc}
          </p>
        </div>

        {/* Analisis Studi Kasus */}
        <div className="space-y-5 pt-6 border-t border-blue-400/20">
          <h3 className="text-lg sm:text-xl font-bold text-cyan-300 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Analisis &amp; Eksekusi Studi Kasus</span>
          </h3>

          <div className="grid grid-cols-1 gap-3.5">
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/50 border border-blue-400/25 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-red-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>1. Problem &amp; Tantangan Klien</span>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">{caseStudy.problem}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/50 border border-blue-400/25 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>2. Analisis &amp; Pemetaan Masalah</span>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">{caseStudy.analysis}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/50 border border-blue-400/25 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>3. Solusi Rekayasa Sistem</span>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">{caseStudy.solution}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/50 border border-blue-400/25 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>4. Teknologi yang Diterapkan</span>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">{caseStudy.technology}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>5. Hasil Akhir &amp; Dampak Bisnis</span>
              </div>
              <p className="text-emerald-100 text-xs sm:text-sm font-semibold leading-relaxed">{caseStudy.result}</p>
            </div>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="space-y-3 pt-6 border-t border-blue-400/20">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Tech Stack yang Digunakan:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {project.techStack?.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-950/60 border border-blue-400/25 text-white text-xs font-bold"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= ACTION CTA BANNER ================= */}
      <div className="bg-gradient-to-r from-blue-950/90 via-[#020611] to-blue-900/90 border border-blue-400/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center space-y-5 shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-cyan-300 mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Ingin Membangun Solusi Seperti Ini?
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Konsultasikan ide, kebutuhan sistem, atau otomasi teknologi Anda bersama tim engineer Solvia Nova.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xl shadow-cyan-500/25 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Form Chat by Email</span>
          </Link>
          <a
            href={`https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(project.name)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white font-bold text-xs sm:text-sm rounded-xl transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp (+62 831-4880-1578)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
