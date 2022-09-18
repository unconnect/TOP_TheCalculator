const ui = {
  numberKeys: document.querySelectorAll("[data-key]"),
  operatorKeys: document.querySelectorAll("[data-operator]"),
  currentOperantText: document.querySelector("[data-current_operant_output]"),
  previousOperantText: document.querySelector("[data-previous_operant_output]"),
  operatorText: document.querySelector("[data-operator_output]"),
  clearKey: document.querySelector("[data-all-clear]"),
  deleteKey: document.querySelector("[data-delete]"),
};

const data = {
  clear: true,
  currentOperant: '',
  previousOperant: '',
  operator: '',
};

// Mathematical Operations
const add = (val1, val2) => {
  return val1 + val2;
};

const substract = (val1, val2) => {
  return val1 - val2;
};

const multiply = (val1, val2) => {
  return val1 * val2;
};

const divide = (val1, val2) => {
  return val1 / val2;
};

const operate = (val1, val2, operant) => {
  switch (operant) {
    case "+":
      return add(val1, val2);
    case "-":
      return substract(val1, val2);
    case "*":
      return multiply(val1, val2);
    case "/":
      return divide(val1, val2);
    default:
      return false;
  }
};

const updateDisplay = (data) => {
  ui.currentOperantText.textContent = data.currentOperant
  ui.previousOperantText.textContent = data.previousOperant;
  ui.operatorText.textContent = data.operator;
}

const updateCurrentOperant = (e) => {
  if(data.clear) {
    data.currentOperant = ''
    data.clear = false
  }
  data.currentOperant += String(e.target.dataset.key);
  updateDisplay(data)
  console.table(data)
}

const clearCalculator = () => {
  data.clear = true
  data.currentOperant = 0
  data.previousOperant = null
  data.operator = null
  updateDisplay(data);
}

const init = () => {
  ui.numberKeys.forEach(key => {
    key.addEventListener("click", updateCurrentOperant, false);
  })
  ui.clearKey.addEventListener("click", clearCalculator, false)
};

init();

// Debug Output
console.log(ui)
