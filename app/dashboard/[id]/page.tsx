"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function DetailBarangPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    // Ambil data produk berdasarkan ID
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div className="p-10 text-center">Memuat data...</div>;

  return (
    <main className="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6 text-black">
      <div className="w-full bg-white border shadow-sm overflow-hidden">
        <Navbar showAddButton={false} />

        <div className="p-6 space-y-6">
          {/* Header: Tombol Kembali & Tombol Aksi */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()} 
                className="border px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1"
              >
                ‹ Kembali
              </button>
              <h2 className="font-bold text-lg">Detail Barang</h2>
            </div>
            <div className="flex gap-2">
              <Link 
                href={`/edit/${id}`} 
                className="border border-blue-600 text-blue-600 px-4 py-1.5 text-sm hover:bg-blue-50"
              >
                Edit Barang
              </Link>
              <button className="border border-red-400 text-red-500 px-4 py-1.5 text-sm hover:bg-red-50">
                Hapus
              </button>
            </div>
          </div>

          {/* Info Utama: Foto & Nama */}
          <div className="flex gap-6 items-start">
            <div className="w-24 h-24 border border-gray-300 flex items-center justify-center bg-gray-50 rounded-sm overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-300 text-3xl">🖼️</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <span className="inline-block mt-1 px-3 py-0.5 bg-gray-100 border text-xs text-gray-600 rounded-sm">
                {product.category}
              </span>
            </div>
          </div>

          {/* Grid Statistik / Detail Teknis */}
          <div className="grid grid-cols-2 gap-4">
            <DetailCard label="Jumlah stok" value={`${product.stock} ${product.unit}`} />
            <DetailCard label="Stok minimum" value={`${product.min_stock || 0} ${product.unit}`} />
            <DetailCard label="Harga jual" value={`Rp ${Number(product.price).toLocaleString("id-ID")}`} />
            <DetailCard label="Harga beli" value={`Rp ${Number(product.price_buy || 0).toLocaleString("id-ID")}`} />
            <DetailCard label="Berat / ukuran" value={product.weight || "-"} />
            <DetailCard label="Lokasi simpan" value={product.location || "-"} />
          </div>

          {/* Deskripsi */}
          <div className="border p-4 bg-white space-y-1">
            <p className="text-xs font-semibold text-gray-400">Deskripsi</p>
            <p className="text-sm leading-relaxed text-gray-700">
              {product.description || "Tidak ada deskripsi untuk barang ini."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// Komponen Kecil untuk Kotak Detail
function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border p-3 bg-white space-y-1">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</p>
      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
  );
}
