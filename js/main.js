/* ===== NAVBAR SCROLL ===== */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ===== DUPLICATE TICKER FOR SEAMLESS LOOP ===== */
const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

/* ===== LIGHTBOX ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const type = item.dataset.type;
    const src = item.dataset.src;

    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'none';
    lightboxVideo.pause();
    lightboxVideo.src = '';

    if (type === 'image') {
      lightboxImg.src = src;
      lightboxImg.style.display = 'block';
    } else {
      lightboxVideo.src = src;
      lightboxVideo.style.display = 'block';
      lightboxVideo.play();
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lightboxVideo.pause();
  lightboxVideo.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ===== TESTIMONIAL SLIDER ===== */
const testiCards = document.querySelector('.testi-cards');
const dots = document.querySelectorAll('.testi-dot');
let current = 0;
let autoTimer;

function goTo(idx) {
  current = idx;
  testiCards.style.transform = `translateX(-${idx * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

function next() {
  goTo((current + 1) % dots.length);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(autoTimer);
    goTo(i);
    autoTimer = setInterval(next, 5000);
  });
});

autoTimer = setInterval(next, 5000);

/* ===== COUNTER ANIMATION ===== */
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const val = parseInt(el.dataset.val);
        const suffix = el.dataset.suffix || '';
        animateCount(el, val, suffix);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

/* ===== CONTACT FORM → WHATSAPP ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('f-name').value.trim();
    const email   = document.getElementById('f-email').value.trim();
    const phone   = document.getElementById('f-phone').value.trim();
    const event   = document.getElementById('f-event').value.trim();
    const date    = document.getElementById('f-date').value.trim();
    const message = document.getElementById('f-message').value.trim();

    const formatted = [
      'Hello Adrienne Events! 👋',
      '',
      '*New Inquiry via Website*',
      '',
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      `*Phone:* ${phone}`,
      `*Event Type:* ${event}`,
      `*Event Date:* ${date || 'Not specified'}`,
      `*Message:* ${message || 'No additional message'}`,
    ].join('\n');

    const encoded = encodeURIComponent(formatted);
    window.open(`https://wa.me/254719655146?text=${encoded}`, '_blank');
  });
}

/* ===== AOS INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${sec.id}`) {
          a.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { passive: true });
