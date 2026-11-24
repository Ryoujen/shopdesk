export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-[#0B1B36] rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 font-medium">Loading...</p>
    </div>
  );
}
