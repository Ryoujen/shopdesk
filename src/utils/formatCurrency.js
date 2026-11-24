export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("NPR", "Rs.");
};
