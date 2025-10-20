const input = document.getElementById("valueInput");
const mode = document.getElementById("modeSelect");
const results = document.getElementById("results");
const button = document.getElementById("inspectButton");

button.addEventListener("click", () => {
  let raw = input.value;

  if (!raw.length) {
    results.innerHTML = `<p>Please enter something to inspect.</p>`;
    return;
  }

  let value;
  try {
    switch (mode.value) {
      case "json":
        value = JSON.parse(raw);
        break;
      case "string":
        value = raw;
        break;
      default:
        // eslint-disable-next-line no-eval
        value = eval(`(${raw})`);
    }
  } catch (error) {
    results.innerHTML = `<p>Unable to parse the value: <code>${error.message}</code></p>`;
    return;
  }

  const typeOf = typeof value;
  const isArray = Array.isArray(value);
  const isNull = value === null;
  const constructorName = value && value.constructor ? value.constructor.name : "N/A";

  results.innerHTML = `
    <h2>Inspection Result</h2>
    <p><strong>Value:</strong> <code>${formatValue(value)}</code></p>
    <p><strong>typeof:</strong> <code>${typeOf}</code></p>
    <p><strong>Array?</strong> ${isArray}</p>
    <p><strong>Null?</strong> ${isNull}</p>
    <p><strong>Constructor:</strong> <code>${constructorName}</code></p>
  `;
});

function formatValue(value) {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "bigint") {
    return value.toString() + "n";
  }
  if (typeof value === "symbol") {
    return value.toString();
  }
  if (typeof value === "function") {
    return value.toString();
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch (error) {
    return String(value);
  }
}
