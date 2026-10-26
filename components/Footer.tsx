import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-custom flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-blue-900/40 text-xs text-blue-200/70">
      <div className="flex items-center gap-3">
        <img
          src="/assets/images/Solvia.png"
          alt="Solvia Nova Logo"
          className="h-8 w-auto object-contain drop-shadow-[0_1px_8px_rgba(18,169,255,0.3)]"
        />
        <div>
          © 2026 <strong>Solvia.Nova</strong> — Digital Solution &amp; 3D Studio. All rights reserved.
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Link href="/about" className="hover:text-white transition-colors">
          Tentang
        </Link>
        <Link href="/services" className="hover:text-white transition-colors">
          Layanan
        </Link>
        <Link href="/portfolio" className="hover:text-white transition-colors">
          Portofolio
        </Link>
        <Link href="/articles" className="hover:text-white transition-colors">
          Artikel
        </Link>
        <Link href="/contact" className="hover:text-white transition-colors">
          Kontak
        </Link>
        <Link href="/sso" className="hover:text-white transition-colors">
          Admin Panel
        </Link>
      </div>
    </footer>
  );
}
