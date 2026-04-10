document.getElementById('ctaBtn')?.addEventListener('click', () => {
  document.getElementById('target')?.scrollIntoView({ behavior: 'smooth' });
  alert('Спасибо! Это демонстрационный шаблон.');
});
