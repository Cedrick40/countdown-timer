// ===== Configure here =====
const EVENT_NAME = "New Year 2027";
const TARGET_DATE = "2027-01-01T00:00:00";   // ISO format, read in the visitor's local time
const END_MESSAGE = "🎉 Happy New Year 2027! The countdown has ended.";
// ==========================

const MS_SECOND = 1000;
const MS_MINUTE = 60 * MS_SECOND;
const MS_HOUR = 60 * MS_MINUTE;
const MS_DAY = 24 * MS_HOUR;

const targetTime = new Date(TARGET_DATE).getTime();

const els = {
  name: document.getElementById("event-name"),
  target: document.getElementById("target-date"),
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  message: document.getElementById("message"),
};

const pad = (n) => String(n).padStart(2, "0");

function render(days, hours, minutes, seconds) {
  els.days.textContent = pad(days);
  els.hours.textContent = pad(hours);
  els.minutes.textContent = pad(minutes);
  els.seconds.textContent = pad(seconds);
}

function finish(text) {
  clearInterval(intervalId);            // stop the timer so it does not keep running for nothing
  render(0, 0, 0, 0);
  els.message.textContent = text;
  els.message.hidden = false;
  document.body.classList.add("finished");
}

function tick() {
  const diff = targetTime - Date.now();   // difference in milliseconds

  if (diff <= 0) {
    finish(END_MESSAGE);
    return;
  }

  render(
    Math.floor(diff / MS_DAY),
    Math.floor((diff % MS_DAY) / MS_HOUR),
    Math.floor((diff % MS_HOUR) / MS_MINUTE),
    Math.floor((diff % MS_MINUTE) / MS_SECOND)
  );
}

els.name.textContent = EVENT_NAME;
let intervalId;

if (Number.isNaN(targetTime)) {
  // Invalid date string in the config
  els.target.textContent = "";
  finish("The target date is not valid. Check TARGET_DATE in script.js.");
} else {
  els.target.textContent = new Date(targetTime).toLocaleString(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  });
  intervalId = setInterval(tick, MS_SECOND);
  tick();   // run once immediately so the page does not show 00 for the first second
}