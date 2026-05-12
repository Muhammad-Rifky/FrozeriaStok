import db from "../../lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    // Query dinamis
    let whereClause = "WHERE 1=1";
    let params = [];

    // Filter nama barang
    if (search) {
      whereClause += " AND p.name LIKE ?";
      params.push(`%${search}%`);
    }

    // Filter kategori (berdasarkan nama kategori)
    if (category) {
      whereClause += " AND c.name = ?";
      params.push(category);
    }

    // =========================
    // HITUNG TOTAL
    // =========================
    const [totalRows] = await db.execute(
      `
      SELECT COUNT(*) as total
      FROM products p
      LEFT JOIN categories c
        ON p.category_id = c.id
      ${whereClause}
      `,
      params
    );

    const total = totalRows[0].total;

    // =========================
    // AMBIL DATA
    // =========================
    const [rows] = await db.execute(
      `
      SELECT
        p.id,
        p.name,
        c.name AS category,
        p.category_id,
        p.stock,
        p.unit,
        p.price
      FROM products p
      LEFT JOIN categories c
        ON p.category_id = c.id
      ${whereClause}
      ORDER BY p.id DESC
      LIMIT ? OFFSET ?
      `,
      [...params, limit, offset]
    );

    return Response.json({
      data: rows,
      total: total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error("Database Error:", error);

    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
