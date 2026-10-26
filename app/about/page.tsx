import { Sparkles, ShieldCheck, Zap, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-6 sm:py-10 pb-20 w-full space-y-12 sm:space-y-16 overflow-x-hidden">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/40 text-cyan-300 text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          Tentang Solvia.Nova
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight">
          Digital Solution Studio <span className="text-[#12a9ff]">Terpercaya</span>
        </h1>
        <p className="text-blue-100 text-base lg:text-lg leading-relaxed font-medium">
          <strong className="text-white">Understand Problems First, Build Solutions.</strong><br />
          Kami adalah tim engineer dan desainer digital yang berfokus pada pembangunan solusi perangkat lunak bernilai tinggi untuk memecahkan tantangan bisnis nyata.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {[
          {
            icon: ShieldCheck,
            title: "Analisis Berbasis Problem",
            desc: "Kami tidak sekadar menulis kode. Kami mendalami alur bisnis Anda untuk merancang solusi sistem digital yang tepat sasaran."
          },
          {
            icon: Zap,
            title: "Performa & Skalabilitas",
            desc: "Dibangun dengan Next.js App Router modern untuk memberikan kecepatan akses kilat dan arsitektur kode scalable."
          },
          {
            icon: Users,
            title: "Dukungan Berkelanjutan",
            desc: "Kami mendampingi implementasi dari tahap ideasi, pengembangan, hingga pemeliharaan server & cloud secara penuh."
          }
        ].map((item, idx) => (
          <div
            key={idx}
            className="group bg-gradient-to-b from-[#0a274d] to-[#04152d] border border-blue-400/30 hover:border-cyan-400/70 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-600/25 border border-blue-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
              <item.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{item.title}</h3>
            <p className="text-blue-100/90 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
