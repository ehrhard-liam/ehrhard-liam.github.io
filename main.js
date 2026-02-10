window.addEventListener('scroll', () => {
    const card = document.getElementById('main-card');
    const scrollHint = document.getElementById('scroll-hint');
    const scrollY = window.scrollY;

    // Gestion du Header
    if (scrollY > 80) {
        card.classList.add('is-header');
    } else {
        card.classList.remove('is-header');
    }

    // Gestion de l'indicateur de scroll
    if (scrollY > 50) {
        scrollHint.classList.add('hidden');
    } else {
        scrollHint.classList.remove('hidden');
    }
});

// Le reste de ton code (Intersection Observer pour les Bento Cards) reste identique...