// src/components/layout/Header.tsx
const Header = () => {
  return (
    <header className="w-full px-4 py-3 bg-white border-b shadow-sm flex justify-between items-center">
      <h1 className="font-semibold text-lg">Panel de Control</h1>
      <div className="text-sm text-gray-500">Bienvenido, Usuario</div>
    </header>
  );
};

export default Header;
