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
