import db from "../../../lib/db";

export async function GET(request, context) {
  try {
    const { id } = await context.params;

    const [rows] = await db.execute(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    return Response.json({
      data: rows[0],
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal mengambil kategori" },
      { status: 500 }
    );
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const { name, description } = body;

    // 1. ambil nama kategori lama
    const [oldRows] = await db.execute(
      "SELECT name FROM categories WHERE id = ?",
      [id]
    );

    const oldName = oldRows[0]?.name;

    // 2. update tabel categories
    await db.execute(
      `
      UPDATE categories
      SET name = ?, description = ?
      WHERE id = ?
      `,
      [name, description, id]
    );

    // 3. update semua produk yg pakai nama kategori lama
    await db.execute(
      `
      UPDATE products
      SET category_id = ?
      WHERE category_id = ?
      `,
      [name, oldName]
    );

    return Response.json({
      message: "Kategori berhasil diupdate",
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal update kategori" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;

    await db.execute(
      "DELETE FROM categories WHERE id = ?",
      [id]
    );

    return Response.json({
      message: "Kategori berhasil dihapus",
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal menghapus kategori" },
      { status: 500 }
    );
  }
}