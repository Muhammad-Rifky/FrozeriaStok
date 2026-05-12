"use client";
import { useEffect, useState } from "react";

export default function Searchfilter({ onSearch }: { onSearch: (query: string, category: string) => void }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // 1. Ambil list kategori unik dari API
  useEffect(() => {
    fetch("/api/products/categories") // Bisa buat API khusus kategori, atau filter dari produk
      .then((res) => res.json())
      .then((result) => {
        const data = result.data || [];

        const categories = data.map(
          (item: any) => item.category
        );

        setCategories(categories);
      });
  }, []);

  // 2. Fungsi untuk mengirim filter ke Parent
  const handleFilterChange = (q: string, cat: string) => {
    onSearch(q, cat);
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Cari nama barang..."
        className="flex-1 border px-4 py-3 outline-none focus:border-black text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleFilterChange(e.target.value, selectedCategory);
        }}
      />

      <select 
        className="border px-4 py-3 w-48 outline-none focus:border-black"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          handleFilterChange(search, e.target.value);
        }}
      >
        <option value="">Semua kategori</option>
        {categories.map((cat, index) => (
          <option key={`${cat}-${index}`} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
