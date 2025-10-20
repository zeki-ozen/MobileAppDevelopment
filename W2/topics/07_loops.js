const generateButton = document.getElementById("generate");
const planList = document.getElementById("planList");
const codeOutput = document.getElementById("codeOutput");

const studyTips = [
  "Review lecture notes",
  "Practice array methods",
  "Build a mini project",
  "Read MDN documentation",
];

const dailyFocus = new Map([
  ["Monday", "Variables"],
  ["Tuesday", "Functions"],
  ["Wednesday", "DOM Manipulation"],
  ["Thursday", "Async Patterns"],
  ["Friday", "Project Practice"],
]);

generateButton.addEventListener("click", () => {
  planList.innerHTML = "";
  codeOutput.textContent = "";

  for (let i = 0; i < studyTips.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = `${i + 1}. ${studyTips[i]}`;
    planList.append(listItem);
  }

  for (const tip of studyTips) {
    logCode(`for...of tip: ${tip}`);
  }

  for (const [day, focus] of dailyFocus) {
    logCode(`Map entry: ${day} => ${focus}`);
  }

  let idx = 0;
  while (idx < studyTips.length) {
    logCode(`while loop index ${idx}`);
    idx++;
  }

  let countdown = 3;
  do {
    logCode(`do...while countdown: ${countdown}`);
    countdown--;
  } while (countdown > 0);

  studyTips.forEach((tip, index) => {
    logCode(`forEach ${index}: ${tip}`);
  });
});

function logCode(message) {
  codeOutput.textContent += message + "\n";
}
