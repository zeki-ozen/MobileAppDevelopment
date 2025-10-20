const output = {
  lang: "JavaScript",
  createdBy: "Brendan Eich",
  firstRelease: 1995,
  latestSpec: new Date().getFullYear(),
};

console.group("JavaScript quick facts");
Object.entries(output).forEach(([key, value]) => console.log(`${key}:`, value));
console.groupEnd();

console.info(
  "Tip: Open the console (⌥⌘I on macOS) to inspect these logs while viewing the fundamentals page."
);
