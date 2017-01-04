function calculateHandPosition(value, handType) {
  if (handType === 'hour') {
    return (((value / 12) * 360) + 90);
  }
  return (((value / 60) * 360) + 90);
}

let currentMinute = null;
let currentHour = null;

const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

// This `count` is used to prevent a jerky reaction from second hand
// 59th second
let count = 1;

function setDate() {
  const currentTime = new Date();
  let seconds = currentTime.getSeconds();
  if (seconds === 0) {
    count += 1;
  }
  seconds = (seconds + 60) * count;
  const secondsDegress = calculateHandPosition(seconds, 'second');
  secondHand.style.transform = `rotate(${secondsDegress}deg)`;

  /* The following if statements for setting minutes and hours only their values have changed */
  const minutes = currentTime.getMinutes();
  if (currentMinute !== minutes) {
    const minutesDegress = calculateHandPosition(minutes, 'minute');
    minuteHand.style.transform = `rotate(${minutesDegress}deg)`;
    currentMinute = minutes;
  }

  const hours = currentTime.getHours();
  if (currentHour !== hours) {
    const hoursDegress = calculateHandPosition(hours, 'hour');
    hourHand.style.transform = `rotate(${hoursDegress}deg)`;
    currentHour = hours;
  }
}
setInterval(setDate, 1000);