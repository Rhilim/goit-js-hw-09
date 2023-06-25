import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = form.elements['delay'];
const stepInput = form.elements['step'];
const amountInput = form.elements['amount'];

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const firstDelay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  for (let i = 0; i < amount; i += 1) {
   createPromise(i + 1, firstDelay + i * step)
     .then(({ position, delay }) => {
       Notiflix.Notify.success(
         `✅ Fulfilled promise ${position} in ${delay}ms`
       );
     })
     .catch(({ position, delay }) => {
       Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
     });
  }
});
