const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("toi");
  themeToggle.textContent = isDark ? "Bật chế độ sáng" : "Bật chế độ tối";
  themeToggle.setAttribute("aria-pressed", String(isDark));
});
