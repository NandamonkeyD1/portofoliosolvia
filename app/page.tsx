"use client";

import Link from "next/link";
import {
  servicesData,
  testimonialsData,
  articlesData,
  trustIndicatorsData,
  visionPhilosophyData,
  coreValuesData,
} from "@/lib/data";
import PortfolioSlider from "@/components/PortfolioSlider";
import TeamSlider from "@/components/TeamSlider";
import TestimonialsSlider from "@/components/TestimonialsSlider";

export default function Home() {
  return (
    <div className="space-y-6 sm:space-y-10">
      {/* ========================================================
          HERO SECTION (With Mascot at the Top!)
          ======================================================== */}
      <section className="hero-box" id="beranda">
        <div className="hero-copy">
          <div className="eyebrow flex items-center gap-2">
            <img src="/assets/images/Solvia.png" alt="Solvia" className="h-4 w-auto object-contain" />
            <i className="dot-anim" /> DIGITAL SOLUTION &amp; 3D STUDIO
          </div>

          <h1>
            Understand<br />
            Problems First,<br />
            <span>Build Solutions.</span>
          </h1>

          <p>
            Konsep, teknologi, dan solusi digital dalam satu ekosistem yang dirancang untuk berkembang. Solvia Nova membantu bisnis membangun sistem digital, website, aplikasi, dan branding modern dengan visual premium dan performa profesional.
          </p>

          <div className="hero-buttons">
            <a className="btn-custom btn-primary" href="#kontak">
              Konsultasi Gratis <b>→</b>
            </a>
            <a className="btn-custom btn-outline" href="#portfolio">
              ◉ &nbsp; Lihat Portofolio
            </a>
          </div>

          {/* Category Chips from Index */}
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="px-3 py-1.5 rounded-xl bg-blue-900/40 border border-blue-400/30 text-[11px] font-bold text-blue-200">
              Web Development
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-blue-900/40 border border-blue-400/30 text-[11px] font-bold text-blue-200">
              Custom System
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-blue-900/40 border border-blue-400/30 text-[11px] font-bold text-blue-200">
              IoT &amp; Smart Tech
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-blue-900/40 border border-blue-400/30 text-[11px] font-bold text-blue-200">
              Digital Branding
            </div>
          </div>

          {/* Stats Row from Index */}
          <div className="grid grid-cols-2 sm:flex gap-4 sm:gap-6 pt-5 border-t border-blue-400/20 mt-4">
            {trustIndicatorsData.map((item) => (
              <div key={item.title}>
                <div className="text-xl sm:text-2xl font-bold text-white">{item.stat}</div>
                <div className="text-slate-300 text-[10px] sm:text-xs font-medium">{item.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Solvia Nova Mascot with Clean Transparency */}
        <div className="hero-art flex items-end justify-center px-4 pt-4 pb-0">
          <img
            src="/assets/images/maskot-clean.png"
            alt="Solvia.Nova Mascot"
            className="h-full w-auto max-h-[480px] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(18,169,255,0.45)] select-none pointer-events-none"
            loading="eager"
          />
          <div className="hero-badge-top">✓ 100% On-Time Delivery</div>
          <div className="hero-badge-bot">⚡ 3D Interactive Ecosystem</div>
        </div>
      </section>

      {/* ========================================================
          TRUST & PARTNERS SECTION
          ======================================================== */}
      <section className="trust-section" aria-label="Industri dan mitra kerja sama">
        <div className="trust-head">
          <span>
            Dipercaya oleh berbagai<br />
            bisnis dan organisasi
          </span>
          <strong>Kolaborasi untuk solusi nyata</strong>
          <a href="#kontak">Jalin Kerja Sama →</a>
        </div>

        <div className="marquee-box">
          <div className="marquee-track-custom">
            <div className="industry-item">
              <b>⌘</b> E-Commerce &amp; Retail
            </div>
            <div className="industry-item">
              <b>▤</b> Manufacturing &amp; Supply Chain
            </div>
            <div className="industry-item">
              <b>▦</b> FinTech &amp; Banking
            </div>
            <div className="industry-item">
              <b>◉</b> Education &amp; EdTech
            </div>
            <div className="industry-item">
              <b>⚡</b> Healthcare &amp; MedTech
            </div>
            <div className="industry-item">
              <b>◈</b> Smart Logistics &amp; IoT
            </div>
            <div className="industry-item">
              <b>◎</b> Hospitality &amp; Tourism
            </div>
            <div className="industry-item">
              <b>❖</b> Corporate Enterprise
            </div>
            {/* Loop duplicate track */}
            <div className="industry-item">
              <b>⌘</b> E-Commerce &amp; Retail
            </div>
            <div className="industry-item">
              <b>▤</b> Manufacturing &amp; Supply Chain
            </div>
            <div className="industry-item">
              <b>▦</b> FinTech &amp; Banking
            </div>
            <div className="industry-item">
              <b>◉</b> Education &amp; EdTech
            </div>
            <div className="industry-item">
              <b>⚡</b> Healthcare &amp; MedTech
            </div>
            <div className="industry-item">
              <b>◈</b> Smart Logistics &amp; IoT
            </div>
            <div className="industry-item">
              <b>◎</b> Hospitality &amp; Tourism
            </div>
            <div className="industry-item">
              <b>❖</b> Corporate Enterprise
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ABOUT SECTION
          ======================================================== */}
      <section className="about-box" id="tentang">
        <div>
          <span className="kicker">ABOUT SOLVIA.NOVA</span>
          <h2>
            Teknologi untuk<br />
            <span>Solusi Nyata.</span>
          </h2>
          <p className="mb-3">
            Kami percaya bahwa teknologi harus menjawab masalah nyata. Solvia.Nova hadir untuk membantu bisnis dan organisasi merancang, membangun, dan mengimplementasikan solusi digital yang relevan dengan kebutuhan mereka.
          </p>
          <p className="mb-4">
            Dari UMKM hingga perusahaan skala berkembang, kami mengintegrasikan konsep visual modern, arsitektur kode bersih, dan performa tinggi ke dalam setiap produk yang kami kembangkan.
          </p>
          <Link className="btn-custom btn-primary" href="/about">
            Pelajari Lebih Lanjut &nbsp; →
          </Link>
        </div>

        <div>
          <img
            className="team-image-custom"
            src="/assets/images/hero-art.jpg"
            alt="Solvia.Nova Technology Solution"
          />
        </div>

        {/* Vision & Philosophy from Index */}
        <div className="values-box">
          <div className="value-card">
            <div className="value-icon-custom">👁️</div>
            <div>
              <strong>Visi Kami</strong>
              <p>{visionPhilosophyData.visi}</p>
            </div>
          </div>

          <div className="value-card">
            <div className="value-icon-custom">💡</div>
            <div>
              <strong>Filosofi Kerja</strong>
              <p>{visionPhilosophyData.filosofi}</p>
            </div>
          </div>

          <div className="value-card">
            <div className="value-icon-custom">🛡️</div>
            <div>
              <strong>Komitmen Kualitas</strong>
              <p>{visionPhilosophyData.komitmen}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values 4 Grid from Index */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-1 py-2">
        {coreValuesData.map((val) => (
          <div
            key={val.title}
            className="group p-5 rounded-2xl bg-gradient-to-b from-[#0a274d] to-[#04152d] border border-blue-400/25 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/15"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
              {val.icon}
            </div>
            <div className="text-white font-bold text-sm mb-1.5 group-hover:text-cyan-300 transition-colors">
              {val.title}
            </div>
            <div className="text-blue-200/80 text-xs leading-relaxed">{val.desc}</div>
          </div>
        ))}
      </div>

      {/* ========================================================
          SERVICES SECTION
          ======================================================== */}
      <section className="section-wrapper" id="layanan">
        <div className="section-head-custom">
          <div>
            <span className="kicker">SERVICES</span>
            <h2>Layanan Unggulan Kami</h2>
          </div>
          <p>
            Solusi teknologi terpadu yang dirancang untuk mempercepat pertumbuhan bisnis Anda, dari perancangan arsitektur hingga deployment modern.
          </p>
        </div>

        <div className="cards-grid">
          {servicesData.slice(0, 4).map((svc, idx) => (
            <div key={svc.id} className="card-custom">
              <div>
                <div className="icon">
                  {idx === 0 ? "⌘" : idx === 1 ? "▤" : idx === 2 ? "▦" : "◉"}
                </div>
                <h3>{svc.name}</h3>
                <p>{svc.shortDesc}</p>
                <ul className="space-y-1.5 my-3 pt-2 border-t border-blue-400/15">
                  {svc.features.slice(0, 3).map((feat) => (
                    <li key={feat} className="text-[11px] text-blue-200 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={`/services#${svc.id}`}>
                Pelajari Fitur <span>→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/services" className="btn-custom btn-outline text-xs">
            Lihat Semua Detail Layanan →
          </Link>
        </div>
      </section>

      {/* ========================================================
          PORTFOLIO SECTION (Auto-slide + Category Tabs + Photos)
          ======================================================== */}
      <section className="section-wrapper" id="portfolio">
        <div className="section-head-custom">
          <div>
            <span className="kicker">PORTFOLIO</span>
            <h2>Portofolio Solusi Digital</h2>
          </div>
          <p>
            Studi kasus implementasi sistem dan produk digital berkualitas tinggi yang telah dirasakan manfaatnya oleh para klien kami.
          </p>
        </div>

        {/* Dynamic Portfolio Slider with Auto-slide, Category Tabs & Photos */}
        <PortfolioSlider />

        <div className="text-center mt-8">
          <Link href="/portfolio" className="btn-custom btn-outline text-xs">
            Lihat Semua Portofolio →
          </Link>
        </div>
      </section>

      {/* ========================================================
          TEAM SECTION (Auto-slide + Member Photos)
          ======================================================== */}
      <section className="section-wrapper" id="tim">
        <div className="section-head-custom">
          <div>
            <span className="kicker">OUR EXPERTS</span>
            <h2>Tim Profesional Solvia Nova</h2>
          </div>
          <p>
            Didukung oleh para praktisi teknologi, pengembang sistem, dan desainer dengan integritas dan keahlian mendalam.
          </p>
        </div>

        {/* Dynamic Team Slider with Auto-slide & Photos */}
        <TeamSlider />
      </section>

      {/* ========================================================
          TESTIMONIALS SECTION (Auto-sliding Carousel)
          ======================================================== */}
      <section className="section-wrapper" id="testimoni">
        <div className="section-head-custom">
          <div>
            <span className="kicker">TESTIMONIALS</span>
            <h2>Apa Kata Klien Kami</h2>
          </div>
          <p>
            Kepercayaan dan kepuasan klien adalah tolak ukur keberhasilan utama setiap proyek yang kami bangun.
          </p>
        </div>

        {/* Dynamic Testimonials Slider with Auto-slide & Avatars */}
        <TestimonialsSlider />
      </section>

      {/* ========================================================
          ARTICLES SECTION
          ======================================================== */}
      <section className="section-wrapper" id="artikel">
        <div className="section-head-custom">
          <div>
            <span className="kicker">INSIGHTS</span>
            <h2>Artikel &amp; Tren Teknologi</h2>
          </div>
          <p>
            Wawasan mendalam seputar arsitektur software, IoT industri, keamanan sistem, dan inovasi digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {articlesData.slice(0, 3).map((art) => (
            <div key={art.id} className="article-card-custom">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold">
                    {art.category}
                  </span>
                  <span className="text-slate-400">{art.readTime}</span>
                </div>
                <h3 className="font-bold text-base text-white my-2 line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                  {art.summary}
                </p>
              </div>
              <div className="pt-3 border-t border-blue-400/20">
                <Link
                  href={`/articles/${art.slug}`}
                  className="text-xs font-bold text-cyan-400 hover:text-white transition-colors"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/articles" className="btn-custom btn-outline text-xs">
            Lihat Semua Artikel &amp; Panduan →
          </Link>
        </div>
      </section>

      {/* ========================================================
          CONTACT SECTION (CTA)
          ======================================================== */}
      <section className="section-wrapper" id="kontak">
        <div className="contact-box">
          <div>
            <h2>Siap Membawa Bisnis Anda ke Level Berikutnya?</h2>
            <p>
              Diskusikan tantangan, kebutuhan sistem, atau ide inovasi teknologi Anda. Kami siap membantu merancang solusi tepat sasaran dengan efisiensi maksimal.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-custom btn-primary" href="/contact">
              Mulai Konsultasi Gratis <b>→</b>
            </Link>
            <a
              className="btn-custom btn-outline"
              href="https://wa.me/6281234567890?text=Halo%20Solvia%20Nova,%20saya%20ingin%20konsultasi%20proyek%20digital."
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Konsultasi
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
