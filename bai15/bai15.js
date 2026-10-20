const keys = document.querySelector("#keys");
const expressionDisplay = document.querySelector("#expression");
const resultDisplay = document.querySelector("#result");

let currentNumber = "0";
let firstNumber = null;
let operator = null;
let waitingForNumber = false;

function formatNumber(number) {
  if (!Number.isFinite(number)) return "Không thể tính";
  return String(Number(number.toPrecision(10)));
}

function calculate(left, right, currentOperator) {
  if (currentOperator === "+") return left + right;
  if (currentOperator === "−") return left - right;
  if (currentOperator === "×") return left * right;
  if (currentOperator === "÷") return right === 0 ? NaN : left / right;
  if (currentOperator === "%") return right === 0 ? NaN : left % right;
  return right;
}

function showResult() {
  resultDisplay.textContent = currentNumber;
}

keys.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.number !== undefined) {
    if (waitingForNumber || currentNumber === "Không thể tính") {
      currentNumber = button.dataset.number;
      waitingForNumber = false;
    } else {
      currentNumber =
        currentNumber === "0" ? button.dataset.number : currentNumber + button.dataset.number;
    }
    showResult();
    return;
  }

  if (button.dataset.action === "clear") {
    currentNumber = "0";
    firstNumber = null;
    operator = null;
    waitingForNumber = false;
    expressionDisplay.textContent = "";
    showResult();
    return;
  }

  if (button.dataset.action === "decimal") {
    if (waitingForNumber) {
      currentNumber = "0.";
      waitingForNumber = false;
    } else if (!currentNumber.includes(".")) {
      currentNumber += ".";
    }
    showResult();
    return;
  }

  if (button.dataset.action === "sign") {
    if (currentNumber !== "0" && currentNumber !== "Không thể tính") {
      currentNumber = currentNumber.startsWith("-")
        ? currentNumber.slice(1)
        : `-${currentNumber}`;
      showResult();
    }
    return;
  }

  if (button.dataset.operator) {
    const input = Number(currentNumber);
    if (operator && !waitingForNumber) {
      firstNumber = calculate(firstNumber, input, operator);
      currentNumber = formatNumber(firstNumber);
    } else if (firstNumber === null) {
      firstNumber = input;
    }
    operator = button.dataset.operator;
    expressionDisplay.textContent = `${currentNumber} ${operator}`;
    waitingForNumber = true;
    showResult();
    return;
  }

  if (button.dataset.action === "equals" && operator && firstNumber !== null) {
    const left = firstNumber;
    const right = Number(currentNumber);
    currentNumber = formatNumber(calculate(left, right, operator));
    expressionDisplay.textContent = `${formatNumber(left)} ${operator} ${formatNumber(right)} =`;
    firstNumber = null;
    operator = null;
    waitingForNumber = true;
    showResult();
  }
});
