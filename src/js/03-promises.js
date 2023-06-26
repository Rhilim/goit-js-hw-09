import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = form.elements['delay'];
const stepInput = form.elements['step'];
const amountInput = form.elements['amount'];
const createBtn = document.querySelector('button');
console.log('createBtn');

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
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  delayInput.value = '';
  stepInput.value = '';
  amountInput.value = '';
});

// STYLES

document.querySelector(
  'body'
).style.cssText = `display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 50px`;
delayInput.style.cssText = `margin: 20px; width: 150px; height: 40px; border-radius: 0.5em; border: 2px #A1C2F1 solid; color: #EAB2A0; font-size: 20px; font-weight: bold; text-align: center; background-color: #5A96E3; box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;`;
stepInput.style.cssText = `margin: 20px; width: 150px; height: 40px; border-radius: 0.5em; border: 2px #A1C2F1 solid; color: #EAB2A0; font-size: 20px; font-weight: bold; text-align: center; background-color: #5A96E3; box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;`;
amountInput.style.cssText = `margin: 20px; width: 150px; height: 40px; border-radius: 0.5em; border: 2px #A1C2F1 solid; color: #EAB2A0; font-size: 20px; font-weight: bold; text-align: center; background-color: #5A96E3; box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;`;
createBtn.style.cssText = `font-size: 26px; color: #E7CEA6; width: 200px; height: 100px; border-radius: 10px; background-color: #1B6B93; font-family: Helvetica; 
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; cursor: pointer; border: none; hover: background-color: #5A96E3; position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);`;
createBtn.addEventListener('mouseover', function () {
  createBtn.style.backgroundColor = '#0A6EBD';
  createBtn.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 40px 30px -7px';
  createBtn.style.transition =
    'color 250ms ease-in-out, background-color 250ms linear, box-shadow 300ms linear';
  createBtn.style.color = '#FFA41B';
});

createBtn.addEventListener('mouseout', function () {
  createBtn.style.backgroundColor = '#5A96E3';
  createBtn.style.color = '#E7CEA6';
});

const labels = document.querySelectorAll('label');
labels.forEach(label => {
  label.style.cssText = `fontSize: 12px; color: #1B6B93;`;
});
