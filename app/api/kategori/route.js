import db from "../../lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;
    const search = searchParams.get("search") || "";

    let whereClause = "";
    let params = [];

    // filter search
    if (search) {
      whereClause = "WHERE c.name LIKE ?";
      params.push(`%${search}%`);
    }

    // ✅ TOTAL DATA (pagination)
    const [countRows] = await db.execute(
      `
      SELECT COUNT(*) as total
      FROM categories c
      ${whereClause}
      `,
      params
    );

    const total = countRows[0]?.total || 0;

    // ✅ DATA UTAMA + JOIN TOTAL BARANG
    const [dataRows] = await db.execute(
      `
      SELECT 
        c.id,
        c.name,
        c.description,
        c.created_at,
        COUNT(p.id) AS total_items
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      ${whereClause}
      GROUP BY c.id, c.name, c.description, c.created_at
      ORDER BY c.id DESC
      LIMIT ? OFFSET ?
      `,
      [...params, limit, offset]
    );

    return Response.json({
      data: dataRows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}