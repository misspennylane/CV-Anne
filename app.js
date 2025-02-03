document.getElementById('contact-form').onsubmit = function(event) {
  event.preventDefault(); // Voorkom dat het formulier normaal verzendt

  // Formuliergegevens verzamelen
  const formData = new FormData(event.target);

  // Formulieren verzenden
  fetch(event.target.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      alert('Bedankt voor je bericht!');
      event.target.reset(); // Formulier resetten
    } else {
      alert('Er ging iets mis, probeer het opnieuw.');
    }
  }).catch(error => {
    alert('Er ging iets mis, probeer het opnieuw.');
  });
};


// Mobile Menu Configuration
class MobileMenu {
  constructor() {
    this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    this.navLinks = document.querySelector('.nav-links');
    this.isOpen = false;
    this.init();
  }

  init() {
    this.mobileMenuBtn.addEventListener('click', () => this.toggleMenu());
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar') && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.navLinks.classList.toggle('active');
    this.mobileMenuBtn.classList.toggle('active');
  }

  closeMenu() {
    this.isOpen = false;
    this.navLinks.classList.remove('active');
    this.mobileMenuBtn.classList.remove('active');
  }
}

// Smooth Scroll Handler
class SmoothScroll {
  constructor() {
    this.mobileMenu = null;
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  setMobileMenu(mobileMenu) {
    this.mobileMenu = mobileMenu;
  }

  handleClick(e) {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.getAttribute('href'));

    if (target) {
      // Close mobile menu if open
      if (this.mobileMenu) {
        this.mobileMenu.closeMenu();
      }

      const headerOffset = document.querySelector('.navbar').offsetHeight;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// Back to Top Button Handler
class BackToTop {
  constructor() {
    this.button = document.getElementById('backToTopBtn');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.toggleVisibility());
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  toggleVisibility() {
    const scrolled = window.scrollY > 300;
    this.button.classList.toggle('show', scrolled);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// Intersection Observer for Animations
class AnimationObserver {
  constructor() {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this.options
    );

    this.init();
  }

  init() {
    document.querySelectorAll('section').forEach(section => {
      this.observer.observe(section);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = new MobileMenu();
  const smoothScroll = new SmoothScroll();
  smoothScroll.setMobileMenu(mobileMenu);
  new BackToTop();
  new AnimationObserver();

  // Set scroll padding for fixed header
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    document.documentElement.style.setProperty(
      '--scroll-padding',
      navbar.offsetHeight + 'px'
    );
  }
});



// // Mobile Menu Toggle
// const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
// const navLinks = document.querySelector('.nav-links');
//
// mobileMenuBtn.addEventListener('click', () => {
//   navLinks.classList.toggle('active');
//   // Animate hamburger to X
//   mobileMenuBtn.classList.toggle('active');
// });
//
// // Smooth Scroll for Navigation Links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault();
//     const target = document.querySelector(this.getAttribute('href'));
//     if (target) {
//       // Close mobile menu if open
//       navLinks.classList.remove('active');
//       mobileMenuBtn.classList.remove('active');
//
//       // Smooth scroll to target
//       target.scrollIntoView({
//         behavior: 'smooth'
//       });
//     }
//   });
// });
//
// // Back to Top Button
// const backToTopBtn = document.getElementById('backToTopBtn');
//
// window.addEventListener('scroll', () => {
//   if (window.scrollY > 300) {
//     backToTopBtn.classList.add('show');
//   } else {
//     backToTopBtn.classList.remove('show');
//   }
// });
//
// backToTopBtn.addEventListener('click', () => {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth'
//   });
// });
//
// // Add scroll padding for fixed header
// document.documentElement.style.setProperty(
//   '--scroll-padding',
//   document.querySelector('.navbar').offsetHeight + 'px'
// );
//
// // Intersection Observer for fade-in animations
// const observerOptions = {
//   threshold: 0.1,
//   rootMargin: '0px 0px -50px 0px'
// };
//
// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('fade-in');
//       observer.unobserve(entry.target);
//     }
//   });
// }, observerOptions);
//
// // Observe all sections
// document.querySelectorAll('section').forEach(section => {
//   observer.observe(section);
// });
//
