"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, Eye, X, Check, Search, MessageSquare, CheckCheck, ExternalLink, Send, Plus } from "lucide-react";

interface MessageItem {
  id: string;
  sender: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  unread: boolean;
}

const STORAGE_KEY = "solvia_messages_data";

const DEFAULT_MESSAGES: MessageItem[] = [
  {
    id: "1",
    sender: "PT Maju Bersama (Budi)",
    email: "info@majubersama.com",
    phone: "6281234567890",
    subject: "Pengembangan ERP Custom & POS Unit",
    message: "Halo Solvia Nova, kami bermaksud ingin membangun sistem ERP manufaktur custom untuk 200 karyawan kami dengan integrasi kontrol produksi.",
    date: "Hari Ini, 10:45",
    unread: true,
  },
  {
    id: "2",
    sender: "Budi Santoso",
    email: "budi@fashionstore.id",
    phone: "6285712345678",
    subject: "Tanya Paket E-Commerce & WhatsApp Notification",
    message: "Apakah tersedia paket e-commerce lengkap dengan integrasi WhatsApp notification & payment gateway terotomatisasi?",
    date: "Kemarin, 16:20",
    unread: true,
  },
  {
    id: "3",
    sender: "Rina Wijaya",
    email: "rina@brandlokal.com",
    phone: "6281398765432",
    subject: "Konsultasi Rebranding FMCG",
    message: "Kami ingin melakukan rebranding lengkap untuk lini produk makanan ringan lokal kami.",
    date: "29 Sep 2026",
    unread: false,
  },
  {
    id: "4",
    sender: "Dzikron Zaidan (Hydrone IoT)",
    email: "dzikron@hydrone.io",
    phone: "6283148801578",
    subject: "Konsultasi Prototype Autonomous Underwater Vehicle",
    message: "Tertarik layanan pembuatan sistem IoT monitoring telemetri real-time.",
    date: "24 Sep 2026",
    unread: false,
  },
  {
    id: "5",
    sender: "Filtrazon Team",
    email: "filtrazon@gmail.com",
    phone: "6281226615585",
    subject: "Penawaran Kerjasama Integration IoT",
    message: "Ingin mengajukan kerjasama integrasi sensor kualitas air & dashboard WebGL 3D.",
    date: "09 Aug 2026",
    unread: false,
  },
];

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "unread" | "read">("all");
  const [selectedMsg, setSelectedMsg] = useState<MessageItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form states for adding new message/lead
  const [sender, setSender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages(DEFAULT_MESSAGES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MESSAGES));
      }
    } catch {
      setMessages(DEFAULT_MESSAGES);
    }
  }, []);

  const saveToStorage = (updatedMessages: MessageItem[]) => {
    setMessages(updatedMessages);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAddModal = () => {
    setSender("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
    setIsAddModalOpen(true);
  };

  const handleSaveNewMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender.trim() || !subject.trim() || !message.trim()) return;

    const newMsg: MessageItem = {
      id: "msg-" + Date.now().toString(),
      sender: sender.trim(),
      email: email.trim() || "-",
      phone: phone.trim() ? phone.replace(/[^0-9]/g, "") : "6283148801578",
      subject: subject.trim(),
      message: message.trim(),
      date: "Hari Ini, " + new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      unread: true,
    };

    saveToStorage([newMsg, ...messages]);
    showToast("Leads / Pesan konsultasi baru berhasil dicatat!");
    setIsAddModalOpen(false);
  };

  const handleOpenMessage = (msg: MessageItem) => {
    setSelectedMsg(msg);
    if (msg.unread) {
      const updated = messages.map((m) => (m.id === msg.id ? { ...m, unread: false } : m));
      saveToStorage(updated);
    }
  };

  const handleMarkAllRead = () => {
    const updated = messages.map((m) => ({ ...m, unread: false }));
    saveToStorage(updated);
    showToast("Semua pesan & leads berhasil ditandai sudah dibaca!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
      const updated = messages.filter((m) => m.id !== id);
      saveToStorage(updated);
      if (selectedMsg?.id === id) setSelectedMsg(null);
      showToast("Pesan berhasil dihapus!");
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.sender.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());

    if (filterMode === "unread") return matchesSearch && m.unread;
    if (filterMode === "read") return matchesSearch && !m.unread;
    return matchesSearch;
  });

  const unreadCount = messages.filter((m) => m.unread).length;

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
          <h1 className="text-xl sm:text-2xl font-black text-white">Leads & Pesan Konsultasi</h1>
          <p className="text-slate-400 text-xs mt-1">
            Kelola pesan masuk dari calon klien. Sisa <strong className="text-amber-400 font-bold">{unreadCount} pesan belum dibaca</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md shadow-blue-600/30 cursor-pointer order-1 sm:order-none flex-1 sm:flex-initial"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Lead / Pesan</span>
          </button>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-bold transition-colors shadow-md cursor-pointer order-2 sm:order-none shrink-0"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Tandai Semua Dibaca</span>
            </button>
          )}

          <div className="relative w-full sm:w-56 order-3 sm:order-none">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari pengirim atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setFilterMode("all")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer ${
            filterMode === "all" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Semua ({messages.length})
        </button>
        <button
          onClick={() => setFilterMode("unread")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer ${
            filterMode === "unread" ? "bg-amber-500 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Belum Dibaca ({unreadCount})
        </button>
        <button
          onClick={() => setFilterMode("read")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer ${
            filterMode === "read" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Sudah Dibaca ({messages.length - unreadCount})
        </button>
      </div>

      {/* Messages Display: Mobile Cards + Desktop Table */}
      {/* 1. Mobile Cards View (Visible on Mobile only) */}
      <div className="block md:hidden space-y-3">
        {filteredMessages.length === 0 ? (
          <div className="bg-[#0E1526] border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-xs">
            Tidak ada pesan atau leads pada tab ini.
          </div>
        ) : (
          filteredMessages.map((m) => (
            <div
              key={m.id}
              className={`bg-[#0E1526] border rounded-2xl p-4 space-y-3 shadow-lg transition-colors ${
                m.unread ? "border-amber-500/40 bg-amber-500/[0.02]" : "border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      m.unread ? "bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" : "bg-slate-600"
                    }`}
                  />
                  <span className="font-bold text-white text-xs truncate">{m.sender}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap shrink-0">{m.date}</span>
              </div>

              <div>
                <h3 className="font-bold text-slate-200 text-xs line-clamp-1">{m.subject}</h3>
                <p className="text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">{m.message}</p>
              </div>

              <div className="text-[11px] font-mono text-slate-400 truncate">
                {m.email} {m.phone ? `• +${m.phone}` : ""}
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 gap-2">
                <button
                  onClick={() => handleOpenMessage(m)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600/15 hover:bg-blue-600 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Buka Pesan</span>
                </button>

                <a
                  href={`https://wa.me/${m.phone || "6283148801578"}?text=${encodeURIComponent(
                    `Halo ${m.sender}, terima kasih telah menghubungi Solvia Nova mengenai "${m.subject}". Kami siap mendiskusikan kebutuhan sistem Anda.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-bold transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Balas WA</span>
                </a>

                <button
                  onClick={() => handleDelete(m.id)}
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

      {/* 2. Desktop Messages Table (Visible on Desktop only) */}
      <div className="hidden md:block bg-[#0E1526] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#070A12]/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5">PENGIRIM & KONTAK</th>
                <th className="py-4 px-5">TOPIK / KONSULTASI</th>
                <th className="py-4 px-5">WAKTU</th>
                <th className="py-4 px-5 text-right">ACTION / RESPONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500 font-medium">
                    Tidak ada pesan atau leads pada tab ini.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            m.unread ? "bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" : "bg-slate-600"
                          }`}
                        />
                        <div>
                          <div className="text-white font-bold">{m.sender}</div>
                          <div className="text-slate-400 text-[11px] font-mono">{m.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-200 line-clamp-1">{m.subject}</div>
                      <div className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">{m.message}</div>
                    </td>

                    <td className="py-4 px-5 text-slate-400 font-mono whitespace-nowrap">{m.date}</td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Direct WhatsApp Response Button */}
                        <a
                          href={`https://wa.me/${m.phone || "6283148801578"}?text=${encodeURIComponent(
                            `Halo ${m.sender}, terima kasih telah menghubungi Solvia Nova mengenai "${m.subject}". Kami siap mendiskusikan kebutuhan sistem Anda.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 text-emerald-300 hover:text-white text-[11px] font-bold transition-all"
                          title="Balas Langsung via WhatsApp"
                        >
                          <Send className="w-3 h-3" />
                          <span>Balas WA</span>
                        </a>

                        <button
                          onClick={() => handleOpenMessage(m)}
                          className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors cursor-pointer"
                          title="Detail Pesan"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(m.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white transition-colors cursor-pointer"
                          title="Hapus"
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

      {/* ADD LEAD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 space-y-5 shadow-2xl max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <span>Catat Lead / Pesan Konsultasi Baru</span>
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nama Klien / Perusahaan <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Contoh: Budi Santoso (PT Sinar Terang)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="budi@sinarterang.co.id"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">No. WhatsApp</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="628123456789"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Subjek / Kebutuhan Solusi <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: Pembuatan Sistem ERP Inventory & POS Gudang"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Detail Pesan / Konsultasi <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Rincian kebutuhan sistem klien..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  Simpan Lead Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MESSAGE MODAL */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 space-y-5 shadow-2xl max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Detail Leads</span>
                <h2 className="text-base font-bold text-white">{selectedMsg.subject}</h2>
              </div>
              <button
                onClick={() => setSelectedMsg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Pengirim:</span>
                  <span className="text-white font-bold">{selectedMsg.sender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Email:</span>
                  <span className="text-blue-300 font-mono">{selectedMsg.email}</span>
                </div>
                {selectedMsg.phone && (
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">WhatsApp:</span>
                    <span className="text-emerald-400 font-mono">{selectedMsg.phone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Waktu Masuk:</span>
                  <span className="text-slate-300 font-mono">{selectedMsg.date}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-400 font-bold block">Pesan / Detail Konsultasi:</span>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-slate-200 leading-relaxed font-sans text-xs whitespace-pre-line">
                  {selectedMsg.message}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-slate-800">
              <button
                onClick={() => handleDelete(selectedMsg.id)}
                className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Hapus Pesan
              </button>

              <a
                href={`https://wa.me/${selectedMsg.phone || "6283148801578"}?text=${encodeURIComponent(
                  `Halo ${selectedMsg.sender}, kami dari tim Solvia Nova ingin mendiskusikan pesan konsultasi Anda mengenai "${selectedMsg.subject}".`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 inline-flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Balas via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
