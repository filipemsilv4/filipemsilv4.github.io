document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Antes de imprimir, oculta o botão de idioma
    window.addEventListener('beforeprint', () => {
        const langLink = document.querySelector('.language-link');
        if (langLink) {
            langLink.style.display = 'none';
        }
    });

    // Após a impressão, restaura o botão de idioma
    window.addEventListener('afterprint', () => {
        const langLink = document.querySelector('.language-link');
        if (langLink) {
            langLink.style.display = '';
        }
    });
});
