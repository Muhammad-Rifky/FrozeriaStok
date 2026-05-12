import db from "../../../lib/db";

// ================= GET BY ID =================
export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const [rows] = await db.execute(
      `
      SELECT p.*, c.name AS category
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
      `,
      [id]
    );

    if (!rows || rows.length === 0) {
      return Response.json(
        { error: "Barang tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json(rows[0]);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    await db.execute("DELETE FROM products WHERE id = ?", [id]);

    return Response.json({ message: "Deleted" });
  } catch (err) {
    return Response.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}