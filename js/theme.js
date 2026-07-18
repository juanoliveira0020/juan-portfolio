/* ==========================================================================
   THEME.JS — Alternância Dark/Light com persistência em localStorage
   ========================================================================== */

const THEME_KEY = 'portfolio-theme';

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  applyTheme(getPreferredTheme());

  const toggleBtn = document.querySelector('.theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });
}

document.addEventListener('DOMContentLoaded', initTheme);
