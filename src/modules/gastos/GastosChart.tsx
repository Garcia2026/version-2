// src/modules/gastos/GastosChart.tsx
"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export interface GastoResumen {
  categoria: string;
  total: number;
}

const COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#eab308", "#a855f7"];

export default function GastosChart({ data }: { data: GastoResumen[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie dataKey="total" data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
