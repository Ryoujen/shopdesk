export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-600 disabled:opacity-50 hover:bg-slate-50 font-medium text-sm"
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${p === page ? "bg-[#0B1B36] text-white border-[#0B1B36]" : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"}`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-600 disabled:opacity-50 hover:bg-slate-50 font-medium text-sm"
      >
        Next
      </button>
    </div>
  );
}
