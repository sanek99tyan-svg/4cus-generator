const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: .14 });
reveals.forEach(el => observer.observe(el));

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.template-card');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const type = btn.dataset.filter;
  cards.forEach(card => {
    card.classList.toggle('hidden', !(type === 'all' || card.classList.contains(type)));
  });
}));

const libraryModal = document.getElementById('libraryModal');
document.getElementById('alreadyBtn').addEventListener('click', () => libraryModal.showModal());
const closeBtn = libraryModal.querySelector('.modal-close');
closeBtn.addEventListener('click', () => libraryModal.close());
libraryModal.addEventListener('click', e => {
  const r = libraryModal.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) libraryModal.close();
});

document.getElementById('magicForm').addEventListener('submit', e => {
  e.preventDefault();
  libraryModal.querySelector('.modal-status').textContent = 'Демо: ссылка на библиотеку отправлена.';
});

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.currentTarget.querySelector('button');
  const old = btn.textContent;
  btn.textContent = 'Спасибо ✓';
  setTimeout(() => btn.textContent = old, 2200);
  e.currentTarget.reset();
});

// Gentle parallax for the hero without forcing heavy animation on mobile.
const stage = document.querySelector('.hero-stage');
if (stage && matchMedia('(pointer:fine)').matches) {
  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    stage.style.setProperty('--mx', x);
    stage.style.setProperty('--my', y);
    document.querySelectorAll('.floating-card').forEach((el, i) => {
      const d = 7 + (i % 3) * 3;
      el.style.translate = `${x*d}px ${y*d}px`;
    });
  });
}

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(()=>{}));
