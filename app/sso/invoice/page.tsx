"use client";

import { useState, useEffect } from "react";
import { Plus, Eye, Edit, Trash2, Search, Check, X, FileSpreadsheet, ArrowUpRight, Printer, Sparkles } from "lucide-react";
import Link from "next/link";

interface InvoiceItem {
  id: string;
  no: string;
  client: string;
  project: string;
  date: string;
  total: string;
  status: string;
}

const STORAGE_KEY = "solvia_invoices_data";

const DEFAULT_INVOICES: InvoiceItem[] = [
  {
    id: "1",
    no: "INV/2026/07/005",
    client: "Hydrone IoT (Dzikron Zaidan Ahmad dan Tim)",
    project: "Pengembangan Prototype Autonomous Underwater Vehicle (AUV) Pembersih Mikroplastik dan Monitoring Kualitas Air",
    date: "30/07/2026",
    total: "Rp 24.202.500",
    status: "Draft",
  },
  {
    id: "2",
    no: "INV/2026/07/004",
    client: "Filtrazon IoT",
    project: "Filtrazon IoT Monitoring Parameter Sensor",
    date: "22/07/2026",
    total: "Rp 18.633.000",
    status: "Lunas",
  },
  {
    id: "3",
    no: "INV/2026/07/003",
    client: "Precentense + Integration IoT",
    project: "Precentense + Integration IoT",
    date: "15/07/2026",
    total: "Rp 2.500.000",
    status: "Lunas",
  },
  {
    id: "4",
    no: "INV/2026/07/002",
    client: "PRESENCE-TEEN",
    project: "PRESENCE-TEEN Sistem Presensi Pintar Berbasis QR Code, Reminder Tugas dan AI Ringkasan Materi",
    date: "06/07/2026",
    total: "Rp 2.300.000",
    status: "Draft",
  },
  {
    id: "5",
    no: "INV/2026/07/001",
    client: "Persensi Automation",
    project: "Sistem Otomasi Data Presensi",
    date: "06/07/2026",
    total: "Rp 3.000.000",
    status: "Pending",
  },
];

export default function InvoiceAdminPage() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<InvoiceItem | null>(null);
  const [editingItem, setEditingItem] = useState<InvoiceItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Form states for quick add/edit
  const [no, setNo] = useState("");
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [date, setDate] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("Draft");

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setInvoices(JSON.parse(saved));
      } else {
        setInvoices(DEFAULT_INVOICES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INVOICES));
      }
    } catch {
      setInvoices(DEFAULT_INVOICES);
    }
  }, []);

  const saveToStorage = (updatedInvoices: InvoiceItem[]) => {
    setInvoices(updatedInvoices);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInvoices));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenQuickAdd = () => {
    setEditingItem(null);
    setNo(`INV/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${String(invoices.length + 1).padStart(3, "0")}`);
    setClient("");
    setProject("");
    setDate(new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }));
    setTotal("Rp 0");
    setStatus("Draft");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (inv: InvoiceItem) => {
    setEditingItem(inv);
    setNo(inv.no);
    setClient(inv.client);
    setProject(inv.project);
    setDate(inv.date);
    setTotal(inv.total);
    setStatus(inv.status);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!no.trim() || !client.trim() || !project.trim()) return;

    if (editingItem) {
      const updated = invoices.map((inv) =>
        inv.id === editingItem.id
          ? {
              ...inv,
              no: no.trim(),
              client: client.trim(),
              project: project.trim(),
              date: date.trim(),
              total: total.trim(),
              status,
            }
          : inv
      );
      saveToStorage(updated);
      showToast("Invoice berhasil diperbarui!");
    } else {
      const newInv: InvoiceItem = {
        id: "inv-" + Date.now().toString(),
        no: no.trim(),
        client: client.trim(),
        project: project.trim(),
        date: date.trim() || new Date().toLocaleDateString("id-ID"),
        total: total.trim() || "Rp 0",
        status,
      };
      saveToStorage([newInv, ...invoices]);
      showToast("Invoice baru berhasil ditambahkan!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, invoiceNo: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus invoice ${invoiceNo}?`)) {
      const updated = invoices.filter((i) => i.id !== id);
      saveToStorage(updated);
      showToast("Invoice berhasil dihapus!");
    }
  };

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.no.toLowerCase().includes(search.toLowerCase()) ||
      inv.client.toLowerCase().includes(search.toLowerCase()) ||
      inv.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Page Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Invoice Management</h1>
          <p className="text-slate-400 text-xs mt-0.5">Kelola data tagihan klien, status pembayaran, dan invoice resmi</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari invoice atau klien..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 w-48 sm:w-60"
            />
          </div>
          <button
            onClick={handleOpenQuickAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-blue-400" />
            <span>Tambah Cepat</span>
          </button>
          <Link
            href="/sso/invoice/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Format Resmi</span>
          </Link>
        </div>
      </div>

      {/* Invoice Table Container */}
      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#070A12]/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5">NO. INVOICE</th>
                <th className="py-4 px-5">KLIEN</th>
                <th className="py-4 px-5">PROJECT</th>
                <th className="py-4 px-5">TANGGAL</th>
                <th className="py-4 px-5">TOTAL</th>
                <th className="py-4 px-5">STATUS</th>
                <th className="py-4 px-5 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                    Tidak ada data invoice yang sesuai pencarian.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-5 font-mono text-cyan-400 font-bold whitespace-nowrap">
                      {inv.no}
                    </td>
                    <td className="py-4 px-5 font-semibold text-slate-200 max-w-[200px] truncate">
                      {inv.client}
                    </td>
                    <td className="py-4 px-5 text-slate-400 max-w-[260px] truncate">{inv.project}</td>
                    <td className="py-4 px-5 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                      {inv.date}
                    </td>
                    <td className="py-4 px-5 font-bold text-white whitespace-nowrap">{inv.total}</td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          inv.status === "Lunas"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : inv.status === "Pending"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                        }`}
                      >
                        • {inv.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 text-slate-400">
                        <button
                          onClick={() => setPreviewInvoice(inv)}
                          className="p-1.5 rounded-lg hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                          title="Lihat & Cetak Invoice"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(inv)}
                          className="p-1.5 rounded-lg hover:text-blue-400 hover:bg-slate-700 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(inv.id, inv.no)}
                          className="p-1.5 rounded-lg hover:text-red-400 hover:bg-slate-700 transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* QUICK ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-500" />
                <span>{editingItem ? "Edit Data Invoice" : "Tambah Data Invoice Cepat"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nomor Invoice <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={no}
                  onChange={(e) => setNo(e.target.value)}
                  placeholder="INV/2026/10/001"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nama Klien / Perusahaan <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="PT Nama Klien Indonesia"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Deskripsi Proyek <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="Pengembangan Website ERP & IoT"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tanggal</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="29/10/2026"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Total Nominal</label>
                  <input
                    type="text"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    placeholder="Rp 15.000.000"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Status Pembayaran</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                  <option value="Lunas">Lunas</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  {editingItem ? "Simpan Perubahan" : "Simpan Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK PREVIEW & PRINT INVOICE MODAL */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
          <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden my-8 print:border-none print:shadow-none print:m-0 print:w-full">
            {/* Modal Controls Bar (Hidden on Print) */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">
                  Pratinjau Tagihan: <span className="font-mono text-blue-700">{previewInvoice.no}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewInvoice(null)}
                  className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Invoice A4 Sheet Layout */}
            <div className="p-8 sm:p-10 space-y-6 font-sans text-xs">
              {/* Header Kop */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-900 text-white font-black flex items-center justify-center text-sm">
                      S
                    </div>
                    <span className="text-xl font-black text-blue-950 tracking-tight">SOLVIA.NOVA</span>
                  </div>
                  <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">
                    Digital Solution & Software House
                  </div>
                  <div className="text-slate-500 text-[11px]">Jl. Gumukrejo RT 05 RW 05, Nanggulan Salatiga • 083148801578</div>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <div className="text-2xl font-black text-blue-950">INVOICE</div>
                  <div className="font-mono font-bold text-slate-700">{previewInvoice.no}</div>
                  <div className="text-slate-500">Tanggal: {previewInvoice.date}</div>
                </div>
              </div>

              {/* Klien & Project Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">DITUJUKAN KEPADA:</span>
                  <div className="font-bold text-slate-900 text-sm">{previewInvoice.client}</div>
                  <div className="text-slate-600">Proyek: <strong className="text-slate-800">{previewInvoice.project}</strong></div>
                </div>
                <div className="space-y-1 sm:text-right">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">STATUS TAGIHAN:</span>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-900 border border-blue-200">
                    {previewInvoice.status}
                  </span>
                </div>
              </div>

              {/* Rincian Ringkas Tagihan */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 text-[11px] font-bold uppercase">
                    <tr>
                      <th className="py-3 px-4">Deskripsi Layanan / Proyek</th>
                      <th className="py-3 px-4 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{previewInvoice.project}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">Pengembangan sistem digital, implementasi & pengujian terpadu</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 font-mono text-sm">
                        {previewInvoice.total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pembayaran & Tanda Tangan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">INFORMASI PEMBAYARAN:</span>
                  <div className="font-bold text-slate-900">Bank Mandiri</div>
                  <div className="font-mono font-black text-blue-900 text-sm">1360034942356</div>
                  <div className="text-slate-600 text-[11px]">a.n. Nanda Ari Wahyu Widagdo</div>
                </div>

                <div className="text-center sm:text-right space-y-2 flex flex-col justify-end">
                  <div className="text-slate-600">Hormat Kami,</div>
                  <div className="font-serif italic text-xl text-blue-900 font-bold">Nanda A. W.</div>
                  <div className="font-bold text-slate-900">Solvia Nova Official</div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Direktur Utama / CEO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
