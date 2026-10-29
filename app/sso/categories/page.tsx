"use client";

import { useState, useEffect } from "react";
import { Plus, Tag, Edit, Trash2, X, Check, Search, ExternalLink } from "lucide-react";

export interface CategoryItem {
  id: string;
  name: string;
  group: "portfolio" | "services" | "articles";
  order: number;
}

const STORAGE_KEY = "solvia_categories_data";

const DEFAULT_CATEGORIES: CategoryItem[] = [
  // Portfolio
  { id: "p-1", name: "Website", group: "portfolio", order: 1 },
  { id: "p-2", name: "Dashboard", group: "portfolio", order: 2 },
  { id: "p-3", name: "Mobile", group: "portfolio", order: 3 },
  { id: "p-4", name: "Automation", group: "portfolio", order: 5 },
  { id: "p-5", name: "Branding", group: "portfolio", order: 6 },
  { id: "p-6", name: "Enterprise", group: "portfolio", order: 7 },
  { id: "p-7", name: "Internet Of Things", group: "portfolio", order: 7 },
  { id: "p-8", name: "Landing Page", group: "portfolio", order: 8 },

  // Services
  { id: "s-1", name: "Website Development", group: "services", order: 1 },
  { id: "s-2", name: "System Development", group: "services", order: 2 },
  { id: "s-3", name: "Branding & Creative", group: "services", order: 3 },
  { id: "s-4", name: "Automation & AI", group: "services", order: 4 },

  // Articles
  { id: "a-1", name: "Insight", group: "articles", order: 1 },
  { id: "a-2", name: "Tutorial", group: "articles", order: 2 },
  { id: "a-3", name: "News", group: "articles", order: 3 },
];

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Form inputs
  const [name, setName] = useState("");
  const [group, setGroup] = useState<"portfolio" | "services" | "articles">("portfolio");
  const [order, setOrder] = useState<number>(1);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].group) {
          setCategories(parsed);
        } else {
          setCategories(DEFAULT_CATEGORIES);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORIES));
        }
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

  const handleOpenAddModal = (targetGroup: "portfolio" | "services" | "articles" = "portfolio") => {
    setEditingItem(null);
    setName("");
    setGroup(targetGroup);
    // Auto increment order for that group
    const groupItems = categories.filter((c) => c.group === targetGroup);
    setOrder(groupItems.length + 1);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: CategoryItem) => {
    setEditingItem(item);
    setName(item.name);
    setGroup(item.group);
    setOrder(item.order);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingItem) {
      const updated = categories.map((cat) =>
        cat.id === editingItem.id
          ? {
              ...cat,
              name: name.trim(),
              group,
              order: Number(order) || 1,
            }
          : cat
      );
      saveToStorage(updated);
      showToast("Kategori berhasil diperbarui!");
    } else {
      const newCat: CategoryItem = {
        id: "cat-" + Date.now().toString(),
        name: name.trim(),
        group,
        order: Number(order) || 1,
      };
      saveToStorage([...categories, newCat]);
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

  const filterBySearch = (items: CategoryItem[]) => {
    if (!search.trim()) return items;
    return items.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  };

  const portfolioCategories = filterBySearch(
    categories.filter((c) => c.group === "portfolio").sort((a, b) => a.order - b.order)
  );
  const servicesCategories = filterBySearch(
    categories.filter((c) => c.group === "services").sort((a, b) => a.order - b.order)
  );
  const articlesCategories = filterBySearch(
    categories.filter((c) => c.group === "articles").sort((a, b) => a.order - b.order)
  );

  const columns = [
    {
      group: "portfolio" as const,
      title: "Portfolio",
      dotColor: "bg-blue-500",
      badgeColor: "bg-blue-600/30 text-blue-300",
      items: portfolioCategories,
      totalCount: categories.filter((c) => c.group === "portfolio").length,
    },
    {
      group: "services" as const,
      title: "Services",
      dotColor: "bg-indigo-400",
      badgeColor: "bg-indigo-600/30 text-indigo-300",
      items: servicesCategories,
      totalCount: categories.filter((c) => c.group === "services").length,
    },
    {
      group: "articles" as const,
      title: "Articles",
      dotColor: "bg-emerald-400",
      badgeColor: "bg-emerald-600/30 text-emerald-300",
      items: articlesCategories,
      totalCount: categories.filter((c) => c.group === "articles").length,
    },
  ];

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
          <h1 className="text-xl sm:text-2xl font-black text-white">Kategori</h1>
          <p className="text-slate-400 text-xs mt-1">
            Pengelompokan kategori portofolio, layanan digital, dan artikel wawasan
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => handleOpenAddModal("portfolio")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md shadow-blue-600/30 cursor-pointer order-1 sm:order-none flex-1 sm:flex-initial"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kategori</span>
          </button>
          <a
            href="/services"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700 cursor-pointer shrink-0 order-2 sm:order-none"
            title="Lihat Layanan & Kategori di Web Publik"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Lihat di Web</span>
          </a>
          <div className="relative w-full sm:w-56 order-3 sm:order-none">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 3-COLUMN CATEGORY BOARDS MATCHING EXACT SCREENSHOT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {columns.map((col) => (
          <div
            key={col.group}
            className="bg-[#0B1222] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4"
          >
            {/* Board Column Header */}
            <div className="flex items-center justify-between border-b border-slate-800/70 pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                <h3 className="font-bold text-white text-sm tracking-wide">{col.title}</h3>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${col.badgeColor}`}
                >
                  {col.totalCount}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleOpenAddModal(col.group)}
                className="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title={`Tambah Kategori ${col.title}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* List Items */}
            <div className="space-y-1.5 min-h-[220px]">
              {col.items.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  {search ? "Tidak ada hasil pencarian" : "Belum ada kategori"}
                </div>
              ) : (
                col.items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500 font-semibold group-hover:text-slate-400">
                        #{item.order}
                      </span>
                      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1 rounded-md text-slate-400 hover:text-blue-400 hover:bg-slate-700/60"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-1 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-700/60"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/80">
          <div className="bg-[#0E1526] border border-slate-700 w-full max-w-lg rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Website, Automation, IoT..."
                  className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Kelompok Board</label>
                  <select
                    value={group}
                    onChange={(e) => setGroup(e.target.value as any)}
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="portfolio">Portfolio</option>
                    <option value="services">Services</option>
                    <option value="articles">Articles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Urutan Nomor (#)</label>
                  <input
                    type="number"
                    min={1}
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-colors cursor-pointer"
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
