const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let intervalId = null;
stopBtn: document.querySelector('button[data-stop]').disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  stopBtn: document.querySelector('button[data-stop]').disabled = false;
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
}

function onStopBtnClick() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
  stopBtn: document.querySelector('button[data-stop]').disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
