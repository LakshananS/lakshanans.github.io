'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const hero = document.querySelector("[data-hero]");
const main = document.querySelector("main");

// add event to all nav link
// Navigation function
const navigateToPage = function (clickedPage) {
  const targetPage = clickedPage.replace("#", "").trim().toLowerCase();
  const isHome = targetPage === "home" || targetPage === "" || targetPage === "lakshanan.";

  const finalTarget = isHome ? "home" : targetPage;

  // Toggle Sidebar visibility
  if (finalTarget === "resume" || finalTarget === "about" || finalTarget === "portfolio" || finalTarget === "contact") {
    sidebar.style.display = "none";
    main.classList.add("full-width");
  } else {
    sidebar.style.display = "block";
    main.classList.remove("full-width");
  }

  // Toggle Hero and Main
  if (isHome) {
    hero.classList.add("active");
    main.style.display = "none";
  } else {
    hero.classList.remove("active");
    main.style.display = "flex";
  }

  // Update Pages and Nav Links
  pages.forEach(page => {
    if (page.dataset.page === finalTarget) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });

  navigationLinks.forEach(link => {
    const linkText = link.innerHTML.toLowerCase().trim();
    const linkHref = link.getAttribute("href").replace("#", "").trim().toLowerCase();

    if (linkHref === finalTarget || (isHome && (linkHref === "home" || linkHref === "lakshanan."))) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  window.scrollTo(0, 0);
};

// Handle initial load and hash change
window.addEventListener("hashchange", () => {
  navigateToPage(window.location.hash);
});

// Initial navigation based on current hash
window.addEventListener("load", () => {
  if (window.location.hash) {
    navigateToPage(window.location.hash);
  } else {
    navigateToPage("home");
  }
});

// add event to all nav link
navigationLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    // The hash will update automatically due to <a> href="#...", 
    // and the hashchange listener will trigger navigation.
    // If the link text is "Lakshanan.", we want it to go to home.
    const linkText = this.innerHTML.toLowerCase().trim();
    if (linkText === "lakshanan.") {
      window.location.hash = "#home";
    }
  });
});


// Experience Duration Calculator
const updateExpDuration = () => {
  const expElement = document.getElementById("exp-duration");
  if (expElement) {
    const startDate = new Date(2025, 2, 1); // March 1, 2025
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    let durationStr = "2025 March — Present (";
    if (years > 0) durationStr += `${years} year${years > 1 ? 's' : ''} `;
    if (months > 0) durationStr += `${months} month${months > 1 ? 's' : ''}`;
    if (years === 0 && months === 0) durationStr += "Started this month";
    durationStr += ")";

    expElement.innerText = durationStr;
  }
};

updateExpDuration();


// Timeline Scroll Animation
window.addEventListener("scroll", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const triggerBottom = window.innerHeight * 0.8;

  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add("active-car");
    } else {
      item.classList.remove("active-car");
    }
  });
});


// Initial state
if (hero.classList.contains("active")) {
  main.style.display = "none";
} else {
  const activePage = Array.from(pages).find(page => page.classList.contains("active"))?.dataset.page;
  if (activePage === "about" || activePage === "resume" || activePage === "portfolio" || activePage === "contact") {
    sidebar.style.display = "none";
    main.classList.add("full-width");
  }
}


// Header scroll effect
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.padding = "1rem 2rem";
    header.style.background = "rgba(3, 0, 20, 0.9)";
  } else {
    header.style.padding = "1.5rem 2rem";
    header.style.background = "rgba(3, 0, 20, 0.7)";
  }
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
const contactBtn = contactForm.querySelector('[data-form-btn]');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Change button state
  const originalBtnText = contactBtn.innerHTML;
  contactBtn.innerHTML = '<ion-icon name="sync-outline" class="rotate"></ion-icon><span>Sending...</span>';
  contactBtn.setAttribute("disabled", "");

  // Get form data
  const fullname = this.querySelector('[name="fullname"]').value;
  const email = this.querySelector('[name="email"]').value;
  const message = this.querySelector('[name="message"]').value;

  // Get current time as a readable string
  const now = new Date();
  const time = now.toLocaleString();

  // Send email using EmailJS
  emailjs.sendForm(config.EMAILJS_SERVICE_ID, config.EMAILJS_TEMPLATE_ID, this)
    .then(function (response) {
      console.log("SUCCESS", response);
      alert("Message sent successfully!");
      contactForm.reset();
      contactBtn.innerHTML = originalBtnText;
      contactBtn.setAttribute("disabled", "");
    }, function (error) {
      console.log("FAILED", error);
      alert("Failed to send message. Please try again.");
      contactBtn.innerHTML = originalBtnText;
      contactBtn.removeAttribute("disabled");
    });
});

