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
  currentOperant: "",
  previousOperant: "",
  result: "",
  calculationOperator: "",
  currentOperator: "",
};

// Mathematical Operations
const add = (val1, val2) => {
  return String(Number(val1) + Number(val2));
};

const substract = (val1, val2) => {
  return String(Number(val1) - Number(val2));
};

const multiply = (val1, val2) => {
  return String(Number(val1) * Number(val2));
};

const divide = (val1, val2) => {
  return String(Number(val1) / Number(val2));
};

const operate = (data) => {
  switch (data.calculationOperator) {
    case "+":
      data.result = add(data.previousOperant, data.currentOperant);
      break;
    case "-":
      data.result = substract(data.previousOperant, data.currentOperant);
      break;
    case "*":
      data.result = multiply(data.previousOperant, data.currentOperant);
      break;
    case "/":
      data.result = divide(data.previousOperant, data.currentOperant);
      break;
  }
  if(data.currentOperator === '=') {
    data.previousOperant = ''
    data.currentOperant = data.result
    updateDisplay(data);
    data.calculationOperator = ''
    return
  }
  data.previousOperant = data.result
  data.calculationOperator = data.currentOperator
  data.currentOperant = ''
  updateDisplay(data)
};

const updateDisplay = (data) => {
  ui.currentOperantText.textContent = data.currentOperant
  ui.previousOperantText.textContent = data.previousOperant;
  ui.operatorText.textContent = data.currentOperator;
  console.table(data);
}

const updateCurrentOperant = (e) => {
  if(data.clear || !data.currentOperant || data.result) {
    data.result = ''
    data.currentOperant = ''
    data.clear = false
  }
  data.currentOperant = data.currentOperant + String(e.target.dataset.key);
  updateDisplay(data)
}

const setOperation = (e) => {
  data.currentOperator = String(e.target.dataset.operator);
  if (data.previousOperant && data.calculationOperator) {
    operate(data);
    return;
  }
  data.previousOperant = data.currentOperant
  data.calculationOperator = data.currentOperator;
  data.currentOperant = ''
  updateDisplay(data)
}

const clearCalculator = () => {
  data.clear = true
  data.currentOperant = ''
  data.previousOperant = ''
  data.result = ''
  data.calculationOperator = ''
  data.currentOperator = ''
  updateDisplay(data);
}

const init = () => {
  ui.numberKeys.forEach(key => {
    key.addEventListener("click", updateCurrentOperant, false)
  })
  ui.operatorKeys.forEach(key => {
    key.addEventListener("click", setOperation, false)
  })
  ui.clearKey.addEventListener("click", clearCalculator, false)
};

init();

/**
 * TODOS
 * 
 * - [ ] round answers
 * - [ ] BUGFIX: pressing = before entering all numbers causes still errors
 * - [ ] Check for error and display message when trying to devide by 0
 * - [ ] EXTRA: make decimals . work
 * - [ ] EXTRA: make DEL button work
 * - [ ] EXTRA: add keyboard support
 */