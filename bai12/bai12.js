const calendarForm = document.querySelector("#calendar-form");
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const errorMessage = document.querySelector("#error-message");

const monthNames = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const weekdayNames = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

function showDate(date) {
  document.querySelector("#calendar-year").textContent = date.getFullYear();
  document.querySelector("#calendar-month").textContent =
    monthNames[date.getMonth()];
  document.querySelector("#calendar-day").textContent = date.getDate();
  document.querySelector("#calendar-weekday").textContent =
    weekdayNames[date.getDay()];
}

function showGreeting() {
  const hour = new Date().getHours();
  let greeting = "Chào buổi tối!";

  if (hour >= 5 && hour < 12) {
    greeting = "Chào buổi sáng!";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Chào buổi chiều!";
  }

  document.querySelector("#greeting").textContent = greeting;
}

function displayToday() {
  const today = new Date();
  dayInput.value = today.getDate();
  monthInput.value = today.getMonth() + 1;
  yearInput.value = today.getFullYear();
  showDate(today);
  showGreeting();
}

calendarForm.addEventListener("submit", function (event) {
  event.preventDefault();
  errorMessage.textContent = "";
  dayInput.classList.remove("is-invalid");
  monthInput.classList.remove("is-invalid");
  yearInput.classList.remove("is-invalid");

  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);

  if (!dayInput.value || !monthInput.value || !yearInput.value) {
    if (!dayInput.value) dayInput.classList.add("is-invalid");
    if (!monthInput.value) monthInput.classList.add("is-invalid");
    if (!yearInput.value) yearInput.classList.add("is-invalid");
    errorMessage.textContent = "Vui lòng nhập đầy đủ ngày, tháng và năm.";
    return;
  }

  const isDayValid = Number.isInteger(day) && day >= 1 && day <= 31;
  const isMonthValid = Number.isInteger(month) && month >= 1 && month <= 12;
  const isYearValid = Number.isInteger(year) && year >= 1000 && year <= 9999;

  if (!isDayValid || !isMonthValid || !isYearValid) {
    if (!isDayValid) dayInput.classList.add("is-invalid");
    if (!isMonthValid) monthInput.classList.add("is-invalid");
    if (!isYearValid) yearInput.classList.add("is-invalid");
    errorMessage.textContent = "Ngày, tháng hoặc năm không hợp lệ.";
    return;
  }

  const selectedDate = new Date(year, month - 1, day);

  if (
    selectedDate.getDate() !== day ||
    selectedDate.getMonth() !== month - 1 ||
    selectedDate.getFullYear() !== year
  ) {
    dayInput.classList.add("is-invalid");
    errorMessage.textContent = "Ngày này không tồn tại trong lịch.";
    return;
  }

  showDate(selectedDate);
  showGreeting();
});

displayToday();