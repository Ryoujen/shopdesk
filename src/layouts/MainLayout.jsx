import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar (becomes top bar on mobile) */}
      <aside className="w-full md:w-64 bg-[#0B1B36] text-white flex flex-col md:min-h-screen shadow-lg">
        <div className="h-16 flex items-center px-6 border-b border-[#1A365D]">
          <h1 className="text-xl font-bold tracking-tight">ShopDesk</h1>
        </div>
        <nav className="flex md:flex-col flex-row gap-2 p-4 flex-1">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md text-sm transition-colors ${isActive("/") ? "bg-[#1A365D] text-white font-medium" : "text-slate-300 hover:bg-[#1A365D] hover:text-white"}`}
          >
            Dashboard
          </Link>
          <Link
            to="/products"
            className={`px-4 py-2 rounded-md text-sm transition-colors ${isActive("/products") ? "bg-[#1A365D] text-white font-medium" : "text-slate-300 hover:bg-[#1A365D] hover:text-white"}`}
          >
            Products
          </Link>
        </nav>
        {/* The duplicate Logout button has been removed from here */}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4 md:hidden">
            <span className="font-bold text-[#0B1B36]">ShopDesk</span>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:block">
              Hello, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm bg-slate-100 text-[#0B1B36] px-3 py-1.5 rounded-md hover:bg-slate-200 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-sm text-slate-500">
          &copy; 2026 ShopDesk. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
