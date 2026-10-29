"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, BookOpen, AlertCircle, Sparkles } from "lucide-react";
import { articlesData, Article } from "@/lib/data";

export default function ArticleDetailPage() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || "";
  const decodedSlug = decodeURIComponent(rawSlug).trim();

  const [article, setArticle] = useState<Article | null>(() => {
    return (
      articlesData.find(
        (a) =>
          a.slug === decodedSlug ||
          a.id === decodedSlug ||
          a.slug.toLowerCase() === decodedSlug.toLowerCase()
      ) || null
    );
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("solvia_articles_data");
      let allArticles = articlesData;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          allArticles = parsed;
        }
      }

      const found = allArticles.find(
        (a) =>
          a.slug === decodedSlug ||
          a.id === decodedSlug ||
          a.slug?.toLowerCase() === decodedSlug.toLowerCase() ||
          a.id?.toString() === decodedSlug
      );

      if (found) {
        setArticle(found);
      } else if (!article && allArticles.length > 0) {
        setArticle(allArticles[0]);
      }
    } catch (e) {
      console.error("Failed to load article detail:", e);
    }
  }, [decodedSlug]);

  if (!article) {
    return (
      <div className="py-16 sm:py-24 text-center max-w-xl mx-auto space-y-6 px-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Artikel Tidak Ditemukan</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Artikel yang Anda tuju tidak tersedia atau telah dipindahkan.
          </p>
        </div>
        <div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Semua Artikel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 pb-20 max-w-3xl mx-auto space-y-8 sm:space-y-10 px-4 sm:px-6">
      {/* Navigation Back */}
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors p-2 -ml-2 rounded-lg hover:bg-blue-900/30"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Semua Artikel
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-blue-200/80 pt-2 border-b border-blue-400/20 pb-4">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            Penulis: <strong className="text-white font-bold">{article.author}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            {article.readTime}
          </span>
        </div>
      </div>

      {/* ================= FOTO VISUAL / GAMBAR ARTIKEL ================= */}
      {article.image && (
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-blue-400/30 bg-[#020611] shadow-2xl">
          <div className="relative w-full h-56 sm:h-80 md:h-96 bg-slate-950 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-transparent to-transparent opacity-60" />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-invert max-w-none text-slate-200 text-base leading-relaxed space-y-6">
        <p className="text-base sm:text-lg text-white font-medium italic border-l-4 border-cyan-400 pl-4 py-2 bg-blue-950/40 rounded-r-xl">
          {article.summary}
        </p>
        <div className="space-y-4 text-sm sm:text-base text-blue-100/90 leading-relaxed whitespace-pre-line">
          {article.content}
        </div>
        <p className="pt-4 text-sm sm:text-base text-slate-300">
          Teknologi berkembang sangat pesat. Dengan mengadopsi prinsip <em>Understand Problems First, Build Solutions</em>, setiap proyek yang dikembangkan dapat memberikan value bisnis berkelanjutan dan tahan terhadap tantangan masa depan.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="pt-8 border-t border-blue-400/20 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl shadow-cyan-500/20 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          <span>Konsultasi Proyek Digital Bersama Solvia Nova</span>
        </Link>
      </div>
    </div>
  );
}
