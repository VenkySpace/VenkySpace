/* ==========================================================================
   VENKYSPACE — common.js (Streamlined Animations & Theme Engine)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initDynamicGreeting();
    initHorizontalScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. HORIZONTAL SCROLL ENTRANCE ANIMATIONS
   -------------------------------------------------------------------------- */
function initHorizontalScrollAnimations() {
    document.body.classList.add('js-animations-active');

    const animatedElements = document.querySelectorAll('.reveal-left, .reveal-right');
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -25px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   2. DYNAMIC GREETING
   -------------------------------------------------------------------------- */
function initDynamicGreeting() {
    const badge = document.getElementById('dynamic-greeting');
    if (!badge) return;

    const hour = new Date().getHours();
    const day = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

    let greeting = 'WELCOME';
    if (hour < 12) greeting = 'GOOD MORNING';
    else if (hour < 17) greeting = 'GOOD AFTERNOON';
    else greeting = 'GOOD EVENING';

    badge.textContent = `${greeting}, VENKYITE • ${day}`;
}

/* --------------------------------------------------------------------------
   3. PERSISTENT THEME ENGINE (LIGHT / DARK)
   -------------------------------------------------------------------------- */
function initDarkMode() {
    const savedTheme = localStorage.getItem('venky-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    if (toggleBtn && themeIcon) {
        themeIcon.textContent = initialTheme === 'dark' ? '☀️' : '🌙';

        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('venky-theme', next);
            themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
        });
    }
}
