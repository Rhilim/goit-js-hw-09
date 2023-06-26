import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEL = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');


let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      startBtn.setAttribute('disabled', '');
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    startBtn.removeAttribute('disabled');
    selectedDate = selectedDates[0].getTime();
  },
};
flatpickr('input[type="text"]', options);

startBtn.addEventListener(
  'click',
  () => {
    Notiflix.Notify.success("Here you go!");
    const intervalId = setInterval(() => {
      startBtn.setAttribute('disabled', '');
      addLeadingZero();

      if (
        daysEl.textContent === '00' &&
        hoursEl.textContent === '00' &&
        minutesEL.textContent === '00' &&
        secondsEl.textContent === '00'
      ) {
        clearInterval(intervalId);
      }
    });
  },
  1000
);

function pad(value) {
  return String(value).padStart(2, 0);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero() {
  const difference = selectedDate - new Date().getTime();
  const { days, hours, minutes, seconds } = convertMs(difference);
  daysEl.textContent = String(days);
  hoursEl.textContent = String(hours);
  minutesEL.textContent = String(minutes);
  secondsEl.textContent = String(seconds);

  startBtn.disabled = true;
}

Notiflix.Notify.init({
  width: '300px',
  position: 'center-center',
  closeButton: false,
});

// STYLES

const timerElement = document.querySelector('.timer');
const fieldElements = document.querySelectorAll('.field');
const valueElements = document.querySelectorAll('.value');
const labelElements = document.querySelectorAll('.label');
const input = document.querySelector('input[type="text"]');

input.style.cssText = `height: 40px; border-radius: 0.5em; border: 2px #A1C2F1 solid; color: #EAB2A0; font-size: 20px; font-weight: bold; text-align: center; background-color: #5A96E3; box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;`;

timerElement.style.cssText = `display: flex; column-gap: 100px;`;

fieldElements.forEach(fieldElement => {
  fieldElement.style.cssText = `display: flex; flex-direction: column; align-items: center;`;
});

valueElements.forEach(valueElement => {
  valueElement.style.fontSize = '36px';
  valueElement.style.fontWeight = '600';
});

labelElements.forEach(labelElement => {
  labelElement.style.cssText = `fontSize: 12px; color: #1B6B93;`;
});

body.style.cssText = `display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 50px`;

startBtn.style.cssText = `font-size: 25px; color: #E7CEA6; width: 120px; height: 80px; border-radius: 20px; background-color: #1B6B93; font-family: Helvetica; 
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; cursor: pointer; border: none; hover: background-color: #5A96E3; `;

startBtn.addEventListener('mouseover', function () {
  startBtn.style.backgroundColor = '#0A6EBD';
  startBtn.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 40px 30px -7px';
  startBtn.style.transition =
    'color 250ms ease-in-out, background-color 250ms linear, box-shadow 300ms linear';
  startBtn.style.color = '#FFA41B';
});

startBtn.addEventListener('mouseout', function () {
  startBtn.style.backgroundColor = '#5A96E3';
  startBtn.style.color = '#E7CEA6';
});

(input.insertAdjacentHTML(
  'beforebegin',
  'Please select a desired date and time in the future!'
));