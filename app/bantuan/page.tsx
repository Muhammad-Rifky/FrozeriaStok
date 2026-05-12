import Navbar from "@/components/Navbar";

export default function BantuanPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6 text-black">
      <div className="w-full bg-white border shadow-sm overflow-hidden">
        <Navbar showAddButton={false} />
        <div className="p-6 space-y-5">
          <h2 className="text-black font-bold text-lg">Panduan Penggunaan Sistem</h2>

          {/* Bagian 1 */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-black font-bold mb-4">Cara menambah barang baru</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 border border-gray-400 text-xs font-bold bg-white text-black">1</span>
                <span>Buka halaman <strong className="font-bold">Dashboard</strong>, klik tombol <strong className="font-bold">+ Tambah Barang</strong> di kanan atas.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 border border-gray-400 text-xs font-bold bg-white text-black">2</span>
                <span>Unggah foto barang (opsional), lalu isi formulir: nama, kategori,satuan, jumlah stok, harga, dan lainnya.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 border border-gray-400 text-xs font-bold bg-white text-black">3</span>
                <span>Klik <strong className="font-bold">Simpan barang</strong>. Barang akan muncul di daftar dashboard.</span>
              </li>
            </ul>
          </div>

          {/* Bagian 2 */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-black font-bold mb-4">Cara update stok barang masuk</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 border border-gray-400 text-xs font-bold bg-white text-black">1</span>
                <span>Temukan barang di dashboard menggunakan kolom pencarian atau filter kategori.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 border border-gray-400 text-xs font-bold bg-white text-black">2</span>
                <span>Klik tombol <strong className="font-bold">Edit</strong> pada baris barang tersebut.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 border border-gray-400 text-xs font-bold bg-white text-black">3</span>
                <span>Ubah nilai <strong className="font-bold">Jumlah stok</strong> sesuai kondisi saat ini, lalu klik <strong className="font-bold">Simpan barang</strong>.</span>
              </li>
            </ul>
          </div>

          {/* Bagian 3 */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-black font-bold mb-4">Cara mengelola kategori</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 border border-gray-400 text-xs font-bold bg-white text-black">1</span>
                <span>Buka halaman <strong className="font-bold">Kategori</strong> dari navigasi atas.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 border border-gray-400 text-xs font-bold bg-white text-black">2</span>
                <span>Tambah, edit, atau hapus kategori sesuai kebutuhan toko.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 border border-gray-400 text-xs font-bold bg-white text-black">3</span>
                <span>Menghapus kategori tidak akan menghapus barang &mdash; barang akan menjadi tidak berkategori.</span>
              </li>
            </ul>
          </div>

          {/* Bagian Bawah (Info) */}
          <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3">
            <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
               <span className="text-[10px]">♀</span>
            </div>
            <p className="text-gray-700 text-sm">
              Satuan barang diisi bebas sesuai kebutuhan &mdash; misalnya: <strong className="font-bold">pcs, pack, box, kg, liter</strong> dan lain-lain.
            </p>
          </div>
          <div>
            <p className="text-gray-700 text-sm">
              Muhammad Rifky &mdash; 2241720176 &mdash; TI4F &mdash; Sudimoro Dalam  &mdash; 089560038xxxx &mdash; rifkybiantoro87@gmail.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
