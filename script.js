const container = document.getElementById('projects-container');

projects.forEach((proj, index) => {
  const card = document.createElement('div');
  card.classList.add('project-card');
  card.style.animationDelay = `${0.2 * index}s`; // fokozatos animáció
  card.innerHTML = `
    <h3>${proj.name}</h3>
    <p>${proj.description}</p>
  `;
  container.appendChild(card);
});
// backToTop.js
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('back-to-top');

  // Megjelenítés scroll alapján
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  // Klikk vissza a tetejére
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
