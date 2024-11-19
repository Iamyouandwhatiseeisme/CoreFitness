"use client";
import React, { useEffect, useState } from "react";

interface Equipment {
  id: number;
  img: {
    img: string;
  };
}

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  useEffect(() => {
    const fetchEquipment = fetch("/api/equipment")
      .then((res) => res.json())
      .then((data) => setEquipment(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="min-h-wrapper">
      {equipment.map((equipment) => {
        return (
          <div>
            {equipment.id}
            <img src={equipment.img.img} alt={`${equipment.id}`}></img>
          </div>
        );
      })}
    </main>
  );
}
