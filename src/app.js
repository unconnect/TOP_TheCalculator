const ui = {
  numberKeys: document.querySelectorAll("[data-key]"),
  operatorKeys: document.querySelectorAll("[data-operator]"),
  equalKey: document.querySelector("[data-equal]"),
  currentOperantText: document.querySelector("[data-current_operant_output]"),
  previousOperantText: document.querySelector("[data-previous_operant_output]"),
  operatorText: document.querySelector("[data-operator_output]"),
  clearKey: document.querySelector("[data-all-clear]"),
  deleteKey: document.querySelector("[data-delete]"),
}

const calcData = {
  clear: true,
  currentOperant: "",
  previousOperant: "",
  result: "",
  operator: "",
}

// Mathematical Operations
const add = (val1, val2) => {
  return val1 + val2
}

const substract = (val1, val2) => {
  return val1 - val2
}

const multiply = (val1, val2) => {
  return val1 * val2
}

const divide = (val1, val2) => {
  return val1 / val2
}

const operate = () => {
  let result
  const previousOperant = parseFloat(calcData.previousOperant)
  const currentOperant = parseFloat(calcData.currentOperant)
  if (isNaN(previousOperant) || isNaN(currentOperant)) return
  switch (calcData.operator) {
    case "+":
      result = add(previousOperant, currentOperant)
      break
    case "-":
      result = substract(previousOperant, currentOperant)
      break
    case "*":
      result = multiply(previousOperant, currentOperant)
      break
    case "/":
      result = divide(previousOperant, currentOperant)
      break
    default:
      return
  }
  calcData.operator = undefined
  calcData.previousOperant = ""
  if (result === Infinity) {
    calcData.currentOperant = "ERROR"
    return
  }
  calcData.currentOperant = result
}

const getRoundedResult = (value) => {
  if (value - Math.floor(value) !== 0) {
    return Math.round((value + Number.EPSILON) * 100) / 100
  }
  return value
}

const updateDisplay = () => {
  ui.currentOperantText.textContent = roundAndCovertToLocalString(calcData.currentOperant)
  ui.previousOperantText.textContent = roundAndCovertToLocalString(calcData.previousOperant)
  ui.operatorText.textContent = calcData.operator
  console.table(calcData)
}

const roundAndCovertToLocalString = (value, isoCode = "de") => {
    return Number(getRoundedResult(value)).toLocaleString(
    isoCode)
}

const updateCurrentOperant = (e) => {
  if (calcData.clear) {
    calcData.result = ""
    calcData.currentOperant = ""
    calcData.clear = false
  }
  calcData.currentOperant =
    calcData.currentOperant + String(e.target.dataset.key)
}

const setOperation = (e) => {
  const operator = String(e.target.dataset.operator)
  if (calcData.previousOperant !== "") operate()
  calcData.operator = operator
  if (calcData.currentOperant === "") return
  calcData.previousOperant = calcData.currentOperant
  calcData.currentOperant = ""
}

const clearCalculator = () => {
  calcData.clear = true
  calcData.currentOperant = ""
  calcData.previousOperant = ""
  calcData.result = ""
  calcData.operator = ""
}

const init = () => {
  ui.numberKeys.forEach((key) => {
    key.addEventListener(
      "click",
      (e) => {
        updateCurrentOperant(e)
        updateDisplay()
      },
      false
    )
  })
  ui.operatorKeys.forEach((key) => {
    key.addEventListener(
      "click",
      (e) => {
        setOperation(e)
        updateDisplay()
      },
      false
    )
  })
  ui.clearKey.addEventListener(
    "click",
    () => {
      clearCalculator()
      updateDisplay()
    },
    false
  )
  ui.equalKey.addEventListener("click", (e) => {
    operate()
    updateDisplay()
    calcData.clear = true
  })
}

init()

/**
 * TODOS
 *
 * - [x] BUGFIX: pressing = before entering all numbers causes still errors
 * - [x] REFACTOR: calOperator seams redundant, should be removed
 * - [x] BUGFIX: equal Operator should have own eventlistener to just operate and updatedisplay or otherwise update setOperation fn with more logic
 * - [x] round answers - but it seams still fishy
 * - [x] Check for error and display message when trying to devide by 0
 * - [ ] EXTRA: make decimals . work in german
 *              right now the, when calculation returns a result which is converted to  *              german local string, after using this for new calculation it is NaN and *              it returns an error.
 * - [ ] EXTRA: make DEL button work
 * - [ ] EXTRA: add keyboard support
 */
