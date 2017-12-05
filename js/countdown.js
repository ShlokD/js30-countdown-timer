let countdown;

const leftTime = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timers = document.querySelectorAll('.timer__button');
const timeForm = document.querySelector('[name="customForm"]');

const timer = seconds => {
  clearInterval(countdown);
  const now = Date.now();
  const end = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(end);
  
  countdown = setInterval(() => {
    const secondsLeft = Math.round((end - Date.now())/1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
};


const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const display = `${minutes}:${secondsLeft < 10 ? '0': ''}${secondsLeft}`;
  document.title = display;
  leftTime.textContent = display;
};


const displayEndTime = timestamp => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Back at ${hour}:${minutes < 10 ? '0': ''}${minutes}`;
};

const handleTimerSet = ev => {
  const seconds = parseInt(ev.target.dataset.time);
  timer(seconds);
}

const handleTimerFormSubmit = ev => {
  ev.preventDefault();
  const input = ev.target.querySelector('input[name="minutes"]');
  const minutes = parseInt(input.value);

  if (!isNaN(minutes)) {
    timer(minutes * 60);
  }
}

timers.forEach(timer => timer.addEventListener('click', handleTimerSet));
timeForm.addEventListener('submit', handleTimerFormSubmit);