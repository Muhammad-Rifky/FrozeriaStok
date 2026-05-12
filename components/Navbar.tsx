"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({
  buttonText,
  buttonHref,
  showAddButton = true,
}: {
  buttonText?: string;
  buttonHref?: string;
  showAddButton?: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white px-4 md:px-8 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* kiri */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <h1 className="text-2xl font-bold whitespace-nowrap">
            Frozeria <span className="text-gray-400">Stok</span>
          </h1>

          <div className="flex gap-2 sm:gap-4 text-lg">
            <Link
              href="/dashboard"
              className={`px-4 py-2 ${
                pathname === "/dashboard"
                  ? "bg-gray-700"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Dashboard
            </Link>

            <Link
              href="/kategori"
              className={`px-4 py-2 ${
                pathname === "/kategori"
                  ? "bg-gray-700"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Kategori
            </Link>

            <Link
              href="/bantuan"
              className={`px-4 py-2 ${
                pathname === "/bantuan"
                  ? "bg-gray-700"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Bantuan
            </Link>
          </div>
        </div>

        {/* kanan */}
        {showAddButton && (
          <Link
            href={buttonHref || "#"}
            className="border border-gray-600 px-5 py-2 text-base font-medium hover:bg-gray-800 self-start md:self-auto"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </nav>
  );
}