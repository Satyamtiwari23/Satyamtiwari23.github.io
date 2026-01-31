// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

const body = document.body;
const THEME_KEY = "portfolio-space-theme";
const toggleButtons = document.querySelectorAll(".theme-toggle-btn");

function applyTheme(themeName) {
  body.classList.remove("theme-space-dark", "theme-space-light");
  body.classList.add("theme-" + themeName);

  // Update active state on buttons
  toggleButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === themeName);
  });
}

// Load saved theme or default to dark
const saved = localStorage.getItem(THEME_KEY);
const initialTheme =
  saved === "space-light" || saved === "space-dark"
    ? saved
    : "space-dark";

applyTheme(initialTheme);
localStorage.setItem(THEME_KEY, initialTheme);

// Button click handlers
toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.theme;
    applyTheme(value);
    localStorage.setItem(THEME_KEY, value);
  });
});

// Logo: smooth-scroll to top when clicked. If you're on a different page
// and want it to reload the root page, replace the handler with
// `location.href = '/';` or similar.
const logoBtn = document.getElementById('logo');
if (logoBtn) {
  logoBtn.addEventListener('click', (e) => {
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // For accessibility: move focus to the main container after scroll
    // (so keyboard users are aware they're at the top)
    setTimeout(() => {
      const firstHeading = document.querySelector('h1');
      if (firstHeading) firstHeading.setAttribute('tabindex', '-1');
      if (firstHeading) firstHeading.focus();
    }, 450);
  });

  // Optional: allow Enter/Space activation for keyboard users
  logoBtn.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      logoBtn.click();
    }
  });
}

document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
});

