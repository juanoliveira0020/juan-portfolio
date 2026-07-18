/* ==========================================================================
   MAIN.JS — Orquestração geral: navbar, scroll progress, menu, formulário
   ========================================================================== */

/* ---------------- Navbar com efeito de scroll ---------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------- Menu mobile (hambúrguer) ---------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  if (!toggle || !navbar) return;

  toggle.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', navbar.classList.contains('nav-open'));
  });

  navbar.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => navbar.classList.remove('nav-open'));
  });
}

/* ---------------- Indicador de seção ativa na navbar ---------------- */
function initActiveSectionIndicator() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((sec) => observer.observe(sec));
}

/* ---------------- Barra de progresso de scroll ---------------- */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(scrollTop / docHeight) * 100}%`;
  }, { passive: true });
}

/* ---------------- Botão voltar ao topo ---------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------- Ano automático no footer ---------------- */
function initFooterYear() {
  const el = document.querySelector('[data-year]');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------- Formulário de contato (validação simples, sem backend) ---------------- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = 'Enviando...';
    button.disabled = true;

    // Simulação de envio — substitua por integração real (EmailJS, Formspree, API própria etc.)
    setTimeout(() => {
      button.textContent = 'Mensagem enviada ✓';
      form.reset();
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2500);
    }, 1200);
  });
}

/* ---------------- Ano atual + inicialização geral ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initActiveSectionIndicator();
  initScrollProgress();
  initBackToTop();
  initFooterYear();
  initContactForm();
});
