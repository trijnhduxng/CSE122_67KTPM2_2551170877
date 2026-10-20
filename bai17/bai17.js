const registerForm = document.querySelector("#register-form");
const fields = {
  fullName: document.querySelector("#full-name"),
  email: document.querySelector("#email"),
  password: document.querySelector("#password"),
  confirmPassword: document.querySelector("#confirm-password"),
};
const successMessage = document.querySelector("#success-message");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showFieldResult(input, message) {
  const error = document.querySelector(`#${input.id}-error`);
  const isValid = message === "";
  input.classList.toggle("valid", isValid);
  input.classList.toggle("invalid", !isValid);
  input.setAttribute("aria-invalid", String(!isValid));
  error.textContent = isValid ? "✓ Hợp lệ" : message;
  error.classList.toggle("is-success", isValid);
}

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  successMessage.textContent = "";

  const errors = {
    fullName: fields.fullName.value.trim() ? "" : "Vui lòng nhập họ và tên.",
    email: emailPattern.test(fields.email.value.trim())
      ? ""
      : "Email chưa đúng định dạng.",
    password:
      fields.password.value.length >= 6
        ? ""
        : "Mật khẩu phải có ít nhất 6 ký tự.",
    confirmPassword:
      fields.confirmPassword.value === fields.password.value &&
      fields.confirmPassword.value !== ""
        ? ""
        : "Mật khẩu xác nhận chưa khớp.",
  };

  showFieldResult(fields.fullName, errors.fullName);
  showFieldResult(fields.email, errors.email);
  showFieldResult(fields.password, errors.password);
  showFieldResult(fields.confirmPassword, errors.confirmPassword);

  if (Object.values(errors).every((message) => message === "")) {
    successMessage.textContent = "✓ Đăng ký thành công!";
  }
});
