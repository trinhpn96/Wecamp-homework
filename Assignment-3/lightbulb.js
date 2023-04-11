const A = [4, 2, 1, 3, 5, 6];

function countLightedBulb(arr) {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    let val = i + 1;
    let crrSum = (val + 1) * (val / 2);
    crrSum === sum ? count++ : count;
  }
  return count;
}
console.log(countLightedBulb(A));
