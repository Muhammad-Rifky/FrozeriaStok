"use client";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-end items-center mt-4">
      <div className="flex gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalItems === 0}
          className="border px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          ‹ Prev
        </button>

        {/* Nomor halaman */}
        {totalPages > 0 &&
          [...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`border px-3 py-1 ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={
            currentPage === totalPages ||
            totalItems === 0
          }
          className="border px-3 py-1 disabled:opacity-50 hover:bg-gray-50"
        >
          Next ›
        </button>
      </div>
    </div>
  );
}