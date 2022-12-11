let arr = [1, 2, 4, 3];
console.log(arr);
arr.push(5);
console.log(arr);
arr.pop();
console.log(arr);
arr.pop("2");
console.log(arr);
const numbers = [45, 4, 9, 16, 25];

numbers.forEach(myFunction);
const points = [40, 100, 1, 5, 25, 10];
points.sort(function (a, b) {
  return b - a;
});
console.log(points);

function myFunction(value, index, myFunction) {
  console.log(value);
}
let sur = [1, 2, 8, 9, 7, 3, 4, 5];
let p = 0;
let q = 0;
for (let x of sur) {
  p = p + x;
}
for (let y in sur) {
  q = q + sur[y];
}
console.log(p);
console.log(q);

for (var i = 1; i <= 10; i++) {
  let n = i;
  setTimeout(function () {
    console.log(n);
  }, 1000 * n);
}

const ar = [9, 3, 17, 4, 8, 6];
const x = ar.map(function (y) {
  return y * 2;
});
console.log(x);

const tt = ar.filter(function (pp) {
  return pp % 2 == 1;
});
console.log(tt);

const re = ar.reduce(function (acc, curr) {
  acc = acc + curr;
  return acc;
}, 0);
console.log(re);

const max = ar.reduce(function (acc, curr) {
  if (curr > acc) {
    acc = curr;
  }
  return acc;
}, 0);
console.log(max);
