let x = {
  name: "surya",
  city: "kmr",
  info: function () {
    return this.name + this.city;
  },
};
let y = {
  name: "teja",
};

y.__proto__= x;
console.log(y.name);
console.log(y.city);
console.log(y.info());
