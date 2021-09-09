//async & await


// function fetchUser() {
//   return new Promise((resolve, reject) => {
//     resolve('ellie');
//   });
// }

// 1.async
async function fetchUser() {
  return 'ellie';
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(2000);
  return 'apple';
}

async function getBanana() {
  await delay(1000);
  return 'banana';
}

// function getBanana() {
//   return delay(3000)
//   .then(() => 'Banana');
// }

async function pickFruits() {
  const applePromise = getApple();
  const bananPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananPromise;
  return `${apple} + ${banana}`;
  // return getApple().then(apple => {
  //   return getBanana().then(banana => `${apple} + ${banana}`);
  // });
}

pickFruits().then(console.log);

//3. useful Promise APIs
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()])
        .then(fruits => fruits.join(' + ') );
}

pickAllFruits().then(console.log);

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);