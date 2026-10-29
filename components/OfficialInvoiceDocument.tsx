"use client";

import { MapPin, Phone, Mail, Globe } from "lucide-react";

export interface LineItem {
  id: string;
  description: string;
  qty: number;
  price: number;
  subDetail?: string;
}

export interface OfficialInvoiceProps {
  invoiceNo: string;
  invoiceDate: string;
  clientName: string;
  clientAddress: string;
  clientEmail?: string;
  clientPhone?: string;
  projectName: string;
  servicePackage: string;
  projectDuration: string;
  items: LineItem[];
  bankBadge?: string;
  bankName?: string;
  accountNo?: string;
  accountHolder?: string;
  transferType?: string;
  signatureImage?: string;
  signatoryName?: string;
  signatoryRole?: string;
}

// Terbilang Rupiah Helper
export function terbilangRupiah(n: number): string {
  if (n < 0) return "Minus " + terbilangRupiah(-n);
  if (n === 0) return "Nol Rupiah";

  const satuan = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];

  function konversi(x: number): string {
    if (x < 12) return satuan[x];
    if (x < 20) return konversi(x - 10) + " Belas";
    if (x < 100) return konversi(Math.floor(x / 10)) + " Puluh " + (x % 10 !== 0 ? konversi(x % 10) : "");
    if (x < 200) return "Seratus " + (x % 100 !== 0 ? konversi(x - 100) : "");
    if (x < 1000) return konversi(Math.floor(x / 100)) + " Ratus " + (x % 100 !== 0 ? konversi(x % 100) : "");
    if (x < 2000) return "Seribu " + (x % 1000 !== 0 ? konversi(x - 1000) : "");
    if (x < 1000000) return konversi(Math.floor(x / 1000)) + " Ribu " + (x % 1000 !== 0 ? konversi(x % 1000) : "");
    if (x < 1000000000) return konversi(Math.floor(x / 1000000)) + " Juta " + (x % 1000000 !== 0 ? konversi(x % 1000000) : "");
    if (x < 1000000000000) return konversi(Math.floor(x / 1000000000)) + " Milyar " + (x % 1000000000 !== 0 ? konversi(x % 1000000000) : "");
    return "";
  }

  const hasil = konversi(Math.floor(n)).replace(/\s+/g, " ").trim();
  return hasil ? `(${hasil} Rupiah)` : "";
}

export function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

export const DEFAULT_FILTRAZON_ITEMS: LineItem[] = [
  { id: "1", description: "Membrane RO 1812-75G", qty: 1, price: 85237, subDetail: "" },
  { id: "2", description: "Housing membrane RO 1812", qty: 1, price: 67558, subDetail: "" },
  { id: "3", description: "Pompa booster RO 24V 1.5A", qty: 1, price: 442671, subDetail: "" },
  { id: "4", description: "Housing filter Nanotec 10 inch 3/4\"", qty: 1, price: 71969, subDetail: "" },
  { id: "5", description: "Cartridge carbon block CTO Water Wizard", qty: 1, price: 20103, subDetail: "" },
  { id: "6", description: "Post-carbon cartridge T33", qty: 1, price: 35381, subDetail: "" },
  { id: "7", description: "Post mineral cartridge", qty: 1, price: 56932, subDetail: "" },
  { id: "8", description: "Serat sabut kelapa", qty: 1, price: 79972, subDetail: "" },
  { id: "9", description: "Tee 3/8 - 3/8 - 1/4", qty: 1, price: 10000, subDetail: "" },
  { id: "10", description: "Sok 3/8 x 1/2 drat luar", qty: 8, price: 10000, subDetail: "" },
  { id: "11", description: "Elbow (L) 3/8 u/ post", qty: 9, price: 10000, subDetail: "" },
  { id: "12", description: "Elbow (L) 3/8 - 1/4", qty: 6, price: 10000, subDetail: "" },
  { id: "13", description: "Elbow (L) 3/8 x 1/2 drat luar", qty: 2, price: 10000, subDetail: "" },
  { id: "14", description: "Selang 3/8", qty: 5, price: 6000, subDetail: "" },
  { id: "15", description: "Sok 3/8 x 3/4 drat luar", qty: 1, price: 17500, subDetail: "" },
  { id: "16", description: "Sambungan 3/8 - 1/4", qty: 2, price: 10000, subDetail: "" },
  { id: "17", description: "Sok 3/8 u/ post", qty: 1, price: 10000, subDetail: "" },
  { id: "18", description: "Elbow (L) 3/8 u/ pompa", qty: 2, price: 10000, subDetail: "" },
  { id: "19", description: "Elbow (L) 3/8 - 3/8", qty: 10, price: 10000, subDetail: "" },
  { id: "20", description: "Seal housing 10 inch", qty: 1, price: 12000, subDetail: "" },
  { id: "21", description: "Sambungan 1/4 - 3/8", qty: 1, price: 10000, subDetail: "" },
  { id: "22", description: "Sok 1/4 x 3/4 drat", qty: 2, price: 10000, subDetail: "" },
  { id: "23", description: "Housing filter post", qty: 1, price: 55000, subDetail: "" },
  { id: "24", description: "Seal tape Onda", qty: 1, price: 5000, subDetail: "" },
  { id: "25", description: "Dobel nepel Gravino SM 1/2\" x 3/4\" SS", qty: 1, price: 11500, subDetail: "" },
  { id: "26", description: "Flow membrane RO 400 cc", qty: 1, price: 41400, subDetail: "" },
  { id: "27", description: "Lem dan baut", qty: 1, price: 29500, subDetail: "" },
  { id: "28", description: "Analisis kondisi perangkat existing dan desain ulang sistem", qty: 1, price: 500000, subDetail: "" },
  { id: "29", description: "Fabrikasi, penyesuaian dimensi dan pemasangan custom box serta bracket", qty: 1, price: 800000, subDetail: "" },
  { id: "30", description: "Perakitan dan integrasi sistem filtrasi RO, pre-filter, dan post-filter", qty: 1, price: 1000000, subDetail: "" },
  { id: "31", description: "Integrasi pompa, pengaturan tekanan, dan jalur air reject", qty: 1, price: 700000, subDetail: "" },
  { id: "32", description: "Integrasi sensor dan monitoring IoT pada sistem existing", qty: 1, price: 900000, subDetail: "" },
  { id: "33", description: "Pengujian sistem, commissioning, dan dokumentasi teknis", qty: 1, price: 800000, subDetail: "" },
];

export default function OfficialInvoiceDocument({
  invoiceNo = "NO. INV/2026/10/003",
  invoiceDate = "28 October 2026",
  clientName = "FILTRAZON IoT 2.0",
  clientAddress = "Dusun Brambang Rt 01/02, Kelurahan Blimbing, Kec. Gatak, Kab.Sukoharjo",
  clientEmail = "helixxjust@gmail.com",
  clientPhone = "+62 812-2661-5585",
  projectName = "FILTRAZON IoT 2.0",
  servicePackage = "IoT System Integration, Web DashboardDevelopment",
  projectDuration = "1 Juli - 30 Agustus",
  items = [],
  bankBadge = "BM",
  bankName = "Bank Mandiri",
  accountNo = "1360034942356",
  accountHolder = "NANDA ARI WAHYU",
  transferType = "Antar Bank",
  signatureImage = "",
  signatoryName = "Nanda Ari Wahyu Widagdo",
  signatoryRole = "Founder",
}: OfficialInvoiceProps) {
  const subtotal = items.reduce((acc, it) => acc + (it.qty * it.price), 0);
  const total = subtotal;
  const terbilangText = terbilangRupiah(total);

  return (
    <div className="bg-white text-slate-800 font-sans text-xs w-full max-w-4xl mx-auto shadow-2xl rounded-2xl print:rounded-none print:shadow-none print:max-w-none print:w-full border border-slate-200 print:border-none">
      {/* INVOICE CONTENT WRAPPER */}
      <div className="p-6 sm:p-10 space-y-6">
        
        {/* ================= 1. KOP HEADER ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Left: Brand Identity */}
          <div className="md:col-span-5 flex items-center gap-3.5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
              <img
                src="/assets/images/Solvia.png"
                alt="Solvia Nova Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#071b40] leading-none uppercase">
                SOLVIA.NOVA
              </h1>
              <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#071b40] uppercase mt-1">
                DIGITAL SOLUTION PARTNER
              </p>
              <p className="text-[11px] italic text-slate-500 mt-1 font-serif leading-tight">
                &ldquo;Membangun Solusi Digital untuk Masa Depan Bisnismu&rdquo;
              </p>
            </div>
          </div>

          {/* Center: Contact Info with circular icons */}
          <div className="md:col-span-4 border-l border-slate-200 pl-4 space-y-1.5 text-[11px] text-slate-700">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 text-slate-600 mt-0.5">
                <MapPin className="w-3 h-3" />
              </span>
              <div>
                <span className="font-bold text-slate-900">ALAMAT : </span>
                <span>Jl.GumukrejoRT 05 RW 05, Nanggulan Salatiga</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 text-slate-600">
                <Phone className="w-3 h-3" />
              </span>
              <div>
                <span className="font-bold text-slate-900">WHATSAPP : </span>
                <span className="font-mono">6283148801578</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 text-slate-600">
                <Mail className="w-3 h-3" />
              </span>
              <div>
                <span className="font-bold text-slate-900">EMAIL : </span>
                <span>solvianova1@gmail.com</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 text-slate-600">
                <Globe className="w-3 h-3" />
              </span>
              <div>
                <span className="font-bold text-slate-900">WEBSITE : </span>
                <span>solvianova.my.id</span>
              </div>
            </div>
          </div>

          {/* Right: Invoice Tag & Number */}
          <div className="md:col-span-3 text-left md:text-right space-y-1.5">
            <h2 className="text-3xl font-black tracking-tight text-[#071b40] uppercase">
              INVOICE
            </h2>
            <div className="inline-block bg-[#071b40] text-white px-3.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider shadow-sm">
              {invoiceNo.startsWith("NO.") ? invoiceNo : `NO. ${invoiceNo}`}
            </div>
            <div className="text-xs font-semibold text-slate-700">
              {invoiceDate}
            </div>
          </div>
        </div>

        {/* Navy Header Line Divider */}
        <div className="border-b-2 border-[#071b40] pt-1" />

        {/* ================= 2. CLIENT & PROJECT METADATA ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
          {/* Left: KEPADA YTH. */}
          <div className="md:col-span-6 space-y-1">
            <span className="text-[11px] font-bold uppercase text-slate-800 tracking-wider">
              KEPADA YTH.
            </span>
            <div className="font-black text-sm text-[#071b40] uppercase">
              {clientName}
            </div>
            {clientAddress && (
              <div className="text-slate-700 leading-relaxed max-w-sm">
                {clientAddress}
              </div>
            )}
            {clientEmail && (
              <div className="text-slate-600">
                Email: <span className="text-slate-800 font-medium">{clientEmail}</span>
              </div>
            )}
            {clientPhone && (
              <div className="text-slate-600">
                Telepon: <span className="text-slate-800 font-medium font-mono">{clientPhone}</span>
              </div>
            )}
          </div>

          {/* Right: INFORMASI PROJECT */}
          <div className="md:col-span-6 space-y-1">
            <span className="text-[11px] font-bold uppercase text-slate-800 tracking-wider">
              INFORMASI PROJECT
            </span>
            <table className="w-full text-xs border-collapse mt-1">
              <tbody>
                <tr>
                  <td className="py-1 text-slate-600 w-32 font-medium">Nama Project</td>
                  <td className="py-1 text-slate-900 font-bold">: {projectName}</td>
                </tr>
                <tr>
                  <td className="py-1 text-slate-600 align-top font-medium">Paket</td>
                  <td className="py-1 text-slate-800 font-medium leading-snug">: {servicePackage}</td>
                </tr>
                <tr>
                  <td className="py-1 text-slate-600 font-medium">Durasi</td>
                  <td className="py-1 text-slate-800 font-medium">: {projectDuration}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= 3. RINCIAN LAYANAN TABLE ================= */}
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase text-[#071b40] tracking-wider">
            RINCIAN LAYANAN
          </h3>

          <div className="border border-slate-200 rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#071b40] text-white text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="py-2.5 px-3.5 text-center w-12 border-r border-blue-900/60">NO</th>
                  <th className="py-2.5 px-4">DESKRIPSI</th>
                  <th className="py-2.5 px-3.5 text-center w-14 border-x border-blue-900/60">QTY</th>
                  <th className="py-2.5 px-4 text-right w-36 border-r border-blue-900/60">HARGA SATUAN</th>
                  <th className="py-2.5 px-4 text-right w-36">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-800">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      Tidak ada item tagihan.
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => {
                    const rowTotal = item.qty * item.price;
                    return (
                      <tr
                        key={item.id || idx}
                        className={idx % 2 === 1 ? "bg-slate-50/70" : "bg-white"}
                      >
                        <td className="py-2 px-3.5 text-center text-slate-600 font-mono border-r border-slate-200/80">
                          {idx + 1}
                        </td>
                        <td className="py-2 px-4 text-slate-900 font-medium">
                          {item.description}
                          {item.subDetail && (
                            <span className="block text-[11px] text-slate-500 font-normal">
                              {item.subDetail}
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3.5 text-center text-slate-700 font-mono border-x border-slate-200/80">
                          {item.qty}
                        </td>
                        <td className="py-2 px-4 text-right text-slate-800 font-mono border-r border-slate-200/80">
                          {formatRupiah(item.price)}
                        </td>
                        <td className="py-2 px-4 text-right font-bold text-[#071b40] font-mono">
                          {formatRupiah(rowTotal)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= 4. SUMMARY & TOTALS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
          {/* Left: TOTAL PEMBAYARAN Card + Terbilang */}
          <div className="md:col-span-7 bg-slate-50/80 border border-slate-200 rounded-xl p-4 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              TOTAL PEMBAYARAN
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#071b40] font-mono tracking-tight">
              {formatRupiah(total)}
            </div>
            <div className="text-[11px] italic text-slate-600 leading-snug font-serif">
              {terbilangText}
            </div>
          </div>

          {/* Right: Subtotal & Dark Navy TOTAL block */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center justify-between text-xs px-2 py-1">
              <span className="text-slate-600 font-medium">Subtotal</span>
              <span className="font-bold text-slate-800 font-mono">{formatRupiah(subtotal)}</span>
            </div>

            <div className="bg-[#071b40] text-white px-4 py-2.5 rounded-lg flex items-center justify-between font-bold text-sm shadow-sm">
              <span className="tracking-wider text-xs uppercase">TOTAL</span>
              <span className="font-mono text-base">{formatRupiah(total)}</span>
            </div>
          </div>
        </div>

        {/* ================= 5. PAYMENT & SIGNATURE ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
          {/* Left: Informasi Pembayaran */}
          <div className="md:col-span-6 space-y-2">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
              INFORMASI PEMBAYARAN
            </span>

            <div className="bg-slate-50/90 border border-slate-200 rounded-xl p-4 flex items-start gap-3.5">
              {/* Bank Badge */}
              <div className="w-11 h-11 rounded-lg bg-[#071b40] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                {bankBadge}
              </div>

              {/* Bank Details */}
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-slate-900 text-sm">{bankName}</div>
                <div className="font-mono font-bold text-slate-800 tracking-wider">
                  {accountNo}
                </div>
                <div className="text-slate-600 font-semibold text-[11px]">
                  a.n. {accountHolder}
                </div>
                <div className="text-[10px] text-slate-500 pt-1 font-medium">
                  Jenis Transfer: {transferType}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hormat Kami & Signature */}
          <div className="md:col-span-6 flex flex-col items-start md:items-end text-left md:text-right space-y-1">
            <span className="text-xs text-slate-700">Hormat Kami,</span>

            {/* Signature Graphic / Image */}
            <div className="h-16 w-36 flex items-center justify-center py-1">
              {signatureImage ? (
                <img
                  src={signatureImage}
                  alt="Tanda Tangan Official"
                  className="max-h-full object-contain"
                />
              ) : (
                <div className="border-b-2 border-slate-800 w-32 mt-8 text-center text-[10px] text-slate-400">
                  (Tanda Tangan)
                </div>
              )}
            </div>

            <div className="font-bold text-sm text-[#071b40]">
              {signatoryName}
            </div>
            <div className="text-xs text-slate-600">
              {signatoryRole}
            </div>

            {/* Solvia Nova Micro Tag */}
            <div className="flex items-center gap-1.5 pt-1 text-[10px] text-slate-500 font-semibold">
              <span className="text-[#071b40] font-black uppercase">Solvia.Nova</span>
              <span>•</span>
              <span>Digital Solution Partner</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= 6. OFFICIAL NAVY FOOTER BAR ================= */}
      <div className="bg-[#071b40] text-white py-3 px-6 text-xs flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-medium tracking-wide">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-blue-300" />
          <span>Jl.GumukrejoRT 05 RW 05, Nanggulan Salatiga</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-blue-300" />
          <span>solvianova1@gmail.com</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-blue-300" />
          <span>solvianova.my.id</span>
        </div>
      </div>
    </div>
  );
}
