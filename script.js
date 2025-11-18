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

    // Antes de imprimir, oculta os controles do header
    window.addEventListener('beforeprint', () => {
        const headerControls = document.querySelector('.header-controls');
        if (headerControls) {
            headerControls.style.display = 'none';
        }
    });

    // Após a impressão, restaura os controles do header
    window.addEventListener('afterprint', () => {
        const headerControls = document.querySelector('.header-controls');
        if (headerControls) {
            headerControls.style.display = '';
        }
    });

    // Gerenciamento do tema escuro/claro
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Função para obter o tema preferido do sistema
    function getSystemTheme() {
        try {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        } catch (e) {
            // Se não for possível detectar, retorna 'light'
        }
        return 'light';
    }

    // Função para aplicar o tema
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
        // Salva a preferência no localStorage
        localStorage.setItem('theme', theme);
    }

    // Função para obter o tema inicial
    function getInitialTheme() {
        // Primeiro, verifica se há uma preferência salva
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }
        // Se não houver preferência salva, usa o tema do sistema
        return getSystemTheme();
    }

    // Aplica o tema inicial
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);

    // Listener para mudanças no tema do sistema (quando não há preferência salva)
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Só atualiza se não houver preferência salva
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Listener para o botão de toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Intersection Observer para animações de scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Se for a seção de idiomas, anima as barras de progresso
                if (entry.target.classList.contains('languages')) {
                    const progressBars = entry.target.querySelectorAll('.progress-bar');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('style').match(/width:\s*(\d+)%/)[1];
                        bar.style.width = '0%'; // Reset para garantir animação
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, 100);
                    });
                }

                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('scroll-hidden'); // Garante que começa oculto via JS se CSS falhar
        observer.observe(section);
    });
});
