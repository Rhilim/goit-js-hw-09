const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let intervalId = null;
refs.stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  refs.stopBtn.disabled = false;
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
}

function onStopBtnClick() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

// styles

refs.body.style.cssText = `display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 50px`;

refs.startBtn.style.cssText = `font-size: 20px; color: #E7CEA6; width: 120px; height: 80px; border-radius: 20px; background-color: #1B6B93; font-family: Helvetica; 
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; cursor: pointer; border: none; hover: background-color: #5A96E3; `;

refs.stopBtn.style.cssText = `font-size: 20px; color: rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3); width: 120px; height: 80px; border-radius: 20px; background-color: rgba(239, 239, 239, 0.3); font-family: Helvetica; 
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; cursor: pointer; border: none; `;

refs.startBtn.addEventListener('mouseover', function () {
  refs.startBtn.style.backgroundColor = '#0A6EBD';
  refs.startBtn.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 40px 30px -7px';
  refs.startBtn.style.transition = 'color 250ms ease-in-out, background-color 250ms linear, box-shadow 300ms linear';
  refs.startBtn.style.color = '#FFA41B';
});

refs.startBtn.addEventListener('mouseout', function () {
  refs.startBtn.style.backgroundColor = '#5A96E3';
  refs.startBtn.style.color = '#E7CEA6';
});

refs.stopBtn.addEventListener('mouseover', function () {
  refs.stopBtn.style.backgroundColor = '#0A6EBD';
  refs.stopBtn.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 40px 30px -7px';
  refs.stopBtn.style.transition =
    'color 250ms ease-in-out, background-color 250ms linear, box-shadow 300ms linear';
  refs.stopBtn.style.color = '#FFA41B';
});

refs.stopBtn.addEventListener('mouseout', function () {
  refs.stopBtn.style.backgroundColor = '#5A96E3';
  refs.stopBtn.style.color = '#E7CEA6';
});