const effects = document.querySelector("#effects");
const flowerImage = document.querySelector("#flower-image");

effects.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-effect]");
  if (!button) return;

  flowerImage.className = button.dataset.effect;
  const activeButton = effects.querySelector(".active");
  if (activeButton) activeButton.classList.remove("active");
  button.classList.add("active");
});
