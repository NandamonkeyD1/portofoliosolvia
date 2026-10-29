"use client";

import { useState, useEffect } from "react";
import { Plus, Eye, Edit, Trash2, Search, Check, X, FileSpreadsheet, ArrowUpRight, Printer, Sparkles } from "lucide-react";
import Link from "next/link";
import OfficialInvoiceDocument, { LineItem, DEFAULT_FILTRAZON_ITEMS } from "@/components/OfficialInvoiceDocument";

export interface InvoiceItem {
  id: string;
  no: string;
  client: string;
  project: string;
  date: string;
  total: string;
  status: string;
  clientAddress?: string;
  clientEmail?: string;
  clientPhone?: string;
  servicePackage?: string;
  projectDuration?: string;
  items?: LineItem[];
}

const STORAGE_KEY = "solvia_invoices_data";

const DEFAULT_INVOICES: InvoiceItem[] = [
  {
    id: "filtrazon",
    no: "NO. INV/2026/10/003",
    client: "FILTRAZON IoT 2.0",
    project: "FILTRAZON IoT 2.0",
    date: "28 October 2026",
    total: "Rp 6.201.723",
    status: "Lunas",
    clientAddress: "Dusun Brambang Rt 01/02, Kelurahan Blimbing, Kec. Gatak, Kab.Sukoharjo",
    clientEmail: "helixxjust@gmail.com",
    clientPhone: "+62 812-2661-5585",
    servicePackage: "IoT System Integration, Web DashboardDevelopment",
    projectDuration: "1 Juli - 30 Agustus",
    items: DEFAULT_FILTRAZON_ITEMS,
  },
  {
    id: "1",
    no: "INV/2026/07/005",
    client: "Hydrone IoT (Dzikron Zaidan Ahmad dan Tim)",
    project: "Pengembangan Prototype Autonomous Underwater Vehicle (AUV) Pembersih Mikroplastik dan Monitoring Kualitas Air",
    date: "30/07/2026",
    total: "Rp 24.202.500",
    status: "Draft",
    clientAddress: "Surabaya, Jawa Timur",
    clientEmail: "hydrone@gmail.com",
    clientPhone: "+62 812-3456-7890",
    servicePackage: "Hardware & AI Integration",
    projectDuration: "1 Bulan",
    items: [
      { id: "1", description: "Pengembangan Prototype Autonomous Underwater Vehicle (AUV) Pembersih Mikroplastik dan Monitoring Kualitas Air", qty: 1, price: 24202500 }
    ],
  },
  {
    id: "2",
    no: "INV/2026/07/004",
    client: "Filtrazon IoT",
    project: "Filtrazon IoT Monitoring Parameter Sensor",
    date: "22/07/2026",
    total: "Rp 18.633.000",
    status: "Lunas",
    clientAddress: "Sukoharjo, Jawa Tengah",
    clientEmail: "info@filtrazon.com",
    clientPhone: "+62 812-2661-5585",
    servicePackage: "IoT Monitoring System",
    projectDuration: "1 Bulan",
    items: [
      { id: "1", description: "Filtrazon IoT Monitoring Parameter Sensor & Dashboard", qty: 1, price: 18633000 }
    ],
  },
  {
    id: "3",
    no: "INV/2026/07/003",
    client: "Precentense + Integration IoT",
    project: "Precentense + Integration IoT",
    date: "15/07/2026",
    total: "Rp 2.500.000",
    status: "Lunas",
    items: [
      { id: "1", description: "Precentense + Integration IoT Setup", qty: 1, price: 2500000 }
    ],
  },
  {
    id: "4",
    no: "INV/2026/07/002",
    client: "PRESENCE-TEEN",
    project: "PRESENCE-TEEN Sistem Presensi Pintar Berbasis QR Code, Reminder Tugas dan AI Ringkasan Materi",
    date: "06/07/2026",
    total: "Rp 2.300.000",
    status: "Draft",
    items: [
      { id: "1", description: "PRESENCE-TEEN Presensi Pintar Berbasis QR Code", qty: 1, price: 2300000 }
    ],
  },
  {
    id: "5",
    no: "INV/2026/07/001",
    client: "Persensi Automation",
    project: "Sistem Otomasi Data Presensi",
    date: "06/07/2026",
    total: "Rp 3.000.000",
    status: "Pending",
    items: [
      { id: "1", description: "Sistem Otomasi Data Presensi & Notifikasi", qty: 1, price: 3000000 }
    ],
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
        const parsed: InvoiceItem[] = JSON.parse(saved);
        const hasFiltrazon = parsed.some(
          (inv) => inv.no === "NO. INV/2026/10/003" || inv.client.includes("FILTRAZON IoT 2.0")
        );
        if (!hasFiltrazon) {
          const merged = [DEFAULT_INVOICES[0], ...parsed];
          setInvoices(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } else {
          setInvoices(parsed);
        }
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
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold transition-opacity">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Admin Invoice Controls & Table (Hidden on Print) */}
      <div className="print:hidden space-y-6">
        {/* Page Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Invoice Management</h1>
          <p className="text-slate-400 text-xs mt-0.5">Kelola data tagihan klien, status pembayaran, dan invoice resmi</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Link
            href="/sso/invoice/create"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md shadow-blue-600/30 cursor-pointer order-1 sm:order-none flex-1 sm:flex-initial"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Format Resmi</span>
          </Link>
          <button
            onClick={handleOpenQuickAdd}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700 cursor-pointer shrink-0 order-2 sm:order-none"
          >
            <Plus className="w-4 h-4 text-blue-400" />
            <span>Tambah Cepat</span>
          </button>
          <div className="relative w-full sm:w-56 order-3 sm:order-none">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari invoice atau klien..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Invoice Display: Mobile Cards + Desktop Table */}
      {/* 1. Mobile Cards View (Visible on Mobile only) */}
      <div className="block md:hidden space-y-3">
        {filteredInvoices.length === 0 ? (
          <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-xs">
            Tidak ada data invoice yang sesuai pencarian.
          </div>
        ) : (
          filteredInvoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-[#0E1526] border border-slate-800 rounded-2xl p-4 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                <span className="font-mono text-cyan-400 font-bold text-xs">
                  {inv.no}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    inv.status === "Lunas"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : inv.status === "Pending"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                  }`}
                >
                  • {inv.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-sm">{inv.client}</h3>
                <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">{inv.project}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                <span className="text-slate-500 font-mono text-[11px]">{inv.date}</span>
                <span className="font-mono font-bold text-white text-sm">{inv.total}</span>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 gap-2">
                <button
                  onClick={() => setPreviewInvoice(inv)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600/15 hover:bg-blue-600 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Lihat & Cetak</span>
                </button>
                <button
                  onClick={() => handleOpenEdit(inv)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5 text-blue-400" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(inv.id, inv.no)}
                  className="p-2 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 2. Desktop Invoice Table (Visible on Desktop only) */}
      <div className="hidden md:block bg-[#0E1526] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[650px]">
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
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 space-y-5 shadow-2xl max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
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
      </div>

      {/* QUICK PREVIEW & PRINT INVOICE MODAL */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 bg-black/85 overflow-y-auto p-2 sm:p-6 md:p-8 flex justify-center items-start print:p-0 print:bg-white print:static print:overflow-visible">
          <div className="w-full max-w-4xl space-y-4 my-2 sm:my-4 print:my-0">
            {/* Modal Controls Bar (Hidden on Print, Sticky at top) */}
            <div className="sticky top-2 z-30 flex items-center justify-between px-5 sm:px-6 py-3 rounded-2xl bg-[#0A0E1A] border border-slate-700/80 text-white print:hidden shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-slate-200">
                  Pratinjau Resmi Tagihan: <span className="font-mono text-cyan-400">{previewInvoice.no}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewInvoice(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Render Official Document (Matches PDF Page 1 & 2) */}
            <OfficialInvoiceDocument
                invoiceNo={previewInvoice.no}
                invoiceDate={previewInvoice.date}
                clientName={previewInvoice.client}
                clientAddress={previewInvoice.clientAddress || "Dusun Brambang Rt 01/02, Kelurahan Blimbing, Kec. Gatak, Kab.Sukoharjo"}
                clientEmail={previewInvoice.clientEmail || "info@solvianova.my.id"}
                clientPhone={previewInvoice.clientPhone || "+62 812-2661-5585"}
                projectName={previewInvoice.project}
                servicePackage={previewInvoice.servicePackage || "IoT System Integration, Web Dashboard Development"}
                projectDuration={previewInvoice.projectDuration || "1 Juli - 30 Agustus"}
                items={previewInvoice.items && previewInvoice.items.length > 0 ? previewInvoice.items : [
                  {
                    id: "1",
                    description: previewInvoice.project,
                    qty: 1,
                    price: parseInt(previewInvoice.total.replace(/[^0-9]/g, ""), 10) || 0
                  }
                ]}
              />
          </div>
        </div>
      )}
    </div>
  );
}
