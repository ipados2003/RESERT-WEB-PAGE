document.addEventListener('DOMContentLoaded', function() {
    const textBox = document.querySelector('.text-box');
    const paragraphs = textBox.querySelectorAll('p');
    const toggleCheckbox = document.getElementById('textbox-toggle');
    
        
    const names = ['Alice', 'Emma', 'Olivia', 'Charlotte', 'Sophia', 'Léa', 'Chloé', 'Camille', 'Manon', 'Louise', 'Jeanne', 'Juliette', 'Rose', 'Ambre', 'Inès'];
    const times = ['1 jours', '10 minutes', '2 heures', '20 heures', '3 jours'];
    const base_txt = "a rempli le questionnaire";
    const base_time = "il y a";
    let currentName = "";
    let currentTime = "";
    let randomName = "";
    let randomTime = "";

    function updateTextBox() {
        if (paragraphs.length >= 2) {
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

                textBox.classList.remove('fade-out');
            }, 3000); // show 7sec fade-out for 3 seconds, then change text and fade-in
        }
    }
    
    let intervalId = setInterval(updateTextBox, 10000); // Update every 10 seconds
    toggleCheckbox.addEventListener('change', function() {
        clearInterval(intervalId);
        textBox.classList.add('fade-out');
        })

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
