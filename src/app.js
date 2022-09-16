const ui = {
  numberKeys: document.querySelectorAll("[data-key]"),
  operatorKeys: document.querySelectorAll("[data-operator]"),
  currentOperantText: document.querySelector("[data-current_operant]"),
  clearKey: document.querySelector("[data-clear]"),
};

const data = {
  clear: true,
  values: [],
  operator: null,
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

const updateDisplay = (value) => {
  if(ui.currentOperantText.textContent == '0') ui.currentOperantText.textContent = "";
  ui.currentOperantText.textContent += value;
}

const updateCalculator = (e) => {
  console.log(e.target.dataset.key)
  updateDisplay(e.target.dataset.key);
  data.values[0] = Number(ui.currentOperantText.textContent);
  console.table(data.values);
}

const clearCalculator = () => {
  data['clear'] = true
  data['values'] = []
  data['operator'] = null
  ui.currentOperantText.textContent = 0
}

const init = () => {
  ui.numberKeys.forEach(key => {
    key.addEventListener('click', updateCalculator, false)
  })
  ui.clearKey.addEventListener("click", clearCalculator, false)
};

init();

// Debug Output
console.log(ui)
