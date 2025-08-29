// animation.js
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.animate-section');
  if (!sections.length) return;

  // IntersectionObserver beállítások
  const observerOptions = {
    threshold: 0.25 // akkor számít belépésnek, ha ~25%-a látszik
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // belépett -> mutatjuk (animáció elindul)
        entry.target.classList.add('visible');
      } else {
        // kilépett -> eltávolítjuk, hogy később újra lehessen indítani
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Anchor linkek kezelése (pl. <a href="#home">)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      // Csak akkor kezeljük, ha az adott szekció animálható (class animate-section)
      if (!target.classList.contains('animate-section')) return;

      e.preventDefault(); // megakadályozzuk a hirtelen ugrást

      // eltávolítjuk a visible-t, hogy lehessen újraindítani
      target.classList.remove('visible');

      // erőltetett reflow, biztosítjuk, hogy a remove érvényesüljön
      void target.offsetWidth;

      // sima görgetés oda
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Ha a szekció már a viewportban van, egy kis késleltetéssel újra hozzáadjuk,
      // különben az observer fogja hozzáadni amikor beér.
      const rect = target.getBoundingClientRect();
      const inViewNow = rect.top < window.innerHeight && rect.bottom > 0;

      if (inViewNow) {
        // kis késleltetés, hogy a smooth scroll elindulhasson, majd újraosztályozunk
        setTimeout(() => {
          target.classList.add('visible');
        }, 60);
      }
    });
  });

  // Fallback régebbi böngészőknek (ha nincs IntersectionObserver)
  if (!('IntersectionObserver' in window)) {
    const checkVisibility = () => {
      sections.forEach(section => {
        const r = section.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.85 && r.bottom > window.innerHeight * 0.15) {
          section.classList.add('visible');
        } else {
          section.classList.remove('visible');
        }
      });
    };
    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);
  }
});
