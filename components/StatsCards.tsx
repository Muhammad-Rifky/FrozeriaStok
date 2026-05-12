"use client";
import { useEffect, useState } from "react";

export default function StatsCards() {
  const [statsData, setStatsData] = useState({
    totalBarang: 0,
    totalKategori: 0,
    stokMenipis: 0,
    stokHabis: 0,
  });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setStatsData(data);
      });
  }, []);

  const stats = [
    { label: 'Total barang', value: statsData.totalBarang },
    { label: 'Total kategori', value: statsData.totalKategori },
    { label: 'Stok menipis', value: statsData.stokMenipis, color: "text-orange-600" },
    { label: 'Stok habis', value: statsData.stokHabis, color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((item) => (
        <div key={item.label} className="border p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium">{item.label}</p>
          <h2 className={`text-4xl font-bold mt-2 ${item.color || "text-black"}`}>
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
