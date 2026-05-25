document.addEventListener('DOMContentLoaded', function() {
    handleTextBox();
    setupIntersectionObserver();
    setupMenuToggle();
    setupCarousels();
});

function handleTextBox() {
    const textBox = document.querySelector('.text-box');
    if (!textBox) return;

    const paragraphs = textBox.querySelectorAll('p');
    const toggleCheckbox = document.getElementById('textbox-toggle');
    
    const names = ['Alice', 'Emma', 'Olivia', 'Charlotte', 'Sophia', 'Léa', 'Chloé', 'Camille', 'Manon', 'Louise', 'Jeanne', 'Juliette', 'Rose', 'Ambre', 'Inès'];
    const listrandomName = [...names].sort(() => Math.random() - 0.5);
    const times = ['2 jours', '1 jour', '12 heures', '10 heures', '5 heures', '2 heures', '1 heure', '30 minutes', '10 minutes', '5 minutes', '1 minute'];
    const base_txt = "a réservé un appel";
    const base_time = "il y a";
    let currentName = "";
    let currentTime = "";

    function updateTextBox() {
        if (paragraphs.length >= 2) {
            textBox.classList.add('fade-out');
            if (times.length <= 0) {
                clearInterval(intervalId);
                return;
            }
            setTimeout(() => {
                currentName = listrandomName.pop();
                currentTime = times.pop();
                paragraphs[0].textContent = `${currentName} ${base_txt}`;
                paragraphs[1].textContent = `${base_time} ${currentTime}`;

                textBox.classList.remove('fade-out');
            }, 2000);
        }
    }
    
    let intervalId = setInterval(updateTextBox, 8000);

    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', function() {
            clearInterval(intervalId);
            textBox.classList.add('fade-out');
        });
    }
}

function setupIntersectionObserver() {
    const sections = document.querySelectorAll('section');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

function ismobile() {
    return window.innerWidth <= 600;
}

function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNavInner = document.querySelector('.site-nav-inner');
    const navLinks = document.querySelectorAll('.site-nav-inner a');

    if (!menuToggle || !siteNavInner) return;

    function updateInertState() {
        if (menuToggle.getAttribute('aria-expanded') === 'true') {
            siteNavInner.inert = false;
        } else {
            siteNavInner.inert = true;
        }
    }

    function hanfleResize() {
        if (ismobile()) {
            updateInertState();
        } else {
            updateInertState();
        }
    }

    window.addEventListener('resize', hanfleResize);
    hanfleResize();

    function openMenu() {
        siteNavInner.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        updateInertState();
    }

    function closeMenu() {
        siteNavInner.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        updateInertState();
    }

    window.addEventListener('scroll', () => {
        if (siteNavInner.classList.contains('active')) {
            closeMenu();
        }
    });
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

function setupCarousels() {
    const carousels = document.querySelectorAll('.carousel-wrapper');

    carousels.forEach(wrapper => {
        const carousel = wrapper.querySelector('.carousel');
        if (!carousel) return;

        const prevBtn = wrapper.querySelector('.carousel-btn.prev');
        const nextBtn = wrapper.querySelector('.carousel-btn.next');
        const dotsContainer = wrapper.querySelector('.carousel-dots');
        
        let items = Array.from(carousel.children);

        if (items.length === 0) return;

        let currentIndex = 0;

        function updateCarousel(smooth = true) {
            const itemWidth = items[0].getBoundingClientRect().width;
            const newScrollLeft = itemWidth * currentIndex;
            
            carousel.scrollTo({
                left: newScrollLeft,
                behavior: smooth ? 'smooth' : 'auto'
            });
            updateDots();
            updateButtons();
        }

        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            items.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                if (index === currentIndex) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarousel();
                });
                dotsContainer.appendChild(dot);
            });
        }

        function updateDots() {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function updateButtons() {
            if (prevBtn) {
                prevBtn.disabled = currentIndex === 0;
            }
            if (nextBtn) {
                nextBtn.disabled = currentIndex === items.length - 1;
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < items.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }

        let scrollTimeout;
        carousel.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const itemWidth = items[0].getBoundingClientRect().width;
                const newIndex = Math.round(carousel.scrollLeft / itemWidth);
                if (newIndex !== currentIndex) {
                    currentIndex = newIndex;
                    updateButtons();
                    updateDots();
                }
            }, 20); // Délai pour éviter les mises à jour excessives pendant le défilement
        });

        window.addEventListener('resize', () => {
            updateCarousel(false);
        });

        updateButtons();
        createDots();
    });
}

