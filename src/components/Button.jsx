export default function Button({
  variant = "primary",
  onClick,
  disabled,
  children,
  type = "button",
}) {
  const baseStyle =
    "px-4 py-2 rounded-lg font-medium transition-colors text-sm disabled:opacity-50";
  const variants = {
    primary: "bg-[#0B1B36] text-white hover:bg-[#1A365D]",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
