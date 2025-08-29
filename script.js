const container = document.getElementById('projects-container');
const projects = []


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

// Back to top gomb
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('back-to-top');

  if (!btn) return; // Ha nincs gomb, ne csináljon hibát

  // Gomb megjelenítése scroll alapján
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  // Smooth scroll vissza a tetejére
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Betöltjük a projects.json fájlt
fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    projects.forEach((proj, index) => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      card.style.animationDelay = `${0.2 * index}s`; // fokozatos animáció
      card.innerHTML = `
        <img src="${proj.image}" alt="${proj.name}" style="width:100%; border-radius:10px; margin-bottom:10px;">
        <h3>${proj.name}</h3>
        <p>${proj.description}</p>
        <a href="${proj.link}" target="_blank">Megnézem</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Hiba a JSON betöltésénél:', error));

