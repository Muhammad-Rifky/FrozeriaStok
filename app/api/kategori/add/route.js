import db from "../../../lib/db";

export async function POST(request) {
  try {
    const { name, description } = await request.json();
    
    // Hanya 'name' yang wajib ada
    if (!name) {
      return Response.json({ error: "Nama kategori wajib diisi" }, { status: 400 });
    }

    await db.execute(
      "INSERT INTO categories (name, description) VALUES (?, ?)",
      [name, description || null] // Jika kosong, simpan sebagai NULL
    );  

    return Response.json({ message: "Kategori berhasil ditambahkan" }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return Response.json({ error: "Gagal menambahkan kategori" }, { status: 500 });
  }
}
