function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const THEME_KEY = 'utility-dashboard-theme';
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
  });
}

function initTabs() {
  const buttons = document.querySelectorAll('.tabs__btn');
  const panels = document.querySelectorAll('.panel');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      buttons.forEach((b) => {
        const isActive = b.dataset.tab === target;
        b.classList.toggle('tabs__btn--active', isActive);
        b.setAttribute('aria-selected', String(isActive));
      });

      panels.forEach((panel) => {
        const isActive = panel.id === `panel-${target}`;
        panel.classList.toggle('panel--active', isActive);
        panel.hidden = !isActive;
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
});
