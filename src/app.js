const elements = {
  command_keys: document.querySelectorAll(".command_keys button"),
  operator_keys: document.querySelectorAll(".operator_keys button"),
  number_keys: document.querySelectorAll(".number_keys button"),
  display: document.querySelector(".display .output")
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
  if(elements.display.textContent == '0') elements.display.textContent = "";
  elements.display.textContent += value;
}

const updateCalculator = (e) => {
  console.log(e.target.value)
  updateDisplay(e.target.value)
  data.values[0] = Number(elements.display.textContent);
  console.table(data.values);
}

const clearCalculator = () => {
  data['clear'] = true
  data['values'] = []
  data['operator'] = null
  elements.display.textContent = 0
}

const init = () => {
  elements.number_keys.forEach(key => {
    key.addEventListener('click', updateCalculator, false)
  })
  elements.command_keys.forEach((key) => {
    key.addEventListener("click", clearCalculator, false);
  });
};

init();

// Debug Output
console.log(elements)
