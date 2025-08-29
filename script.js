
  document.querySelector('a[href="#home"]').addEventListener('click', function() {
    const section = document.querySelector('#home');

    // töröljük az animációt, hogy újraindítható legyen
    section.classList.remove('animate-section');

    // kis késleltetéssel visszatesszük
    setTimeout(() => {
      section.classList.add('animate-section');
    }, 50); 
  });

