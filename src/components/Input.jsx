export default function Input({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1B36] transition-colors ${
          error ? "border-red-500 bg-red-50" : "border-slate-300 bg-white"
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1.5 font-medium">{error}</p>
      )}
    </div>
  );
}
