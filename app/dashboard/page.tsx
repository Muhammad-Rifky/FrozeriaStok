"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import StatsCards from '@/components/StatsCards';
import ProductTable from '@/components/ProductTable';
import Pagination from '@/components/Pagination';
import Searchfilter from '@/components/Searchfilter';

export default function DashboardPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // States untuk Modal
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const fetchProducts = async () => {
        const url = `/api/products?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}&category=${category}`;
        const res = await fetch(url);
        const result = await res.json();
        setProducts(result.data || []);
        setTotalItems(result.total || 0);
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, searchQuery, category]);

    // --- LOGIKA HAPUS ---
    const confirmDelete = (item: any) => {
        setSelectedItem(item);
        setShowConfirm(true);
    };

const handleDelete = async () => {
  if (!selectedItem) return;

  try {
    const res = await fetch(`/api/products/${selectedItem.id}`, {
      method: "DELETE",
    });

    let data = null;

    // hanya parse JSON kalau ada isinya
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    }

    if (!res.ok) {
      console.log("Delete gagal:", data);
      return;
    }

    setShowConfirm(false);
    fetchProducts();
  } catch (error) {
    console.error("Gagal menghapus:", error);
  }
};

    // --- LOGIKA DETAIL ---
    const handleDetail = (id: number) => {
        router.push(`/dashboard/${id}`);
    };

    // --- LOGIKA EDIT ---
    const handleEdit = (id: number) => {
        router.push(`/dashboard/edit/${id}`);
    };

    return (
        <main className="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6 text-black">
            <div className="w-full bg-white border shadow-sm overflow-hidden">
                <Navbar buttonText="+ Tambah Barang" buttonHref="/tambah/tambahBarang" />

                <div className="p-6 space-y-5">
                    <StatsCards />
                    <Searchfilter onSearch={(q, cat) => {
                        setSearchQuery(q);
                        setCategory(cat);
                        setCurrentPage(1);
                    }} />
                    
                    <ProductTable 
                        products={products} 
                        onDelete={confirmDelete} 
                        onEdit={handleEdit}
                        onDetail={handleDetail}
                    />

                    <Pagination 
                        totalItems={totalItems} 
                        itemsPerPage={itemsPerPage} 
                        currentPage={currentPage} 
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* 🔥 MODAL KONFIRMASI HAPUS */}
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
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">Hapus barang?</h2>
                                <p className="text-gray-500 leading-relaxed">
                                    Data <span className="font-bold text-gray-800">{selectedItem?.name}</span> akan dihapus secara permanen dari sistem. Tindakan ini tidak dapat dibatalkan.
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
