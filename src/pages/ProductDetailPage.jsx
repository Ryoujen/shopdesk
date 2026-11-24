import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api/products";
import Spinner from "../components/Spinner";
import { formatCurrency } from "../utils/formatCurrency";
import StockBadge from "../components/StockBadge";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;

  // Handle "Product Not Found" gracefully
  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto text-center p-12 bg-white rounded-xl border border-slate-200 mt-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Product Not Found
        </h2>
        <p className="text-slate-500 mb-6">
          The product you are looking for does not exist or has been deleted.
        </p>
        <Link
          to="/products"
          className="bg-[#0B1B36] text-white px-6 py-2 rounded-md hover:bg-[#1A365D] font-medium transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
      <Link
        to="/products"
        className="text-[#0B1B36] hover:underline text-sm font-medium mb-6 inline-block"
      >
        &larr; Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/3">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg border border-slate-200"
            />
          ) : (
            <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200 text-sm">
              No Image Available
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-bold text-[#0B1B36] mb-2">
            {product.name}
          </h2>
          <p className="text-slate-500 mb-4">SKU: {product.sku || "N/A"}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-slate-500 font-medium">Category</p>
              <p className="text-slate-800">{product.category}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Price</p>
              <p className="text-slate-800 font-bold">
                {formatCurrency(product.price)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Stock Status</p>
              <StockBadge
                stock={product.stock}
                lowStockAlert={product.lowStockAlert}
              />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Alert Level</p>
              <p className="text-slate-800">{product.lowStockAlert}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">
              Description
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">
              {product.description || "No description provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
