import { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../api/products";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import ProductTable from "../components/ProductTable";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { useToast } from "../context/ToastContext";

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  // 1. Fetch Data
  const fetchProductsList = useCallback(() => getProducts(), []);
  const {
    data: products,
    loading,
    error,
    reload,
  } = useFetch(fetchProductsList);

  // 2. States
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("none");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { showToast } = useToast();

  // 3. Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...(products || [])];
    if (debouncedSearch)
      result = result.filter((p) =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    if (category !== "All")
      result = result.filter((p) => p.category === category);
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "stock-asc") result.sort((a, b) => a.stock - b.stock);
    if (sort === "stock-desc") result.sort((a, b) => b.stock - a.stock);
    return result;
  }, [products, debouncedSearch, category, sort]);

  // 4. Pagination Calculations (MUST be before useEffect)
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  // 5. Effects
  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, sort]);

  // If you delete the only item on the last page, go back to the previous page
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // 6. Delete Handler
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct(deleteTarget.id);
      showToast("Product deleted successfully", "success");
      reload();
    } catch (err) {
      showToast("Failed to delete product", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  // 7. Render States
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-[#0B1B36]">Products</h2>
        <Link
          to="/products/new"
          className="bg-[#0B1B36] text-white px-4 py-2 rounded-md hover:bg-[#1A365D] transition-colors font-medium text-sm"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B36]"
        >
          <option value="All">All Categories</option>
          <option value="Lights">Lights</option>
          <option value="Fans">Fans</option>
          <option value="Switches">Switches</option>
          <option value="Wires">Wires</option>
          <option value="Tools">Tools</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B36]"
        >
          <option value="none">Sort by...</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="stock-asc">Stock: Low to High</option>
          <option value="stock-desc">Stock: High to Low</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            No products found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          <ProductTable
            products={paginatedProducts}
            onDelete={setDeleteTarget}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <Modal
        isOpen={!!deleteTarget}
        title="Confirm Delete"
        onClose={() => setDeleteTarget(null)}
      >
        <p className="text-slate-600 mb-6">
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteTarget(null)}
            className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="px-4 py-2 bg-[#0B1B36] text-white rounded-md hover:bg-[#1A365D] transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
