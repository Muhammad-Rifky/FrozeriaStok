import db from "../../../../lib/db";
export async function PUT(request, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const body = await request.json();

    const {
      name,
      stock,
      price,
      category_id
    } = body;

    if (!id) {
      return Response.json(
        { error: "ID tidak valid" },
        { status: 400 }
      );
    }

    await db.execute(
      `
      UPDATE products
      SET
        name = ?,
        stock = ?,
        price = ?,
        category_id = ?
      WHERE id = ?
      `,
      [
        name,
        stock,
        price,
        category_id,
        id
      ]
    );

    return Response.json({
      message: "Barang berhasil diperbarui"
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal update barang" },
      { status: 500 }
    );
  }
}