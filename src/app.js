const ui = {
  numberKeys: document.querySelectorAll("[data-key]"),
  operatorKeys: document.querySelectorAll("[data-operator]"),
  equalKey: document.querySelector("[data-equal]"),
  currentOperantText: document.querySelector("[data-current-operant-output]"),
  previousOperantText: document.querySelector("[data-previous-operant-output]"),
  operatorText: document.querySelector("[data-operator-output]"),
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

const replaceCommaWithDot = (value) => {
  return value.replace(',', '.');
}

const operate = () => {
  let result
  const formatedPreviousOperant = parseFloat(
    replaceCommaWithDot(calcData.previousOperant)
  )
  const formatedCurrentOperant = parseFloat(
    replaceCommaWithDot(calcData.currentOperant)
  )
  console.table(formatedPreviousOperant, formatedCurrentOperant)
  if (isNaN(formatedPreviousOperant) || isNaN(formatedCurrentOperant)) return
  switch (calcData.operator) {
    case "+":
      result = add(formatedPreviousOperant, formatedCurrentOperant)
      break
    case "-":
      result = substract(formatedPreviousOperant, formatedCurrentOperant)
      break
    case "*":
      result = multiply(formatedPreviousOperant, formatedCurrentOperant)
      break
    case "/":
      result = divide(formatedPreviousOperant, formatedCurrentOperant)
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
  calcData.currentOperant = String(result).replace('.', ',');
}

const getRoundedResult = (value) => {
  if (value - Math.floor(value) !== 0) {
    return Math.round((value + Number.EPSILON) * 100) / 100
  }
  return value
}

const updateDisplay = () => {
  console.log('currentOperantText')
  ui.currentOperantText.textContent = getFormatedDisplayValue(
    calcData.currentOperant
  )
  
  console.log('previousOperant')
  ui.previousOperantText.textContent = getFormatedDisplayValue(
    calcData.previousOperant
  )
  
  ui.operatorText.textContent = calcData.operator
  console.table(calcData)
}

// TODO Still not quiet right.
// the calcData should only be numbers and der Text Display can be string
const getFormatedDisplayValue = (value) => {
  console.log('value', value)
  const intNumberString = String(value).split(',')[0]
  const decimalNumberString = String(value).split(',')[1]
  const intNumber = Number(intNumberString)
  const decimalNumber = Number(decimalNumberString)
  if (isNaN(decimalNumber)) return String(`${intNumber}`)
  if (isNaN(decimalNumber) && value.includes(",")) return String(`${intNumber},`)
  return String(`${intNumberString},${decimalNumberString}`)
}

const updateCurrentOperant = (e) => {
  let keyValue = e.target.dataset.key
  if(keyValue === ',' && calcData.currentOperant.includes(',')) return
  if (calcData.clear) {
    calcData.result = ""
    calcData.currentOperant = ""
    calcData.clear = false
  }
  calcData.currentOperant = String(calcData.currentOperant) + String(keyValue)
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
 * - [x] Add digit group separators
 * - [x] EXTRA: make decimals . work in german
 *              right now the, when calculation returns a result which is converted to  *              german local string, after using this for new calculation it is NaN and *              it returns an error.
 * - [ ] BUGFIX: test for empty operants and don't make roudnding and number conversion if empty
 * - [ ] EXTRA: make DEL button work
 * - [ ] EXTRA: add keyboard support
 */
