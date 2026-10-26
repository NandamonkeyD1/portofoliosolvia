import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/lib/data";

interface Props {
  params: {
    id: string;
  };
}

export default function PortfolioDetailPage({ params }: Props) {
  const project = portfolioData.find((p) => p.slug === params.id || p.id === params.id) || portfolioData[0];

  if (!project) {
    notFound();
  }

  return (
    <div className="py-6 sm:py-10 pb-20 max-w-4xl mx-auto space-y-8 sm:space-y-12">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Semua Portofolio
      </Link>

      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase">
          {project.category}
        </div>
        <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight">
          {project.name}
        </h1>
        <div className="flex items-center gap-4 text-slate-400 text-sm">
          <span>Klien: <strong className="text-white">{project.client}</strong></span>
          <span>•</span>
          <span>Tahun: <strong className="text-white">{project.year}</strong></span>
          <span>•</span>
          <span>Status: <strong className="text-emerald-400">Production Selesai</strong></span>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#0a274d] to-[#04152d] border border-blue-400/30 rounded-3xl p-8 space-y-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white">Deskripsi Proyek</h2>
        <p className="text-blue-100/90 text-sm leading-relaxed">{project.description}</p>

        {project.caseStudy && (
          <div className="space-y-4 pt-6 border-t border-blue-400/20">
            <h3 className="text-lg font-bold text-cyan-300">Analisis Studi Kasus</h3>
            <div className="space-y-3 text-xs text-blue-100/90">
              <p><strong className="text-white">Problem:</strong> {project.caseStudy.problem}</p>
              <p><strong className="text-white">Analisis:</strong> {project.caseStudy.analysis}</p>
              <p><strong className="text-white">Solusi:</strong> {project.caseStudy.solution}</p>
              <p><strong className="text-white">Teknologi:</strong> {project.caseStudy.technology}</p>
              <p><strong className="text-emerald-400 font-bold">Hasil Akhir:</strong> {project.caseStudy.result}</p>
            </div>
          </div>
        )}

        <div className="space-y-3 pt-4 border-t border-blue-400/20">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tech Stack Digunakan:</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {project.techStack.map((tech) => (
              <div key={tech} className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-2xl shadow-xl shadow-blue-600/30 transition-all"
        >
          Bangun Proyek Serupa Bersama Solvia Nova
        </Link>
      </div>
    </div>
  );
}
