"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  PhoneCall,
  RefreshCw,
  Zap,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  Mail,
  MapPin,
  HelpCircle,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  moodBadge?: string;
  actionUrl?: string;
  actionLabel?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
}

interface ExpressionPopup {
  emoji: string;
  badge: string;
  mood: string;
  text: string;
  actionText: string;
  queryTopic?: string;
}

const NOVI_EXPRESSIONS: ExpressionPopup[] = [
  {
    emoji: "👋",
    badge: "Hai Rekan Bisnis!",
    mood: "Ramah",
    text: "Solvia Nova siap membantu rekayasa website 3D modern, ERP enterprise, dan sistem IoT industri.",
    actionText: "Tanya Novi",
    queryTopic: "layanan",
  },
  {
    emoji: "💡",
    badge: "Solusi Kustom",
    mood: "Inovatif",
    text: "Ingin bangun sistem digital kustom sesuai alur bisnis Anda? Konsultasi awal 100% Gratis!",
    actionText: "Konsultasi Gratis",
    queryTopic: "biaya",
  },
  {
    emoji: "📧",
    badge: "Chat by Email",
    mood: "Resmi",
    text: "Kirimkan brief kebutuhan Anda melalui formulir Chat by Email resmi di website kami.",
    actionText: "Buka Form Email",
    queryTopic: "email",
  },
  {
    emoji: "💬",
    badge: "Hotline WhatsApp",
    mood: "Fast Response",
    text: "Mau konsultasi langsung 1-on-1 via WhatsApp resmi (+62 831-4880-1578)?",
    actionText: "Hubungi WA",
    queryTopic: "whatsapp",
  },
];

const QUICK_QUESTIONS = [
  "💡 Apa saja layanan Solvia Nova?",
  "💰 Berapa estimasi biaya pembuatan sistem?",
  "📁 Portofolio apa saja yang pernah dibuat?",
  "📧 Form Chat by Email & Kontak Resmi",
  "📍 Di mana alamat kantor Solvia Nova?",
  "📱 Mau konsultasi langsung via WhatsApp",
];

// Offline fallback responses for instant response without server delay
const CLIENT_FALLBACK_RESPONSES: Record<string, { answer: string; moodBadge: string; actionUrl?: string; actionLabel?: string; secondaryUrl?: string; secondaryLabel?: string }> = {
  layanan: {
    moodBadge: "💡 Solusi Digital Terpadu",
    answer:
      "Solvia Nova menghadirkan solusi teknologi kustom end-to-end:\n\n• 🌐 **Website & Landing Page 3D**: Antarmuka futuristik dengan Three.js & Next.js yang interaktif dan cepat.\n• 🏢 **Sistem Enterprise ERP**: Otomasi alur kerja, inventori, modul penggajian, dan laporan keuangan.\n• 🛒 **POS & Web App**: Sistem kasir cabang, manajemen resep bakery, dan reward pelanggan.\n• 📡 **IoT & Otomasi Industri**: Dashboard monitoring telemetri sensor real-time via MQTT.\n\nSemua solusi kami rancang khusus (*100% custom development*) sesuai kebutuhan unik bisnis Anda!",
    actionUrl: "/services",
    actionLabel: "Lihat Seluruh Solusi Digital",
    secondaryUrl: "https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20ingin%20tanya%20layanan.",
    secondaryLabel: "Chat WhatsApp",
  },
  biaya: {
    moodBadge: "💰 Estimasi Transparan",
    answer:
      "Investasi disesuaikan dengan skala dan kebutuhan solusi digital bisnis Anda:\n\n• 🚀 **Landing Page & Portofolio 3D**: Mulai Rp 1.5jt – Rp 3.5jt\n• 💼 **Company Profile & Portal Bisnis**: Mulai Rp 3.5jt – Rp 8jt\n• ⚙️ **Sistem Kustom / ERP / POS / IoT**: Sesuai modul dan rancangan kebutuhan bisnis Anda.\n\n✨ **Kabar baik**: Konsultasi kebutuhan awal dan estimasi rancangan 100% GRATIS tanpa komitmen!",
    actionUrl: "https://wa.me/6283148801578?text=Halo%20Novi,%20saya%20ingin%20konsultasi%20estimasi%20biaya%20solusi%20digital.",
    actionLabel: "Minta Estimasi via WhatsApp",
    secondaryUrl: "/contact",
    secondaryLabel: "Kirim Rincian via Email",
  },
  portofolio: {
    moodBadge: "📁 Portofolio Unggulan",
    answer:
      "Beberapa studi kasus unggulan yang telah kami kembangkan:\n\n• **Novadex** (Direktori UMKM Salatiga terintegrasi)\n• **FILTRAZON IoT 2.0** (Sistem Integrasi Sensor Industri & Web Dashboard)\n• **DasterKu** (Website Grosir Online E-Commerce)\n• **Dapur Ceria** (Aplikasi Kasir POS & Manajemen Resep Bakery)\n• **MitraMan** (Sistem ERP Manajemen Mitra & Honorarium)\n\nSetiap proyek dilengkapi foto dokumentasi visual, analisis masalah, solusi teknis, dan hasil nyata bagi bisnis.",
    actionUrl: "/portfolio",
    actionLabel: "Buka Portofolio Lengkap",
    secondaryUrl: "https://wa.me/6283148801578?text=Halo%20Novi,%20saya%20ingin%20demo%20portofolio.",
    secondaryLabel: "Minta Demo Portofolio",
  },
  email: {
    moodBadge: "📧 Saluran Komunikasi Resmi",
    answer:
      "Anda dapat berkonsultasi secara tertulis melalui:\n\n• 📧 **Email Resmi**: **solvianova1@gmail.com**\n• 🌐 **Formulir Chat by Email**: Tersedia langsung di halaman kontak website kami\n• 📱 **WhatsApp Hotline**: **+62 831-4880-1578**\n\nTim konsultan teknis Solvia Nova akan memproses dan merespons setiap pesan dalam waktu 1x24 jam kerja.",
    actionUrl: "/contact",
    actionLabel: "Buka Form Chat by Email",
    secondaryUrl: "https://wa.me/6283148801578",
    secondaryLabel: "Chat WhatsApp (+62 831-4880-1578)",
  },
  alamat: {
    moodBadge: "📍 Lokasi Kantor & Studio",
    answer:
      "Kantor & studio pengembangan Solvia Nova berada di Jawa Tengah:\n\n• 🏢 **Head Office**: Jl. Gumukrejo RT 05 RW 05, Nanggulan, Kec. Tingkir, Kota Salatiga, Jawa Tengah 50711\n• 🛠️ **Workshop & Tech Lab**: Dusun Brambang RT 01/RW 02, Desa Blimbing, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah 57557\n\nKami melayani klien dari seluruh Indonesia baik melalui pertemuan langsung maupun konsultasi online terstruktur via Zoom / Google Meet / WhatsApp.",
    actionUrl: "/contact",
    actionLabel: "Lihat Halaman Kontak",
    secondaryUrl: "https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20ingin%20jadwal%20meeting.",
    secondaryLabel: "Jadwalkan Diskusi / Meeting",
  },
  whatsapp: {
    moodBadge: "🤝 Konsultasi Langsung",
    answer:
      "Tentu saja! Anda bisa langsung terhubung dengan tim teknis Solvia Nova melalui WhatsApp resmi kami di **+62 831-4880-1578**. Tim solusi digital kami siap merespons dengan cepat untuk mendiskusikan ide dan kebutuhan sistem Anda.",
    actionUrl: "https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20tertarik%20konsultasi%20solusi%20digital%20dan%20website.",
    actionLabel: "Buka WhatsApp Sekarang (+62 831-4880-1578)",
    secondaryUrl: "/contact",
    secondaryLabel: "Kirim via Form Email",
  },
};

export default function ChatbotNovi() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      moodBadge: "👋 Ramah & Menyapa",
      text: "Halo! Saya **Novi**, AI Consultant resmi dari **Solvia Nova Digital Solution**.\n\nAda yang bisa Novi bantu seputar pembuatan website 3D, sistem ERP kustom, aplikasi kasir POS, otomasi IoT industri, atau konsultasi kebutuhan digital bisnis Anda hari ini?",
      timestamp: "Baru saja",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [targetBotReply, setTargetBotReply] = useState<Message | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [animSpeed, setAnimSpeed] = useState<"normal" | "fast" | "instant">("fast");

  // Dynamic Expressions Pop-up state
  const [expressionIndex, setExpressionIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(true);
  const [currentMood, setCurrentMood] = useState("😊 Siap Membantu");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-cycle expression pop-up every 12 seconds when chat is closed
  useEffect(() => {
    if (isOpen) return;

    const interval = setInterval(() => {
      setExpressionIndex((prev) => (prev + 1) % NOVI_EXPRESSIONS.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const activeExpression = NOVI_EXPRESSIONS[expressionIndex];

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText, isTyping]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Animated typewriter effect for Novi's responses
  useEffect(() => {
    if (!targetBotReply) return;

    if (animSpeed === "instant") {
      setMessages((prev) => [...prev, targetBotReply]);
      setTargetBotReply(null);
      setTypingText("");
      setIsTyping(false);
      setCurrentMood("😊 Siap Membantu");
      return;
    }

    const fullText = targetBotReply.text;
    const intervalMs = animSpeed === "fast" ? 10 : 20;

    if (typingIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypingText((prev) => prev + fullText[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, intervalMs);
      return () => clearTimeout(timer);
    } else {
      setMessages((prev) => [...prev, targetBotReply]);
      setTargetBotReply(null);
      setTypingText("");
      setTypingIndex(0);
      setIsTyping(false);
      setCurrentMood("😊 Senang Membantu");
    }
  }, [targetBotReply, typingIndex, animSpeed]);

  const handleSendMessage = async (textToSend?: string) => {
    const raw = textToSend || inputText;
    const trimmed = raw.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);
    setCurrentMood("🤔 Menganalisis Kebutuhan...");

    let replyData: {
      answer: string;
      moodBadge: string;
      actionUrl?: string;
      actionLabel?: string;
      secondaryUrl?: string;
      secondaryLabel?: string;
    };

    try {
      // 1. Try server AI endpoint first
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (res.ok) {
        const data = await res.json();
        replyData = {
          answer: data.reply,
          moodBadge: data.moodBadge || "💡 Solusi Digital",
          actionUrl: data.actionUrl,
          actionLabel: data.actionLabel,
          secondaryUrl: data.secondaryUrl,
          secondaryLabel: data.secondaryLabel,
        };
      } else {
        throw new Error("Server AI error");
      }
    } catch {
      // 2. Client-side semantic fallback
      const q = trimmed.toLowerCase();
      if (q.includes("layanan") || q.includes("jasa") || q.includes("buat apa") || q.includes("solusi") || q.includes("fitur")) {
        replyData = CLIENT_FALLBACK_RESPONSES.layanan;
      } else if (q.includes("biaya") || q.includes("harga") || q.includes("tarif") || q.includes("paket") || q.includes("berapa")) {
        replyData = CLIENT_FALLBACK_RESPONSES.biaya;
      } else if (q.includes("porto") || q.includes("portofolio") || q.includes("karya") || q.includes("contoh") || q.includes("proyek") || q.includes("novadex") || q.includes("filtrazon")) {
        replyData = CLIENT_FALLBACK_RESPONSES.portofolio;
      } else if (q.includes("email") || q.includes("form") || q.includes("surat") || q.includes("chat by email")) {
        replyData = CLIENT_FALLBACK_RESPONSES.email;
      } else if (q.includes("alamat") || q.includes("kantor") || q.includes("lokasi") || q.includes("salatiga") || q.includes("sukoharjo")) {
        replyData = CLIENT_FALLBACK_RESPONSES.alamat;
      } else if (q.includes("wa") || q.includes("whatsapp") || q.includes("hubungi") || q.includes("kontak") || q.includes("telp")) {
        replyData = CLIENT_FALLBACK_RESPONSES.whatsapp;
      } else {
        replyData = {
          moodBadge: "💡 Solusi Digital",
          answer:
            `Terima kasih telah bertanya! Pertanyaan Anda tentang *"${trimmed}"* sangat menarik.\n\n` +
            `Tim teknis Solvia Nova siap memberikan rancangan sistem yang tepat guna untuk akselerasi bisnis Anda. Kami dapat membantu pembuatan website interaktif 3D, sistem ERP kustom, aplikasi POS kasir, atau integrasi IoT industri.\n\n` +
            `Anda dapat berkonsultasi langsung 1-on-1 via WhatsApp resmi kami atau mengirimkan rincian kebutuhan melalui Form Chat by Email!`,
          actionUrl: "https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20ingin%20tanya%20tentang:%20" + encodeURIComponent(trimmed),
          actionLabel: "Tanyakan via WhatsApp (+62 831-4880-1578)",
          secondaryUrl: "/contact",
          secondaryLabel: "Form Chat by Email",
        };
      }
    }

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      moodBadge: replyData.moodBadge,
      text: replyData.answer,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actionUrl: replyData.actionUrl,
      actionLabel: replyData.actionLabel,
      secondaryUrl: replyData.secondaryUrl,
      secondaryLabel: replyData.secondaryLabel,
    };

    setTypingText("");
    setTypingIndex(0);
    setTargetBotReply(botMsg);
  };

  const handleOpenFromPopup = (topic?: string) => {
    setIsOpen(true);
    if (topic) {
      if (topic === "layanan") handleSendMessage("Apa saja layanan Solvia Nova?");
      else if (topic === "biaya") handleSendMessage("Berapa estimasi biaya pembuatan sistem?");
      else if (topic === "email") handleSendMessage("Bagaimana cara menghubungi via Form Chat by Email?");
      else if (topic === "whatsapp") handleSendMessage("Saya ingin konsultasi langsung via WhatsApp");
      else handleSendMessage("Jelaskan tentang solusi digital Solvia Nova");
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "initial",
        sender: "bot",
        moodBadge: "👋 Percakapan Baru",
        text: "Percakapan telah diatur ulang. ✨ Halo! Saya **Novi**, siap menjawab pertanyaan seputar solusi website 3D, sistem ERP enterprise, aplikasi kasir POS, atau IoT industri Solvia Nova.",
        timestamp: "Baru saja",
      },
    ]);
    setTypingText("");
    setIsTyping(false);
    setTargetBotReply(null);
    setCurrentMood("😊 Siap Membantu");
  };

  return (
    <>
      {/* FLOATING ACTION TRIGGER & DYNAMIC EXPRESSION POP-UP */}
      <div className="fixed bottom-[74px] right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Dynamic Expression Pop-up Bubble */}
        {!isOpen && showPopup && (
          <div className="relative max-w-[280px] sm:max-w-[320px] p-3 rounded-2xl bg-[#020611]/95 border border-blue-400/40 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Close small cross */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPopup(false);
              }}
              className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-blue-950 border border-blue-400/40 text-slate-300 hover:text-white flex items-center justify-center text-[10px] shadow-md"
              title="Tutup pop-up"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Bubble Content */}
            <div
              onClick={() => handleOpenFromPopup(activeExpression.queryTopic)}
              className="cursor-pointer space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg animate-bounce">{activeExpression.emoji}</span>
                  <span className="text-[11px] font-extrabold text-white tracking-wide">
                    {activeExpression.badge}
                  </span>
                </div>
                <span className="px-1.5 py-0.5 rounded-md bg-[#ffde59]/20 text-[#ffde59] text-[9px] font-bold uppercase">
                  {activeExpression.mood}
                </span>
              </div>

              <p className="text-[11px] text-blue-100 leading-snug font-medium line-clamp-2">
                {activeExpression.text}
              </p>

              <div className="pt-1 flex items-center justify-between text-[10px] text-[#ffde59] font-bold">
                <span className="flex items-center gap-1">
                  <span>{activeExpression.actionText}</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
                <span className="text-[9px] text-blue-400 font-mono">Novi AI</span>
              </div>
            </div>

            {/* Downward triangle pointer arrow */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#020611] border-r border-b border-blue-400/40 rotate-45" />
          </div>
        )}

        {/* Main Floating Bot Toggle Button */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setShowPopup(false);
          }}
          aria-label="Buka Chat dengan Novi"
          className={`${
            isOpen ? "hidden sm:flex" : "flex"
          } group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-2xl shadow-blue-600/50 border border-blue-300/40 items-center justify-center transition-all duration-300 hover:scale-105 active:scale-90 touch-manipulation shrink-0`}
        >
          {/* Animated Glow Halo */}
          <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-md group-hover:blur-lg transition-all" />

          {/* Online green indicator dot */}
          <span className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#020611] shadow-[0_0_8px_#34d399]" />

          {isOpen ? (
            <X className="w-6 h-6 relative z-10 text-white transition-transform group-hover:rotate-90 duration-300" />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white group-hover:text-[#ffde59] transition-colors" />
            </div>
          )}
        </button>
      </div>

      {/* CHATBOT MODAL WINDOW */}
      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 sm:hidden animate-in fade-in duration-200"
          />
          <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[420px] h-[85vh] sm:h-[570px] z-[60] flex flex-col rounded-t-[28px] sm:rounded-3xl bg-[#020611]/98 backdrop-blur-2xl border-t sm:border border-blue-400/40 shadow-2xl shadow-blue-950/90 overflow-hidden animate-in fade-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200 pb-[env(safe-area-inset-bottom,0px)]">
            {/* Mobile Sheet Handle */}
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto sm:hidden mt-2.5 -mb-1 shrink-0" />

            {/* Header with Dynamic Mood/Expression Status */}
            <div className="bg-gradient-to-r from-blue-950/90 via-[#04102c]/95 to-blue-900/90 border-b border-blue-400/30 p-3.5 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-300/40 flex items-center justify-center shadow-lg shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#020611]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-black text-white truncate">Chat dengan Novi</h3>
                    <span className="px-1.5 py-0.5 rounded-md bg-[#ffde59]/20 text-[#ffde59] text-[9px] font-extrabold uppercase shrink-0">
                      Digital Solution
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-blue-200 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="truncate">{currentMood}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  title="Pengaturan Animasi Teks"
                  className={`p-2 rounded-xl transition-colors ${
                    showSettings ? "bg-blue-600 text-white" : "text-blue-300 hover:text-white hover:bg-blue-950/60"
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset Percakapan"
                  className="p-2 rounded-xl text-blue-300 hover:text-white hover:bg-blue-950/60 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Tutup Chat"
                  className="p-2 rounded-xl text-blue-300 hover:text-white hover:bg-blue-950/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Setting Drawer (When toggled) */}
            {showSettings && (
              <div className="bg-blue-950/90 border-b border-blue-400/30 p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between text-blue-200 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#ffde59]" />
                    Kecepatan Animasi Teks Muncul
                  </span>
                  <span className="text-[10px] text-blue-300 capitalize">{animSpeed}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["normal", "fast", "instant"] as const).map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setAnimSpeed(spd)}
                      className={`py-1 px-2 rounded-lg text-[10px] font-extrabold transition-all capitalize ${
                        animSpeed === spd
                          ? "bg-blue-600 text-white border border-blue-300/40 shadow-sm"
                          : "bg-blue-900/40 text-blue-300 hover:bg-blue-900/80"
                      }`}
                    >
                      {spd === "normal" ? "Normal" : spd === "fast" ? "Cepat" : "Langsung"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-blue-600/30">
              {messages.map((m) => {
                const isBot = m.sender === "bot";
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${isBot ? "justify-start" : "justify-end"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 mt-0.5 text-[#ffde59]">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className="max-w-[85%] space-y-2">
                      {/* Bot Mood Badge */}
                      {isBot && m.moodBadge && (
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-950/80 border border-blue-400/30 text-[10px] font-extrabold text-[#ffde59]">
                          {m.moodBadge}
                        </span>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isBot
                            ? "bg-gradient-to-br from-[#051438]/95 to-[#020b22]/95 border border-blue-400/30 text-blue-50 shadow-md whitespace-pre-line"
                            : "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-medium shadow-md rounded-br-none"
                        }`}
                      >
                        {/* Formatted Text Render */}
                        <span className="inline">
                          {m.text.split("\n").map((line, lIdx) => (
                            <span key={lIdx} className="block mb-1 last:mb-0">
                              {line.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, pIdx) => {
                                if (part.startsWith("**") && part.endsWith("**")) {
                                  return (
                                    <strong key={pIdx} className="font-extrabold text-white">
                                      {part.slice(2, -2)}
                                    </strong>
                                  );
                                }
                                if (part.startsWith("*") && part.endsWith("*")) {
                                  return (
                                    <em key={pIdx} className="italic text-[#ffde59]">
                                      {part.slice(1, -1)}
                                    </em>
                                  );
                                }
                                return part;
                              })}
                            </span>
                          ))}
                        </span>
                      </div>

                      {/* Interactive Dual CTA Buttons inside Bot Bubble */}
                      {isBot && (m.actionUrl || m.secondaryUrl) && (
                        <div className="flex flex-col gap-1.5 pt-0.5">
                          {m.actionUrl && (
                            <a
                              href={m.actionUrl}
                              target={m.actionUrl.startsWith("http") ? "_blank" : undefined}
                              rel={m.actionUrl.startsWith("http") ? "noreferrer" : undefined}
                              className="inline-flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white text-[11px] font-bold shadow-md shadow-blue-900/40 border border-blue-400/30 transition-all hover:scale-102"
                            >
                              <span className="flex items-center gap-1.5 truncate">
                                {m.actionUrl.includes("wa.me") ? (
                                  <PhoneCall className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                                ) : m.actionUrl.includes("contact") ? (
                                  <Mail className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                                ) : (
                                  <Sparkles className="w-3.5 h-3.5 text-[#ffde59] shrink-0" />
                                )}
                                <span className="truncate">{m.actionLabel || "Selengkapnya"}</span>
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                            </a>
                          )}

                          {m.secondaryUrl && (
                            <a
                              href={m.secondaryUrl}
                              target={m.secondaryUrl.startsWith("http") ? "_blank" : undefined}
                              rel={m.secondaryUrl.startsWith("http") ? "noreferrer" : undefined}
                              className="inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-400/30 text-blue-200 hover:text-white text-[10px] font-bold transition-all"
                            >
                              <span className="flex items-center gap-1.5 truncate">
                                {m.secondaryUrl.includes("wa.me") ? (
                                  <PhoneCall className="w-3 h-3 text-emerald-400 shrink-0" />
                                ) : (
                                  <Mail className="w-3 h-3 text-cyan-400 shrink-0" />
                                )}
                                <span className="truncate">{m.secondaryLabel || "Alternatif Kontak"}</span>
                              </span>
                              <ChevronRight className="w-3 h-3 shrink-0" />
                            </a>
                          )}
                        </div>
                      )}

                      <div className={`text-[10px] text-slate-400 font-mono ${isBot ? "text-left" : "text-right"}`}>
                        {m.timestamp}
                      </div>
                    </div>

                    {!isBot && (
                      <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Live Animated Typewriter Stream Bubble */}
              {isTyping && (
                <div className="flex items-start gap-2.5 justify-start animate-in fade-in duration-150">
                  <div className="w-7 h-7 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 mt-0.5 text-[#ffde59]">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>

                  <div className="max-w-[85%] p-3.5 rounded-2xl bg-gradient-to-br from-[#051438]/95 to-[#020b22]/95 border border-blue-400/30 text-blue-50 text-xs shadow-md space-y-1">
                    {typingText ? (
                      <span className="whitespace-pre-line leading-relaxed">
                        {typingText}
                        <span className="inline-block w-1.5 h-3.5 bg-[#ffde59] ml-1 animate-pulse align-middle" />
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5 py-0.5 text-blue-300 font-semibold text-[11px]">
                        <span>Novi sedang merumuskan solusi</span>
                        <span className="flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ffde59] animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ffde59] animate-bounce" />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Chips */}
            <div className="px-3 py-2 bg-[#01081a]/95 border-t border-blue-400/20 overflow-x-auto scrollbar-none flex items-center gap-1.5">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  disabled={isTyping}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-400/30 text-blue-200 hover:text-white text-[11px] font-semibold transition-all shrink-0 active:scale-95 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-gradient-to-t from-[#020611] to-[#040e29] border-t border-blue-400/30 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Tulis pesan atau pertanyaan ke Novi..."
                disabled={isTyping}
                className="flex-1 bg-blue-950/50 border border-blue-400/30 rounded-xl px-3.5 py-2.5 text-sm sm:text-xs text-white placeholder-blue-300/50 focus:outline-none focus:border-[#ffde59] focus:ring-1 focus:ring-[#ffde59]/50 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white flex items-center justify-center shadow-lg transition-all active:scale-95 shrink-0 border border-blue-400/30 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
