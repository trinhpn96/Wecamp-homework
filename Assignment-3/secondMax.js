//find the second largest in the array.


function find2ndMax(arr) {
  let max = arr[0];
  let max2 = Number.MIN_VALUE;
  if (arr.length < 2) {
    return "Invalid input"; //Should be at least 2 elms
  }
  if (arr.every((el) => el === max)) {
    return "There's no 2nd largest value in the array "; // Exp: arr = [1, 1, 1]
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max2 = max;
      max = arr[i];
    } else if (arr[i] > max2) {
      max2 = arr[i];
    }
  }
  return max2;
}
console.log(find2ndMax([1, 15, 10, 1]));
console.log(find2ndMax([1, 1, 1]));
console.log(find2ndMax([0]));
