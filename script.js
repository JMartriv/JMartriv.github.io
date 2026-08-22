// Back-to-top button: fades in once the hero is scrolled past, smooth-scrolls to top on click.
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  var SHOW_AFTER_PX = window.innerHeight * 0.6;

  function toggleVisibility() {
    if (window.scrollY > SHOW_AFTER_PX) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// In-gallery page carousel (e.g. Mythos web-page showcase): side arrows page
// through a set of screenshots one at a time. The image list is passed in
// via a data-pages attribute (JSON array of URL-encoded paths) so this same
// script can drive a carousel on any project page that needs one.
document.addEventListener('DOMContentLoaded', function () {
  var carousels = document.querySelectorAll('.project-carousel');

  carousels.forEach(function (carousel) {
    var img = carousel.querySelector('.carousel-frame img');
    var prevBtn = carousel.querySelector('.carousel-arrow.prev');
    var nextBtn = carousel.querySelector('.carousel-arrow.next');
    var currentEl = carousel.querySelector('.carousel-current');
    var totalEl = carousel.querySelector('.carousel-total');
    var pages = [];

    try {
      pages = JSON.parse(carousel.dataset.pages || '[]');
    } catch (e) {
      pages = [];
    }

    if (!img || !pages.length) return;

    var index = 0;
    if (totalEl) totalEl.textContent = pages.length;

    function render() {
      img.src = pages[index];
      img.alt = 'Mythos Book Store website page ' + (index + 1) + ' of ' + pages.length;
      if (currentEl) currentEl.textContent = index + 1;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        index = (index - 1 + pages.length) % pages.length;
        render();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        index = (index + 1) % pages.length;
        render();
      });
    }

    render();
  });
});
