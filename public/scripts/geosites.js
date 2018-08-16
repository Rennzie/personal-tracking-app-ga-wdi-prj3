
document.addEventListener('DOMContentLoaded', () => {
  // Toggles the BURGER and displays the menu on mobile
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  const navBarMenu = document.querySelector('#menu-toggle');
  const notification = document.querySelector('#noti-message');
  const notificationClose = document.querySelector('#noti-message .delete');
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        navBarMenu.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

  notificationClose.addEventListener('click', () => {
    notification.classList.add('is-invisible');
  });
});
