const buttons = document.querySelectorAll('.timeframe-btn'); // Select all buttons

let hours = []; // Array to hold the hours data

fetch('data.json')
  .then((response) => {  // Fetch the JSON data  + then : promise method
    if(!response.ok) {
      return console.log('Oops! Something went wrong.');
    }
    return response.json();
  })
  .then((data) => {
    hours = data; // Store the fetched data in the hours array
    updateHours('weekly'); // Initial call to display weekly data
  });

function updateHours(period) {
  const timeContainer = document.querySelectorAll('.time-container'); // Select all time containers
  hours.forEach((activity, index) => {    //activity : an object title + timeframes and index: 0 for work...
    const currentHours = timeContainer[index].querySelector('.current'); // Select the current hours element
    const previousHours = timeContainer[index].querySelector('.previous'); // Select the previous hours element

    const timeframe = activity.timeframes[period]; //Get the timeframe data for the selected period
    currentHours.textContent = `${timeframe.current}hrs`; // Update the current hours text
    if (period === 'daily') {
      previousHours.textContent = `Yesterday - ${timeframe.previous}hrs`; // Update the previous hours text for daily
    } else if (period === 'weekly') {
      previousHours.textContent = `Last Week - ${timeframe.previous}hrs`; // Update the previous hours text for weekly
    } else if (period === 'monthly') {
      previousHours.textContent = `Last Month - ${timeframe.previous}hrs`; // Update the previous hours text for monthly
    }
  });
}

function setActive(currentBtn, allBtns) {
  allBtns.forEach (btn => btn.classList.remove('active')); // Remove active class from all buttons
  currentBtn.classList.add('active'); // Add active class to the clicked button
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('daily')) {
      updateHours('daily'); 
      setActive(btn, buttons);
    } else if (btn.classList.contains('weekly')) {
      updateHours('weekly'); 
      setActive(btn, buttons);
    } else if (btn.classList.contains('monthly')) {
      updateHours('monthly'); 
      setActive(btn, buttons);
    }
  });
});