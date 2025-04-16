document.addEventListener('DOMContentLoaded', () => {
    const binaryBackground = document.querySelector('.binary-background');
    const hackerChars = ['0', '1', '$', '#', '*', '@', '%', '&', '^', '!', '>', '<', '/', '\\', '{', '}', '[', ']', '|', '=', '+', '-', '_', '~'];

    const createBinary = () => {
        const span = document.createElement('span');
        const char = hackerChars[Math.floor(Math.random() * hackerChars.length)];
        span.textContent = char;
        span.style.left = `${Math.random() * 100}vw`;
        span.style.animationDuration = `${Math.random() * 5 + 3}s`;

        const size = Math.random();
        if (size < 0.7) {
            span.style.fontSize = `${Math.random() * 8 + 12}px`;
            span.style.opacity = '0.7';
        } else if (size < 0.95) {
            span.style.fontSize = `${Math.random() * 10 + 20}px`;
            span.style.opacity = '0.8';
        } else {
            span.style.fontSize = `${Math.random() * 15 + 30}px`;
            span.style.opacity = '0.9';
            span.style.textShadow = '0 0 8px #00FF00, 0 0 15px #00FF00';
        }

        binaryBackground.appendChild(span);

        setTimeout(() => {
            span.remove();
        }, 10000);
    };

    const applyGlitchEffect = () => {
        const title = document.querySelector('h1.typing');
        if (title) {
            setTimeout(() => {
                title.classList.add('glitch-effect');
                setInterval(() => {
                    title.style.textShadow = '0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em 0.05em 0 rgba(0, 0, 255, 0.75)';
                    setTimeout(() => {
                        title.style.textShadow = '';
                    }, 100);
                }, 5000);
            }, 3000);
        }
    };

    const typeIntroduction = () => {
        const aboutParagraphs = document.querySelectorAll('#about p');
        if (aboutParagraphs.length > 0) {
            const originalTexts = [];
            aboutParagraphs.forEach(p => {
                originalTexts.push(p.textContent);
                p.textContent = '';
            });

            const typeParagraph = (paragraphIndex, charIndex = 0) => {
                if (paragraphIndex >= aboutParagraphs.length) return;

                const currentParagraph = aboutParagraphs[paragraphIndex];
                const currentText = originalTexts[paragraphIndex];

                if (charIndex < currentText.length) {
                    currentParagraph.textContent += currentText.charAt(charIndex);
                    charIndex++;
                    setTimeout(() => typeParagraph(paragraphIndex, charIndex), Math.random() * 20 + 10);
                } else {
                    setTimeout(() => typeParagraph(paragraphIndex + 1), 500);
                }
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeParagraph(0);
                        observer.unobserve(aboutParagraphs[0]);
                    }
                });
            });

            observer.observe(aboutParagraphs[0]);
        }
    };

    const screenWidth = window.innerWidth;
    const interval = screenWidth > 768 ? 80 : 150;

    setInterval(createBinary, interval);
    applyGlitchEffect();
    typeIntroduction();

    const addHoverEffects = () => {
        const projectItems = document.querySelectorAll('#projects li');
        projectItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.borderColor = '#00FF00';
                item.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.3)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.borderColor = 'rgba(0, 255, 0, 0.1)';
                item.style.boxShadow = 'none';
            });
        });
    };

    addHoverEffects();

    const handleContactForm = () => {
        const form = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;

                formStatus.className = 'form-status loading';
                formStatus.textContent = 'Sending message...';

                setTimeout(() => {
                    if (name && email && message) {
                        formStatus.className = 'form-status success';
                        formStatus.innerHTML = `<i class="fas fa-check-circle"></i> Thank you, ${name}! Your message has been sent successfully.`;
                        form.reset();

                        setTimeout(() => {
                            formStatus.style.opacity = '0';
                        }, 5000);
                    } else {
                        formStatus.className = 'form-status error';
                        formStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i> Please fill in all required fields.`;
                    }
                }, 1500);
            });
        }
    };

    handleContactForm();
});
