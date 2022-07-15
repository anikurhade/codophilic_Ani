/**
 *  Typing Effect 
 */
const typedtextSpan =document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textarray=["Anirudha","Web Developer "," Codophilic Learner","Security Researcher", " A Tech Enthusiastic"]
  const typingdelay=200; //this is delay on typing new letter of same term so typing is slower than erasing
  const erasingdelay=100;//this is delay for erasing each letter of same term
  const newtextdelay=1500;// delay between new term and next term
  let textarrayIndex =0;
  let charindex =0;
 
function type() {
if (charindex < textarray[textarrayIndex].length) {
  if(!cursorSpan.classList.contains("typing")) 
  {
    cursorSpan.classList.add("typing");
  }
  typedtextSpan.textContent += textarray[textarrayIndex].charAt(charindex);
  charindex++;
  setTimeout(type, typingdelay);
} 
else {
  cursorSpan.classList.remove("typing");
    setTimeout(erase, newtextdelay);
}
}

function erase() {
  if (charindex > 0) {
  if(!cursorSpan.classList.contains("typing"))
  {
     cursorSpan.classList.add("typing");
  }
  typedtextSpan.textContent = textarray[textarrayIndex].substring(0, charindex-1);
  charindex--;
  setTimeout(erase, erasingdelay);
} 
else {
  cursorSpan.classList.remove("typing");
  textarrayIndex++;
  if(textarrayIndex>=textarray.length) textarrayIndex=0;
  setTimeout(type, typingdelay + 1100);
}
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
if(textarray.length) setTimeout(type, newtextdelay + 250);
});
/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId)

  if(toggle && nav){
      toggle.addEventListener('click', ()=>{
          nav.classList.toggle('show')
      })
  }
}
showMenu('nav-toggle','nav-menu')

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');   

function linkAction(){
/*Active link*/
navLink.forEach(n => n.classList.remove('active'));
this.classList.add('active');

/*Remove menu mobile*/
const navMenu = document.getElementById('nav-menu')
navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true
});

/*SCROLL HOME*/
sr.reveal('.home__title',{}); 
sr.reveal('.button',{delay: 200}); 
sr.reveal('.home__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 

/*SCROLL ABOUT*/
sr.reveal('.about__img',{}); 
sr.reveal('.about__subtitle',{delay: 400}); 
sr.reveal('.about__text',{delay: 400}); 

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle',{}); 
sr.reveal('.skills__text',{}); 
sr.reveal('.skills__data',{interval: 200}); 
sr.reveal('.skills__img',{delay: 600});

/*SCROLL WORK*/
sr.reveal('.work__img',{interval: 200}); 

/*SCROLL CONTACT*/
sr.reveal('.contact__input',{interval: 200}); 




  // search-box open close js code
  let navbar = document.querySelector(".navbar");
  let searchBox = document.querySelector(".search-box .bx-search");
  // let searchBoxCancel = document.querySelector(".search-box .bx-x");
  
  searchBox.addEventListener("click", ()=>{
    navbar.classList.toggle("showInput");
    if(navbar.classList.contains("showInput")){
      searchBox.classList.replace("bx-search" ,"bx-x");
    }else {
      searchBox.classList.replace("bx-x" ,"bx-search");
    }
  });
  
  // sidebar open close js code
  let navLinks = document.querySelector(".nav-links");
  let menuOpenBtn = document.querySelector(".navbar .bx-menu");
  let menuCloseBtn = document.querySelector(".nav-links .bx-x");
  menuOpenBtn.onclick = function() {
  navLinks.style.left = "0";
  }
  menuCloseBtn.onclick = function() {
  navLinks.style.left = "-100%";
  }
  
  
  // sidebar submenu open close js code
  let htmlcssArrow = document.querySelector(".htmlcss-arrow");
  htmlcssArrow.onclick = function() {
   navLinks.classList.toggle("show1");
  }
  let moreArrow = document.querySelector(".more-arrow");
  moreArrow.onclick = function() {
   navLinks.classList.toggle("show2");
  }
  let jsArrow = document.querySelector(".js-arrow");
  jsArrow.onclick = function() {
   navLinks.classList.toggle("show3");
  }
  