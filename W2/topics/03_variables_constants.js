const output = document.getElementById("scopeOutput");
const runButton = document.getElementById("runScopeDemo");

const log = (message = "") => {
  output.textContent += `${message}\n`;
};

runButton.addEventListener("click", () => {
  output.textContent = "Running scope demo...\n\n";

  log("Global scope start");

  var legacy = "var inside global";
  let modern = "let inside global";
  const constant = "const inside global";

  log(`global legacy var: ${legacy}`);
  log(`global modern let: ${modern}`);
  log(`global constant: ${constant}`);

  {
    log("\nEntering block scope");
    var legacy = "var hoisted to function/global scope";
    let modern = "block-scoped let";
    const constant = "block-scoped const";

    log(`block legacy var: ${legacy}`);
    log(`block modern let: ${modern}`);
    log(`block constant: ${constant}`);
  }

  log("\nBack to global scope");
  log(`legacy var after block: ${legacy}`);

  try {
    log(`modern let after block: ${modern}`);
  } catch (error) {
    log(`modern let after block: ReferenceError (${error.message})`);
  }

  log("Reassigning let is allowed.");
  modern = "updated value";
  log(`modern let after reassignment: ${modern}`);

  log("Attempting to reassign const...");
  try {
    constant = "should fail";
  } catch (error) {
    log(`const reassignment: TypeError (${error.message})`);
  }

  log("\nHoisting example:");
  log(hoistingExample());
});

function hoistingExample() {
  log("Accessing var before declaration: " + legacyHoisted);
  try {
    log("Accessing let before declaration: " + modernHoisted);
  } catch (error) {
    log(`let before declaration throws: ${error.message}`);
  }

  try {
    log("Accessing const before declaration: " + constHoisted);
  } catch (error) {
    log(`const before declaration throws: ${error.message}`);
  }

  var legacyHoisted = "var is hoisted as undefined";
  let modernHoisted = "let is not accessible before declaration";
  const constHoisted = "const is not accessible before declaration";

  return "Hoisting demo completed.";
}
