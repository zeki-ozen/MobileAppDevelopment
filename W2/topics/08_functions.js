const incomeInput = document.getElementById("income");
const rateInput = document.getElementById("rate");
const result = document.getElementById("result");
const calculateButton = document.getElementById("calculate");

function calculateTax(income, rate) {
  return income * (rate / 100);
}

const formatCurrency = function (value) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value);
};

const buildResultMessage = (income, rate, tax) => `
  <h2>Summary</h2>
  <p>Income: <strong>${formatCurrency(income)}</strong></p>
  <p>Tax rate: <strong>${rate}%</strong></p>
  <p>Tax due: <strong>${formatCurrency(tax)}</strong></p>
`;

calculateButton.addEventListener("click", () => {
  const income = Number(incomeInput.value);
  const rate = Number(rateInput.value);

  if (Number.isNaN(income) || Number.isNaN(rate)) {
    result.innerHTML = "<p>Please provide valid numbers.</p>";
    return;
  }

  const tax = calculateTax(income, rate);
  result.innerHTML = buildResultMessage(income, rate, tax);
});
