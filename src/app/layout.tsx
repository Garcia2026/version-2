// src/app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Soluciones GN",
  description: "Panel administrativo empresarial"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="p-4 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
