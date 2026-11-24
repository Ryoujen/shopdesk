export default function StatCard({ title, value, hint }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-[#0B1B36]">
      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
        {title}
      </p>
      <p className="text-3xl font-bold text-[#0B1B36] mt-2">{value}</p>
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}
