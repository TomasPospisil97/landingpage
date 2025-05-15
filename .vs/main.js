// JavaScript to reveal sections: home on load with delay, others on scroll with delay

// Delay durations in milliseconds
const HOME_REVEAL_DELAY = 500;
const SCROLL_REVEAL_DELAY = 300;

// Reveal the home section with delay after page load
window.addEventListener('load', () => {
    const homeSection = document.querySelector('section.home');
    if (homeSection) {
        setTimeout(() => {
            homeSection.classList.add('revealed');
        }, HOME_REVEAL_DELAY);
    }
    // Also run scrollReveal once on load to reveal any other visible sections
    scrollReveal();
});

// Select all elements with data-reveal attribute except the home section
const revealElements = Array.from(document.querySelectorAll('[data-reveal]')).filter(el => !el.closest('section.home'));

// Map to keep track of timeouts for each element
const revealTimeouts = new Map();

// Function to reveal elements on scroll with delay
const scrollReveal = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            if (!el.classList.contains('revealed') && !revealTimeouts.has(el)) {
                const timeoutId = setTimeout(() => {
                    el.classList.add('revealed');
                    revealTimeouts.delete(el);
                }, SCROLL_REVEAL_DELAY);
                revealTimeouts.set(el, timeoutId);
            }
        } else {
            // If element is out of view, remove revealed class and clear any pending timeout
            el.classList.remove('revealed');
            if (revealTimeouts.has(el)) {
                clearTimeout(revealTimeouts.get(el));
                revealTimeouts.delete(el);
            }
        }
    });
};

// Add scroll event listener to reveal elements on scroll
window.addEventListener('scroll', scrollReveal);
