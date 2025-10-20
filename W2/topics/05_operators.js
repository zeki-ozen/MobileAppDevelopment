const leftInput = document.getElementById("leftOperand");
const rightInput = document.getElementById("rightOperand");
const evaluateButton = document.getElementById("evaluate");
const results = document.getElementById("results");

evaluateButton.addEventListener("click", () => {
  const left = Number(leftInput.value);
  const right = Number(rightInput.value);

  const arithmetic = {
    addition: left + right,
    subtraction: left - right,
    multiplication: left * right,
    division: right !== 0 ? left / right : "Cannot divide by zero",
    remainder: right !== 0 ? left % right : "Undefined",
    exponent: left ** right,
  };

  const comparisons = {
    equal: left == right,
    strictEqual: left === right,
    notEqual: left != right,
    greaterThan: left > right,
    lessThan: left < right,
  };

  const logical = {
    and: left && right,
    or: left || right,
    notLeft: !left,
    nullishLeft: left ?? "default",
    nullishRight: right ?? "default",
  };

  results.innerHTML = `
    <h2>Results</h2>
    <h3>Arithmetic</h3>
    <pre>${formatObject(arithmetic)}</pre>
    <h3>Comparison</h3>
    <pre>${formatObject(comparisons)}</pre>
    <h3>Logical & Nullish Coalescing</h3>
    <pre>${formatObject(logical)}</pre>
    <p><strong>Ternary Example:</strong> ${left > right ? "Left is larger" : "Right is larger or equal"}</p>
  `;
});

function formatObject(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}
