const add = (val1, val2) => {
  return val1 + val2
}

const substract = (val1, val2) => {
  return val1 - val2
}

const multiply = (val1, val2) => {
  return val1 * val2;
};

const divide = (val1, val2) => {
  return val1 / val2
}

const operate = (val1, val2, operant) => {
  switch (operant) {
    case '+':
      return add(val1, val2)
    case '-':
      return substract(val1, val2);
    case '*':
      return multiply(val1, val2);
    case '/':
      return divide(val1, val2);
    default:
      return false;
  }
} 

console.table({
  "add 1 + 2": add(1, 2),
  "substract 1 - 2": substract(1, 2),
  "multiply 1 * 2": multiply(1, 2),
  "divide 1 / 2": divide(1, 2),
  "divide 0 / 1": divide(0, 1),
  "divide 1 / 0": divide(1, 0),
  "operate 1 + 2": operate(1, 2, "+"),
  "operate 1 - 2": operate(1, 2, "-"),
  "operate 1 * 2": operate(1, 2, "*"),
  "operate 1 / 2": operate(1, 2, "/"),
});

