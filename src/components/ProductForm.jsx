import { useState } from "react";
import Input from "./Input";

export default function ProductForm({ initialValues, onSubmit, submitting }) {
  const [form, setForm] = useState(
    initialValues || {
      name: "",
      sku: "",
      category: "Lights",
      price: "",
      stock: "",
      lowStockAlert: 5,
      imageUrl: "",
      description: "",
    },
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

   const validate = () => {
     const newErrors = {};
     if (!form.name || form.name.length < 3)
       newErrors.name = "Name must be at least 3 characters.";

     // FIX: Explicitly check for NaN (Not a Number)
     if (isNaN(form.price) || Number(form.price) <= 0)
       newErrors.price = "Price must be greater than 0.";

     if (
       isNaN(form.stock) ||
       Number(form.stock) < 0 ||
       !Number.isInteger(Number(form.stock))
     )
       newErrors.stock = "Stock must be a whole number ≥ 0.";

     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return; // Prevents double-clicking the save button
    if (validate()) {
      onSubmit({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        lowStockAlert: Number(form.lowStockAlert),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <Input
            label="Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />
        </div>
        <Input
          label="SKU"
          name="sku"
          value={form.sku}
          onChange={handleChange}
          placeholder="e.g. LGT-001"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white"
          >
            <option value="Lights">Lights</option>
            <option value="Fans">Fans</option>
            <option value="Switches">Switches</option>
            <option value="Wires">Wires</option>
            <option value="Tools">Tools</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <Input
          label="Price (Rs) *"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          error={errors.price}
        />
        <Input
          label="Stock *"
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          error={errors.stock}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <Input
            label="Low Stock Alert Level"
            name="lowStockAlert"
            type="number"
            value={form.lowStockAlert}
            onChange={handleChange}
          />
          <Input
            label="Image URL"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-5 py-2.5 border border-slate-300 rounded-lg text-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 bg-[#0B1B36] text-white rounded-lg font-medium disabled:opacity-70"
        >
          {submitting ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
