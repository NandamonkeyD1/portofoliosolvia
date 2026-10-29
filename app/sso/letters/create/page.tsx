"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Printer,
  Save,
  CheckCircle2,
  FileText,
  Send,
  FileSignature,
  FileCheck2,
  Sparkles,
  RotateCcw,
  Sliders,
  ShieldCheck
} from "lucide-react";
import {
  Letter,
  LetterPoint,
  INITIAL_LETTERS,
  LETTER_TEMPLATES
} from "@/lib/lettersData";
import LetterHead from "@/components/LetterHead";

const STORAGE_KEY = "solvia_admin_letters";

export default function CreateLetterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  // Form State
  const [letterId, setLetterId] = useState(
    editId || "let-" + Math.random().toString(36).substring(2, 9)
  );
  const [letterNo, setLetterNo] = useState("");
  const [type, setType] = useState<Letter["type"]>("penawaran");
  const [typeLabel, setTypeLabel] = useState("Surat Penawaran");
  const [classification, setClassification] = useState<"Keluar" | "Masuk">("Keluar");
  const [confidentiality, setConfidentiality] = useState<"Biasa" | "Penting" | "Rahasia">("Penting");
  const [subject, setSubject] = useState("");
  const [attachments, setAttachments] = useState("1 (Satu) Berkas Proposal Teknis");
  const [date, setDate] = useState("");

  // Recipient
  const [recipientName, setRecipientName] = useState("");
  const [recipientPosition, setRecipientPosition] = useState("");
  const [recipientCompany, setRecipientCompany] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientCity, setRecipientCity] = useState("");

  // Body
  const [salutation, setSalutation] = useState("Dengan hormat,");
  const [opening, setOpening] = useState("");
  const [points, setPoints] = useState<LetterPoint[]>([]);
  const [closing, setClosing] = useState("");

  // Sender
  const [senderName, setSenderName] = useState("Nanda Ari Wahyu Widagdo");
  const [senderPosition, setSenderPosition] = useState("Chief Executive Officer / Direktur Utama");
  const [senderLocation, setSenderLocation] = useState("Sukoharjo");
  const [hasStamp, setHasStamp] = useState(true);
  const [hasSignature, setHasSignature] = useState(true);

  // Status
  const [status, setStatus] = useState<Letter["status"]>("Terkirim");
  const [isSaved, setIsSaved] = useState(false);

  // Auto-generate date in Indonesian format
  const getIndonesianDate = () => {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const now = new Date();
    return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  };

  // Roman numerals for months
  const getRomanMonth = (monthIndex: number) => {
    const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    return roman[monthIndex] || "X";
  };

  // Generate Letter No based on type
  const generateLetterNo = (letterType: Letter["type"]) => {
    const now = new Date();
    const romanMonth = getRomanMonth(now.getMonth());
    const year = now.getFullYear();
    const randomSeq = String(Math.floor(Math.random() * 89) + 10).padStart(3, "0");

    let code = "SN-PNW";
    if (letterType === "spk") code = "SN-SPK";
    else if (letterType === "tugas") code = "SN-ST";
    else if (letterType === "bast") code = "SN-BAST";
    else if (letterType === "pemberitahuan") code = "SN-PBT";
    else if (letterType === "undangan") code = "SN-UND";

    return `${randomSeq}/${code}/${romanMonth}/${year}`;
  };

  // Apply template helper
  const applyTemplate = (tKey: string) => {
    const tpl = LETTER_TEMPLATES[tKey];
    if (!tpl) return;

    if (tpl.type) {
      setType(tpl.type);
      setTypeLabel(tpl.typeLabel || "Surat Resmi");
      setLetterNo(generateLetterNo(tpl.type));
    }
    if (tpl.confidentiality) setConfidentiality(tpl.confidentiality);
    if (tpl.subject) setSubject(tpl.subject);
    if (tpl.attachments) setAttachments(tpl.attachments);
    if (tpl.salutation) setSalutation(tpl.salutation);
    if (tpl.opening) setOpening(tpl.opening);
    if (tpl.points) setPoints(tpl.points);
    if (tpl.closing) setClosing(tpl.closing);
  };

  // Initialize or load edit data
  useEffect(() => {
    const currentDate = getIndonesianDate();
    setDate(currentDate);

    const saved = localStorage.getItem(STORAGE_KEY);
    const lettersList: Letter[] = saved ? JSON.parse(saved) : INITIAL_LETTERS;

    if (editId) {
      const existing = lettersList.find((l) => l.id === editId);
      if (existing) {
        setLetterId(existing.id);
        setLetterNo(existing.letterNo);
        setType(existing.type);
        setTypeLabel(existing.typeLabel);
        setClassification(existing.classification);
        setConfidentiality(existing.confidentiality);
        setSubject(existing.subject);
        setAttachments(existing.attachments);
        setDate(existing.date);
        setRecipientName(existing.recipient.name);
        setRecipientPosition(existing.recipient.position);
        setRecipientCompany(existing.recipient.company);
        setRecipientAddress(existing.recipient.address);
        setRecipientCity(existing.recipient.city);
        setSalutation(existing.salutation);
        setOpening(existing.opening);
        setPoints(existing.points || []);
        setClosing(existing.closing);
        setSenderName(existing.sender.name);
        setSenderPosition(existing.sender.position);
        setSenderLocation(existing.sender.location);
        setHasStamp(existing.sender.hasStamp);
        setHasSignature(existing.sender.hasSignature);
        setStatus(existing.status);
        return;
      }
    }

    // Default: Template Penawaran
    setLetterNo(generateLetterNo("penawaran"));
    setSubject("Penawaran Solusi Pengembangan Sistem Software & Digitalisasi Bisnis");
    setRecipientName("Bpk. Arya Wiguna, S.Kom.");
    setRecipientPosition("Managing Director");
    setRecipientCompany("PT. Cipta Solusi Mahakarya");
    setRecipientAddress("Jl. Jenderal Sudirman No. 102");
    setRecipientCity("Surakarta, Jawa Tengah");
    applyTemplate("penawaran");
  }, [editId]);

  // Points handler
  const addPoint = () => {
    const newPt: LetterPoint = {
      id: "pt-" + Date.now(),
      label: "Klausul / Poin Baru",
      value: "Deskripsi atau rincian klausul poin penawaran...",
    };
    setPoints([...points, newPt]);
  };

  const updatePoint = (index: number, field: "label" | "value", val: string) => {
    const copy = [...points];
    copy[index][field] = val;
    setPoints(copy);
  };

  const removePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  // Save to localStorage
  const handleSave = () => {
    const newLetter: Letter = {
      id: letterId,
      letterNo,
      type,
      typeLabel,
      classification,
      confidentiality,
      subject,
      attachments,
      date,
      recipient: {
        name: recipientName,
        position: recipientPosition,
        company: recipientCompany,
        address: recipientAddress,
        city: recipientCity,
      },
      salutation,
      opening,
      points,
      closing,
      sender: {
        name: senderName,
        position: senderPosition,
        location: senderLocation,
        hasStamp,
        hasSignature,
      },
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = localStorage.getItem(STORAGE_KEY);
    const list: Letter[] = saved ? JSON.parse(saved) : INITIAL_LETTERS;
    const existingIndex = list.findIndex((l) => l.id === letterId);

    let updatedList: Letter[] = [];
    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = newLetter;
    } else {
      updatedList = [newLetter, ...list];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href="/sso/letters"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {editId ? "Edit Dokumen Surat" : "Buat Surat Resmi Baru"}
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              Formulir pembuatan surat resmi ber-Kop Surat dengan live preview dokumen cetak A4.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
              isSaved
                ? "bg-emerald-600 text-white"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? "Tersimpan!" : "Simpan Surat"}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 shadow-md active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* Template Quick Selection Pills (Hidden on Print) */}
      <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-4 space-y-2 print:hidden shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Pilih Template Surat Siap Pakai:
          </span>
          <span className="text-[11px] text-slate-500">Klik untuk memuat format baku otomatis</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { key: "penawaran", label: "Penawaran Harga Proyek", icon: Send },
            { key: "spk", label: "Perjanjian Kerja Sama (SPK)", icon: FileSignature },
            { key: "tugas", label: "Surat Tugas On-Site", icon: FileText },
            { key: "bast", label: "Berita Acara (BAST)", icon: FileCheck2 },
            { key: "pemberitahuan", label: "Surat Pemberitahuan", icon: ShieldCheck },
          ].map((item) => {
            const IconComp = item.icon;
            const active = type === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => applyTemplate(item.key)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  active
                    ? "bg-blue-600/30 text-blue-300 border-blue-500/50 shadow-sm"
                    : "bg-[#070A12] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Grid: Left Form Builder & Right A4 Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: FORM CONTROLS (Hidden on Print) */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          {/* Section 1: Informasi Dasar Surat */}
          <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Sliders className="w-4 h-4" />
              1. Informasi Kepala Surat
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Nomor Surat Resmi
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={letterNo}
                    onChange={(e) => setLetterNo(e.target.value)}
                    className="flex-1 bg-[#070A12] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setLetterNo(generateLetterNo(type))}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium"
                    title="Generate No. Surat Otomatis"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Klasifikasi Sifat
                  </label>
                  <select
                    value={confidentiality}
                    onChange={(e) => setConfidentiality(e.target.value as any)}
                    className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Biasa">Biasa</option>
                    <option value="Penting">Penting</option>
                    <option value="Rahasia">Rahasia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Tanggal Terbit
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Perihal (Subject)
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Lampiran Dokumen
                </label>
                <input
                  type="text"
                  value={attachments}
                  onChange={(e) => setAttachments(e.target.value)}
                  placeholder="Misal: 1 (Satu) Berkas Proposal / -"
                  className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Data Tujuan / Penerima */}
          <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <FileText className="w-4 h-4" />
              2. Data Penerima (Kepada Yth.)
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Jabatan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={recipientPosition}
                    onChange={(e) => setRecipientPosition(e.target.value)}
                    placeholder="Direktur Utama"
                    className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Instansi / Perusahaan
                </label>
                <input
                  type="text"
                  value={recipientCompany}
                  onChange={(e) => setRecipientCompany(e.target.value)}
                  placeholder="PT. Solusi Mandiri"
                  className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Alamat Lengkap
                  </label>
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="Jl. Slamet Riyadi No. 50"
                    className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Kota / Wilayah
                  </label>
                  <input
                    type="text"
                    value={recipientCity}
                    onChange={(e) => setRecipientCity(e.target.value)}
                    placeholder="Surakarta, Jawa Tengah"
                    className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Isi Surat & Klausul */}
          <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <FileSignature className="w-4 h-4" />
              3. Redaksi Isi Surat
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Salam Pembuka
                </label>
                <input
                  type="text"
                  value={salutation}
                  onChange={(e) => setSalutation(e.target.value)}
                  className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Paragraf Pembuka
                </label>
                <textarea
                  rows={4}
                  value={opening}
                  onChange={(e) => setOpening(e.target.value)}
                  className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white leading-relaxed focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Dynamic Points Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold text-slate-400">
                    Poin Rincian / Klausul ({points.length}):
                  </label>
                  <button
                    type="button"
                    onClick={addPoint}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Poin
                  </button>
                </div>

                <div className="space-y-2.5">
                  {points.map((pt, idx) => (
                    <div
                      key={pt.id || idx}
                      className="p-3 rounded-xl bg-[#070A12] border border-slate-800 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={pt.label}
                          onChange={(e) => updatePoint(idx, "label", e.target.value)}
                          placeholder="Judul Poin (misal: Ruang Lingkup)"
                          className="flex-1 bg-transparent border-b border-slate-700 pb-1 text-xs font-bold text-blue-300 focus:outline-none focus:border-blue-400"
                        />
                        <button
                          type="button"
                          onClick={() => removePoint(idx)}
                          className="text-slate-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={pt.value}
                        onChange={(e) => updatePoint(idx, "value", e.target.value)}
                        placeholder="Isi rincian poin..."
                        className="w-full bg-transparent text-xs text-slate-300 leading-relaxed focus:outline-none resize-y"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Paragraf Penutup
                </label>
                <textarea
                  rows={3}
                  value={closing}
                  onChange={(e) => setClosing(e.target.value)}
                  className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white leading-relaxed focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Pengesahan & TTD */}
          <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <CheckCircle2 className="w-4 h-4" />
              4. Pengesahan &amp; Tanda Tangan
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Nama Penandatangan
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    value={senderPosition}
                    onChange={(e) => setSenderPosition(e.target.value)}
                    className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={hasStamp}
                    onChange={(e) => setHasStamp(e.target.checked)}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Sertakan Stempel Resmi</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={hasSignature}
                    onChange={(e) => setHasSignature(e.target.checked)}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Sertakan Tanda Tangan Digital</span>
                </label>
              </div>

              <div className="pt-2">
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Status Dokumen
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Terkirim">Terkirim</option>
                  <option value="Disetujui">Disetujui</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE A4 PRINTABLE PREVIEW CANVAS */}
        <div className="lg:col-span-7 print:col-span-12 print:w-full">
          <div className="sticky top-20 bg-white text-slate-900 rounded-3xl shadow-2xl p-8 sm:p-12 font-serif min-h-[960px] border border-slate-200 print:border-none print:shadow-none print:p-8 print:m-0 print:min-h-0 print:static">
            {/* Kop Surat Resmi */}
            <LetterHead />

            {/* Nomor & Tanggal */}
            <div className="grid grid-cols-2 gap-4 text-xs font-sans mb-6">
              <div className="space-y-1">
                <div>
                  <span className="font-bold text-slate-700 inline-block w-20">Nomor</span>
                  <span>: {letterNo || "___/SN/X/2026"}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 inline-block w-20">Sifat</span>
                  <span>: {confidentiality}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 inline-block w-20">Lampiran</span>
                  <span>: {attachments || "-"}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 inline-block w-20">Perihal</span>
                  <span className="font-bold text-slate-900">: {subject || "Perihal Surat"}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-slate-800 font-medium">
                  {senderLocation || "Sukoharjo"}, {date}
                </div>
              </div>
            </div>

            {/* Recipient */}
            <div className="text-xs font-sans mb-6 space-y-0.5">
              <div className="text-slate-700">Kepada Yth.</div>
              <div className="font-bold text-slate-900 text-sm">{recipientName || "Nama Penerima"}</div>
              {recipientPosition && (
                <div className="text-slate-700">{recipientPosition}</div>
              )}
              {recipientCompany && (
                <div className="font-semibold text-slate-800">{recipientCompany}</div>
              )}
              {recipientAddress && <div className="text-slate-600">{recipientAddress}</div>}
              {recipientCity && <div className="text-slate-600 font-medium">{recipientCity}</div>}
            </div>

            {/* Opening */}
            <div className="text-xs font-sans leading-relaxed text-slate-800 space-y-3 mb-4">
              <div className="font-semibold">{salutation}</div>
              <p className="text-justify indent-6">
                {opening || "Paragraf pembuka surat resmi..."}
              </p>
            </div>

            {/* Points Table */}
            {points.length > 0 && (
              <div className="my-5 font-sans text-xs border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {points.map((pt, i) => (
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

            {/* Closing */}
            <div className="text-xs font-sans leading-relaxed text-slate-800 my-4 text-justify indent-6">
              {closing || "Demikian surat ini kami sampaikan. Atas perhatian dan kerja samanya, kami ucapkan terima kasih."}
            </div>

            {/* Signature Block */}
            <div className="mt-10 flex justify-end font-sans">
              <div className="text-center w-64 space-y-1">
                <div className="text-xs text-slate-700">
                  {senderLocation || "Sukoharjo"}, {date}
                </div>
                <div className="text-xs font-bold text-slate-900 uppercase">
                  SOLVIA NOVA DIGITAL SOLUTION
                </div>

                {/* Stamp & Signature Graphics */}
                <div className="relative h-24 flex items-center justify-center my-1">
                  {hasStamp && (
                    <div className="absolute left-6 w-20 h-20 rounded-full border-2 border-blue-600/60 rotate-[-12deg] flex flex-col items-center justify-center text-[8px] font-black uppercase text-blue-600 pointer-events-none select-none tracking-tighter opacity-85">
                      <span className="text-[7px]">SOLVIA NOVA</span>
                      <span className="text-[10px]">★</span>
                      <span className="text-[6px]">DIGITAL STUDIO</span>
                    </div>
                  )}
                  {hasSignature && (
                    <div className="font-serif italic text-2xl text-blue-900 select-none transform -rotate-3 font-bold">
                      Nanda A. W.
                    </div>
                  )}
                </div>

                <div className="border-b border-slate-900 font-bold text-xs text-slate-900 pb-0.5">
                  {senderName || "Nanda Ari Wahyu Widagdo"}
                </div>
                <div className="text-[11px] text-slate-600">
                  {senderPosition || "Direktur Utama"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
