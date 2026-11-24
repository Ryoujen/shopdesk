import { Link } from "react-router-dom";
import { getProducts } from "../api/products";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import StatCard from "../components/StatCard";
import { formatCurrency } from "../utils/formatCurrency";

export default function DashboardPage() {
  const { data: products, loading, error, reload } = useFetch(getProducts);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  // Calculate Stats
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + Number(p.stock), 0);
  const lowStockItems = products.filter(
    (p) => Number(p.stock) <= Number(p.lowStockAlert),
  );
  const totalValue = products.reduce(
    (sum, p) => sum + Number(p.price) * Number(p.stock),
    0,
  );
  const lowestStock = [...products]
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#0B1B36] mb-6">Dashboard</h2>

      {/* Empty State - If Database is empty */}
      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            Your inventory is empty
          </h3>
          <p className="text-slate-500 mb-4">
            Get started by adding your first product.
          </p>
          <Link
            to="/products/new"
            className="bg-[#0B1B36] text-white px-4 py-2 rounded-md hover:bg-[#1A365D] transition-colors font-medium text-sm"
          >
            + Add Product
          </Link>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Products" value={totalProducts} />
            <StatCard title="Stock" value={totalStock} />
            <StatCard
              title="Low stock"
              value={lowStockItems.length}
              hint="Needs attention"
            />
            <StatCard title="Value" value={formatCurrency(totalValue)} />
          </div>

          {/* Lowest Stock Items */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-bold text-[#0B1B36]">
                Lowest stock items
              </h3>
            </div>
            <ul className="divide-y divide-slate-100">
              {lowestStock.map((p) => (
                <li
                  key={p.id}
                  className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-700">{p.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500 text-sm">
                      {p.stock} left
                    </span>
                    <Link
                      to={`/products/${p.id}`}
                      className="text-sm text-[#0B1B36] hover:underline font-medium"
                    >
                      View
                    </Link>
                    <Link
                      to={`/products/${p.id}/edit`}
                      className="text-sm text-slate-400 hover:text-[#0B1B36] hover:underline font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
