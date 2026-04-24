/* ─────────────────────────────────────────────────────────
   PORTFOLIO SCRIPT.JS
   Features:
   - Custom cursor (circle on card hover, hidden/hand on button hover)
   - Card color change on click (uses data-color attribute)
   - Button color flash on click
   - Smooth section scrolling from nav
   - Active nav highlighting
   - Footer year auto-fill
───────────────────────────────────────────────────────── */

/* ── Footer Year ──────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Custom Cursor ────────────────────────────────────── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

// Smooth cursor movement
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Dot follows instantly
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Animate outer ring with lerp for smooth lag
function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ── Cursor States ────────────────────────────────────── */
const allCards   = document.querySelectorAll('.card');
const allButtons = document.querySelectorAll('button, .btn-primary, .btn-outline');

// Cards → circle cursor
allCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-circle');
    document.body.classList.remove('cursor-hand');
  });
  card.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-circle');
  });
});

// Buttons → hand cursor (hide custom cursor)
allButtons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-hand');
    document.body.classList.remove('cursor-circle');
  });
  btn.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hand');
  });
});

/* ── Card Click: Color Change ─────────────────────────── */
allCards.forEach(card => {
  const color = card.dataset.color || '#c8ff00';

  // Apply CSS variable so ::before pseudo-element and box-shadow can use it
  card.style.setProperty('--card-color', color);

  card.addEventListener('click', () => {
    // If already clicked → deselect (toggle)
    if (card.classList.contains('clicked')) {
      card.classList.remove('clicked');
      card.style.background = '';
      return;
    }

    // Deselect siblings in same grid (optional: allows multi-select if removed)
    const parent = card.closest('.cards-grid, .timeline, .hobbies-grid');
    if (parent) {
      parent.querySelectorAll('.card.clicked').forEach(c => {
        c.classList.remove('clicked');
        c.style.background = '';
      });
    }

    // Activate clicked card
    card.classList.add('clicked');

    // Subtle background tint using the card's color
    card.style.background = hexToRgba(color, 0.12);

    // Ripple effect
    createRipple(card, color);
  });
});

/* ── Button Click: Color Flash ────────────────────────── */
// Nav buttons flash their own accent on click
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.transition = 'none';
    btn.style.background = '#c8ff00';
    btn.style.color      = '#000';
    setTimeout(() => {
      btn.style.transition = '';
      btn.style.background = '';
      btn.style.color      = '';
    }, 300);
  });
});

// Primary / outline buttons pulse on click
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.transition = 'none';
    const original = btn.style.background;
    btn.style.transform = 'scale(0.93)';
    btn.style.background = '#ff6b6b';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.style.transition = '';
      btn.style.transform  = '';
      btn.style.background = original;
      btn.style.color      = '';
    }, 350);
  });
});

/* ── Smooth Scroll (nav buttons) ──────────────────────── */
document.querySelectorAll('.nav-btn[data-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Helper used in inline onclick=""
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── Ripple Effect ────────────────────────────────────── */
function createRipple(element, color) {
  const ripple = document.createElement('span');
  const size   = Math.max(element.offsetWidth, element.offsetHeight);

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: ${hexToRgba(color, 0.3)};
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: rippleAnim 0.55s ease-out forwards;
    pointer-events: none;
    z-index: 0;
  `;

  // Inject keyframes once
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes rippleAnim {
        to { transform: translate(-50%,-50%) scale(2.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

/* ── Hex → RGBA Helper ────────────────────────────────── */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ── Active Nav Highlight on Scroll ───────────────────── */
const sections = document.querySelectorAll('section[id]');
const navBtns  = document.querySelectorAll('.nav-btn[data-target]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navBtns.forEach(btn => {
        btn.style.color = btn.dataset.target === entry.target.id
          ? '#c8ff00'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => observer.observe(sec));

/* ── Page Load Entrance ───────────────────────────────── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
