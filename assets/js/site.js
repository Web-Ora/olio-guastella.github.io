document.querySelector('.menu-toggle')?.addEventListener('click', function () {
  const nav = document.getElementById('nav');
  const open = nav.classList.toggle('open');
  this.setAttribute('aria-expanded', String(open));
});
