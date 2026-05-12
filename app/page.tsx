
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <section className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <p className="text-blue-700 font-semibold tracking-widest uppercase text-sm">
            Frozen Food Inventory System
          </p>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Kelola Stok Frozen Food
            <span className="text-blue-600 block">Lebih Mudah & Akurat</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
            Sistem berbasis web untuk membantu pengelolaan stok barang,
            memantau ketersediaan produk, serta mengurangi risiko kehabisan
            stok pada toko frozen food Anda.
          </p>

          <div className="flex gap-4 pt-2">
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
            >
              Masuk Dashboard
            </Link>

            <a
              href="#fitur"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition"
            >
              Pelajari Sistem
            </a>
          </div>
        </div>

        {/* RIGHT MOCKUP */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">Total Produk</p>
              <h2 className="text-3xl font-bold text-blue-700">148</h2>
            </div>

            <div className="bg-red-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">Stok Menipis</p>
              <h2 className="text-3xl font-bold text-red-600">12</h2>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between bg-gray-50 p-4 rounded-xl">
              <span>Ayam Nugget Crispy</span>
              <span className="font-semibold">120 pcs</span>
            </div>

            <div className="flex justify-between bg-gray-50 p-4 rounded-xl">
              <span>Sosis Sapi Premium</span>
              <span className="font-semibold">15 pack</span>
            </div>

            <div className="flex justify-between bg-gray-50 p-4 rounded-xl">
              <span>Dimsum Udang</span>
              <span className="font-semibold text-red-500">0 box</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
