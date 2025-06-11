// src/components/layout/Sidebar.tsx
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-white border-r shadow-sm hidden md:block">
      <div className="p-4 font-bold text-xl border-b">Soluciones GN</div>
      <nav className="p-4 flex flex-col gap-2">
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <Link href="/tiendas" className="hover:text-blue-600">Tiendas</Link>
        <Link href="/ingresos" className="hover:text-blue-600">Ingresos</Link>
        <Link href="/resumen" className="hover:text-blue-600">Resumen</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
