document.addEventListener('DOMContentLoaded', function() {
    const textBox = document.querySelector('.text-box');
    const paragraphs = textBox.querySelectorAll('p');
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

    function updateTextBox() {
        if (paragraphs.length >= 2) {
            // Fade out
            textBox.classList.add('fade-out');

            setTimeout(() => {
                // Change text
                const randomName = names[Math.floor(Math.random() * names.length)];
                paragraphs[0].textContent = randomName;
                const now = new Date();
                paragraphs[1].textContent = now.toLocaleString('fr-FR');

                // Fade in
                textBox.classList.remove('fade-out');
            }, 500); // Corresponds to the transition duration
        }
    }

    if (paragraphs.length >= 2) {
        updateTextBox(); // Initial update
        setInterval(updateTextBox, 5000); // Update every 5 seconds
    }
});
