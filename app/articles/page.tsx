import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { articlesData } from "@/lib/data";

export default function ArticlesPage() {
  return (
    <div className="py-6 sm:py-10 pb-20 w-full space-y-10 sm:space-y-14 overflow-x-hidden">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/40 text-cyan-300 text-xs font-bold tracking-wider uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          Artikel & Insight Teknologi
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight">
          Wawasan & <span className="text-[#12a9ff]">Berita Digital</span>
        </h1>
        <p className="text-blue-100 text-base leading-relaxed font-medium">
          Temukan wawasan mendalam mengenai ekosistem solusi digital, arsitektur sistem modern, IoT skala industri, dan inovasi teknologi terkini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {articlesData.map((art) => (
          <div
            key={art.id}
            className="group bg-gradient-to-b from-[#0a274d] to-[#04152d] border border-blue-400/30 hover:border-cyan-400/70 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs text-blue-300">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 font-bold text-[11px] sm:text-xs">
                  {art.category}
                </span>
                <span className="text-[11px] sm:text-xs text-blue-200/70">{art.date} • {art.readTime}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                <Link href={`/articles/${art.slug}`}>{art.title}</Link>
              </h2>
              <p className="text-blue-100/90 text-sm leading-relaxed">{art.summary}</p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-blue-400/20">
              <span className="text-xs text-blue-200/80">Penulis: <strong className="text-white font-bold">{art.author}</strong></span>
              <Link
                href={`/articles/${art.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
              >
                Baca Selengkapnya
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
