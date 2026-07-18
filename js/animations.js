/* ==========================================================================
   ANIMATIONS.JS — Animações de entrada, scroll reveal, contadores, tilt 3D
   Depende do GSAP (carregado via CDN no index.html)
   ========================================================================== */

/* ---------------- Animação de entrada do Hero (GSAP) ---------------- */
function initHeroIntro() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-tag', { y: 20, opacity: 0, duration: 0.6 })
    .from('.hero-title .word', { y: 60, opacity: 0, stagger: 0.08, duration: 0.9 }, '-=0.3')
    .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero-actions', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero-socials a', { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.3')
    .from('.hero-photo-frame', { scale: 0.85, opacity: 0, duration: 1 }, '-=0.8')
    .from('.hero-float-card', { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 }, '-=0.5');
}

/* Quebra o título do hero em <span class="word"> para animar palavra por palavra */
function splitHeroTitle() {
  const titleEl = document.querySelector('.hero-title');
  if (!titleEl) return;
  const text = titleEl.textContent.trim();
  titleEl.innerHTML = text
    .split(' ')
    .map((word) => `<span class="word" style="display:inline-block;">${word}&nbsp;</span>`)
    .join('');
}

/* ---------------- Efeito de digitação no cargo (hero-role) ---------------- */
function initTypewriter() {
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;

  const words = JSON.parse(el.dataset.typewriter);
  let wordIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const currentWord = words[wordIndex];
    el.textContent = deleting
      ? currentWord.substring(0, charIndex--)
      : currentWord.substring(0, charIndex++);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIndex === currentWord.length + 1) {
      delay = 1600;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 300;
    }
    setTimeout(tick, delay);
  }
  tick();
}

/* ---------------- Scroll reveal genérico (IntersectionObserver) ---------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((el) => observer.observe(el));
}

/* ---------------- Contadores animados (estatísticas) ---------------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1600;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target;
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => observer.observe(el));
}

/* ---------------- Tilt 3D leve em cards (sem biblioteca) ---------------- */
function initTiltCards() {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateY(0) rotateX(0) translateY(0)';
    });
  });
}

/* ---------------- Ripple effect em botões ---------------- */
function initRippleEffect() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  splitHeroTitle();
  initHeroIntro();
  initTypewriter();
  initScrollReveal();
  initCounters();
  initTiltCards();
  initRippleEffect();
});
