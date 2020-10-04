// Handle Active Class toggles on link click

// Show Mobile Nav on Click
let hamburger = document.getElementById("hamburger");
hamburger.addEventListener("click", toggleMobileNav);

function toggleMobileNav() {
  // get mobile nav
  let mNav = document.getElementById("mNav");
  // get display value
  let displayVal = mNav.style.display;
  // toggle display value based on its current value
  if (displayVal != "flex") {
    mNav.style.display = "flex";
  } else if (displayVal === "flex") {
    mNav.style.display = "none";
  }
}

// Handle Active Class toggles on mobile nav

// Hide Mobile Nav on click
let closeBtn = document.getElementById("mNav-close");
closeBtn.addEventListener("click", toggleMobileNav);

// Handle carousel functionality
