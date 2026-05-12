"use client";

export default function ProductTable({
  products,
  onDetail,
  onEdit,
  onDelete,
}: {
  products: any[];
  onDetail: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (item: any) => void;
}) {
  if (!products || products.length === 0) {
    return (
      <div className="w-full p-8 text-center border text-sm text-gray-500">
        Belum ada data barang untuk ditampilkan.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse border bg-white text-sm">
        <thead className="bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="p-3 border border-gray-200 p-3 font-medium">
              Nama barang
            </th>

            <th className="p-3 border border-gray-200 p-3 font-medium">
              Kategori
            </th>

            <th className="p-3 border border-gray-200 p-3  font-medium">
              Stok
            </th>

            <th className="p-3 border border-gray-200 p-3 font-medium">
              Satuan
            </th>

            <th className="p-3 border border-gray-200 p-3 font-medium">
              Harga jual
            </th>

            <th className="p-3 border border-gray-200 p-3  font-medium">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50"
            >
              {/* nama */}
              <td className="p-3 border border-gray-200 p-3">
                {item.name}
              </td>

              {/* kategori */}
              <td className="p-3 border border-gray-200 p-3">
                <span className="inline-block border px-2 py-0.5 text-xs text-gray-600 bg-gray-50">
                  {item.category || "-"}
                </span>
              </td>

              {/* stok */}
              <td className="p-3 border border-gray-200 p-3">
                {item.stock}
              </td>

              {/* satuan */}
              <td className="p-3 border border-gray-200 p-3">
                {item.unit}
              </td>

              {/* harga */}
              <td className="p-3 border border-gray-200 p-3">
                Rp{" "}
                {Number(
                  item.price
                ).toLocaleString(
                  "id-ID"
                )}
              </td>

              {/* aksi */}
              <td className="p-3 border border-gray-200 p-3 space-x-2">
                <button
                  onClick={() =>
                    onDetail(
                      item.id
                    )
                  }
                  className="border px-2 py-1 text-xs hover:bg-gray-50"
                >
                  Detail
                </button>

                <button
                  onClick={() =>
                    onEdit(
                      item.id
                    )
                  }
                  className="border px-2 py-1 text-xs text-blue-600 hover:bg-blue-50"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    onDelete(
                      item
                    )
                  }
                  className="border px-2 py-1 text-xs text-red-600 hover:bg-red-50"
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