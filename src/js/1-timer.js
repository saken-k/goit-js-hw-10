import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let leftTime = 0;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate > Date.now()) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
    }
    leftTime = userSelectedDate - Date.now();
  },
};

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const timeElements = {
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

startBtn.disabled = true;

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  datePicker.disabled = true;

  intervalId = setInterval(() => {
    updateCountdown();
  }, 1000);
});

function updateCountdown() {
  const { days, hours, minutes, seconds } = convertMs(leftTime);

  timeElements.days.textContent = addLeadingZero(`${days}`);
  timeElements.hours.textContent = addLeadingZero(`${hours}`);
  timeElements.minutes.textContent = addLeadingZero(`${minutes}`);
  timeElements.seconds.textContent = addLeadingZero(`${seconds}`);

  leftTime -= 1000;

  if (leftTime < 0) {
    clearInterval(intervalId);
    resetTimer();
  }
}

function resetTimer() {
  startBtn.disabled = false;
  datePicker.disabled = false;
  leftTime = 0;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
