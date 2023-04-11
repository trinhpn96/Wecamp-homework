var isValid = function (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "{") {
      stack.push("}");
    } else if (s[i] === "(") {
      stack.push(")");
    } else if (s[i] === "[") {
      stack.push("]");
    } else if (s[i] !== stack.pop()) {
      return false;
    }
  }
  return !stack.length;
};

// using 1 chain of method
