function x(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(n * 2);
    }, 1000);
  });
}

async function surya() {
  let a1 = await x(10);

  let a2 = await x(a1);

  let a3 = await x(a2);
  let result = Promise.all([a1, a2, a3]);
  return result;
}
surya().then((value) => {
  console.log(value);
});

