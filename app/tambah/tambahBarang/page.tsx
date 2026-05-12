"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TambahBarangPage() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // file image
  const [image, setImage] =
    useState<File | null>(null);

  // preview image
  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  // form data
  const [formData, setFormData] =
    useState({
      name: "",
      category_id: "",
      unit: "",
      stock: "",
      min_stock: "",
      price_sale: "",
      price_buy: "",
      weight: "",
      location: "",
      description: "",
    });

  // ======================
  // FETCH KATEGORI
  // ======================
  useEffect(() => {
    const fetchCategories =
      async () => {
        try {
          const response =
            await fetch(
              "/api/kategori"
            );

          const result =
            await response.json();

          const data =
            result.data ||
            result;

          setCategories(data);
        } catch (error) {
          console.error(
            "Gagal mengambil kategori:",
            error
          );
        }
      };

    fetchCategories();
  }, []);

  // ======================
  // HANDLE INPUT
  // ======================
  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData(
      (prev) => ({
        ...prev,
        [name]:
          value,
      })
    );
  };

  // ======================
  // HANDLE IMAGE
  // ======================
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (file) {
      setImage(file);

      const reader =
        new FileReader();

      reader.onloadend =
        () => {
          setImagePreview(
            reader.result as string
          );
        };

      reader.readAsDataURL(
        file
      );
    }
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      setLoading(true);

      try {
        const data =
          new FormData();

        data.append(
          "name",
          formData.name
        );

        data.append(
          "category_id",
          formData.category_id
        );

        data.append(
          "unit",
          formData.unit
        );

        data.append(
          "stock",
          formData.stock
        );

        data.append(
          "min_stock",
          formData.min_stock
        );

        data.append(
          "price_sale",
          formData.price_sale
        );

        data.append(
          "price_buy",
          formData.price_buy
        );

        data.append(
          "weight",
          formData.weight
        );

        data.append(
          "location",
          formData.location
        );

        data.append(
          "description",
          formData.description
        );

        if (image) {
          data.append(
            "image",
            image
          );
        }

        const res =
          await fetch(
            "/api/stok/tambah",
            {
              method:
                "POST",
              body: data,
            }
          );

        if (res.ok) {
          router.push(
            "/dashboard"
          );

          router.refresh();
        } else {
          alert(
            "Gagal menyimpan barang."
          );
        }
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="w-full bg-white border shadow-sm">
        <Navbar showAddButton={false} />

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1 transition"
            >
              ‹ Kembali
            </Link>

            <h2 className="text-black font-bold text-lg">
              Tambah Barang Baru
            </h2>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6"
          >
            {/* FOTO */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">
                Foto
                barang
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-3 bg-gray-50 relative overflow-hidden">
                {imagePreview ? (
                  <img
                    src={
                      imagePreview
                    }
                    alt="Preview"
                    className="h-32 object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-4xl">
                    🖼️
                  </span>
                )}

                <p className="text-xs text-gray-500">
                  Klik untuk
                  memilih
                  foto
                </p>

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={
                    handleFileChange
                  }
                />

                <button
                  type="button"
                  className="border border-gray-300 px-4 py-1.5 text-xs bg-white pointer-events-none"
                >
                  {imagePreview
                    ? "Ganti Foto"
                    : "Pilih Foto"}
                </button>
              </div>
            </div>

            {/* NAMA */}
            <div className="space-y-1">
              <label className="text-xs font-medium">
                Nama
                barang{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                name="name"
                required
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                className="w-full border px-4 py-2 text-sm"
                placeholder="Ayam nugget crispy"
              />
            </div>

            {/* KATEGORI + SATUAN */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium">
                  Kategori
                </label>

                <select
                  name="category_id"
                  required
                  value={
                    formData.category_id
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border px-4 py-2 text-sm"
                >
                  <option value="">
                    Pilih
                    kategori
                  </option>

                  {categories.map(
                    (
                      cat: any
                    ) => (
                      <option
                        key={
                          cat.id
                        }
                        value={
                          cat.id
                        }
                      >
                        {
                          cat.name
                        }
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">
                  Satuan
                </label>

                <input
                  name="unit"
                  value={
                    formData.unit
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border px-4 py-2 text-sm"
                  placeholder="pcs"
                />
              </div>
            </div>

            {/* STOK */}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="stock"
                type="number"
                value={
                  formData.stock
                }
                onChange={
                  handleChange
                }
                placeholder="Jumlah stok"
                className="border px-4 py-2 text-sm"
              />

              <input
                name="min_stock"
                type="number"
                value={
                  formData.min_stock
                }
                onChange={
                  handleChange
                }
                placeholder="Stok minimum"
                className="border px-4 py-2 text-sm"
              />
            </div>

            {/* HARGA */}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="price_sale"
                type="number"
                value={
                  formData.price_sale
                }
                onChange={
                  handleChange
                }
                placeholder="Harga jual"
                className="border px-4 py-2 text-sm"
              />

              <input
                name="price_buy"
                type="number"
                value={
                  formData.price_buy
                }
                onChange={
                  handleChange
                }
                placeholder="Harga beli"
                className="border px-4 py-2 text-sm"
              />
            </div>

            {/* BERAT + LOKASI */}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="weight"
                value={
                  formData.weight
                }
                onChange={
                  handleChange
                }
                placeholder="Berat"
                className="border px-4 py-2 text-sm"
              />

              <input
                name="location"
                value={
                  formData.location
                }
                onChange={
                  handleChange
                }
                placeholder="Lokasi"
                className="border px-4 py-2 text-sm"
              />
            </div>

            {/* DESKRIPSI */}
            <textarea
              name="description"
              rows={4}
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              className="w-full border px-4 py-2 text-sm"
              placeholder="Deskripsi barang"
            />

            {/* BUTTON */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  router.back()
                }
                className="border px-6 py-2 text-sm"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={
                  loading
                }
                className="border border-[#c1d35a] bg-[#f0f9c1] px-6 py-2 text-sm"
              >
                {loading
                  ? "Menyimpan..."
                  : "Simpan Barang"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}