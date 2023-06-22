import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
      window.alert('Please choose a date in the future');
    }
    startBtn.removeAttribute('disabled');
    selectedDate = selectedDates[0].getTime();
    // console.log(selectedDate);
  },
};
flatpickr('input[type="text"]', options);

startBtn.addEventListener(
  'click',
  () => {
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


// Styles

const fields = document.getElementsByClassName('field');
for (let i = 0; i < fields.length; i++) {
  const field = fields[i];

  field.style.display = 'inline-flex';
  field.style.fontSize = '24px';
  field.style.gap = '10px';

  field.style.textAlign = 'center';

  const values = field.getElementsByClassName('value');
  const labels = field.getElementsByClassName('label');

  values[0].style.marginBottom = '5px';

  labels[0].style.display = 'block';
  labels[0].style.fontSize = '12px';
}
