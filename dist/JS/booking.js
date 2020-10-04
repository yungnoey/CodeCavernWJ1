// Calendar Config
const calendarConfig = {
  weekStartsOn: "monday",
  weekdays: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ],
  availableDays: ["friday", "saturday", "sunday"],
  pricing: { friday: 10, saturday: 15, sunday: 15 },
};

// Calendar Logic
// get current date
let currentDate = new Date();

// get current year
let currentYear = currentDate.getFullYear();

// get current month
let currentMonth = currentDate.getMonth() + 1;

// get days in month
function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

let daysInMonth = getDaysInMonth(currentMonth, currentDate.getFullYear());

// create current month days array
let currentMonthDays = [];
let i;
for (i = 1; i <= daysInMonth; i++) {
  let day = i;
  currentMonthDays.push(day);
}

// get current month's starting day
let currentMonthStartingDate = new Date();
currentMonthStartingDate.setDate(1);

let currentMonthStartingDay = currentMonthStartingDate.getDay() - 1; // -1 to offset week starting on mon;

let currentMonthStartsOn = calendarConfig.weekdays[currentMonthStartingDay];

// get current month's ending day
let currentMonthEndDate = getDaysInMonth(currentMonth, currentYear);

// get previous month
let prevMonth = currentMonth - 1;

// get days in previous month
let daysInPrevMonth = getDaysInMonth(prevMonth, currentYear);

// get previous month's ending days (Days that end the month that appear on the calendar for this month)
function getPreviousMonthsDays() {
  // create prev month days array
  let prevMonthDays = [];
  let i;
  for (i = 1; i <= daysInPrevMonth; i++) {
    let day = i;
    prevMonthDays.push(day);
  }
  // reverse prev month days
  let prevMonthDaysReverse = prevMonthDays.reverse();

  // pull out ending days relevant to calendar for current month
  let prevMonthEndDays = [];
  for (x = 0; x < currentMonthStartingDay; x++) {
    prevMonthEndDays.push(prevMonthDaysReverse[x]);
  }
  // reverse days
  let prevMonthEndDaysReverse = prevMonthEndDays.reverse();

  return prevMonthEndDaysReverse;
}

let prevMonthDays = getPreviousMonthsDays();

// get next month's beginning days (Days that start the month that appear on the calendar for this month)

// get last day of the current month
let currentMonthLastDate = new Date();
currentMonthLastDate.setDate(daysInMonth);

// get weekday of last day of current month
let currentMonthLastDay = currentMonthLastDate.getDay() - 1; // -1 to offset week starting on mon;

// use the last day variable (index of weekday) to pull weekday out of days of the week
let currentMonthEndsOn = calendarConfig.weekdays[currentMonthLastDay];

// use the last day of the month's index in the days of the week array, minus it from the length of the days of the week, and then split

// minus the index of the last day of the current month from the length of a week, then use that number to generate leading days for the next month on this calendar month view
let weekLength = 7;
let nextMonthDayAmt = weekLength - currentMonthLastDay;
// create empty array for next month's leading days
let nextMonthDays = [];
for (j = 1; j < nextMonthDayAmt; j++) {
  let day = j;
  nextMonthDays.push(day);
}

// create new array for the calendar month
let calendarMonth = [];

// add day of the month objects for each day in the previous month
prevMonthDays.forEach((date) => {
  // create new date obj
  let dateObj = new Date();
  // set date object
  dateObj.setDate(date);
  // create day of month object
  let dayOfMonth = {};
  // set date
  dayOfMonth.date = date;
  // pull out month
  dayOfMonth.month = dateObj.getMonth();
  // adjust month
  dateObj.setMonth(dayOfMonth.month - 1);
  // pull out weekday
  if (dateObj.getDay() > 0) {
    dayOfMonth.day = calendarConfig.weekdays[dateObj.getDay() - 1];
  } else if (dateObj.getDay() === 0) {
    dayOfMonth.day = calendarConfig.weekdays[6]; // account for different starting day
  }

  // day can't be available since it's last month
  dayOfMonth.available = -1;
  // date has passed considering it's last month
  dayOfMonth.datePassed = true;
  // push day of month to calendar month array
  calendarMonth.push(dayOfMonth);
});

// add day of the month objects for each day in the current month
currentMonthDays.forEach((date) => {
  // create new date obj
  let dateObj = new Date();
  // set date object
  dateObj.setDate(date);
  // create day of month object
  let dayOfMonth = {};
  // set date
  dayOfMonth.date = date;
  // pull out month
  dayOfMonth.month = dateObj.getMonth() + 1;
  // pull out weekday
  if (dateObj.getDay() > 0) {
    dayOfMonth.day = calendarConfig.weekdays[dateObj.getDay() - 1];
  } else if (dateObj.getDay() === 0) {
    dayOfMonth.day = calendarConfig.weekdays[6]; // account for different starting day
  }

  // evaluate if weekday is available day
  dayOfMonth.available = calendarConfig.availableDays.findIndex(
    (day) => day === dayOfMonth.day
  );
  // evaluate if date has passed
  if (dateObj.getDate() < currentDate.getDate()) {
    dayOfMonth.datePassed = true;
  } else {
    dayOfMonth.datePassed = false;
  }
  // push day of month to calendar month array
  calendarMonth.push(dayOfMonth);
});

// add day of the month objects for each day in the next month
nextMonthDays.forEach((date) => {
  // create new date obj
  let dateObj = new Date();
  // set date object
  dateObj.setDate(date);
  // create day of month object
  let dayOfMonth = {};
  // set date
  dayOfMonth.date = date;
  // pull out month
  dayOfMonth.month = dateObj.getMonth() + 2;
  // adjust month
  dateObj.setMonth(dayOfMonth.month - 1);
  // pull out weekday
  if (dateObj.getDay() > 0) {
    dayOfMonth.day = calendarConfig.weekdays[dateObj.getDay() - 1];
  } else if (dateObj.getDay() === 0) {
    dayOfMonth.day = calendarConfig.weekdays[6]; // account for different starting day
  }
  // day can't be available since it's next month
  dayOfMonth.available = -1;
  // date hasn't passed since it's next month
  dayOfMonth.datePassed = false;
  // push day of month to calendar month array
  calendarMonth.push(dayOfMonth);
});

console.log(calendarMonth);

// build calendar
function buildCalendar() {
  // get container
  let container = document.getElementById("calendarGrid");
  // create document fragment
  let fragment = document.createDocumentFragment();
  // declare day counter
  let dayCounter = 1;
  // declare incrementer
  let incrementer = 0;
  // create calendar-row divs
  let calendarRow1 = document.createElement("div");
  calendarRow1.setAttribute("class", "calendar-row");
  let calendarRow2 = document.createElement("div");
  calendarRow2.setAttribute("class", "calendar-row");
  let calendarRow3 = document.createElement("div");
  calendarRow3.setAttribute("class", "calendar-row");
  let calendarRow4 = document.createElement("div");
  calendarRow4.setAttribute("class", "calendar-row");
  let calendarRow5 = document.createElement("div");
  calendarRow5.setAttribute("class", "calendar-row");
  // for every calendar date object:
  calendarMonth.forEach((date) => {
    // create p elemet
    let p = document.createElement("p");
    if (date.datePassed === true) {
      p.setAttribute("class", "passed-date");
    }
    if (date.available >= 0 && date.datePassed === false) {
      p.setAttribute("class", "available");
      p.setAttribute("onclick", `selectDate(event, ${incrementer})`);
    } else {
      // p.setAttribute("class", "unavailable");
    }
    p.textContent = date.date;
    // increment incrementor
    incrementer++;
    // determine where to put the newly made p object
    if (dayCounter > 0 && dayCounter <= 7) {
      // place p in the first calendar row
      calendarRow1.appendChild(p);
    } else if (dayCounter > 7 && dayCounter <= 14) {
      // place p in the second calendar row
      calendarRow2.appendChild(p);
    } else if (dayCounter > 14 && dayCounter <= 21) {
      // place p in the second calendar row
      calendarRow3.appendChild(p);
    } else if (dayCounter > 21 && dayCounter <= 28) {
      // place p in the second calendar row
      calendarRow4.appendChild(p);
    } else if (dayCounter > 28 && dayCounter <= 35) {
      // place p in the second calendar row
      calendarRow5.appendChild(p);
    }
    // increment day counter
    dayCounter++;
  });
  // append all calendar rows into fragment
  fragment.appendChild(calendarRow1);
  fragment.appendChild(calendarRow2);
  fragment.appendChild(calendarRow3);
  fragment.appendChild(calendarRow4);
  fragment.appendChild(calendarRow5);
  // append fragment into container
  container.appendChild(fragment);
}

// declare selected date
let dateSelected = "";

// handle selecting of a date
function selectDate(evt, index) {
  // remove selected from any other elements
  let selectedElement = document.getElementsByClassName("selected");
  // length
  if (selectedElement.length > 0) {
    selectedElement[0].classList.remove("selected");
  }
  // set selected class on selected object
  evt.currentTarget.className += " selected";
  // get date object
  let dateObj = calendarMonth[index];
  console.log(dateObj);
  // capitalize day and month
  let day = uppercaseFirst(dateObj.day);
  // craft date
  let selectedDate = `${day}, October ${dateObj.date} 2020`;
  dateSelected = selectedDate;
  // get selected date p element
  let selectedDateP = document.getElementById("dateSelected");
  selectedDateP.textContent = selectedDate;
  // call calculate price
  let groupSize = groupInput.value;
  if (groupSize > 0) {
    calculatePrice();
  }
}

// function to uppercase first letter of string
function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

buildCalendar();

// Form Functionality
// get first name input
let firstName = document.getElementById("fName");
// get last name box
let lastName = document.getElementById("lName");
// get email
let email = document.getElementById("email");
// get phone
let phone = document.getElementById("phone");
// get group size select box
let groupInput = document.getElementById("groupSize");
// get price p element
let price = document.getElementById("price");
// get book now button
let bookNowBtn = document.getElementById("bookNowBtn");

// Calculate Price
function calculatePrice() {
  // get group input value
  let groupSize = groupInput.value;
  // get selected date
  let day = dateSelected.split(",");
  // get price for the day
  let wkDay = day[0].toLowerCase();
  console.log(wkDay);
  let dayPrice = calendarConfig.pricing[wkDay];
  console.log(calendarConfig.pricing);
  // calculate price
  let total = parseInt(groupSize) * dayPrice;
  console.log(groupSize);
  console.log(dayPrice);
  // change html
  price.textContent = `$${total}.00`;
}

// handle form submission
function confirmBooking() {
  // grab form info
  let fName = firstName.value;
  let lName = lastName.value;
  let emailInput = email.value;
  let phonePhone = phone.value;
  let groupSize = groupInput.value;
  // show confirmation message
  let modal = document.getElementById("modal");
  document.getElementById("customerName").textContent = fName + lName;
  document.getElementById("customerEmail").textContent = emailInput;
  document.getElementById("bookingDate").textContent = dateSelected;
  document.getElementById("modal").style.display = "block";
}

// closemodal
function closeModal() {
  document.getElementById("modal").style.display = "none";
}
