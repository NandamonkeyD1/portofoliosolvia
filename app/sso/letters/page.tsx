"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Printer,
  FileText,
  CheckCircle2,
  Clock,
  Send,
  FileSignature,
  FileCheck2,
  X,
  Sparkles,
  Download,
  AlertCircle
} from "lucide-react";
import { Letter, INITIAL_LETTERS } from "@/lib/lettersData";
import LetterHead from "@/components/LetterHead";

const STORAGE_KEY = "solvia_admin_letters";

export default function LettersAdminPage() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [previewLetter, setPreviewLetter] = useState<Letter | null>(null);

  // Load from localStorage or initial letters
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setLetters(JSON.parse(saved));
      } catch (e) {
        setLetters(INITIAL_LETTERS);
      }
    } else {
      setLetters(INITIAL_LETTERS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LETTERS));
    }
  }, []);

  const saveLetters = (newLetters: Letter[]) => {
    setLetters(newLetters);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLetters));
  };

  const handleDelete = (id: string, no: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus arsip surat ${no}?`)) {
      const updated = letters.filter((l) => l.id !== id);
      saveLetters(updated);
      if (previewLetter?.id === id) setPreviewLetter(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Filtered letters
  const filteredLetters = letters.filter((l) => {
    const matchSearch =
      l.letterNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.recipient.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType = filterType === "all" || l.type === filterType;
    const matchStatus = filterStatus === "all" || l.status === filterStatus;

    return matchSearch && matchType && matchStatus;
  });

  // Type Badges styling
  const getTypeBadge = (type: string, label: string) => {
    switch (type) {
      case "penawaran":
        return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
      case "spk":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "tugas":
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
      case "bast":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      case "pemberitahuan":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      default:
        return "bg-slate-500/15 text-slate-300 border-slate-500/30";
    }
  };

  // Status Badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
      case "Terkirim":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Disetujui":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Selesai":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Surat Menyurat &amp; Dokumen Resmi
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-400/30 text-[10px] font-bold">
              Solvia.Nova
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Kelola pembuatan surat penawaran proyek, perjanjian kerja sama (SPK/MOU), surat tugas teknis, dan cetak dokumen resmi ber-Kop Surat.
          </p>
        </div>

        <Link
          href="/sso/letters/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-colors shadow-md shadow-blue-600/25 shrink-0 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Surat Baru</span>
        </Link>
      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Dokumen</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{letters.length}</div>
          <div className="text-[11px] text-slate-500">Arsip surat tersimpan</div>
        </div>

        <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Surat Penawaran</span>
            <Send className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-300">
            {letters.filter((l) => l.type === "penawaran").length}
          </div>
          <div className="text-[11px] text-slate-500">Proposal &amp; Quotation</div>
        </div>

        <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Kontrak SPK / MOU</span>
            <FileSignature className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-300">
            {letters.filter((l) => l.type === "spk").length}
          </div>
          <div className="text-[11px] text-slate-500">Perjanjian pengerjaan</div>
        </div>

        <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Tugas &amp; BAST</span>
            <FileCheck2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-300">
            {letters.filter((l) => l.type === "tugas" || l.type === "bast").length}
          </div>
          <div className="text-[11px] text-slate-500">Operasional &amp; serah terima</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari no. surat, perihal, klien..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filter Selects */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="flex-1 md:flex-none bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">Semua Kategori</option>
            <option value="penawaran">Surat Penawaran</option>
            <option value="spk">Perjanjian Kerja (SPK)</option>
            <option value="tugas">Surat Tugas / SPPD</option>
            <option value="bast">BAST Serah Terima</option>
            <option value="pemberitahuan">Surat Pemberitahuan</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 md:flex-none bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="Draft">Draft</option>
            <option value="Terkirim">Terkirim</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      {/* Letters Table */}
      <div className="bg-[#0E1526] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#070A12]/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5">NO. SURAT &amp; TANGGAL</th>
                <th className="py-4 px-5">JENIS SURAT</th>
                <th className="py-4 px-5">PERIHAL</th>
                <th className="py-4 px-5">TUJUAN / KLIEN</th>
                <th className="py-4 px-5">STATUS</th>
                <th className="py-4 px-5 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredLetters.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="font-semibold">Tidak ada arsip surat yang sesuai pencarian.</p>
                    <p className="text-[11px] text-slate-500 mt-1">Coba reset filter atau buat surat baru.</p>
                  </td>
                </tr>
              ) : (
                filteredLetters.map((letter) => (
                  <tr key={letter.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="font-mono text-blue-400 font-bold">{letter.letterNo}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{letter.date}</div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${getTypeBadge(
                          letter.type,
                          letter.typeLabel
                        )}`}
                      >
                        {letter.typeLabel}
                      </span>
                    </td>

                    <td className="py-4 px-5 max-w-[280px]">
                      <div className="font-semibold text-slate-200 line-clamp-1">{letter.subject}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        Lampiran: {letter.attachments || "-"}
                      </div>
                    </td>

                    <td className="py-4 px-5 max-w-[220px]">
                      <div className="font-semibold text-slate-200 line-clamp-1">{letter.recipient.name}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {letter.recipient.company || letter.recipient.city}
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                          letter.status
                        )}`}
                      >
                        • {letter.status}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 text-slate-400">
                        {/* Preview Modal Trigger */}
                        <button
                          type="button"
                          onClick={() => setPreviewLetter(letter)}
                          className="p-1.5 rounded-lg hover:text-white hover:bg-slate-700/80 transition-colors"
                          title="Lihat Pratinjau Surat & Kop"
                        >
                          <Eye className="w-4 h-4 text-cyan-400" />
                        </button>

                        {/* Edit Button */}
                        <Link
                          href={`/sso/letters/create?id=${letter.id}`}
                          className="p-1.5 rounded-lg hover:text-blue-400 hover:bg-slate-700/80 transition-colors"
                          title="Edit Surat"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(letter.id, letter.letterNo)}
                          className="p-1.5 rounded-lg hover:text-red-400 hover:bg-slate-700/80 transition-colors"
                          title="Hapus Surat"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK PREVIEW & PRINT MODAL */}
      {previewLetter && (
        <div className="fixed inset-0 z-50 bg-black/85 overflow-y-auto p-2 sm:p-4 md:p-8 flex justify-center items-start print:p-0 print:bg-white print:static print:overflow-visible">
          <div className="relative w-full max-w-4xl bg-[#04152d] border border-blue-500/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-3 sm:my-6 print:border-none print:shadow-none print:m-0 print:w-full print:bg-white">
            {/* Modal Controls Bar (Hidden on Print, Sticky at top) */}
            <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0A0E1A] print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white">
                  Pratinjau Resmi: <span className="font-mono text-cyan-300">{previewLetter.letterNo}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewLetter(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* A4 White Paper Canvas with Official Letterhead */}
            <div className="p-8 sm:p-12 bg-white text-slate-900 font-serif shadow-inner min-h-[900px] print:p-8 print:min-h-0 print:shadow-none">
              {/* Kop Surat */}
              <LetterHead />

              {/* Letter Meta Row */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans mb-6">
                <div className="space-y-1">
                  <div>
                    <span className="font-bold text-slate-700 inline-block w-20">Nomor</span>
                    <span>: {previewLetter.letterNo}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 inline-block w-20">Sifat</span>
                    <span>: {previewLetter.confidentiality}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 inline-block w-20">Lampiran</span>
                    <span>: {previewLetter.attachments || "-"}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 inline-block w-20">Perihal</span>
                    <span className="font-bold text-slate-900">: {previewLetter.subject}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-slate-800 font-medium">
                    {previewLetter.sender.location}, {previewLetter.date}
                  </div>
                </div>
              </div>

              {/* Recipient Box */}
              <div className="text-xs font-sans mb-6 space-y-0.5">
                <div className="text-slate-700">Kepada Yth.</div>
                <div className="font-bold text-slate-900 text-sm">{previewLetter.recipient.name}</div>
                {previewLetter.recipient.position && (
                  <div className="text-slate-700">{previewLetter.recipient.position}</div>
                )}
                {previewLetter.recipient.company && (
                  <div className="font-semibold text-slate-800">{previewLetter.recipient.company}</div>
                )}
                <div className="text-slate-600">{previewLetter.recipient.address}</div>
                <div className="text-slate-600 font-medium">{previewLetter.recipient.city}</div>
              </div>

              {/* Salutation & Opening */}
              <div className="text-xs font-sans leading-relaxed text-slate-800 space-y-3 mb-4">
                <div className="font-semibold">{previewLetter.salutation}</div>
                <p className="text-justify indent-6">{previewLetter.opening}</p>
              </div>

              {/* Points / Table of Details */}
              {previewLetter.points && previewLetter.points.length > 0 && (
                <div className="my-5 font-sans text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {previewLetter.points.map((pt, i) => (
                        <tr
                          key={pt.id || i}
                          className={i % 2 === 0 ? "bg-slate-50/70" : "bg-white"}
                        >
                          <td className="py-2.5 px-4 font-bold text-slate-700 w-1/3 border-b border-slate-200 align-top">
                            {pt.label}
                          </td>
                          <td className="py-2.5 px-4 text-slate-800 border-b border-slate-200 whitespace-pre-line leading-relaxed">
                            {pt.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Closing Paragraph */}
              <div className="text-xs font-sans leading-relaxed text-slate-800 my-4 text-justify indent-6">
                {previewLetter.closing}
              </div>

              {/* Signature Block */}
              <div className="mt-10 flex justify-end font-sans">
                <div className="text-center w-64 space-y-1">
                  <div className="text-xs text-slate-700">
                    {previewLetter.sender.location}, {previewLetter.date}
                  </div>
                  <div className="text-xs font-bold text-slate-900 uppercase">
                    SOLVIA NOVA DIGITAL SOLUTION
                  </div>

                  {/* Stamp & Signature Graphic Box */}
                  <div className="relative h-24 flex items-center justify-center my-1">
                    {previewLetter.sender.hasStamp && (
                      <div className="absolute left-6 w-20 h-20 rounded-full border-2 border-blue-600/60 rotate-[-12deg] flex flex-col items-center justify-center text-[8px] font-black uppercase text-blue-600 pointer-events-none select-none tracking-tighter opacity-85">
                        <span className="text-[7px]">SOLVIA NOVA</span>
                        <span className="text-[10px]">★</span>
                        <span className="text-[6px]">DIGITAL STUDIO</span>
                      </div>
                    )}
                    {previewLetter.sender.hasSignature && (
                      <div className="font-serif italic text-2xl text-blue-900 select-none transform -rotate-3 font-bold">
                        Nanda A. W.
                      </div>
                    )}
                  </div>

                  <div className="border-b border-slate-900 font-bold text-xs text-slate-900 pb-0.5">
                    {previewLetter.sender.name}
                  </div>
                  <div className="text-[11px] text-slate-600">{previewLetter.sender.position}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
