"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Check, Printer } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import OfficialInvoiceDocument, { LineItem, formatRupiah, DEFAULT_FILTRAZON_ITEMS } from "@/components/OfficialInvoiceDocument";

export default function CreateInvoicePage() {
  const router = useRouter();

  // 1. Informasi Invoice
  const [invoiceNo, setInvoiceNo] = useState("NO. INV/2026/10/003");
  const [invoiceDate, setInvoiceDate] = useState("28 October 2026");
  const [status, setStatus] = useState("Lunas");

  // 2. Data Penerima
  const [clientName, setClientName] = useState("FILTRAZON IoT 2.0");
  const [clientAddress, setClientAddress] = useState("Dusun Brambang Rt 01/02, Kelurahan Blimbing, Kec. Gatak, Kab.Sukoharjo");
  const [clientEmail, setClientEmail] = useState("helixxjust@gmail.com");
  const [clientPhone, setClientPhone] = useState("+62 812-2661-5585");

  // 3. Informasi Project
  const [projectName, setProjectName] = useState("FILTRAZON IoT 2.0");
  const [servicePackage, setServicePackage] = useState("IoT System Integration, Web DashboardDevelopment");
  const [projectDuration, setProjectDuration] = useState("1 Juli - 30 Agustus");

  // 4. Line Items
  const [items, setItems] = useState<LineItem[]>(DEFAULT_FILTRAZON_ITEMS);

  // 5. Informasi Pembayaran
  const [bankName, setBankName] = useState("Bank Mandiri");
  const [bankBadge, setBankBadge] = useState("BM");
  const [accountNo, setAccountNo] = useState("1360034942356");
  const [accountHolder, setAccountHolder] = useState("NANDA ARI WAHYU");
  const [transferType, setTransferType] = useState("Antar Bank");

  // 6. Signatory
  const [signatory, setSignatory] = useState("Nanda Ari Wahyu Widagdo");
  const [signatoryTitle, setSignatoryTitle] = useState("Founder");
  const [signatureImage, setSignatureImage] = useState("");

  const [toast, setToast] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Automatically load saved global signature from localStorage
  useEffect(() => {
    const savedSig = localStorage.getItem("solvia_signature_image");
    const savedName = localStorage.getItem("solvia_signatory_name");

    if (savedSig) setSignatureImage(savedSig);
    if (savedName) setSignatory(savedName);
  }, []);

  const addItem = () => {
    const newItem: LineItem = {
      id: "item-" + Date.now().toString(),
      description: "",
      qty: 1,
      price: 0,
      subDetail: "",
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof LineItem, val: any) => {
    setItems(items.map((it) => (it.id === id ? { ...it, [field]: val } : it)));
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) {
      alert("Invoice minimal memiliki 1 item.");
      return;
    }
    setItems(items.filter((it) => it.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((acc, it) => acc + (it.qty * it.price), 0);
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceNo || !clientName) {
      alert("Harap lengkapi nomor invoice dan nama penerima.");
      return;
    }

    const totalVal = calculateTotal();
    const formattedTotal = formatRupiah(totalVal);

    // Save to localStorage list
    try {
      const STORAGE_KEY = "solvia_invoices_data";
      const existing = localStorage.getItem(STORAGE_KEY);
      const list = existing ? JSON.parse(existing) : [];

      const newInv = {
        id: "inv-" + Date.now().toString(),
        no: invoiceNo,
        client: clientName,
        project: projectName,
        date: invoiceDate,
        total: formattedTotal,
        status: status,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify([newInv, ...list]));
      setToast("Invoice resmi berhasil disimpan ke database!");
      setTimeout(() => setToast(null), 3000);
      setIsPreviewOpen(true);
    } catch (e) {
      console.error(e);
      setIsPreviewOpen(true);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold transition-opacity">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Back Link & Edit Form (Hidden on Print) */}
      <div className="print:hidden space-y-6">
        <div>
          <Link
            href="/sso/invoice"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Invoice</span>
          </Link>
        </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Buat Invoice Baru (Format Resmi)</h1>
          <p className="text-slate-400 text-xs mt-1">Lengkapi rincian invoice penagihan resmi Solvia Nova</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/sso/invoice"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            Batal
          </Link>
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Preview Desain
          </button>
          <button
            onClick={handleSaveInvoice}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-colors cursor-pointer"
          >
            Simpan & Cetak
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveInvoice} className="space-y-6">
        {/* 1. Header & Nomor Invoice */}
        <div className="bg-[#0E1526] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Informasi Nomor & Tanggal Invoice
            </h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
            >
              <option value="Lunas">Lunas (Paid)</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nomor Invoice *</label>
              <input
                type="text"
                required
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Tanggal Terbit *</label>
              <input
                type="text"
                required
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* 2. Data Penerima & Informasi Project */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0E1526] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              KEPADA YTH.
            </h2>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nama Klien / Perusahaan *</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="FILTRAZON IoT 2.0"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Alamat Lengkap</label>
              <textarea
                rows={2}
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder="Dusun Brambang Rt 01/02..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                <input
                  type="text"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Telepon</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+62 812..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0E1526] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              INFORMASI PROJECT
            </h2>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nama Project *</label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="FILTRAZON IoT 2.0"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Paket Layanan</label>
              <input
                type="text"
                value={servicePackage}
                onChange={(e) => setServicePackage(e.target.value)}
                placeholder="IoT System Integration, Web DashboardDevelopment"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Durasi Pengerjaan</label>
              <input
                type="text"
                value={projectDuration}
                onChange={(e) => setProjectDuration(e.target.value)}
                placeholder="1 Juli - 30 Agustus"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* 3. RINCIAN LAYANAN Line Items Builder */}
        <div className="bg-[#0E1526] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                RINCIAN LAYANAN & ITEM ({items.length} Item)
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">Daftar komponen pengadaan hardware, instalasi, dan software</p>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Item Layanan</span>
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2 text-slate-400 font-mono text-xs w-8 shrink-0">
                  #{idx + 1}
                </div>

                <div className="flex-1 w-full space-y-1.5">
                  <input
                    type="text"
                    required
                    value={item.description}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    placeholder="Deskripsi layanan atau komponen barang..."
                    className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white font-medium"
                  />
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto">
                  <div className="w-20">
                    <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">QTY</label>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, "qty", parseInt(e.target.value) || 1)}
                      className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white font-mono text-center"
                    />
                  </div>

                  <div className="w-36">
                    <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Harga Satuan (Rp)</label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, "price", parseInt(e.target.value) || 0)}
                      className="w-full bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white font-mono text-right"
                    />
                  </div>

                  <div className="w-36 text-right">
                    <span className="block text-[10px] text-slate-400 font-semibold mb-0.5">Subtotal</span>
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {formatRupiah(item.qty * item.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors mt-3 md:mt-0"
                    title="Hapus Baris"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400">Total Keseluruhan</span>
            <span className="text-2xl font-black text-white font-mono">
              {formatRupiah(calculateTotal())}
            </span>
          </div>
        </div>

        {/* 4. Informasi Pembayaran & Tanda Tangan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0E1526] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              INFORMASI PEMBAYARAN
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Badge Bank</label>
                <input
                  type="text"
                  value={bankBadge}
                  onChange={(e) => setBankBadge(e.target.value)}
                  placeholder="BM"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold text-center"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Nama Bank</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Bank Mandiri"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Nomor Rekening</label>
              <input
                type="text"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                placeholder="1360034942356"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Atas Nama (a.n.)</label>
              <input
                type="text"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                placeholder="NANDA ARI WAHYU"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Jenis Transfer</label>
              <input
                type="text"
                value={transferType}
                onChange={(e) => setTransferType(e.target.value)}
                placeholder="Antar Bank"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-semibold"
              />
            </div>
          </div>

          <div className="bg-[#0E1526] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              TANDA TANGAN & PENGESAHAN
            </h2>
            <ImageUploader
              value={signatureImage}
              onChange={setSignatureImage}
              label="Tanda Tangan Digital Official"
            />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Nama Penandatangan</label>
                <input
                  type="text"
                  value={signatory}
                  onChange={(e) => setSignatory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Jabatan</label>
                <input
                  type="text"
                  value={signatoryTitle}
                  onChange={(e) => setSignatoryTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-semibold"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>

      {/* EXACT OFFICIAL SOLVIA NOVA INVOICE PRINTABLE / PDF MODAL */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 overflow-y-auto p-2 sm:p-6 md:p-8 flex justify-center items-start print:p-0 print:bg-white print:static print:overflow-visible">
          <div className="w-full max-w-4xl space-y-4 my-2 sm:my-4 print:my-0">
            {/* Modal Controls Bar (Hidden on Print, Sticky at top) */}
            <div className="sticky top-2 z-30 flex items-center justify-between px-5 sm:px-6 py-3 rounded-2xl bg-[#0A0E1A] border border-slate-700/80 text-white print:hidden shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Pratinjau Resmi: <span className="font-mono text-cyan-400">{invoiceNo}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

            {/* Official Invoice Document Structure (Exact Match with PDF) */}
            <OfficialInvoiceDocument
              invoiceNo={invoiceNo}
              invoiceDate={invoiceDate}
              clientName={clientName}
              clientAddress={clientAddress}
              clientEmail={clientEmail}
              clientPhone={clientPhone}
              projectName={projectName}
              servicePackage={servicePackage}
              projectDuration={projectDuration}
              items={items}
              bankBadge={bankBadge}
              bankName={bankName}
              accountNo={accountNo}
              accountHolder={accountHolder}
              transferType={transferType}
              signatureImage={signatureImage}
              signatoryName={signatory}
              signatoryRole={signatoryTitle}
            />
          </div>
        </div>
      )}
    </div>
  );
}
