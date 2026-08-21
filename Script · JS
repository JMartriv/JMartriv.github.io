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
