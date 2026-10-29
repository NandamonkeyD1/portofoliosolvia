import { NextResponse } from "next/server";
import { portfolioData, servicesData } from "@/lib/data";

export const dynamic = "force-dynamic";

// Knowledge Base about Solvia Nova
const COMPANY_INFO = {
  name: "Solvia Nova Digital Solution",
  tagline: "Software Engineering • Custom Enterprise System • IoT Industrial • 3D Studio",
  email: "solvianova1@gmail.com",
  whatsapp: "+62 831-4880-1578",
  whatsappUrl: "https://wa.me/6283148801578",
  website: "solvianova.my.id",
  addressSalatiga: "Jl. Gumukrejo RT 05 RW 05, Nanggulan, Kec. Tingkir, Kota Salatiga, Jawa Tengah 50711",
  addressSukoharjo: "Dusun Brambang RT 01/RW 02, Desa Blimbing, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah 57557",
  founder: "Nanda Ari Wahyu Widagdo (Founder & Tech Lead)",
};

interface AIResponse {
  answer: string;
  moodBadge: string;
  actionUrl?: string;
  actionLabel?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
}

function getSemanticKnowledgeReply(query: string): AIResponse {
  const q = query.toLowerCase().trim();

  // 1. Greetings & Identity
  if (
    /^(halo|hai|hi|hello|selamat|pagi|siang|sore|malam|assalam|hei|hey)\b/.test(q) ||
    q === "tes" ||
    q === "ping"
  ) {
    return {
      moodBadge: "👋 Ramah & Menyapa",
      answer:
        `Halo! Senang bertemu dengan Anda. Saya **Novi**, AI Assistant resmi dari **Solvia Nova Digital Solution**.\n\n` +
        `Solvia Nova adalah studio rekayasa perangkat lunak dan solusi digital yang siap membantu bisnis Anda melalui website interaktif 3D, sistem ERP enterprise kustom, aplikasi POS kasir, hingga pemantauan IoT industri.\n\n` +
        `Ada kebutuhan sistem atau proyek digital yang ingin kita diskusikan hari ini?`,
      actionUrl: "/services",
      actionLabel: "Jelajahi Layanan Kami",
      secondaryUrl: "https://wa.me/6283148801578?text=Halo%20Novi,%20saya%20ingin%20konsultasi%20solusi%20digital.",
      secondaryLabel: "Chat via WhatsApp",
    };
  }

  // 2. Who is Solvia Nova / Profile
  if (
    q.includes("siapa solvia") ||
    q.includes("tentang solvia") ||
    q.includes("apa itu solvia") ||
    q.includes("profil") ||
    q.includes("perusahaan apa")
  ) {
    return {
      moodBadge: "🏢 Profil Perusahaan",
      answer:
        `**Solvia Nova Digital Solution** adalah Digital Solution Studio yang berfokus pada rekayasa teknologi informasi modern (*Software Engineering, Custom Enterprise System, IoT Industrial, & 3D Interactive Web*).\n\n` +
        `Kami beroperasi dengan prinsip *Understand Problems First, Build Solutions*—menghasilkan perangkat lunak yang dirancang 100% custom sesuai proses bisnis klien, bukan sekadar template siap pakai.\n\n` +
        `Dipimpin oleh **${COMPANY_INFO.founder}**, kami telah melayani berbagai klien mulai dari UMKM hingga enterprise industri.`,
      actionUrl: "/portfolio",
      actionLabel: "Lihat Rekam Jejak Portofolio",
      secondaryUrl: "/contact",
      secondaryLabel: "Form Chat by Email",
    };
  }

  // 3. Contact, Email & WhatsApp
  if (
    q.includes("email") ||
    q.includes("kontak") ||
    q.includes("hubungi") ||
    q.includes("wa") ||
    q.includes("whatsapp") ||
    q.includes("telepon") ||
    q.includes("hotline") ||
    q.includes("nomor")
  ) {
    return {
      moodBadge: "📞 Saluran Resmi",
      answer:
        `Anda dapat menghubungi Solvia Nova secara langsung melalui saluran komunikasi resmi berikut:\n\n` +
        `• 📱 **WhatsApp Resmi**: **${COMPANY_INFO.whatsapp}** (Respon cepat 1-on-1)\n` +
        `• 📧 **Email Resmi**: **${COMPANY_INFO.email}**\n` +
        `• 🌐 **Form Chat by Email**: Tersedia langsung di halaman kontak website kami\n` +
        `• 💻 **Website**: **${COMPANY_INFO.website}**\n\n` +
        `Setiap pesan konsultasi akan ditangani langsung oleh konsultan teknis kami dalam waktu 1x24 jam kerja.`,
      actionUrl: "https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20ingin%20konsultasi%20proyek.",
      actionLabel: "Chat WhatsApp (+62 831-4880-1578)",
      secondaryUrl: "/contact",
      secondaryLabel: "Buka Form Chat by Email",
    };
  }

  // 4. Address & Office Location
  if (
    q.includes("alamat") ||
    q.includes("kantor") ||
    q.includes("lokasi") ||
    q.includes("salatiga") ||
    q.includes("sukoharjo") ||
    q.includes("dimana")
  ) {
    return {
      moodBadge: "📍 Lokasi Kantor",
      answer:
        `Kantor dan studio pengembangan Solvia Nova berada di Jawa Tengah:\n\n` +
        `• 🏢 **Head Office**: ${COMPANY_INFO.addressSalatiga}\n` +
        `• 🛠️ **Workshop & Tech Lab**: ${COMPANY_INFO.addressSukoharjo}\n\n` +
        `Kami melayani klien dari seluruh Indonesia baik melalui pertemuan langsung di kantor kami maupun konsultasi online terstruktur via Zoom / Google Meet / WhatsApp.`,
      actionUrl: "/contact",
      actionLabel: "Kunjungi Halaman Kontak",
      secondaryUrl: "https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20ingin%20jadwalkan%20pertemuan.",
      secondaryLabel: "Jadwalkan Diskusi / Meeting",
    };
  }

  // 5. Pricing & Estimates
  if (
    q.includes("biaya") ||
    q.includes("harga") ||
    q.includes("tarif") ||
    q.includes("paket") ||
    q.includes("berapa") ||
    q.includes("bayar") ||
    q.includes("ongkos")
  ) {
    return {
      moodBadge: "💰 Estimasi Transparan",
      answer:
        `Investasi pengembangan di Solvia Nova bersifat terukur, transparan, dan disesuaikan dengan skala sistem Anda:\n\n` +
        `• 🚀 **Landing Page & Portofolio 3D Interaktif**: Mulai Rp 1.500.000 – Rp 3.500.000\n` +
        `• 🏢 **Website Perusahaan & Portal Direktori Bisnis**: Mulai Rp 3.500.000 – Rp 8.000.000\n` +
        `• ⚙️ **Sistem Enterprise ERP / POS Custom / IoT Monitoring**: Sesuai rancangan modul dan integrasi kebutuhan bisnis Anda.\n\n` +
        `✨ **Kabar Baik**: Sesi konsultasi awal, analisis kebutuhan, dan pembuatan dokumen estimasi biaya kami berikan **100% GRATIS** tanpa komitmen!`,
      actionUrl: "https://wa.me/6283148801578?text=Halo%20Novi,%20saya%20ingin%20minta%20estimasi%20biaya%20proyek.",
      actionLabel: "Minta Estimasi via WhatsApp",
      secondaryUrl: "/contact",
      secondaryLabel: "Kirim Rincian via Form Email",
    };
  }

  // 6. Services & Capabilities
  if (
    q.includes("layanan") ||
    q.includes("jasa") ||
    q.includes("buat apa") ||
    q.includes("solusi") ||
    q.includes("fitur") ||
    q.includes("bisa apa") ||
    q.includes("produk")
  ) {
    return {
      moodBadge: "🛠️ Solusi & Layanan",
      answer:
        `Solvia Nova menghadirkan ragam solusi digital terintegrasi untuk akselerasi bisnis Anda:\n\n` +
        `1. 🌐 **Website & 3D Interactive WebGL**: Desain futuristik berkecepatan tinggi dengan Three.js & Next.js.\n` +
        `2. 🏢 **Sistem Enterprise ERP & Custom Software**: Otomasi alur kerja, inventori, penggajian, dan laporan keuangan.\n` +
        `3. 🛒 **Point of Sale (POS) & Retail System**: Kasir multi-cabang, manajemen resep, dan manajemen pelanggan.\n` +
        `4. 📡 **IoT & Otomasi Industri**: Dashboard monitoring sensor real-time via MQTT, telemetri, dan kontrol jarak jauh.\n` +
        `5. 🎓 **Konsultasi & IT Mentoring**: Pendampingan arsitektur teknis dan pelatihan sistem perusahaan.\n\n` +
        `Semua sistem dirancang scalable, aman, dan mudah dioperasikan.`,
      actionUrl: "/services",
      actionLabel: "Lihat Detail Seluruh Solusi",
      secondaryUrl: "/portfolio",
      secondaryLabel: "Cek Portofolio Implementasi",
    };
  }

  // 7. Portfolio & Case Studies
  if (
    q.includes("porto") ||
    q.includes("portofolio") ||
    q.includes("karya") ||
    q.includes("proyek") ||
    q.includes("studi kasus") ||
    q.includes("contoh") ||
    q.includes("hasil") ||
    q.includes("klien") ||
    q.includes("novadex") ||
    q.includes("filtrazon") ||
    q.includes("dasterku")
  ) {
    const listNames = portfolioData.slice(0, 4).map((p) => `• **${p.name}** (${p.category} — ${p.client})`).join("\n");
    return {
      moodBadge: "📁 Portofolio Unggulan",
      answer:
        `Berikut beberapa studi kasus proyek unggulan yang telah kami selesaikan dan aktif digunakan klien:\n\n` +
        `${listNames}\n` +
        `• **FILTRAZON IoT 2.0** (Integrasi Sensor Industri & Dashboard Realtime)\n\n` +
        `Setiap portofolio dilengkapi dokumentasi visual, analisis masalah, solusi yang kami terapkan, hingga hasil nyata peningkatan efisiensi bisnis.`,
      actionUrl: "/portfolio",
      actionLabel: "Lihat Semua Studi Kasus Portofolio",
      secondaryUrl: "https://wa.me/6283148801578?text=Halo%20Novi,%20saya%20tertarik%20melihat%20demo%20portofolio.",
      secondaryLabel: "Minta Demo Langsung via WA",
    };
  }

  // 8. 3D WebGL Technology
  if (
    q.includes("3d") ||
    q.includes("three.js") ||
    q.includes("webgl") ||
    q.includes("visual") ||
    q.includes("animasi") ||
    q.includes("selendang") ||
    q.includes("ribbon")
  ) {
    return {
      moodBadge: "✨ Keunggulan 3D",
      answer:
        `Fitur 3D di Solvia Nova dibangun di atas teknologi **Three.js & WebGL hardware-accelerated**:\n\n` +
        `• 🎨 **Pengalaman Visual Imersif**: Memberikan identitas brand yang futuristik, premium, dan inovatif.\n` +
        `• ⚡ **Ultra Ringan & Responsif**: Dioptimalkan dengan dynamic frame-budgeting sehingga tetap lancar di smartphone tanpa menguras baterai.\n` +
        `• 🔄 **Interaktivitas Penuh**: Objek 3D dapat berotasi otomatis, merespons gerakan kursor pengguna, dan bertransisi mulus.`,
      actionUrl: "/gallery",
      actionLabel: "Buka Galeri 3D Solvia",
      secondaryUrl: "/portfolio",
      secondaryLabel: "Lihat Implementasi di Portofolio",
    };
  }

  // 9. Timeline & Process
  if (
    q.includes("lama") ||
    q.includes("waktu") ||
    q.includes("durasi") ||
    q.includes("hari") ||
    q.includes("proses") ||
    q.includes("alur") ||
    q.includes("tahapan") ||
    q.includes("cara pesan") ||
    q.includes("cara order")
  ) {
    return {
      moodBadge: "⏱️ Alur Kerja & Durasi",
      answer:
        `Durasi pengerjaan kami terukur dan transparan dengan tahapan terstruktur:\n\n` +
        `1. **Konsultasi & Analisis (1-2 hari)**: Memetakan kebutuhan sistem & rancangan solusi (Gratis).\n` +
        `2. **Persetujuan & Desain Prototype (3-5 hari)**: Kesepakatan modul, timeline, dan antarmuka UI/UX.\n` +
        `3. **Development & Coding**: \n` +
        `   • Landing Page / Web Profil: 3 – 7 hari kerja\n` +
        `   • Portal Bisnis / E-Commerce: 1 – 3 minggu\n` +
        `   • Sistem ERP / POS / IoT Custom: 3 – 8 minggu (sprint mingguan)\n` +
        `4. **Quality Assurance & User Testing**: Pengujian fitur, keamanan data, dan reliabilitas.\n` +
        `5. **Pelatihan & Serah Terima**: Panduan penggunaan admin dan garansi pemeliharaan.`,
      actionUrl: "https://wa.me/6283148801578?text=Halo%20Novi,%20saya%20ingin%20memulai%20diskusi%20proyek.",
      actionLabel: "Mulai Konsultasi Sekarang",
      secondaryUrl: "/contact",
      secondaryLabel: "Kirim Brief via Form Email",
    };
  }

  // 10. IoT & Hardware Integration
  if (
    q.includes("iot") ||
    q.includes("sensor") ||
    q.includes("hardware") ||
    q.includes("mqtt") ||
    q.includes("monitoring") ||
    q.includes("alat")
  ) {
    return {
      moodBadge: "📡 IoT & Otomasi Industri",
      answer:
        `Solvia Nova memiliki divisi khusus untuk **IoT Industrial & Hardware Integration**:\n\n` +
        `• 📶 **Konektivitas Fleksibel**: Integrasi sensor via MQTT, WebSockets, HTTP REST API, maupun LoRa.\n` +
        `• 📊 **Dashboard Telemetri Real-time**: Grafik analitik live untuk suhu, pH, kelembapan, TDS, tekanan, dan status mesin.\n` +
        `• ⚠️ **Peringatan Dini Otomatis**: Notifikasi instan ke WhatsApp atau Telegram saat sensor mendeteksi parameter anomali.\n` +
        `• 🏭 **Studi Kasus Nyata**: Proyek Sistem Monitoring Kualitas Air Berbasis IoT dan FILTRAZON IoT 2.0.`,
      actionUrl: "/portfolio",
      actionLabel: "Lihat Proyek IoT Kami",
      secondaryUrl: "https://wa.me/6283148801578?text=Halo%20Novi,%20saya%20tertarik%20solusi%20IoT.",
      secondaryLabel: "Diskusi Solusi IoT via WA",
    };
  }

  // 11. Warranty, Security & Support
  if (
    q.includes("garansi") ||
    q.includes("keamanan") ||
    q.includes("maintenance") ||
    q.includes("bug") ||
    q.includes("rusak") ||
    q.includes("bantuan") ||
    q.includes("support")
  ) {
    return {
      moodBadge: "🛡️ Garansi & Keamanan",
      answer:
        `Kenyamanan dan kelancaran bisnis Anda adalah prioritas utama Solvia Nova:\n\n` +
        `• ✅ **Garansi Bebas Bug**: Kami memberikan masa garansi perbaikan bug dan penyesuaian paska-peluncuran.\n` +
        `• 🔒 **Keamanan & Enkripsi Data**: Penerapan standar enkripsi modern, proteksi SQL Injection, CSRF, dan autentikasi terisolasi.\n` +
        `• 🔄 **Backup Rutin**: Prosedur backup database dan source code terjadwal.\n` +
        `• 🤝 **After-Sales Support**: Tim teknis kami selalu siap membantu jika ada kendala operasional harian.`,
      actionUrl: "/contact",
      actionLabel: "Hubungi Tim Support",
      secondaryUrl: "https://wa.me/6283148801578",
      secondaryLabel: "Hotline Support WhatsApp",
    };
  }

  // 12. Tech Stack
  if (
    q.includes("teknologi") ||
    q.includes("tech stack") ||
    q.includes("bahasa") ||
    q.includes("framework") ||
    q.includes("database") ||
    q.includes("next.js") ||
    q.includes("react")
  ) {
    return {
      moodBadge: "⚡ Modern Tech Stack",
      answer:
        `Solvia Nova mengadopsi ekosistem teknologi modern kelas industri:\n\n` +
        `• 💻 **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS\n` +
        `• 🎨 **3D Graphics**: Three.js, WebGL, GLTF/GLB Shaders\n` +
        `• ⚙️ **Backend & API**: Node.js, Express, Next.js Server Actions, REST API\n` +
        `• 🗄️ **Database**: PostgreSQL, MySQL, Redis Caching\n` +
        `• 📡 **IoT & Protocols**: MQTT, WebSockets, ESP32/Raspberry Pi Integration\n\n` +
        `Menghasilkan aplikasi yang cepat, andal, mudah dikembangkan, dan scalable.`,
      actionUrl: "/services",
      actionLabel: "Pelajari Layanan Kami",
      secondaryUrl: "/portfolio",
      secondaryLabel: "Lihat Hasil Karya",
    };
  }

  // 13. Default Fallback
  return {
    moodBadge: "💡 Solusi Digital",
    answer:
      `Terima kasih telah bertanya! Pertanyaan Anda tentang *"${query}"* sangat menarik.\n\n` +
      `Tim teknis Solvia Nova siap merancang solusi digital yang spesifik untuk tantangan bisnis Anda. Kami dapat membantu pembuatan website interaktif 3D, sistem ERP kustom, aplikasi kasir POS, atau sistem IoT industri.\n\n` +
      `Anda dapat berkonsultasi langsung 1-on-1 via WhatsApp kami atau mengirimkan rincian kebutuhan melalui Form Chat by Email!`,
    actionUrl: "https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20ingin%20tanya%20tentang:%20" + encodeURIComponent(query),
    actionLabel: "Tanyakan Langsung via WhatsApp",
    secondaryUrl: "/contact",
    secondaryLabel: "Form Chat by Email Resmi",
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Pesan tidak boleh kosong." }, { status: 400 });
    }

    const trimmed = message.trim();

    // Check if an external LLM API key is present in environment (Gemini API)
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      try {
        const systemPrompt = `Anda adalah Novi, AI Consultant resmi dari Solvia Nova Digital Solution.
Konteks Resmi Solvia Nova:
- Solvia Nova adalah studio rekayasa perangkat lunak dan solusi digital (Software Engineering, Custom Enterprise System ERP, IoT Industrial, dan 3D WebGL Studio).
- WhatsApp Resmi: +62 831-4880-1578 (https://wa.me/6283148801578)
- Email Resmi: solvianova1@gmail.com
- Form Chat by Email tersedia di /contact
- Website Resmi: solvianova.my.id
- Kantor: Jl. Gumukrejo RT 05 RW 05, Nanggulan, Salatiga, Jawa Tengah 50711 dan Workshop di Sukoharjo.
- Founder & Tech Lead: Nanda Ari Wahyu Widagdo.
- Portofolio terkenal: Novadex Direktori UMKM Salatiga, DasterKu E-Commerce, Dapur Ceria Bakery POS, MitraMan ERP, WorkTrack Payroll, Sistem Monitoring Kualitas Air IoT, FILTRAZON IoT 2.0.
- Nada bicara: Ramah, profesional, cerdas, berwawasan teknologi, dan solutif. Gunakan format markdown yang rapi (bold, bullet points). Selalu arahkan ke WhatsApp resmi atau Form Chat by Email jika user ingin konsultasi lebih lanjut.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${systemPrompt}\n\nPertanyaan Pengunjung: ${trimmed}\nBerikan jawaban ramah dan informatif:`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            return NextResponse.json({
              success: true,
              reply: aiText,
              moodBadge: "✨ Novi AI Smart",
              actionUrl: "https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20ingin%20konsultasi%20lanjutan.",
              actionLabel: "Chat WhatsApp Resmi (+62 831-4880-1578)",
              secondaryUrl: "/contact",
              secondaryLabel: "Form Chat by Email",
            });
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call skipped/fallback:", geminiError);
      }
    }

    // Default to the comprehensive semantic knowledge-base engine
    const result = getSemanticKnowledgeReply(trimmed);
    return NextResponse.json({
      success: true,
      reply: result.answer,
      moodBadge: result.moodBadge,
      actionUrl: result.actionUrl,
      actionLabel: result.actionLabel,
      secondaryUrl: result.secondaryUrl,
      secondaryLabel: result.secondaryLabel,
    });
  } catch (error) {
    console.error("AI Chat Route Error:", error);
    return NextResponse.json({
      success: false,
      reply: "Maaf, terjadi gangguan sementara pada sistem AI Novi. Anda dapat langsung mengobrol bersama kami via WhatsApp resmi di +62 831-4880-1578.",
      actionUrl: "https://wa.me/6283148801578",
      actionLabel: "Hubungi WhatsApp Resmi",
    });
  }
}
