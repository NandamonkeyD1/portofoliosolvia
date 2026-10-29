"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Check, Search, Inbox, Layers, Sparkles, ExternalLink } from "lucide-react";
import { servicesData } from "@/lib/data";

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  shortDesc?: string;
  features?: string[];
  status: string;
}

const STORAGE_KEY = "solvia_services_data";

export default function ServicesAdminPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [status, setStatus] = useState("Active");

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setServices(JSON.parse(saved));
      } else {
        const initial = servicesData.map((s) => ({
          id: s.id,
          name: s.name,
          category: s.category,
          shortDesc: s.shortDesc,
          features: s.features || [],
          status: "Active",
        }));
        setServices(initial);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      }
    } catch {
      const initial = servicesData.map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        shortDesc: s.shortDesc,
        features: s.features || [],
        status: "Active",
      }));
      setServices(initial);
    }
  }, []);

  const saveToStorage = (items: ServiceItem[]) => {
    setServices(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setName("");
    setCategory("");
    setShortDesc("");
    setFeaturesInput("");
    setStatus("Active");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (svc: ServiceItem) => {
    setEditingItem(svc);
    setName(svc.name);
    setCategory(svc.category);
    setShortDesc(svc.shortDesc || "");
    setFeaturesInput(svc.features ? svc.features.join(", ") : "");
    setStatus(svc.status || "Active");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !category.trim()) return;

    const featuresArray = featuresInput
      ? featuresInput.split(",").map((f) => f.trim()).filter(Boolean)
      : [];

    if (editingItem) {
      const updated = services.map((s) =>
        s.id === editingItem.id
          ? {
              ...s,
              name: name.trim(),
              category: category.trim(),
              shortDesc: shortDesc.trim(),
              features: featuresArray,
              status,
            }
          : s
      );
      saveToStorage(updated);
      showToast("Layanan berhasil diperbarui!");
    } else {
      const newSvc: ServiceItem = {
        id: "svc-" + Date.now().toString(),
        name: name.trim(),
        category: category.trim(),
        shortDesc: shortDesc.trim(),
        features: featuresArray,
        status,
      };
      saveToStorage([newSvc, ...services]);
      showToast("Layanan baru berhasil ditambahkan!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, svcName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus layanan "${svcName}"?`)) {
      const updated = services.filter((s) => s.id !== id);
      saveToStorage(updated);
      showToast("Layanan berhasil dihapus!");
    }
  };

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      (s.shortDesc && s.shortDesc.toLowerCase().includes(search.toLowerCase()))
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Services Management</h1>
          <p className="text-slate-400 text-xs mt-1">Kelola portofolio paket layanan digital Solvia Nova</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md shadow-blue-600/30 cursor-pointer order-1 sm:order-none flex-1 sm:flex-initial"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Service</span>
          </button>
          <a
            href="/services"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700 cursor-pointer shrink-0 order-2 sm:order-none"
            title="Buka Halaman Layanan Publik"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Lihat di Web</span>
          </a>
          <div className="relative w-full sm:w-56 order-3 sm:order-none">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-[#0E1526] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">NAMA LAYANAN</th>
                <th className="py-4 px-6">KATEGORI</th>
                <th className="py-4 px-6">FITUR UTAMA</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredServices.length > 0 ? (
                filteredServices.map((svc) => (
                  <tr key={svc.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{svc.name}</div>
                          {svc.shortDesc && (
                            <div className="text-slate-400 text-[11px] max-w-sm truncate mt-0.5">
                              {svc.shortDesc}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-medium">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-[11px]">
                        {svc.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {svc.features && svc.features.length > 0 ? (
                          svc.features.slice(0, 3).map((f, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-medium"
                            >
                              {f}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                        {svc.features && svc.features.length > 3 && (
                          <span className="text-slate-500 text-[10px]">
                            +{svc.features.length - 3} lainnya
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                          svc.status === "Active"
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            : "bg-slate-800 border border-slate-700 text-slate-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            svc.status === "Active" ? "bg-emerald-400" : "bg-slate-500"
                          }`}
                        ></span>
                        {svc.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href="/services"
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Lihat Layanan di Website Publik"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenEditModal(svc)}
                          className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(svc.id, svc.name)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Inbox className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                    <p className="font-bold">Belum ada service yang sesuai pencarian.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 space-y-5 shadow-2xl max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-500" />
                <span>{editingItem ? "Edit Layanan" : "Tambah Layanan Baru"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nama Layanan <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Website Development Custom"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Kategori <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Contoh: Development / Enterprise / IoT"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Ringkasan value dan solusi layanan..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Fitur-Fitur Utama <span className="text-slate-500 font-normal">(Pisahkan dengan koma)</span>
                </label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Company Profile, E-Commerce, Portal CMS"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Status Layanan</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  {editingItem ? "Simpan Perubahan" : "Tambah Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
