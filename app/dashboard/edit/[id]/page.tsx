"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function EditBarangPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState<any[]>([]);

  // Ambil data barang + kategori
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setStock(data.stock || "");
        setPrice(data.price || "");
        setCategoryId(
          data.category_id?.toString() || ""
        );
      });

    fetch("/api/kategori")
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.data || []);
      });
  }, [id]);

  // Submit update
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `/api/products/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            stock,
            price,
            category_id: categoryId,
          }),
        }
      );

      if (res.ok) {
        router.push(
          `/dashboard/${id}`
        );
      } else {
        alert("Gagal menyimpan perubahan");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6 text-black">
      <div className="w-full bg-white border shadow-sm overflow-hidden">
        <Navbar showAddButton={false} />

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard`}
              className="border px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1"
            >
              ‹ Kembali
            </Link>

            <h2 className="text-black font-bold text-lg">
              Edit Barang
            </h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl space-y-5"
          >
            {/* Nama barang */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Nama barang{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                required
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border px-4 py-2 text-sm focus:outline-none focus:border-black"
                placeholder="Nama barang"
              />
            </div>

            {/* Kategori */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Kategori{" "}
                <span className="text-red-500">*</span>
              </label>

              <select
                required
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(
                    e.target.value
                  )
                }
                className="w-full border px-4 py-2 text-sm focus:outline-none focus:border-black"
              >
                <option value="">
                  Pilih kategori
                </option>

                {categories.map(
                  (cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Jumlah stok */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Jumlah stok{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                required
                value={stock}
                onChange={(e) =>
                  setStock(
                    e.target.value
                  )
                }
                className="w-full border px-4 py-2 text-sm focus:outline-none focus:border-black"
                placeholder="0"
              />
            </div>

            {/* Harga */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Harga{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                required
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                className="w-full border px-4 py-2 text-sm focus:outline-none focus:border-black"
                placeholder="0"
              />
            </div>

            {/* Tombol */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() =>
                  router.back()
                }
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