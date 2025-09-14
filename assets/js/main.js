/**
* Template Name: College
* Template URL: https://bootstrapmade.com/college-bootstrap-education-template/
* Updated: Jun 19 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Hero Carousel with Progress Bar
   */
  function initHeroCarousel() {
    const heroCarousel = document.getElementById('heroCarousel');
    const progressBar = document.querySelector('.carousel-progress-bar');
    
    if (heroCarousel && progressBar) {
      const carousel = new bootstrap.Carousel(heroCarousel, {
        interval: 4000,
        wrap: true,
        ride: 'carousel'
      });

      let currentInterval = 4000;
      let startTime = Date.now();
      let progressInterval;

      function updateProgressBar() {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed / currentInterval) * 100;
        
        if (progress >= 100) {
          progressBar.style.width = '100%';
          setTimeout(() => {
            progressBar.style.width = '0%';
            startTime = Date.now();
          }, 100);
        } else {
          progressBar.style.width = progress + '%';
        }
      }

      function startProgress() {
        startTime = Date.now();
        progressBar.style.width = '0%';
        progressInterval = setInterval(updateProgressBar, 50);
      }

      function stopProgress() {
        clearInterval(progressInterval);
        progressBar.style.width = '0%';
      }

      // Start progress on load
      startProgress();

      // Reset progress on slide change
      heroCarousel.addEventListener('slide.bs.carousel', function () {
        stopProgress();
        setTimeout(startProgress, 100);
      });

      // Pause on hover
      heroCarousel.addEventListener('mouseenter', function () {
        carousel.pause();
        stopProgress();
      });

      // Resume on mouse leave
      heroCarousel.addEventListener('mouseleave', function () {
        carousel.cycle();
        startProgress();
      });

      // Handle manual navigation
      const indicators = heroCarousel.querySelectorAll('.carousel-indicators button');
      const controls = heroCarousel.querySelectorAll('.carousel-control-prev, .carousel-control-next');
      
      [...indicators, ...controls].forEach(element => {
        element.addEventListener('click', function () {
          stopProgress();
          setTimeout(startProgress, 100);
        });
      });
    }
  }

  // Initialize hero carousel when DOM is loaded
  document.addEventListener('DOMContentLoaded', initHeroCarousel);

})();