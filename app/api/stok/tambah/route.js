import db from "../../../lib/db";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    // =========================
    // Ambil FormData
    // =========================
    const formData =
      await request.formData();

    const name =
      formData.get("name");

    const category_id =
      formData.get(
        "category_id"
      );

    const stock =
      formData.get(
        "stock"
      );

    const unit =
      formData.get(
        "unit"
      );

    const price_sale =
      formData.get(
        "price_sale"
      );

    const min_stock =
      formData.get(
        "min_stock"
      );

    const price_buy =
      formData.get(
        "price_buy"
      );

    const weight =
      formData.get(
        "weight"
      );

    const location =
      formData.get(
        "location"
      );

    const description =
      formData.get(
        "description"
      );

    const image =
      formData.get(
        "image"
      );

    // =========================
    // VALIDASI
    // =========================
    if (
      !name ||
      !category_id ||
      !stock ||
      !unit
    ) {
      return Response.json(
        {
          error:
            "Nama, kategori, stok, dan satuan wajib diisi",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // HANDLE UPLOAD IMAGE
    // =========================
    let imagePath =
      null;

    if (
      image &&
      image.size > 0
    ) {
      const bytes =
        await image.arrayBuffer();

      const buffer =
        Buffer.from(
          bytes
        );

      // nama file unik
      const fileName = `${Date.now()}-${
        image.name
      }`;

      // folder tujuan
      const uploadDir =
        path.join(
          process.cwd(),
          "public/uploads"
        );

      // buat folder kalau belum ada
      if (
        !fs.existsSync(
          uploadDir
        )
      ) {
        fs.mkdirSync(
          uploadDir,
          {
            recursive: true,
          }
        );
      }

      const filePath =
        path.join(
          uploadDir,
          fileName
        );

      // simpan file
      fs.writeFileSync(
        filePath,
        buffer
      );

      // path untuk db
      imagePath = `/uploads/${fileName}`;
    }

    // =========================
    // INSERT DATABASE
    // =========================
    await db.execute(
      `
      INSERT INTO products
      (
        name,
        category_id,
        stock,
        unit,
        price,
        min_stock,
        price_buy,
        weight,
        location,
        description,
        image
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        category_id,
        stock,
        unit,
        price_sale || 0,
        min_stock || 0,
        price_buy || 0,
        weight || null,
        location || null,
        description || null,
        imagePath,
      ]
    );

    return Response.json(
      {
        message:
          "Barang berhasil ditambahkan",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Database Error:",
      error
    );

    return Response.json(
      {
        error:
          "Failed to add product",
      },
      {
        status: 500,
      }
    );
  }
}