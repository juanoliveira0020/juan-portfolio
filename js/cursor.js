/* ==========================================================================
   CURSOR.JS — Cursor personalizado com efeito magnético em botões
   ========================================================================== */

function initCustomCursor() {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const outline = document.createElement('div');
  outline.className = 'cursor-outline';
  document.body.append(dot, outline);

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Suaviza o movimento do círculo externo (lag sutil)
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Efeito de hover em elementos interativos
  const interactiveEls = document.querySelectorAll('a, button, input, textarea, .tech-card, .project-card, [data-tilt]');
  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => outline.classList.add('is-active'));
    el.addEventListener('mouseleave', () => outline.classList.remove('is-active'));
  });

  // Efeito magnético em botões
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

document.addEventListener('DOMContentLoaded', initCustomCursor);
