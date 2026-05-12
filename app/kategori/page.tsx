"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import CategoryTable from "@/components/CategoryTable";

export default function CategoryPage() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  // modal delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  

  // ambil data kategori
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `/api/kategori?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`
      );

      const result = await response.json();

      setCategories(result.data || []);
      setTotalItems(result.total || 0);
    } catch (error) {
      console.error("Gagal load data kategori:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage, searchQuery]);

  // ========================
  // EDIT
  // ========================
  const handleEdit = (id: number) => {
    router.push(`/kategori/edit/${id}`);
  };

  // ========================
  // DELETE
  // ========================
  const confirmDelete = (item: any) => {
    setSelectedCategory(item);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    try {
      const res = await fetch(
        `/api/kategori/${selectedCategory.id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setShowConfirm(false);
        fetchCategories();
      } else {
        alert("Gagal menghapus kategori");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6 text-black">
      <div className="w-full bg-white border shadow-sm overflow-hidden">
        {/* navbar */}
        <Navbar
          buttonText="+ Tambah Kategori"
          buttonHref="/tambah/tambahKategori"
        />

        <div className="p-6 space-y-4">
          <h2 className="text-black font-bold text-lg">
            Daftar Kategori
          </h2>

          {/* search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari kategori..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-500 italic"
            />
          </div>

          {/* tabel */}
          <CategoryTable
            categories={categories}
            onEdit={handleEdit}
            onDelete={confirmDelete}
          />

          {/* footer */}
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 font-medium">
              {totalItems} kategori terdaftar
            </p>

            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={(page) =>
                setCurrentPage(page)
              }
            />
          </div>
        </div>
      </div>

      {/* MODAL DELETE */}
      {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white rounded-md shadow-lg w-full max-w-md overflow-hidden border border-gray-200">
                        {/* Konten Utama */}
                        <div className="p-6 flex gap-4">
                            {/* Ikon Peringatan (Segitiga Merah) */}
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-red-50 flex items-center justify-center rounded-sm border border-red-100">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Teks */}
                            <div className="text-left">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">Hapus kategori?</h2>
                                <p className="text-gray-500 leading-relaxed">
                                    Data <span className="font-bold text-gray-800">{selectedCategory?.name}</span> akan dihapus secara permanen dari sistem. Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>
                        </div>

                        {/* Footer / Tombol (Ada garis pemisah halus) */}
                        <div className="bg-white px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                            <button 
                                onClick={() => setShowConfirm(false)} 
                                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-sm cursor-pointer hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={handleDelete} 
                                className="px-5 py-2 bg-red-50 text-red-700 border border-red-200 rounded-sm cursor-pointer hover:bg-red-600 hover:text-white transition-all text-sm font-medium"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </main>
  );
}