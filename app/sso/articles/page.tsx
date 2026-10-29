"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Check, Search, FileText, Image as ImageIcon, ExternalLink } from "lucide-react";
import { articlesData, Article } from "@/lib/data";
import ImageUploader from "@/components/ImageUploader";

interface ArticleItem {
  id: string;
  slug?: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  summary?: string;
  image?: string;
}

const STORAGE_KEY = "solvia_articles_data";

export default function ArticlesAdminPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ArticleItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [readTime, setReadTime] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setArticles(JSON.parse(saved));
      } else {
        const initial = articlesData.map((a) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          category: a.category,
          date: a.date,
          readTime: a.readTime,
          author: a.author,
          summary: a.summary,
          image: a.image,
        }));
        setArticles(initial);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      }
    } catch {
      setArticles(articlesData);
    }
  }, []);

  const saveToStorage = (updatedArticles: ArticleItem[]) => {
    setArticles(updatedArticles);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
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
    setTitle("");
    setCategory("");
    setAuthor("Tim Solvia Nova");
    setReadTime("5 menit baca");
    setSummary("");
    setImage("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: ArticleItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setAuthor(item.author);
    setReadTime(item.readTime || "5 menit baca");
    setSummary(item.summary || "");
    setImage(item.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim()) return;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const imgUrl = image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80";

    if (editingItem) {
      const updated = articles.map((a) =>
        a.id === editingItem.id
          ? {
              ...a,
              title: title.trim(),
              slug,
              category: category.trim(),
              author: author.trim() || "Tim Solvia Nova",
              readTime: readTime.trim() || "5 menit baca",
              summary: summary.trim(),
              image: imgUrl,
            }
          : a
      );
      saveToStorage(updated);
      showToast("Artikel berhasil diperbarui!");
    } else {
      const newArt: ArticleItem = {
        id: "art-" + Date.now().toString(),
        slug,
        title: title.trim(),
        category: category.trim(),
        date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
        readTime: readTime.trim() || "5 menit baca",
        author: author.trim() || "Tim Solvia Nova",
        summary: summary.trim(),
        image: imgUrl,
      };
      saveToStorage([newArt, ...articles]);
      showToast("Artikel baru berhasil diterbitkan!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, artTitle: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus artikel "${artTitle}"?`)) {
      const updated = articles.filter((a) => a.id !== id);
      saveToStorage(updated);
      showToast("Artikel berhasil dihapus!");
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-black text-white">Articles Management</h1>
          <p className="text-slate-400 text-xs mt-1">Kelola artikel wawasan teknologi, tutorial, dan riset Solvia Nova</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/articles"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 shrink-0 cursor-pointer"
            title="Lihat Artikel di Website Publik"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span>Lihat di Web</span>
          </a>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari artikel..."
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
            <span>Tambah Artikel</span>
          </button>
        </div>
      </div>

      {/* Articles List Cards */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <FileText className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="font-bold text-sm">Tidak ada artikel yang cocok.</p>
          </div>
        ) : (
          filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md shadow-xl hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                {art.image && (
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                      {art.category}
                    </span>
                    <span className="text-slate-500 text-[11px]">• {art.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-white hover:text-blue-400 transition-colors">
                    {art.title}
                  </h3>
                  {art.summary && (
                    <p className="text-slate-400 text-xs line-clamp-1 max-w-2xl">{art.summary}</p>
                  )}
                  <div className="text-slate-500 text-[11px] font-medium pt-1">
                    {art.date} • Ditulis oleh <span className="text-slate-300 font-semibold">{art.author}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 shrink-0 md:self-center">
                <a
                  href="/articles"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Lihat Artikel di Website Publik"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Lihat Web</span>
                </a>
                <button
                  onClick={() => handleOpenEditModal(art)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(art.id, art.title)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <span>{editingItem ? "Edit Artikel" : "Tulis Artikel Baru"}</span>
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
                  Judul Artikel <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Tren Arsitektur WebGL 3D 2026"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Kategori Topik <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Contoh: Web Development / AI"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Estimasi Baca</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="Contoh: 5 menit baca"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Penulis</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Tim Solvia Nova"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Ringkasan / Excerpt</label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Ringkasan isi artikel..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Gambar Banner Artikel
                </label>
                <ImageUploader
                  label="Upload Banner Artikel"
                  value={image}
                  onChange={setImage}
                  placeholder="Upload atau masukkan URL foto banner"
                />
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
                  {editingItem ? "Simpan Perubahan" : "Terbitkan Artikel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
