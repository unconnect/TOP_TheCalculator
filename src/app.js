const ui = {
  numberKeys: document.querySelectorAll("[data-key]"),
  operatorKeys: document.querySelectorAll("[data-operator]"),
  currentOperantText: document.querySelector("[data-current_operant_output]"),
  previousOperantText: document.querySelector("[data-previous_operant_output]"),
  operatorText: document.querySelector("[data-operator_output]"),
  clearKey: document.querySelector("[data-all-clear]"),
  deleteKey: document.querySelector("[data-delete]"),
};

const calcData = {
  clear: true,
  currentOperant: "",
  previousOperant: "",
  result: "",
  calculationOperator: "",
  currentOperator: "",
};

// Mathematical Operations
const add = (val1, val2) => {
  return String(parseFloat(val1) + parseFloat(val2));
};

const substract = (val1, val2) => {
  return String(parseFloat(val1) - parseFloat(val2));
};

const multiply = (val1, val2) => {
  return String(parseFloat(val1) * parseFloat(val2));
};

const divide = (val1, val2) => {
  return String(parseFloat(val1) / parseFloat(val2));
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
  setResult(calcData);
};

const setResult = (data) => {
    if (data.currentOperator === "=") {
      data.previousOperant = "";
      data.currentOperant = data.result;
      updateDisplay(data);
      data.calculationOperator = "";
      return;
    }
    data.previousOperant = data.result;
    data.calculationOperator = data.currentOperator;
    data.currentOperant = "";
    updateDisplay(data);
}

const updateDisplay = (data) => {
  ui.currentOperantText.textContent = data.currentOperant
  ui.previousOperantText.textContent = data.previousOperant;
  ui.operatorText.textContent = data.currentOperator;
  console.table(data);
}

const updateCurrentOperant = (e) => {
  if(calcData.clear || !calcData.currentOperant || calcData.result) {
    calcData.result = ''
    calcData.currentOperant = ''
    calcData.clear = false
  }
  calcData.currentOperant = calcData.currentOperant + String(e.target.dataset.key);
  updateDisplay(calcData)
}

const setOperation = (e) => {
  const operator = String(e.target.dataset.operator);
  if (operator === '=' && (!calcData.previousOperant || !calcData.calculationOperator || !calcData.currentOperant)) {
    return;
  }
  if (operator && operator !== '=' && !calcData.currentOperant) {
    calcData.currentOperator = operator;
    calcData.calculationOperator = calcData.currentOperator;
    updateDisplay(calcData);
    return;
  }
  calcData.currentOperator = operator;
  if (calcData.previousOperant && calcData.calculationOperator) {
    operate(calcData);
    return;
  }
  calcData.previousOperant = calcData.currentOperant
  calcData.calculationOperator = calcData.currentOperator;
  calcData.currentOperant = ''
  updateDisplay(calcData)
}

const clearCalculator = () => {
  calcData.clear = true
  calcData.currentOperant = ''
  calcData.previousOperant = ''
  calcData.result = ''
  calcData.calculationOperator = ''
  calcData.currentOperator = ''
  updateDisplay(calcData);
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
 * - [x] BUGFIX: pressing = before entering all numbers causes still errors
 * - [ ] Check for error and display message when trying to devide by 0
 * - [ ] EXTRA: make decimals . work
 * - [ ] EXTRA: make DEL button work
 * - [ ] EXTRA: add keyboard support
 */