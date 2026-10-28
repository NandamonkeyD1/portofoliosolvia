export interface LetterPoint {
  id: string;
  label: string;
  value: string;
}

export interface LetterRecipient {
  name: string;
  position: string;
  company: string;
  address: string;
  city: string;
}

export interface LetterSender {
  name: string;
  position: string;
  location: string;
  hasStamp: boolean;
  hasSignature: boolean;
}

export interface Letter {
  id: string;
  letterNo: string;
  type: "penawaran" | "spk" | "tugas" | "bast" | "pemberitahuan" | "undangan";
  typeLabel: string;
  classification: "Keluar" | "Masuk";
  confidentiality: "Biasa" | "Penting" | "Rahasia";
  subject: string;
  attachments: string;
  date: string;
  recipient: LetterRecipient;
  salutation: string;
  opening: string;
  points: LetterPoint[];
  closing: string;
  sender: LetterSender;
  status: "Draft" | "Terkirim" | "Disetujui" | "Selesai";
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_LETTERS: Letter[] = [
  {
    id: "let-001",
    letterNo: "005/SN-PNW/X/2026",
    type: "penawaran",
    typeLabel: "Surat Penawaran",
    classification: "Keluar",
    confidentiality: "Penting",
    subject: "Penawaran Solusi Pengembangan Sistem ERP & Warehouse Management",
    attachments: "1 (Satu) Berkas Proposal Teknis & Biaya",
    date: "28 Oktober 2026",
    recipient: {
      name: "Bpk. Hendra Pratama, S.T.",
      position: "Direktur Operasional",
      company: "PT. Bahtera Logistik Nusantara",
      address: "Kawasan Industri Candi Blok C-12, Ngaliyan",
      city: "Semarang, Jawa Tengah",
    },
    salutation: "Dengan hormat,",
    opening:
      "Sehubungan dengan diskusi awal mengenai rencana digitalisasi operasional pergudangan dan supply chain di PT. Bahtera Logistik Nusantara, bersama surat ini kami dari Solvia Nova mengajukan proposal penawaran teknis dan implementasi solusi digital sebagai berikut:",
    points: [
      {
        id: "p1",
        label: "Ruang Lingkup Proyek",
        value: "Pengembangan Custom Web ERP, Modul Barcode Scanning Real-Time, Multi-Warehouse Dashboard, dan REST API Integration.",
      },
      {
        id: "p2",
        label: "Teknologi yang Digunakan",
        value: "Next.js App Router, Node.js Microservices, PostgreSQL Enterprise, Redis Cache, dan Docker Cloud Deployment.",
      },
      {
        id: "p3",
        label: "Estimasi Waktu Pengerjaan",
        value: "45 (Empat Puluh Lima) Hari Kerja termasuk fase User Acceptance Testing (UAT) dan pelatihan operator.",
      },
      {
        id: "p4",
        label: "Garansi & Pemeliharaan",
        value: "Free Maintenance & Technical Support selama 6 (enam) bulan penuh pasca live deployment.",
      },
    ],
    closing:
      "Demikian surat penawaran ini kami sampaikan. Besar harapan kami untuk dapat berkolaborasi mewujudkan sistem operasional yang efisien dan scalable bagi PT. Bahtera Logistik Nusantara. Atas perhatian dan kerja sama yang baik, kami ucapkan terima kasih.",
    sender: {
      name: "Nanda Ari Wahyu Widagdo",
      position: "Chief Executive Officer / Direktur Utama",
      location: "Sukoharjo",
      hasStamp: true,
      hasSignature: true,
    },
    status: "Terkirim",
    createdAt: "2026-10-28T09:00:00Z",
    updatedAt: "2026-10-28T09:00:00Z",
  },
  {
    id: "let-002",
    letterNo: "004/SN-SPK/X/2026",
    type: "spk",
    typeLabel: "Perjanjian Kerja Sama (SPK)",
    classification: "Keluar",
    confidentiality: "Penting",
    subject: "Surat Perintah Kerja (SPK) Pengembangan Aplikasi Smart POS & Loyalty System",
    attachments: "Lampiran Syarat & Ketentuan Teknis",
    date: "22 Oktober 2026",
    recipient: {
      name: "Ibu Ratna Dewi Kumalasari",
      position: "Owner & Managing Director",
      company: "CV. Prima Food & Bakery Group",
      address: "Jl. Lawu No. 88, Karanganyar",
      city: "Karanganyar, Jawa Tengah",
    },
    salutation: "Dengan hormat,",
    opening:
      "Berdasarkan kesepakatan pertemuan dan persetujuan proposal penawaran tertanggal 15 Oktober 2026, surat ini merupakan Surat Perintah Kerja (SPK) resmi antara CV. Prima Food & Bakery Group dan Solvia Nova untuk pelaksanaan proyek dengan ketentuan berikut:",
    points: [
      {
        id: "p1",
        label: "Nama Pekerjaan",
        value: "Pengembangan Smart Point of Sale (POS) Multi-Cabang, Integrasi Resep Otomatis, dan Program Loyalitas Pelanggan Berbasis QR.",
      },
      {
        id: "p2",
        label: "Jangka Waktu",
        value: "Dimulai tanggal 25 Oktober 2026 dan selesai selambat-lambatnya 5 Desember 2026.",
      },
      {
        id: "p3",
        label: "Total Nilai Kontrak",
        value: "Rp 18.500.000,- (Delapan Belas Juta Lima Ratus Ribu Rupiah) dengan skema pembayaran bertahap 3 termin.",
      },
      {
        id: "p4",
        label: "Hak & Kewajiban",
        value: "Solvia Nova menyerahkan Source Code, Dokumentasi Manual Book, dan pelatihan admin cabang.",
      },
    ],
    closing:
      "Surat Perintah Kerja ini dibuat rangkap 2 (dua) bermaterai cukup dan memiliki kekuatan hukum yang sama. Demikian surat ini disampaikan untuk dilaksanakan dengan penuh rasa tanggung jawab.",
    sender: {
      name: "Nanda Ari Wahyu Widagdo",
      position: "Chief Executive Officer / Direktur Utama",
      location: "Sukoharjo",
      hasStamp: true,
      hasSignature: true,
    },
    status: "Disetujui",
    createdAt: "2026-10-22T10:30:00Z",
    updatedAt: "2026-10-22T10:30:00Z",
  },
  {
    id: "let-003",
    letterNo: "003/SN-ST/X/2026",
    type: "tugas",
    typeLabel: "Surat Tugas / SPPD",
    classification: "Keluar",
    confidentiality: "Biasa",
    subject: "Surat Tugas On-Site Deployment & Kalibrasi Sensor IoT Monitoring Air",
    attachments: "-",
    date: "14 Oktober 2026",
    recipient: {
      name: "Tim Engineering IoT & Firmware Solvia Nova",
      position: "Hardware Engineer & IoT Specialist",
      company: "Solvia Nova Technology Studio",
      address: "Site Hydrone Monitoring",
      city: "Sukoharjo - Solo",
    },
    salutation: "Yang bertanda tangan di bawah ini Direktur Utama Solvia Nova memberikan tugas kepada:",
    opening:
      "Guna kelancaran implementasi proyek sistem monitoring kualitas air dan pengendalian autonomous microplastic harvester, dengan ini menugaskan personil berikut untuk menjalankan tugas teknis di lapangan:",
    points: [
      {
        id: "p1",
        label: "Personil Bertugas",
        value: "1. Ahmad Fauzi (Lead IoT Engineer) — NIK: SN-ENG-021\n2. Kevin Sanjaya (Firmware & Cloud Telemetry) — NIK: SN-ENG-024",
      },
      {
        id: "p2",
        label: "Lokasi Penugasan",
        value: "Fasilitas Pengujian Hydrone IoT Reservoir & Laboratorium Monitoring, Sukoharjo.",
      },
      {
        id: "p3",
        label: "Tugas Utama",
        value: "Instalasi modul LoRa SX1278, kalibrasi probe sensor pH/TDS/Turbidity, dan sinkronisasi data ke dashboard cloud Solvia.",
      },
      {
        id: "p4",
        label: "Waktu Pelaksanaan",
        value: "15 Oktober 2026 s.d. 17 Oktober 2026 (3 Hari Kerja).",
      },
    ],
    closing:
      "Demikian Surat Tugas ini diterbitkan agar dapat dilaksanakan dengan seksama dan penuh dedikasi. Setelah menyelesaikan penugasan, personil wajib menyampaikan laporan Berita Acara Pelaksanaan Tugas secara tertulis.",
    sender: {
      name: "Nanda Ari Wahyu Widagdo",
      position: "Chief Executive Officer / Direktur Utama",
      location: "Sukoharjo",
      hasStamp: true,
      hasSignature: true,
    },
    status: "Selesai",
    createdAt: "2026-10-14T08:15:00Z",
    updatedAt: "2026-10-18T16:00:00Z",
  },
  {
    id: "let-004",
    letterNo: "002/SN-BAST/X/2026",
    type: "bast",
    typeLabel: "Berita Acara Serah Terima (BAST)",
    classification: "Keluar",
    confidentiality: "Penting",
    subject: "Berita Acara Serah Terima (BAST) Sistem Presensi Pintar Berbasis QR Code & AI",
    attachments: "1 (Satu) Lembar Formulir UAT & Manual Book",
    date: "08 Oktober 2026",
    recipient: {
      name: "Bpk. Drs. H. Suryanto, M.Pd.",
      position: "Kepala Sekolah",
      company: "SMK Insan Cendekia Mandiri",
      address: "Jl. Veteran No. 45, Kartasura",
      city: "Sukoharjo, Jawa Tengah",
    },
    salutation: "Dengan hormat,",
    opening:
      "Pada hari ini, Kamis tanggal Delapan bulan Oktober tahun Dua Ribu Dua Puluh Enam, bertempat di SMK Insan Cendekia Mandiri, telah dilakukan serah terima penyelesaian pekerjaan sistem digital antara PIHAK PERTAMA (Solvia Nova) dan PIHAK KEDUA (SMK Insan Cendekia Mandiri):",
    points: [
      {
        id: "p1",
        label: "Objek Serah Terima",
        value: "Sistem Presensi Pintar Siswa & Guru Berbasis Dynamic QR Code, Modul Notifikasi WhatsApp Orang Tua, dan AI Ringkasan Tugas Harian.",
      },
      {
        id: "p2",
        label: "Hasil Uji Coba (UAT)",
        value: "Telah diuji dengan 450 pengguna simultan dengan tingkat keberhasilan scan QR 99.8% dan respon notifikasi < 2 detik.",
      },
      {
        id: "p3",
        label: "Kelengkapan Dokumen",
        value: "Source Code Repository, Akun Super Administrator, Manual Book Penggunaan, dan Surat Garansi Layanan 1 Tahun.",
      },
    ],
    closing:
      "Dengan ditandatanganinya Berita Acara Serah Terima ini, maka hak pemanfaatan sistem telah resmi dialihkan kepada PIHAK KEDUA dan masa garansi teknis resmi berjalan. Demikian BAST ini dibuat dengan sebenarnya.",
    sender: {
      name: "Nanda Ari Wahyu Widagdo",
      position: "Chief Executive Officer / Direktur Utama",
      location: "Sukoharjo",
      hasStamp: true,
      hasSignature: true,
    },
    status: "Selesai",
    createdAt: "2026-10-08T11:00:00Z",
    updatedAt: "2026-10-08T14:00:00Z",
  },
  {
    id: "let-005",
    letterNo: "001/SN-PBT/IX/2026",
    type: "pemberitahuan",
    typeLabel: "Surat Pemberitahuan",
    classification: "Keluar",
    confidentiality: "Biasa",
    subject: "Pemberitahuan Jadwal Pemeliharaan Server Cloud & Peningkatan Keamanan Sistem",
    attachments: "-",
    date: "25 September 2026",
    recipient: {
      name: "Seluruh Rekanan & Klien Solvia Nova",
      position: "Direktur / IT Division Head",
      company: "Mitra Solusi Solvia Nova",
      address: "Di Tempat",
      city: "Indonesia",
    },
    salutation: "Dengan hormat,",
    opening:
      "Dalam rangka meningkatkan performa server, stabilitas koneksi database, dan penerapan enkripsi TLS 1.3 pada infrastruktur cloud Solvia Nova, bersama surat ini kami informasikan jadwal scheduled system maintenance sebagai berikut:",
    points: [
      {
        id: "p1",
        label: "Jadwal Pemeliharaan",
        value: "Minggu, 28 September 2026, Pukul 01.00 WIB s.d. 04.00 WIB (3 Jam).",
      },
      {
        id: "p2",
        label: "Dampak Layanan",
        value: "Akses ke dashboard web dan endpoint API klien akan mengalami downtime singkat (estimasi 10-15 menit) saat failover database.",
      },
      {
        id: "p3",
        label: "Tindakan Pencegahan",
        value: "Seluruh data telah dibackup secara otomatis ke secondary off-site cloud storage. Tidak ada data transaksi yang hilang.",
      },
    ],
    closing:
      "Kami memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan selama proses pemeliharaan berlangsung. Apabila Bapak/Ibu membutuhkan pendampingan teknis khusus, silakan menghubungi Tim DevOps kami via hotline WhatsApp. Terima kasih atas pengertiannya.",
    sender: {
      name: "Nanda Ari Wahyu Widagdo",
      position: "Chief Executive Officer / Direktur Utama",
      location: "Sukoharjo",
      hasStamp: true,
      hasSignature: true,
    },
    status: "Terkirim",
    createdAt: "2026-09-25T13:00:00Z",
    updatedAt: "2026-09-25T13:00:00Z",
  },
];

export const LETTER_TEMPLATES: Record<string, Partial<Letter>> = {
  penawaran: {
    type: "penawaran",
    typeLabel: "Surat Penawaran",
    confidentiality: "Penting",
    subject: "Penawaran Solusi Pengembangan Sistem Software & Digitalisasi Bisnis",
    attachments: "1 (Satu) Berkas Proposal Teknis & Anggaran Biaya",
    salutation: "Dengan hormat,",
    opening:
      "Menindaklanjuti kebutuhan digitalisasi dan otomatisasi sistem operasional perusahaan Anda, bersama surat ini kami dari Solvia Nova bermaksud mengajukan proposal penawaran teknis serta rancangan implementasi sistem digital dengan rincian sebagai berikut:",
    points: [
      {
        id: "1",
        label: "Lingkup Sistem",
        value: "Perancangan UI/UX kustom, Arsitektur Database Cloud Scalable, Integrasi REST API, dan Panel Admin Manajemen.",
      },
      {
        id: "2",
        label: "Spesifikasi Teknologi",
        value: "Next.js App Router modern, Node.js backend, PostgreSQL, dan keamanan enkripsi SSL.",
      },
      {
        id: "3",
        label: "Jadwal & Garansi",
        value: "Pengerjaan 30-45 hari kerja dengan jaminan Free Maintenance & Bug Fix selama 6 bulan.",
      },
    ],
    closing:
      "Besar harapan kami agar penawaran ini dapat menjadi awal kerja sama yang produktif dan saling menguntungkan. Atas perhatian dan kesempatan yang diberikan, kami ucapkan terima kasih.",
  },
  spk: {
    type: "spk",
    typeLabel: "Perjanjian Kerja Sama (SPK)",
    confidentiality: "Penting",
    subject: "Surat Perintah Kerja (SPK) Pelaksanaan Proyek Teknologi Digital",
    attachments: "Lampiran Kerangka Acuan Kerja (KAK)",
    salutation: "Dengan hormat,",
    opening:
      "Berdasarkan kesepakatan kedua belah pihak dan persetujuan proposal penawaran, dengan ini diterbitkan Surat Perintah Kerja (SPK) resmi kepada Solvia Nova untuk memulai pelaksanaan pengerjaan proyek dengan ketentuan sebagai berikut:",
    points: [
      {
        id: "1",
        label: "Nama Pekerjaan",
        value: "Pembangunan Sistem Informasi Manajemen Bisnis Custom & Dashboard Analytics.",
      },
      {
        id: "2",
        label: "Target Penyelesaian",
        value: "Pekerjaan wajib diselesaikan selambat-lambatnya 60 (enam puluh) hari kalender sejak penandatanganan SPK ini.",
      },
      {
        id: "3",
        label: "Nilai Pekerjaan",
        value: "Sesuai kesepakatan penawaran harga final yang tertuang dalam lampiran biaya kontrak.",
      },
    ],
    closing:
      "Surat Perintah Kerja ini mengikat kedua belah pihak dan berlaku sejak tanggal ditandatangani. Segala hal yang belum diatur akan diselesaikan secara musyawarah mufakat.",
  },
  tugas: {
    type: "tugas",
    typeLabel: "Surat Tugas / SPPD",
    confidentiality: "Biasa",
    subject: "Surat Tugas On-Site Deployment, Audit Sistem, & Pelatihan Teknis",
    attachments: "-",
    salutation: "Yang bertanda tangan di bawah ini Direktur Utama Solvia Nova memberikan penugasan kepada:",
    opening:
      "Untuk mendukung kelancaran implementasi sistem dan pelatihan pengguna di lokasi klien, dengan ini memberikan penugasan dinas kepada staf engineer berikut:",
    points: [
      {
        id: "1",
        label: "Nama Staf Bertugas",
        value: "Tim Technical Specialist & Field Engineer Solvia Nova.",
      },
      {
        id: "2",
        label: "Tempat / Lokasi",
        value: "Kantor / Fasilitas Operasional Klien.",
      },
      {
        id: "3",
        label: "Materi Tugas",
        value: "Instalasi perangkat keras/sensor, konfigurasi jaringan lokal, pelatihan operator, dan penandatanganan Berita Acara.",
      },
    ],
    closing:
      "Diharapkan yang bersangkutan melaksanakan tugas ini dengan penuh tanggung jawab serta melaporkan hasil pekerjaan kepada Direksi segera setelah penugasan selesai.",
  },
  bast: {
    type: "bast",
    typeLabel: "Berita Acara Serah Terima (BAST)",
    confidentiality: "Penting",
    subject: "Berita Acara Serah Terima (BAST) Penyelesaian Proyek Sistem Digital",
    attachments: "1 (Satu) Berkas Berita Acara Uji Fungsi & Manual Book",
    salutation: "Dengan hormat,",
    opening:
      "Pada hari ini kami yang bertanda tangan di bawah ini telah melakukan serah terima hasil pekerjaan sistem digital yang telah selesai dikembangkan dan diuji coba dengan hasil memuaskan:",
    points: [
      {
        id: "1",
        label: "Produk yang Diserahterimakan",
        value: "Aplikasi, Akses Super Admin, Database Terintegrasi, serta Buku Petunjuk Operasional Sistem.",
      },
      {
        id: "2",
        label: "Status Pengujian",
        value: "Telah melalui tahap User Acceptance Test (UAT) dan dinyatakan lulus verifikasi fungsi 100%.",
      },
      {
        id: "3",
        label: "Layanan Purna Jual",
        value: "Dukungan teknis dan garansi perbaikan bug aktif selama masa kontrak pemeliharaan.",
      },
    ],
    closing:
      "Demikian Berita Acara Serah Terima ini dibuat dalam rangkap 2 (dua) yang sah untuk digunakan sebagaimana mestinya.",
  },
  pemberitahuan: {
    type: "pemberitahuan",
    typeLabel: "Surat Pemberitahuan",
    confidentiality: "Biasa",
    subject: "Pemberitahuan Resmi Solvia Nova",
    attachments: "-",
    salutation: "Dengan hormat,",
    opening:
      "Bersama surat ini kami dari manajemen Solvia Nova bermaksud menyampaikan informasi resmi terkait operasional dan layanan kami kepada seluruh rekanan dan klien terhormat:",
    points: [
      {
        id: "1",
        label: "Perihal Pokok",
        value: "Pengumuman jadwal update sistem / libur operasional / kebijakan administrasi baru.",
      },
      {
        id: "2",
        label: "Waktu Efektif",
        value: "Berlaku terhitung mulai tanggal pengumuman surat ini diterbitkan.",
      },
    ],
    closing:
      "Demikian pemberitahuan ini kami sampaikan agar menjadi perhatian. Atas kerja sama dan kepercayaannya selama ini, kami mengucapkan terima kasih sebesar-besarnya.",
  },
};
