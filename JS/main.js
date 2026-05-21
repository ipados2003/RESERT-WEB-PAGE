document.addEventListener('DOMContentLoaded', function() {
    handleTextBox();
    setupIntersectionObserver();
    setupMenuToggle();
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

