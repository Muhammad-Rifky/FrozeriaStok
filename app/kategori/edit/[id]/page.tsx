'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function EditKategoriPage() {
    const router = useRouter();
    const params = useParams();

    const id = params.id;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // Ambil data kategori lama
    useEffect(() => {
        const fetchKategori = async () => {
            try {
                const res = await fetch(`/api/kategori/${id}`);
                const result = await res.json();

                if (res.ok) {
                    setName(result.data.name || "");
                    setDescription(result.data.description || "");
                } else {
                    alert("Kategori tidak ditemukan");
                    router.push('/kategori');
                }
            } catch (error) {
                console.error(error);
                alert("Gagal mengambil data kategori");
            } finally {
                setFetching(false);
            }
        };

        if (id) {
            fetchKategori();
        }
    }, [id, router]);

    // Submit edit kategori
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/kategori/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                }),
            });

            if (res.ok) {
                router.push('/kategori');
                router.refresh();
            } else {
                alert("Gagal mengupdate kategori");
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <main className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto bg-white border shadow-sm">
                    <Navbar showAddButton={false} />
                    <div className="p-6 text-black">
                        Memuat data kategori...
                    </div>
                </div>
            </main>
        );
    }
    

    return (
        <main className="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6 text-black">
            <div className="w-full bg-white border shadow-sm overflow-hidden">
                <Navbar showAddButton={false} />

                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/kategori"
                            className="border px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1"
                        >
                            ‹ Kembali
                        </Link>

                        <h2 className="text-black font-bold text-lg">
                            Edit Kategori
                        </h2>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-4xl space-y-5"
                    >
                        {/* Nama */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-700">
                                Nama kategori <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border px-4 py-2 text-sm focus:outline-none focus:border-black"
                                placeholder="Ayam"
                            />
                        </div>

                        {/* Deskripsi */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-700">
                                Deskripsi (opsional)
                            </label>

                            <textarea
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border px-4 py-2 text-sm focus:outline-none focus:border-black"
                                placeholder="Produk berbahan dasar ayam..."
                            />
                        </div>

                        {/* Tombol */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="border px-6 py-2 text-sm hover:bg-gray-50 transition"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="border border-[#c1d35a] bg-[#f0f9c1] text-black px-6 py-2 text-sm font-medium hover:bg-[#e4f0a5] transition disabled:opacity-50"
                            >
                                {loading
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}