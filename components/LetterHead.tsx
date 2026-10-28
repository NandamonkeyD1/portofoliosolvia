"use client";

export default function LetterHead() {
  return (
    <div className="border-b-[3px] border-slate-900 pb-3 mb-6 font-serif">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Logo Solvia Nova */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center p-1 bg-white rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-none">
          <img
            src="/assets/images/Solvia.png"
            alt="Solvia Nova Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Kop Text Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase font-sans">
            SOLVIA NOVA DIGITAL SOLUTION
          </h2>
          <p className="text-xs sm:text-[13px] font-bold text-blue-800 tracking-wide uppercase font-sans mt-0.5">
            Software Engineering • Custom Enterprise System • IoT Industrial • 3D Studio
          </p>
          <div className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-1 font-sans">
            <div>Dusun Brambang RT 01/RW 02, Desa Blimbing, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah 57557</div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-slate-700 font-medium">
              <span>WhatsApp / Hotline: <strong>+62 831-4880-1578</strong></span>
              <span>•</span>
              <span>Email: <strong>official@solvianova.com</strong></span>
              <span>•</span>
              <span>Web: <strong>www.solvianova.com</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Official Double Rule */}
      <div className="mt-3.5 pt-0.5 border-t border-slate-800 border-dashed" />
    </div>
  );
}
