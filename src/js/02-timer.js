import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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
    Notiflix.Notify.success("It's a final COUNTDOWN!!!");
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
  1000);

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

timerElement.style.display = 'flex';
timerElement.style.columnGap = '15px';

fieldElements.forEach(fieldElement => {
  fieldElement.style.display = 'flex';
  fieldElement.style.flexDirection = 'column';
  fieldElement.style.alignItems = 'center';
});

valueElements.forEach(valueElement => {
  valueElement.style.fontSize = '36px';
  valueElement.style.fontWeight = '600';
});

labelElements.forEach(labelElement => {
  labelElement.style.fontSize = '12px';
});


// const ref = {
//   bodyView: document.querySelector('body'),
//   input: document.querySelector('#date-time-picker'),
//   buttonStart: document.querySelector('[data-start]'),
//   valueDays: document.querySelector('[data-days]'),
//   valueHours: document.querySelector('[data-hours]'),
//   valueMinutes: document.querySelector('[data-minutes]'),
//   valueSeconds: document.querySelector('[data-seconds]'),
//   nameText: document.querySelectorAll('.field'),
// };

// const newParagraph = document.createElement('p');
// newParagraph.textContent =
//   'SELECT A FUTURE DATE AND TIME TO START THE COUNTDOWN';
// ref.input.insertAdjacentElement('beforebegin', newParagraph);
// ref.input.previousSibling.style.cssText = `background-color: #e42525cd;  font-weight: 900; color: #f6c218; padding: 8px 4px; border: 2px solid #f6c218; border-radius: 8px; text-align: center;  font-size: 16px; width: 308px;`;

// ref.bodyView.style.cssText = `background-color: #a9a8a8; display: flex; gap: 20px; align-items: center;
// flex-direction: column;`;

// ref.input.style.cssText = `background-color: #08aa31c2; font-size: large; color: #f6c218; padding: 12px 4px; border: 2px solid #f6c218; border-radius: 8px;  text-align: center; font-weight: 900; font-size: 28px; outline: none; width: 308px;`;

// ref.buttonStart.style.cssText = `background-color: rgba(239, 239, 239, 0.3); font-size: large; color: rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3); padding: 20px 40px; border: 2px solid rgba(118, 118, 118, 0.3), rgba(195, 195, 195, 0.3); border-radius: 8px; `;
// ref.buttonStart.disabled = true;
// console.log(ref.nameText);
// // (...ref.nameText).style.cssText = `background-color: #08aa31c2; font-size: large; color: #f6c218; padding: 12px 4px; border: 2px solid #f6c218; border-radius: 8px;  text-align: center; font-weight: 900; font-size: 28px; outline: none; width: 308px;`;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     let ms = selectedDates[0] - options.defaultDate;
//     ref.buttonStart.disabled = true;

//     if (ms <= 0) {
//       // window.alert('Please choose a date in the future');
//       Report.warning(
//         'Please choose a date in the future.',
//         'It seems that you are from the country where the cruiser "Moscow" sank.'
//       );
//     } else {
//       ref.buttonStart.disabled = false;
//       ref.buttonStart.style.cssText = `background-color: #08aa31c2; font-size: large; color: #f6c218; padding: 20px 40px; border: 2px solid #f6c218; border-radius: 8px; cursor: pointer;`;

//       ref.buttonStart.addEventListener('click', () => {
//         setInterval(() => {
//           ms = ms - 1000;

//           function addLeadingZero(value) {
//             return value.toString().padStart(2, '0');
//           }

//           const timeComponents = convertMs(ms);

//           ref.valueDays.textContent = addLeadingZero(timeComponents.days);

//           ref.valueHours.textContent = addLeadingZero(timeComponents.hours);

//           ref.valueMinutes.textContent = addLeadingZero(timeComponents.minutes);

//           ref.valueSeconds.textContent = addLeadingZero(timeComponents.seconds);
//         }, 1000);
//       });
//     }
//   },
// };

// flatpickr('#date-time-picker', options);

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }
