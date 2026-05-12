'use client';

import { useState } from 'react'; 
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

export default function TambahKategoriPage() {
    // 3. Buat state untuk input
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // 4. Fungsi untuk kirim data ke API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/kategori/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description }),
            });

            if (res.ok) {
                router.push('/kategori'); // Pindah ke halaman list kategori jika berhasil
                router.refresh(); // Sega
            } else {
                alert("Gagal menambahkan kategori");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white border shadow-sm">
                <Navbar showAddButton={false} />
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Link href="/kategori" className="border px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                            ‹ Kembali
                        </Link>
                        <h2 className="text-black font-bold text-lg">Tambah Kategori</h2>
                    </div>

                    {/*  onSubmit pada form */}
                    <form onSubmit={handleSubmit} className="max-w-4xl space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-700">Nama kategori <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border px-4 py-2 text-sm focus:outline-none focus:border-black" 
                                placeholder="Ayam" 
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-700">Deskripsi (opsional)</label>
                            <textarea 
                                rows={4} 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border px-4 py-2 text-sm focus:outline-none focus:border-black"
                                placeholder="Produk berbahan dasar ayam beku..."
                            ></textarea>
                        </div>

                        {/* Tombol Aksi yang Diperbarui */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button 
                                type="button" 
                                onClick={() => router.back()} // Berfungsi sebagai tombol cancel
                                className="border px-6 py-2 text-sm hover:bg-gray-50 transition"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="border border-[#c1d35a] bg-[#f0f9c1] text-black px-6 py-2 text-sm font-medium hover:bg-[#e4f0a5] transition disabled:opacity-50"
                            >
                                {loading ? "Menyimpan..." : "Simpan Kategori"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
