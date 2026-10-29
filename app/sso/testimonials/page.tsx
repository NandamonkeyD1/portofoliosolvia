"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Star, X, Check, Search, Quote, ExternalLink } from "lucide-react";
import { testimonialsData, Testimonial } from "@/lib/data";

const STORAGE_KEY = "solvia_testimonials_data";

export default function TestimonialsAdminPage() {
  const [list, setList] = useState<Testimonial[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setList(JSON.parse(saved));
      } else {
        setList(testimonialsData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonialsData));
      }
    } catch {
      setList(testimonialsData);
    }
  }, []);

  const saveToStorage = (updatedList: Testimonial[]) => {
    setList(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  // Form state
  const [clientName, setClientName] = useState("");
  const [company, setCompany] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setClientName("");
    setCompany("");
    setTestimonial("");
    setRating(5);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setClientName(item.clientName);
    setCompany(item.company);
    setTestimonial(item.testimonial);
    setRating(item.rating || 5);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !testimonial) return;

    if (editingItem) {
      const updated = list.map((t) =>
        t.id === editingItem.id
          ? { ...t, clientName, company: company || "Klien Solvia Nova", testimonial, rating }
          : t
      );
      saveToStorage(updated);
      showToast("Testimoni & rating berhasil diperbarui!");
    } else {
      const newItem: Testimonial = {
        id: "testi-" + Date.now().toString(),
        clientName,
        company: company || "Klien Solvia Nova",
        testimonial,
        rating,
      };
      saveToStorage([newItem, ...list]);
      showToast("Testimoni & rating baru berhasil ditambahkan!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) {
      const updated = list.filter((t) => t.id !== id);
      saveToStorage(updated);
      showToast("Testimoni berhasil dihapus!");
    }
  };

  const filteredList = list.filter(
    (t) =>
      t.clientName.toLowerCase().includes(search.toLowerCase()) ||
      t.company.toLowerCase().includes(search.toLowerCase()) ||
      t.testimonial.toLowerCase().includes(search.toLowerCase())
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Client Testimonials & Rating</h1>
          <p className="text-slate-400 text-xs mt-1">Kelola ulasan, testimoni klien, dan bintang rating (1 - 5 Bintang)</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md shadow-blue-600/30 cursor-pointer order-1 sm:order-none flex-1 sm:flex-initial"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Testimoni</span>
          </button>
          <a
            href="/about"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700 cursor-pointer shrink-0 order-2 sm:order-none"
            title="Lihat Testimoni di Web Publik"
          >
            <ExternalLink className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Lihat di Web</span>
          </a>
          <div className="relative w-full sm:w-56 order-3 sm:order-none">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari ulasan / klien..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Testimonial Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredList.map((t) => (
          <div
            key={t.id}
            className="bg-[#0E1526] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg flex flex-col justify-between group hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3">
              {/* Star Rating Display */}
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= t.rating
                          ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                          : "text-slate-700 fill-slate-800"
                      }`}
                    />
                  ))}
                  <span className="ml-1.5 text-xs font-extrabold text-amber-300 font-mono">
                    {t.rating}.0
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(t)}
                    className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors cursor-pointer"
                    title="Edit Testimoni"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white transition-colors cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="relative pl-3 border-l-2 border-blue-500/40">
                <p className="text-slate-300 text-xs leading-relaxed italic">
                  "{t.testimonial}"
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-white font-bold text-xs">{t.clientName}</div>
                <div className="text-blue-400 text-[11px] font-medium">{t.company}</div>
              </div>
              <Quote className="w-5 h-5 text-slate-700" />
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL WITH INTERACTIVE RATING SELECTOR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 space-y-5 shadow-2xl max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white">
                {editingItem ? "Edit Testimoni & Rating" : "Tambah Testimoni Klien Baru"}
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
                <label className="block text-xs font-bold text-slate-300 mb-1">Nama Klien / Pengulas</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Perusahaan / Jabatan</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Contoh: CEO, PT Maju Bersama"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Interactive Star Rating Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Rating Bintang (Pilih 1 - 5 Bintang)</label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl p-3">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = star <= (hoverRating || rating);
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform hover:scale-125 focus:outline-none"
                          title={`Beri rating ${star} bintang`}
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              active
                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                                : "text-slate-600 fill-slate-800 hover:text-amber-300"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="ml-auto text-xs font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                    {rating} / 5 Bintang
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Isi Testimoni & Ulasan</label>
                <textarea
                  rows={3}
                  required
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="Tulis ulasan jujur atau apresiasi dari klien..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
                >
                  Simpan Testimoni & Rating
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
