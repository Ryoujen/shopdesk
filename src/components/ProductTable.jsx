import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import StockBadge from "./StockBadge";

export default function ProductTable({ products, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        No products found. Try a different search.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              // FIX: Appending the name ensures the key is unique even if IDs are duplicated
              <tr
                key={`${p.id}-${p.name}`}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {p.name}
                </td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4">{formatCurrency(p.price)}</td>
                <td className="px-6 py-4">
                  <StockBadge stock={p.stock} lowStockAlert={p.lowStockAlert} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-4 font-medium text-sm text-[#0B1B36]">
                    <Link to={`/products/${p.id}`} className="hover:underline">
                      View
                    </Link>
                    <Link
                      to={`/products/${p.id}/edit`}
                      className="hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(p)}
                      className="hover:underline text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
