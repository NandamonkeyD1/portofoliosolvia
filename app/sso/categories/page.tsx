"use client";

import { useState, useEffect } from "react";
import { Plus, Tag, Edit, Trash2, X, Check, Search, Layers, FolderKanban, ExternalLink } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  count: number;
  desc?: string;
}

const STORAGE_KEY = "solvia_categories_data";

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: "1", name: "Website Development", slug: "website-development", count: 4, desc: "Pembuatan website company profile, landing page, dan portal web responsif" },
  { id: "2", name: "System Development & ERP", slug: "system-development", count: 3, desc: "Sistem informasi manajemen, ERP custom, dan POS kasir" },
  { id: "3", name: "Sistem IoT & Smart Automation", slug: "iot-automation", count: 3, desc: "Integrasi hardware mikrokontroler, telemetri sensor, dan LoRa" },
  { id: "4", name: "Branding & Creative", slug: "branding-creative", count: 2, desc: "Desain visual identity, logo, 3D render, dan advertising kit" },
  { id: "5", name: "Automation & AI Workflow", slug: "automation-ai", count: 2, desc: "Automasi alur kerja, chatbot WhatsApp, dan AI summarizer" },
  { id: "6", name: "Mentoring & IT Coaching", slug: "mentoring-it", count: 2, desc: "Bimbingan teknis pemrograman, skripsi IT, dan konsultasi arsitektur" },
];

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Form inputs
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [count, setCount] = useState<number>(0);
  const [desc, setDesc] = useState("");

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCategories(JSON.parse(saved));
      } else {
        setCategories(DEFAULT_CATEGORIES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORIES));
      }
    } catch {
      setCategories(DEFAULT_CATEGORIES);
    }
  }, []);

  const saveToStorage = (items: CategoryItem[]) => {
    setCategories(items);
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
    setSlug("");
    setCount(0);
    setDesc("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: CategoryItem) => {
    setEditingItem(item);
    setName(item.name);
    setSlug(item.slug);
    setCount(item.count || 0);
    setDesc(item.desc || "");
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingItem) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalSlug = slug.trim()
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

    if (editingItem) {
      const updated = categories.map((cat) =>
        cat.id === editingItem.id
          ? { ...cat, name: name.trim(), slug: finalSlug, count: Number(count) || 0, desc: desc.trim() }
          : cat
      );
      saveToStorage(updated);
      showToast("Kategori berhasil diperbarui!");
    } else {
      const newItem: CategoryItem = {
        id: "cat-" + Date.now().toString(),
        name: name.trim(),
        slug: finalSlug,
        count: Number(count) || 0,
        desc: desc.trim(),
      };
      saveToStorage([newItem, ...categories]);
      showToast("Kategori baru berhasil ditambahkan!");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, catName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kategori "${catName}"?`)) {
      const updated = categories.filter((c) => c.id !== id);
      saveToStorage(updated);
      showToast("Kategori berhasil dihapus!");
    }
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.slug.toLowerCase().includes(search.toLowerCase()) ||
      (cat.desc && cat.desc.toLowerCase().includes(search.toLowerCase()))
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Kategori Management</h1>
          <p className="text-slate-400 text-xs mt-1">
            Kelola pengelompokan kategori layanan, portofolio, dan artikel Solvia Nova
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/services"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 shrink-0 cursor-pointer"
            title="Lihat Layanan & Kategori di Web Publik"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span>Lihat di Web</span>
          </a>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 w-48 sm:w-64"
            />
          </div>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kategori</span>
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#070A12]/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5">NAMA KATEGORI</th>
                <th className="py-4 px-5">SLUG URL</th>
                <th className="py-4 px-5">DESKRIPSI</th>
                <th className="py-4 px-5">TOTAL ITEM</th>
                <th className="py-4 px-5 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">
                    Tidak ada kategori yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                          <Tag className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-white">{cat.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-400 font-mono text-[11px]">{cat.slug}</td>
                    <td className="py-4 px-5 text-slate-400 max-w-xs truncate">
                      {cat.desc || "-"}
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-[11px]">
                        {cat.count} items
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2 text-slate-400">
                        <button
                          onClick={() => handleOpenEditModal(cat)}
                          title="Edit Kategori"
                          className="p-2 rounded-lg hover:text-blue-400 hover:bg-slate-800 text-slate-400 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          title="Hapus Kategori"
                          className="p-2 rounded-lg hover:text-red-400 hover:bg-slate-800 text-slate-400 transition-colors"
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0E1526] border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-500" />
                <span>{editingItem ? "Edit Kategori" : "Tambah Kategori Baru"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Nama Kategori <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Mobile Apps Development"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Slug URL <span className="text-slate-500 font-normal">(Otomatis atau kustom)</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="mobile-apps-development"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Jumlah Item Terkait (Opsional)
                </label>
                <input
                  type="number"
                  min="0"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Deskripsi Kategori
                </label>
                <textarea
                  rows={3}
                  placeholder="Penjelasan singkat mengenai kategori ini..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
                >
                  {editingItem ? "Simpan Perubahan" : "Tambah Kategori"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
