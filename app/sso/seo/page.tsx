"use client";

import { useState, useEffect } from "react";
import { Search, Save, CheckCircle2, ExternalLink, Plus, Edit, Trash2, X, Globe, Sparkles } from "lucide-react";

interface RouteSEOItem {
  id: string;
  route: string;
  title: string;
  description: string;
  keywords: string;
  robots: string;
}

const GLOBAL_SEO_KEY = "solvia_seo_settings";
const ROUTE_SEO_KEY = "solvia_seo_routes";

const DEFAULT_ROUTES: RouteSEOItem[] = [
  {
    id: "seo-1",
    route: "/",
    title: "Solvia Nova — Digital Solution & Software House Modern",
    description: "Solvia Nova membantu bisnis membangun sistem digital, website, aplikasi, dan branding modern dengan performa tinggi.",
    keywords: "software house, web development, digital solution, ERP system",
    robots: "index, follow",
  },
  {
    id: "seo-2",
    route: "/portfolio",
    title: "Portofolio & Studi Kasus Proyek — Solvia Nova",
    description: "Eksplorasi karya dan studi kasus pengembangan software house, sistem IoT, e-commerce, dan sistem enterprise.",
    keywords: "portofolio software house, studi kasus erp, aplikasi web, iot",
    robots: "index, follow",
  },
  {
    id: "seo-3",
    route: "/services",
    title: "Layanan Pembuatan Website & ERP — Solvia Nova",
    description: "Paket pengembangan website custom, ERP bisnis, IoT telemetri, dan branding visual profesional.",
    keywords: "jasa pembuatan website, jasa buat erp, jasa iot salatiga, branding studio",
    robots: "index, follow",
  },
  {
    id: "seo-4",
    route: "/about",
    title: "Tentang Kami & Tim Pengembang — Solvia Nova",
    description: "Kenali filosofi, visi, dan para profesional di balik Solvia Nova Digital Solution.",
    keywords: "tentang solvia nova, tim software engineer, founder ceo solvia nova",
    robots: "index, follow",
  },
];

export default function SEOManagementPage() {
  // Global SEO state
  const [title, setTitle] = useState("Solvia Nova — Digital Solution & Software House Modern");
  const [metaDesc, setMetaDesc] = useState(
    "Solvia Nova membantu bisnis membangun sistem digital, website, aplikasi, dan branding modern dengan visual premium dan performa profesional."
  );
  const [keywords, setKeywords] = useState(
    "software house, digital solution, website development, system development, branding, UI"
  );
  const [analyticsId, setAnalyticsId] = useState("G-XXXXXXXXXX");
  const [searchConsole, setSearchConsole] = useState("verification code");
  const [saved, setSaved] = useState(false);

  // Route SEO states
  const [routesList, setRoutesList] = useState<RouteSEOItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RouteSEOItem | null>(null);

  // Form states for Route SEO
  const [routePath, setRoutePath] = useState("");
  const [routeTitle, setRouteTitle] = useState("");
  const [routeDesc, setRouteDesc] = useState("");
  const [routeKeywords, setRouteKeywords] = useState("");
  const [routeRobots, setRouteRobots] = useState("index, follow");

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const savedGlobal = localStorage.getItem(GLOBAL_SEO_KEY);
      if (savedGlobal) {
        const parsed = JSON.parse(savedGlobal);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.metaDesc) setMetaDesc(parsed.metaDesc);
        if (parsed.keywords) setKeywords(parsed.keywords);
        if (parsed.analyticsId) setAnalyticsId(parsed.analyticsId);
        if (parsed.searchConsole) setSearchConsole(parsed.searchConsole);
      }

      const savedRoutes = localStorage.getItem(ROUTE_SEO_KEY);
      if (savedRoutes) {
        setRoutesList(JSON.parse(savedRoutes));
      } else {
        setRoutesList(DEFAULT_ROUTES);
        localStorage.setItem(ROUTE_SEO_KEY, JSON.stringify(DEFAULT_ROUTES));
      }
    } catch (e) {
      console.error(e);
      setRoutesList(DEFAULT_ROUTES);
    }
  }, []);

  const handleSaveGlobal = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { title, metaDesc, keywords, analyticsId, searchConsole };
      localStorage.setItem(GLOBAL_SEO_KEY, JSON.stringify(payload));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const saveRoutesToStorage = (items: RouteSEOItem[]) => {
    setRoutesList(items);
    try {
      localStorage.setItem(ROUTE_SEO_KEY, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setRoutePath("");
    setRouteTitle("");
    setRouteDesc("");
    setRouteKeywords("");
    setRouteRobots("index, follow");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: RouteSEOItem) => {
    setEditingItem(item);
    setRoutePath(item.route);
    setRouteTitle(item.title);
    setRouteDesc(item.description);
    setRouteKeywords(item.keywords);
    setRouteRobots(item.robots || "index, follow");
    setIsModalOpen(true);
  };

  const handleSaveRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routePath.trim() || !routeTitle.trim()) return;

    if (editingItem) {
      const updated = routesList.map((r) =>
        r.id === editingItem.id
          ? {
              ...r,
              route: routePath.trim().startsWith("/") ? routePath.trim() : "/" + routePath.trim(),
              title: routeTitle.trim(),
              description: routeDesc.trim(),
              keywords: routeKeywords.trim(),
              robots: routeRobots,
            }
          : r
      );
      saveRoutesToStorage(updated);
    } else {
      const newItem: RouteSEOItem = {
        id: "seo-" + Date.now().toString(),
        route: routePath.trim().startsWith("/") ? routePath.trim() : "/" + routePath.trim(),
        title: routeTitle.trim(),
        description: routeDesc.trim(),
        keywords: routeKeywords.trim(),
        robots: routeRobots,
      };
      saveRoutesToStorage([newItem, ...routesList]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteRoute = (id: string, path: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus meta SEO untuk rute "${path}"?`)) {
      const updated = routesList.filter((r) => r.id !== id);
      saveRoutesToStorage(updated);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl pb-20">
      {saved && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg transition-opacity">
          <CheckCircle2 className="w-4 h-4" />
          <span>SEO Settings berhasil disimpan ke sistem!</span>
        </div>
      )}

      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white">SEO Management & Indexing</h1>
        <p className="text-slate-400 text-xs mt-1">
          Kelola metadata default, tracking analitik, dan aturan SEO per-halaman rute publik
        </p>
      </div>

      {/* Main SEO Form Card */}
      <div className="bg-[#0E1526] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 space-y-6 shadow-xl">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-400" />
          <span>Pengaturan Global Meta Tag</span>
        </h2>

        <form onSubmit={handleSaveGlobal} className="space-y-6">
          <div>
            <label className="block text-slate-400 text-xs font-bold mb-1.5">Default SEO Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-bold mb-1.5">Default Meta Description</label>
            <textarea
              rows={3}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-bold mb-1.5">Keywords</label>
            <textarea
              rows={2}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-xs font-bold mb-1.5">Google Analytics ID</label>
              <input
                type="text"
                value={analyticsId}
                onChange={(e) => setAnalyticsId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-bold mb-1.5">
                Google Search Console Verification
              </label>
              <input
                type="text"
                value={searchConsole}
                onChange={(e) => setSearchConsole(e.target.value)}
                placeholder="verification code"
                className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Pengaturan Global</span>
          </button>
        </form>
      </div>

      {/* SECTION 2: CUSTOM PER-ROUTE SEO */}
      <div className="bg-[#0E1526] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Custom Route SEO Meta Tags</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Atur title & meta description khusus untuk setiap halaman publik
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md shadow-blue-600/30 shrink-0 cursor-pointer w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Route SEO</span>
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-800 bg-[#070A12]/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">ROUTE URL</th>
                <th className="py-3 px-4">PAGE TITLE</th>
                <th className="py-3 px-4">INDEXING</th>
                <th className="py-3 px-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {routesList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">{item.route}</td>
                  <td className="py-3 px-4">
                    <div className="text-white font-semibold max-w-md truncate">{item.title}</div>
                    <div className="text-slate-400 text-[11px] max-w-md truncate mt-0.5">
                      {item.description}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                      {item.robots}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteRoute(item.id, item.route)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: SITEMAP & ROBOTS */}
      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl backdrop-blur-md">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sitemap XML & Robots.txt</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#070A12] border border-slate-800">
            <div>
              <div className="text-white text-xs font-bold">Sitemap XML</div>
              <div className="text-slate-400 text-xs font-mono mt-0.5">https://solvianova.my.id/sitemap.xml</div>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Lihat</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#070A12] border border-slate-800">
            <div>
              <div className="text-white text-xs font-bold">Robots.txt</div>
              <div className="text-slate-400 text-xs font-mono mt-0.5">https://solvianova.my.id/robots.txt</div>
            </div>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Lihat</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT ROUTE SEO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 space-y-5 shadow-2xl max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <span>{editingItem ? "Edit Route SEO" : "Tambah Route SEO Khusus"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoute} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Rute Path Halaman <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="/layanan atau /kontak"
                  value={routePath}
                  onChange={(e) => setRoutePath(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-cyan-300 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Page Title (Meta Title) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Judul halaman..."
                  value={routeTitle}
                  onChange={(e) => setRouteTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Deskripsi rangkuman untuk Google Search..."
                  value={routeDesc}
                  onChange={(e) => setRouteDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Keywords <span className="text-slate-500 font-normal">(Pisahkan dengan koma)</span>
                </label>
                <input
                  type="text"
                  placeholder="software house, web development"
                  value={routeKeywords}
                  onChange={(e) => setRouteKeywords(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Aturan Robot Indexing</label>
                <select
                  value={routeRobots}
                  onChange={(e) => setRouteRobots(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="index, follow">index, follow (Direkomendasikan)</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow (Privat)</option>
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
                  {editingItem ? "Simpan Perubahan" : "Tambah Route SEO"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
