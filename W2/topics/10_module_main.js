import defaultMessage, { compoundInterest, formatCurrency } from "./10_math_utils.js";

const form = document.getElementById("mathForm");
const output = document.getElementById("output");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const principal = Number(form.principal.value);
  const rate = Number(form.rate.value);
  const years = Number(form.years.value);

  const future = compoundInterest(principal, rate, years);

  output.innerHTML = `
    <h2>Result</h2>
    <p>Principal: ${formatCurrency(principal)}</p>
    <p>Rate: ${rate}%</p>
    <p>Years: ${years}</p>
    <p><strong>Future value:</strong> ${formatCurrency(future)}</p>
    <p><em>${defaultMessage}</em></p>
  `;
});
