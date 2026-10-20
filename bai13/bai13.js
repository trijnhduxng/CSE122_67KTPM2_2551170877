const digitImages = document.querySelectorAll("[data-digit]");
const greeting = document.querySelector("#greeting");

function updateClock() {
  const now = new Date();
  const time = [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");

  digitImages.forEach(function (image, index) {
    const digit = time[index];
    image.src = `../Anh/Bai13/0${digit}.gif`;
    image.alt = digit;
  });

  const hour = now.getHours();
  if (hour >= 5 && hour < 12) {
    greeting.textContent = "Chào buổi sáng!";
  } else if (hour >= 12 && hour < 18) {
    greeting.textContent = "Chào buổi chiều!";
  } else {
    greeting.textContent = "Chào buổi tối!";
  }
}

updateClock();
setInterval(updateClock, 1000);
