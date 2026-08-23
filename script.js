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
//
// Transitions are hand-rolled with inline styles rather than a plain src swap:
// the outgoing image eases out (fade + slight slide + shrink), then the
// incoming image jumps -- with transitions off, so it's an invisible cut --
// to a starting position on the appropriate side, and springs into place
// with an overshooting cubic-bezier for a soft, bouncy settle.
document.addEventListener('DOMContentLoaded', function () {
  var carousels = document.querySelectorAll('.project-carousel');

  var EXIT_MS = 220;
  var EXIT_TRANSITION = 'opacity 0.22s ease, transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)';
  var ENTER_TRANSITION = 'opacity 0.34s ease, transform 0.56s cubic-bezier(0.34, 1.56, 0.64, 1)';
  var OFFSET_PX = 42;

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
    var animating = false;
    if (totalEl) totalEl.textContent = pages.length;

    function setSrc() {
      img.src = pages[index];
      img.alt = 'Mythos Book Store website page ' + (index + 1) + ' of ' + pages.length;
      if (currentEl) currentEl.textContent = index + 1;
    }

    function goTo(direction) {
      if (animating || pages.length < 2) return;
      animating = true;

      var exitX = direction === 'next' ? -OFFSET_PX : OFFSET_PX;
      var enterX = direction === 'next' ? OFFSET_PX : -OFFSET_PX;

      // Ease the current image out.
      img.style.transition = EXIT_TRANSITION;
      img.style.opacity = '0';
      img.style.transform = 'translateX(' + exitX + 'px) scale(0.97)';

      setTimeout(function () {
        index = direction === 'next'
          ? (index + 1) % pages.length
          : (index - 1 + pages.length) % pages.length;
        setSrc();

        // Jump to the entry position with transitions off -- an invisible cut.
        img.style.transition = 'none';
        img.style.transform = 'translateX(' + enterX + 'px) scale(0.97)';

        // Force a reflow so the jump above is committed before re-enabling
        // transitions, otherwise the browser coalesces both style changes.
        void img.offsetWidth;

        // Spring the new image into its resting position.
        img.style.transition = ENTER_TRANSITION;
        img.style.opacity = '1';
        img.style.transform = 'translateX(0) scale(1)';

        animating = false;
      }, EXIT_MS);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () { goTo('prev'); });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () { goTo('next'); });
    }

    setSrc();
  });
});
