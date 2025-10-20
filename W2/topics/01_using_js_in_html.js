const button = document.getElementById("toggleHighlight");
const target = document.getElementById("colorTarget");
let highlighted = false;

button?.addEventListener("click", () => {
  highlighted = !highlighted;
  target.style.backgroundColor = highlighted ? "#fde68a" : "#f3f4f6";
  target.textContent = highlighted
    ? "Inline styles were updated from an external script!"
    : "Watch my background color change!";
});
