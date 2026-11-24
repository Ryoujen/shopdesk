export default function StockBadge({ stock, lowStockAlert = 5 }) {
  let label = "In stock";
  let cls = "bg-slate-100 text-slate-700 border-slate-200";

  if (stock === 0) {
    label = "Out of stock";
    cls = "bg-red-50 text-red-600 border-red-100";
  } else if (stock <= lowStockAlert) {
    label = "Low (" + stock + ")";
    cls = "bg-amber-50 text-amber-600 border-amber-100";
  } else {
    label = "In stock (" + stock + ")";
  }

  // Added 'whitespace-nowrap' so the text doesn't break into two lines
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${cls}`}
    >
      {label}
    </span>
  );
}
