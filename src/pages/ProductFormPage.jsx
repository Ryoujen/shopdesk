import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, createProduct, updateProduct } from "../api/products";
import ProductForm from "../components/ProductForm";
import Spinner from "../components/Spinner";
import { useToast } from "../context/ToastContext";

export default function ProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getProduct(id)
        .then((data) => {
          setInitialData({
            ...data,
            price: String(data.price),
            stock: String(data.stock),
          });
        })
        .catch(() => showToast("Failed to load", "error"))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, showToast]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (isEdit) {
        await updateProduct(id, payload);
        showToast("Product updated", "success");
      } else {
        await createProduct(payload);
        showToast("Product created", "success");
      }
      navigate("/products");
    } catch (err) {
      showToast("Failed to save", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-[#0B1B36] mb-6">
        {isEdit ? "Edit Product" : "Add Product"}
      </h2>
      <ProductForm
        initialValues={initialData}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
}
