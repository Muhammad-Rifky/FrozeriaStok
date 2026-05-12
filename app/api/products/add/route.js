import db from "../../lib/db";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const stock = formData.get("stock");
    const price = formData.get("price");
    const category_id = formData.get("category_id");
    const image = formData.get("image");

    let imagePath = null;

    // kalau ada file
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${image.name}`;

      const uploadDir = path.join(
        process.cwd(),
        "public/uploads"
      );

      // buat folder kalau belum ada
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    }

    await db.execute(
      `
      INSERT INTO products
      (
        name,
        stock,
        price,
        category_id,
        image
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        name,
        stock,
        price,
        category_id,
        imagePath,
      ]
    );

    return Response.json({
      message: "Barang berhasil ditambahkan",
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal upload" },
      { status: 500 }
    );
  }
}