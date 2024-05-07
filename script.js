'use strict';

///////////////////////////////////////
// Modal window//////Dom//////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelectorAll('.nav__link');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

////////////////////////////////////////
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////////////////Create//////////////////////////////////////////////////////////
const message = document.createElement('div'); //create a div
message.classList.add('cookie-message'); //add a class list which in css
message.innerHTML = `hello world how are you 
<button class="btn-cokkie">bingo got it</button>`; //create html
header.append(message); // set it after header
//header.prepend(message);  //before header

////////////////////////////////////delete//////////////////////////////////////////////////////

document.querySelector('.btn-cokkie').addEventListener('click', function () {
  message.remove(); //btncokkei class button click then whole massage element remove
  //logic is select btn for click and the call element to remove
});

/*
/////////////////////getAttri///////////////////////////
const logo = document.querySelector('.nav__logo');
console.log(logo.getAttribute('src')); //te get img

const link = document.querySelector('.nav__link'); //to get link
console.log(link.getAttribute('href'));
////class///
logo.classList.add();
logo.classList.remove();
logo.classList.toggle(); // it will add the class if it's not already present,
// and remove it if it is present

logo.classList.contains(); //The contains method is used to check if a specific
//class exists on an element's class list.
// This method returns a boolean indicating

/////////////////////////////////btn for scroll///////////////////////////////////////
///btn to get mid page

btnScrollTo.addEventListener('click', function (e) {
  // Get the dimensions and position of the element relative to the viewport
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // Calculate the middle position of the element
  const mid = s1coords.top + s1coords.height / 2;
  // Calculate the center position to scroll to by adjusting for the viewport height
  const cen = mid + window.pageYOffset - window.innerHeight / 2;
  // Execute the scroll
  window.scrollTo({
    top: cen,
    behavior: 'smooth',
  });
});
*/

/////btn for scroll to get whole page from 2 ways old and new
btnScrollTo.addEventListener('click', function (e) {
  /*
  const section1Scroll = section1.getBoundingClientRect();
   window.scrollTo({
    left: section1Scroll.left + window.pageXOffset,
    top: section1Scroll.top + window.pageYOffset,
    behavior: 'smooth',
  });*/

  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////eventlistner///////////////////

/*
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('hello how are you');
};
h1.addEventListener('mouseenter', alertH1);
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
*/
//////////////////////////////pageNav////////////////////////////////////

// navLinks.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     console.log('LINK');
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    console.log('link');

    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//////////////////btn operation/////////////////////////////////////

//tabs.forEach(t => t.addEventListener('click', () => console.log('tab')));
tabContainer.addEventListener('click', function (e) {
  ////select button for click as web not spread to get slow
  const click = e.target.closest('.operations__tab'); ///target element closet at operation tab class as span and button both
  console.log(click);
  if (!click) return; //as click outside of target should be noting js not gonna work outside
  tabs.forEach(t => t.classList.remove('operations__tab--active')); //remove active class from each element

  click.classList.add('operations__tab--active'); //but when gonna click in button its gonna show by active button
  console.log(click.dataset.tab); ///cjeck click.data.tab value
  tabsContent.forEach(c => c.classList.remove('operations__content--active')); //tabcontent each content classlist remove if its active
  document
    .querySelector(`.operations__content--${click.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////nav btn amination buble////////////////////////

///first make a function for mouse then use it fr button

const handaler = function (e, opacity) {
  // Check if the target element has the class 'nav__link'
  if (e.target.classList.contains('nav__link')) {
    //console.log('Event target is a nav link');

    const cureentLink = e.target;
    //console.log(cureentLink);

    // Find all sibling links and the logo within the same nav
    const siblings = cureentLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = cureentLink.closest('.nav').querySelector('img');
    //console.log('Siblings:', siblings);
    //console.log('Logo:', logo);

    // Reduce the opacity of all sibling links and the logo
    //if each link dont current link then opsity:0.5
    siblings.forEach(el => {
      if (el !== cureentLink) {
        //console.log('Reducing opacity for:', el);
        el.style.opacity = opacity;
      }
    });

    // Reduce the opacity of the logo
    logo.style.opacity = opacity;
    //console.log('Reduced logo opacity');
  }
};

nav.addEventListener('mouseover', function (e) {
  //console.log('Mouseover event triggered');
  handaler(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  //target all nav link not logo to do affect
  handaler(e, 1);
});

///////////////////////////////////////sticky navigation/////////////////////

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOption = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOption);
// observer.observe(section1);
// const stickyNav = function (entries) {
//   const [entry] = entries;
//   console.log(entry);
//   ///if isntersectig  flase cuz its ture normally when its header
//   //visible but when u corss the header or new section than its
//   //become false thats why that time u need to see nav sticky class
//   if (!entry.isIntersecting) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// };
// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
// });
// headerObserver.observe(header);
////////////////////////////////chat gpt version

//7.select the height with consol and do minus to get nav before finish head
const navHeight = nav.getBoundingClientRect().height;

console.log(navHeight);
// 1. Define the function that handles the intersection events
const stickyNav = function (entries) {
  //5.check it is it when its true when false
  const [entry] = entries; // Destructure the first entry from the array
  console.log('1. Intersection Observer entry:', entry); // Log the entry to the console for debugging

  //6 . Check if the target is not intersecting (scrolling past the header)
  if (!entry.isIntersecting) {
    nav.classList.add('sticky'); // Add sticky class when header is not visible
    //console.log('3. Header is not visible. Nav is now sticky.'); // Log status
  } else {
    nav.classList.remove('sticky'); // Remove sticky class when header is visible
    //console.log('3. Header is visible. Nav is not sticky.'); // Log status
  }
};

// 2. Set up options for the Intersection Observer
const observerOptions = {
  root: null, // Observe intersections relative to the viewport
  threshold: 0, // Trigger callback when 0% of the target is visible
  rootMargin: `-${navHeight}px`, //8.start before finish header 90%
};

// 3. Create the Intersection Observer with the stickyNav function and options
const headerObserver = new IntersectionObserver(stickyNav, observerOptions);
console.log('4. Intersection Observer created with threshold 0.'); // Log the creation of the observer

// 4. Assume 'header' is the element to observe
headerObserver.observe(header); // Start observing the header
console.log('5. Started observing the header.'); // Log that observation has started

/////////////////////////revel all section//////////////////////////////////

const allSections = document.querySelectorAll('.section'); //1st
const revelsection = function (entries, observer) {
  //2nd
  const [entry] = entries;
  //console.log(entry);//6th
  if (!entry.isIntersecting) return; //7th
  entry.target.classList.remove('section--hidden'); //8th
};

const sectionObserver = new IntersectionObserver(revelsection, {
  //3rd
  root: null,
  threshold: 0.2,
});
allSections.forEach(function (section) {
  //4th
  sectionObserver.observe(section);
  //section.classList.add('section--hidden'); //5th
});

///lazy img load
const imgTargets = document.querySelectorAll('img[data-src]'); //1st
const loadIMg = function (entries, observer) {
  //2nd
  const [entry] = entries; //5th
  console.log(`img`, entry); //6th
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadIMg, {
  //3rd
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img)); //4th
//1st each then api then  api gonna ca ll function

/////////////////slide/////////////////////

const slides = document.querySelectorAll('.slide');
const silder = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let currentslide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
const goTo = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goTo(0);
const nextSlide = function () {
  if (currentslide === maxSlide - 1) {
    currentslide = 0;
  } else {
    currentslide++;
  }
  goTo(currentslide);
};
const prevslide = function () {
  if (currentslide === 0) {
    currentslide = maxSlide - 1;
  } else {
    currentslide--;
  }

  goTo(currentslide);
};
//next btn
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevslide);

document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key == 'ArrowLeft') prevslide();
  else if (e.key == 'ArrowReft') nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    console.log('dot');
    const { slide } = e.target.dataset;
    goTo(slide);
  }
});
