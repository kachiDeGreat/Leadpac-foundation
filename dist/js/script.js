// Jquery pre-loader
$(window).on("load", function () {
  $(".loader-container").fadeOut(1000);
});

// header nav
(() => {
  const openNavMenu = document.querySelector(".open-nav-menu"),
    closeNavMenu = document.querySelector(".close-nav-menu"),
    navMenu = document.querySelector(".nav-menu"),
    menuOverlay = document.querySelector(".menu-overlay"),
    mediaSize = 991;

  if (openNavMenu) openNavMenu.addEventListener("click", toggleNav);
  if (closeNavMenu) closeNavMenu.addEventListener("click", toggleNav);
  // close the navMenu by clicking outside
  if (menuOverlay) menuOverlay.addEventListener("click", toggleNav);

  function toggleNav() {
    navMenu.classList.toggle("open");
    menuOverlay.classList.toggle("active");
    document.body.classList.toggle("hidden-scrolling");
  }

  if (navMenu) {
    navMenu.addEventListener("click", (event) => {
      if (
        event.target.hasAttribute("data-toggle") &&
        window.innerWidth <= mediaSize
      ) {
        // prevent default anchor click behavior
        event.preventDefault();
        const menuItemHasChildren = event.target.parentElement;
        // if menuItemHasChildren is already expanded, collapse it
        if (menuItemHasChildren.classList.contains("active")) {
          collapseSubMenu();
        } else {
          // collapse existing expanded menuItemHasChildren
          if (navMenu.querySelector(".menu-item-has-children.active")) {
            collapseSubMenu();
          }
          // expand new menuItemHasChildren
          menuItemHasChildren.classList.add("active");
          const subMenu = menuItemHasChildren.querySelector(".sub-menu");
          subMenu.style.maxHeight = subMenu.scrollHeight + "px";
        }
      }
    });
  }

  function collapseSubMenu() {
    navMenu
      .querySelector(".menu-item-has-children.active .sub-menu")
      .removeAttribute("style");
    navMenu
      .querySelector(".menu-item-has-children.active")
      .classList.remove("active");
  }
  function resizeFix() {
    // if navMenu is open ,close it
    if (navMenu.classList.contains("open")) {
      toggleNav();
    }
    // if menuItemHasChildren is expanded , collapse it
    if (navMenu.querySelector(".menu-item-has-children.active")) {
      collapseSubMenu();
    }
  }

  window.addEventListener("resize", function () {
    if (this.innerWidth > mediaSize) {
      resizeFix();
    }
  });
})();

// ==========================================
// NEW: HERO SECTION FADE SLIDER (jQuery)
// ==========================================
$(function () {
  // Select all slides
  var $slides = $(".hero-slide");
  var currentIndex = 0;
  var totalSlides = $slides.length;

  // Only run if we actually have slides
  if (totalSlides > 0) {
    setInterval(function () {
      // 1. Remove 'active' class from the current slide
      $slides.eq(currentIndex).removeClass("active");

      // 2. Calculate the next index (loops back to 0 automatically)
      currentIndex = (currentIndex + 1) % totalSlides;

      // 3. Add 'active' class to the new slide
      $slides.eq(currentIndex).addClass("active");
    }, 5000); // Change image every 5000ms (5 seconds)
  }
});

// programmes slider (Commented out as in your original file)
// $(".main-content .owl-carousel").owlCarousel({
//   loop: true,
//   margin: 20,
//   autoplay: true,
//   nav: true,
//   navText: [
//     '<i class="fas fa-arrow-circle-left" aria-hidden="true"></i>',
//     '<i class="fas fa-arrow-circle-right" aria-hidden="true"></i>',
//   ],
//   navContainer: ".main-content .custom-nav",
//   responsive: {
//     0: {
//       items: 1,
//     },
//     750: {
//       items: 2,
//     },
//     1200: {
//       items: 3,
//     },
//   },
// });
