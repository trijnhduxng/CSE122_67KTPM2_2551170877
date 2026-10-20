const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const remaining = document.querySelector("#remaining");

function updateRemaining() {
  const count = taskList.querySelectorAll(".task-item:not(.completed)").length;
  remaining.textContent = `Còn ${count} việc cần làm`;
}

function addTask(taskText) {
  const item = document.createElement("li");
  item.className = "task-item";

  const label = document.createElement("label");
  label.className = "task-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    item.classList.toggle("completed", checkbox.checked);
    updateRemaining();
  });

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "Xóa";
  deleteButton.addEventListener("click", function () {
    item.remove();
    updateRemaining();
  });

  label.append(checkbox, text);
  item.append(label, deleteButton);
  taskList.append(item);
  updateRemaining();
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  addTask(taskText);
  taskInput.value = "";
  taskInput.focus();
});
