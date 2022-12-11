let a = [
  { name: "hello", age: 10 },
  { name: "hel", age: 20 },
  { name: "helo", age: 10 },
  { name: "ello", age: 20 },
  { name: "hlo", age: 30 },
];
const x = a.reduce(function (acc, curr) {
  if (acc[curr.age]) {
    acc[curr.age] += 1;
  } else {
    acc[curr.age] = 1;
  }
  return acc;
}, {});
console.log(x);

const y = a
  .filter(function (p) {
    return p.age < 20;
  })
  .map(function (p) {
    return p.name;
  });
console.log(y);


