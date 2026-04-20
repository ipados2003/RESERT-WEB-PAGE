document.addEventListener('DOMContentLoaded', function() {
    const textBox = document.querySelector('.text-box');
    const paragraphs = textBox.querySelectorAll('p');
    const toggleCheckbox = document.getElementById('textbox-toggle');
    let first_time = true;
    
        
    const names = ['Alice', 'Emma', 'Olivia', 'Charlotte', 'Sophia', 'Léa', 'Chloé'];
    const times = ['1 jours', '10 minutes', '2 heures', '20 heures', '3 jours'];
    const base_txt = "a rempli le questionnaire";
    const base_time = "il y a";
    let currentName = "";
    let currentTime = "";
    let randomName = "";
    let randomTime = "";

    function updateTextBox() {
        if (paragraphs.length >= 2) {
            // Fade out
            textBox.classList.add('fade-out');

            setTimeout(() => {
                // Change text
                while (currentName === randomName) {
                    randomName = names[Math.floor(Math.random() * names.length)];
                }
                while (currentTime === randomTime) {
                    randomTime = times[Math.floor(Math.random() * times.length)];
                }
                currentName = randomName;
                currentTime = randomTime;
                paragraphs[0].textContent = `${currentName} ${base_txt}`;
                paragraphs[1].textContent = `${base_time} ${currentTime}`;
                if (first_time) {
                    toggleCheckbox.checked = false;
                    first_time = false;
                }

                textBox.classList.remove('fade-out');
            }, 500); // Corresponds to the transition duration
        }
    }

    if (paragraphs.length >= 2) {
        updateTextBox(); // Initial update
        setInterval(updateTextBox, 5000); // Update every 5 seconds
    }

    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Déclenche quand 10% de la section est visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
