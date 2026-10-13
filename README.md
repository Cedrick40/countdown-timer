# Countdown Timer

A static, responsive countdown timer that counts down to a specific date and shows the days, hours, minutes and seconds remaining. Built for Task 13 (Countdown Timer) of my Web Development internship.

**Live page:** https://cedrick40.github.io/countdown-timer/

## About the project
The page counts down to New Year 2027 and updates every second. When the countdown reaches zero, it stops and shows a message. The target date, event name and final message can all be changed at the top of `script.js`.

## Objective
To practice JavaScript Date math, `setInterval` and DOM updates.

## Tools used
- HTML5
- CSS3
- JavaScript
- VS Code
- Git and GitHub (free)

## My approach
- **Planning:** I chose a target date, then worked out the steps: get the time left, convert it into days, hours, minutes and seconds, show it on the page, and repeat every second.
- **Configurable target:** `EVENT_NAME`, `TARGET_DATE` and `END_MESSAGE` are constants at the top of `script.js`, so the date can be changed in one place without touching the logic.
- **Date math:** I turned the target into a timestamp with `new Date(TARGET_DATE).getTime()` and subtracted `Date.now()` on every tick to get the difference in milliseconds. Then I used `Math.floor` with division and the remainder operator (`%`) to split it into days, hours, minutes and seconds.
- **Updating every second:** `setInterval(tick, 1000)` runs the update function every second. I also call `tick()` once straight away so the page does not show zeros for the first second.
- **Clearing the interval:** When the difference is zero or less, `clearInterval` stops the timer, the display is set to zero and the end message is shown.
- **Handling a date that has passed:** If the target date is already in the past when the page loads, the first tick sees a zero or negative difference and shows the end message straight away. If the date string is invalid (`NaN`), the page shows a clear error message instead of broken numbers.
- **DOM updates:** I used `getElementById` and `textContent` to update the four numbers, and `padStart(2, "0")` to keep two digits (for example `07`).
- **Semantic HTML:** I used `main`, `h1` and `section` with `role="timer"`. The end message is a `role="status"` element with `aria-live="polite"`, so screen readers announce it once and the timer is not read out every second.
- **Layout and responsive design:** CSS Grid shows the four boxes in a row. A media query for screens of 560px and below changes it to a two-by-two grid. `font-variant-numeric: tabular-nums` and `clamp()` keep the digits steady and the text readable on any screen.
- **Hover effects:** Each box lifts slightly and its border changes colour on hover. Transitions are turned off for people who prefer reduced motion.
- **Testing:** I changed `TARGET_DATE` to a date a few seconds ahead to check the zero message, to a past date to check the already-passed case, and to a bad string to check the error message. I also resized the browser to check the mobile layout.

## Project structure
```
countdown-timer/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Outcome
The result is a clean, responsive countdown that updates every second, stops at zero and shows a message. This project taught me how to work with Date objects and milliseconds, how `setInterval` and `clearInterval` control repeated work, and how to update the page with the DOM.

## Interview questions
- **How do you calculate the time difference between two dates?** Subtract one date's timestamp from the other (`target.getTime() - Date.now()`). The result is in milliseconds. Divide by 1000 for seconds, by 60,000 for minutes, and so on, using `%` to get the remainder for each smaller unit.
- **Why should an interval be cleared when it is no longer needed?** An interval keeps running until it is cleared. Leaving it running wastes CPU and memory, keeps updating the page for no reason and can cause bugs or memory leaks, especially in larger apps.
- **How would you handle a countdown that has already passed?** Check whether the difference is zero or less. If it is, skip the countdown, clear the interval, show zeros and display a message such as "The event has started."

## Credits
Date handling follows the MDN documentation for `Date` and `setInterval`. The font is Space Grotesk from Google Fonts.

## Author
Cedrick Niyibikora
