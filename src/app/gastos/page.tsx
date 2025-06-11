// src/app/gastos/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Plus, Utensils, Car, Clapperboard, Bolt, Tag } from "lucide-react";
import GastosChart, { GastoResumen } from "@/modules/gastos/GastosChart";

interface Gasto {
  id: number;
  categoria: string;
  descripcion: string;
  monto: number;
  fecha: string;
}

const icons: Record<string, JSX.Element> = {
  Alimentación: <Utensils size={18} className="text-rose-500" />,
  Transporte: <Car size={18} className="text-emerald-500" />,
  Entretenimiento: <Clapperboard size={18} className="text-sky-500" />,
  Servicios: <Bolt size={18} className="text-yellow-500" />,
  Otros: <Tag size={18} className="text-violet-500" />,
};

export default function GastosPage() {
  const [gastos, setGastos] = useState<Gasto[]>([]);

  useEffect(() => {
    const ejemplo: Gasto[] = require("@/modules/gastos/data/gastos.json");
    setGastos(ejemplo);
  }, []);

  const resumen: GastoResumen[] = gastos.reduce((acc: GastoResumen[], gasto) => {
    const encontrado = acc.find((g) => g.categoria === gasto.categoria);
    if (encontrado) {
      encontrado.total += gasto.monto;
    } else {
      acc.push({ categoria: gasto.categoria, total: gasto.monto });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">Gastos</h2>
        <button className="flex items-center gap-2 bg-primary hover:opacity-90 text-white px-4 py-2 rounded">
          <Plus size={18} /> Nuevo gasto
        </button>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h3 className="font-semibold mb-2">Distribución por categoría</h3>
        <GastosChart data={resumen} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Categoría</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Monto</th>
              <th className="px-4 py-2 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map((g) => (
              <tr key={g.id} className="border-t">
                <td className="px-4 py-2 flex items-center gap-2">
                  {icons[g.categoria]} {g.categoria}
                </td>
                <td className="px-4 py-2">{g.descripcion}</td>
                <td className="px-4 py-2 text-right">${g.monto.toFixed(2)}</td>
                <td className="px-4 py-2">{g.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
