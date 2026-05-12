"use client";
import { useEffect } from "react";


type Category = {
  id: number;
  name: string;
  description?: string;
  total_items: number;
  created_at: string;
};

type Props = {
  categories: Category[];
  onEdit: (id: number) => void;
  onDelete: (item: Category) => void;
};

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="border border-gray-200">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 text-left text-sm text-gray-600">
          <tr>
            <th className="p-3 border border-gray-200 p-3 font-medium">
              Nama kategori
            </th>

            <th className="p-3 border border-gray-200 p-3 font-medium">
              Jumlah barang
            </th>

            <th className="p-3 border border-gray-200 p-3 font-medium">
              Dibuat
            </th>

            <th className="p-3 border border-gray-200 p-3 font-medium">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {categories.map((cat) => (
            <tr
              key={cat.id}
              className="hover:bg-gray-50"
            >
              <td className="p-3 border border-gray-200 p-3">
                {cat.name}
              </td>

              <td className="p-3 border border-gray-200 p-3 text-gray-500">
                {cat.total_items} barang
              </td>

              <td className="p-3 border border-gray-200 p-3 text-gray-500">
                {new Date(
                  cat.created_at
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>

              <td className="p-3 border border-gray-200 p-3 space-x-2">
                {/* EDIT */}
                <button
                  onClick={() =>
                    onEdit(cat.id)
                  }
                  className="border px-3 py-1 text-blue-600 hover:bg-blue-50"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() =>
                    onDelete(cat)
                  }
                  className="border px-3 py-1 text-red-600 hover:bg-red-50"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}