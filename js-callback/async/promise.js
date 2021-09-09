'use strict';

//State: pending -> fulfilled or rejected
//Producer, Consumer

//1.Producer
// Promise는 클래스
// when new Proise is created, the executor runs automatically.
const promise = new Promise((resolve, reject) => {
  console.log('doing something');
  setTimeout(() => {
    // resolve('ellie')
    reject(new Error('no network'));
  }, 2000);
});

// 2. Consumers: then, catch, finally
promise
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error)
  })
  .finally(() => {
    console.log('finally');
  })

  //3. Promise chaining
  const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
  });

  fetchNumber
  .then(num => num * 2)
  .then(num => num * 3)
  .then(num => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then(num => console.log(num));

  // 4.Error Handling
  // 따라해보기
  const getChoi = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve('CHOI'), 1000);
    });

  const getMin = choi =>
    new Promise((resolve, reject) => {
      // setTimeout(() => resolve(`${choi} MIN`), 1000);
      setTimeout(() => reject(new Error(`error! not match`)), 1000);
    });

  const getKyung = min => 
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(`${min} KYUNG`), 1000);
    });

  // getChoi()
  //   .then(res => getMin(res))
  //   .then(res => getKyung(res))
  //   .then(res => console.log(res))

  getChoi()
  .then(getMin)
  .catch(error => { return error })
  .then(getKyung)
  .then(console.log);