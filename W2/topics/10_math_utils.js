export function compoundInterest(principal, rate, years) {
  const factor = Math.pow(1 + rate / 100, years);
  return principal * factor;
}

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const defaultExportMessage = "Remember: modules are evaluated once and cached.";
export default defaultExportMessage;
