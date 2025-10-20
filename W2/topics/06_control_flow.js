const weatherSelect = document.getElementById("weatherSelect");
const button = document.getElementById("suggest");
const recommendation = document.getElementById("recommendation");

button.addEventListener("click", () => {
  const weather = weatherSelect.value;

  let outfit;
  if (weather === "sunny") {
    outfit = "Wear sunglasses and light layers.";
  } else if (weather === "rainy") {
    outfit = "Grab a waterproof jacket and boots.";
  } else if (weather === "windy") {
    outfit = "Layer up with a windbreaker.";
  } else {
    outfit = "Bundle up with a warm coat and gloves.";
  }

  const activity = getSuggestedActivity(weather);

  recommendation.innerHTML = `
    <h2>Recommendation</h2>
    <p>${outfit}</p>
    <p><strong>Activity:</strong> ${activity}</p>
  `;
});

function getSuggestedActivity(condition) {
  switch (condition) {
    case "sunny":
      return "Go for a walk or have a picnic.";
    case "rainy":
      return "Enjoy a book indoors";
    case "windy":
      return "Fly a kite if you have one.";
    case "snowy":
      return "Build a snowman or stay cozy inside.";
    default:
      return "Make a warm drink and relax.";
  }
}
