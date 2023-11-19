// Update the theme ASAP to prevent the view flashing white
updateTheme(localStorage.getItem('preferred-theme'));

// Updates to the supplied theme
function updateTheme(theme) {
    if (theme === null || theme === 'auto') {
        theme = getPreferedTheme();
        updateThemeSelector('auto');
    } else {
        updateThemeSelector(theme);
    }
    document.documentElement.setAttribute('data-bs-theme', theme);
}

// Returns the prefers-color-scheme setting 
function getPreferedTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Updates the theme selector icon
function updateThemeSelector(theme) {
    document.querySelectorAll('[data-bs-theme-value]').forEach(function (selector) {
        if (selector.getAttribute('data-bs-theme-value') === theme) {
            selector.classList.add('active');
            document.getElementById('current-theme').className = selector.firstElementChild.className
        } else {
            selector.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Update the theme again after the page has loaded. This is mainly to update the theme picker icon.
    updateTheme(localStorage.getItem('preferred-theme'));

    // Add event listener to the theme switcher buttons
    document.querySelectorAll('[data-bs-theme-value]').forEach(function (button) {
        button.addEventListener('click', function () {
            const theme = button.getAttribute('data-bs-theme-value');
            if (theme === 'auto') {
                localStorage.removeItem('preferred-theme');
            } else {
                localStorage.setItem('preferred-theme', theme);
            }
            updateTheme(theme);
        });
    });
});

// Add an event listener if prefers-color-scheme is updated.
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches }) => {
        const theme = localStorage.getItem('preferred-theme');
        if (theme === null || theme === 'auto') {
            updateTheme(getPreferedTheme());
        }
});