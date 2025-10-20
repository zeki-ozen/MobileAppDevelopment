(function () {
  const greeting = "Hello from Node.js!";
  const sum = (a, b) => a + b;

  if (typeof window === "undefined") {
    // Running in Node.js
    console.log(greeting);
    console.log(`Current time: ${new Date().toISOString()}`);
    console.log(`Sum (2 + 3): ${sum(2, 3)}`);
  } else {
    // Running in the browser
    const container = document.createElement("section");
    container.innerHTML = `
      <h2>Shared Script Output</h2>
      <p><strong>${greeting}</strong> (executed in the browser)</p>
      <p>The current time is ${new Date().toLocaleString()}</p>
      <p>Sum (2 + 3): ${sum(2, 3)}</p>
    `;
    document.body.append(container);
  }
})();
