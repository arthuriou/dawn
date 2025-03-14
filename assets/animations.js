document.addEventListener('DOMContentLoaded', () => {
  const layers = document.querySelectorAll('.layer');
  const cards = document.querySelectorAll('.product-card');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const addToCartButtons = document.querySelectorAll('.btn-3d[data-action="add-to-cart"]');
  const cartPopup = document.querySelector('.cart-popup');
  const closePopup = document.querySelector('.close-popup');

  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      layers.forEach((layer, i) => {
        const depth = (i + 1) * 10;
        layer.style.transform = `translateZ(-${depth * 10}px) translateX(${x / depth}px) translateY(${y / depth}px) scale(${1 + depth / 100})`;
      });
    });
  }

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.querySelector('.card-inner').style.transform = `translateZ(20px) rotateX(${y * 10}deg) rotateY(${x * -10}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.card-inner').style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
    });
  });

  menuToggle.addEventListener('click', () => {
    navMobile.classList.toggle('active');
  });

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const form = button.closest('form');
      const itemName = form ? form.previousElementSibling.textContent : 'Produit';
      document.getElementById('popup-item').textContent = `${itemName} ajouté au panier !`;
      cartPopup.style.display = 'block';
      if (form) form.submit();
    });
  });
  closePopup.addEventListener('click', () => {
    cartPopup.style.display = 'none';
  });
});