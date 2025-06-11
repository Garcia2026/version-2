// src/app/(tiendas)/tiendas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Plus, CalendarDays, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Tienda {
  id: number;
  nombre: string;
  marca: string;
  responsable: string;
  ods: string;
  estadoVisita: "Visitado" | "Pendiente";
  estadoOSD: "Falta" | "Impreso" | "Entregado en COVA";
  fechaPrimeraVisita: Date;
  segundaVisita: Date;
  tipoServicio: string;
  tipoPago: "Contado" | "Crédito";
  diasCredito: number;
  costo: number;
  estadoProceso: string;
  observaciones: string;
}

export default function TiendasPage() {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [mes, setMes] = useState<string>("");
  const [estadoVisitaFiltro, setEstadoVisitaFiltro] = useState<string>("");
  const [estadoOSDFiltro, setEstadoOSDFiltro] = useState<string>("");
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarEjemplo();
  }, []);

  function cargarEjemplo() {
    const ejemplo: Tienda[] = require("@/data/tiendas-cargadas.json");
    ejemplo.forEach(t => {
      t.fechaPrimeraVisita = new Date(t.fechaPrimeraVisita);
      t.segundaVisita = new Date(t.segundaVisita);
    });
    setTiendas(ejemplo);
    localStorage.setItem("tiendas", JSON.stringify(ejemplo));
  }

  const tiendasFiltradas = tiendas.filter((t) => {
    const coincideTexto =
      t.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.marca.toLowerCase().includes(busqueda.toLowerCase());
    const coincideMes = mes
      ? new Date(t.fechaPrimeraVisita).getMonth() + 1 === parseInt(mes)
      : true;
    const coincideEstadoVisita = estadoVisitaFiltro ? t.estadoVisita === estadoVisitaFiltro : true;
    const coincideEstadoOSD = estadoOSDFiltro ? t.estadoOSD === estadoOSDFiltro : true;
    return coincideTexto && coincideMes && coincideEstadoVisita && coincideEstadoOSD;
  });

  const resumenPorMarca = tiendas.reduce((acc: Record<string, number>, tienda) => {
    acc[tienda.marca] = (acc[tienda.marca] || 0) + 1;
    return acc;
  }, {});

  const dataGrafico = Object.entries(resumenPorMarca).map(([marca, cantidad]) => ({
    marca,
    cantidad,
  }));

  function exportarCSV() {
    const encabezado = "Nombre,Marca,Responsable,ODS,Primera Visita,Segunda Visita,Costo,Tipo Pago,Estado Visita,Estado OSD,Estado Proceso";
    const filas = tiendasFiltradas.map((t) => {
      return `${t.nombre},${t.marca},${t.responsable},${t.ods},${format(t.fechaPrimeraVisita, "dd/MM/yyyy")},${format(t.segundaVisita, "dd/MM/yyyy")},${t.costo},${t.tipoPago},${t.estadoVisita},${t.estadoOSD},${t.estadoProceso}`;
    });
    const csv = [encabezado, ...filas].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tiendas.csv";
    link.click();
  }

  function agregarTienda(tienda: Tienda) {
    const nuevas = [...tiendas, tienda];
    setTiendas(nuevas);
    localStorage.setItem("tiendas", JSON.stringify(nuevas));
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o marca"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        <select
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Todos los meses</option>
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
        <select
          value={estadoVisitaFiltro}
          onChange={(e) => setEstadoVisitaFiltro(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Todos los estados de visita</option>
          <option value="Visitado">Visitado</option>
          <option value="Pendiente">Pendiente</option>
        </select>
        <select
          value={estadoOSDFiltro}
          onChange={(e) => setEstadoOSDFiltro(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Todos los estados OSD</option>
          <option value="Falta">Falta</option>
          <option value="Impreso">Impreso</option>
          <option value="Entregado en COVA">Entregado en COVA</option>
        </select>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tiendas</h2>
        <div className="flex gap-2">
          <button onClick={exportarCSV} className="flex items-center gap-1 text-sm px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            <Download size={16} /> Exportar
          </button>
          <button className="flex items-center gap-1 text-sm px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            <CalendarDays size={16} /> Calendario
          </button>
          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <Plus size={18} /> Nueva tienda
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Resumen por marca</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dataGrafico}>
            <XAxis dataKey="marca" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Marca</th>
              <th className="px-4 py-2 text-left">Consultor</th>
              <th className="px-4 py-2 text-left">ODS</th>
              <th className="px-4 py-2 text-left">Estado Visita</th>
              <th className="px-4 py-2 text-left">Estado OSD</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tiendasFiltradas.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2">{t.nombre}</td>
                <td className="px-4 py-2">{t.marca}</td>
                <td className="px-4 py-2">{t.responsable}</td>
                <td className="px-4 py-2">{t.ods}</td>
                <td className="px-4 py-2">{t.estadoVisita}</td>
                <td className="px-4 py-2">{t.estadoOSD}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline mr-2">Ver</button>
                  <button className="text-green-600 hover:underline">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
