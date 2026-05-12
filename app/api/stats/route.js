import db from "../../lib/db";

export async function GET() {
  try {
    // 1. Total semua barang
    const [totalBarang] = await db.execute("SELECT COUNT(*) as count FROM products");
    
    // 2. Total kategori dari tabel master categories
    const [totalKategori] = await db.execute("SELECT COUNT(*) as count FROM categories");
    
    // 3. Stok Menipis: Stok lebih dari 0 dan KURANG DARI 20
    const [stokMenipis] = await db.execute(
      "SELECT COUNT(*) as count FROM products WHERE stock > 0 AND stock < 20"
    );
    
    // 4. Stok Habis: Stok tepat 0
    const [stokHabis] = await db.execute(
      "SELECT COUNT(*) as count FROM products WHERE stock = 0"
    );

    return Response.json({
      totalBarang: totalBarang[0].count,
      totalKategori: totalKategori[0].count,
      stokMenipis: stokMenipis[0].count,
      stokHabis: stokHabis[0].count,
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return Response.json({ error: "Gagal memuat statistik" }, { status: 500 });
  }
}
