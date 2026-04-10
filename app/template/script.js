const advantages = [
  ['Собственное производство', 'Контроль качества и честная цена без посредников.'],
  ['Льготные ипотеки', 'Подберем программу и доведем до одобрения.'],
  ['Отделка под ключ', 'Можно заезжать сразу после получения ключей.'],
  ['Опыт с 2009 года', 'Реализовано более 2000 объектов.'],
  ['Прозрачные договоры', 'Фиксация условий и цены в документах.'],
  ['Сервис после сдачи', 'Помогаем и после заселения.']
];

const readyDuplexes = [
  { name: 'Дуплекс «Солнечный»', area: '120 м²', price: '8 500 000 ₽' },
  { name: 'Дуплекс «Яркий»', area: '145 м²', price: '9 800 000 ₽' },
  { name: 'Дуплекс «Семейный»', area: '160 м²', price: '11 200 000 ₽' }
];

const constructionDuplexes = [
  { name: 'Дуплекс «Мечта»', completion: 'IV квартал 2026', price: '7 900 000 ₽' },
  { name: 'Дуплекс «Уютный»', completion: 'II квартал 2027', price: '8 500 000 ₽' }
];

function renderCards() {
  const advRoot = document.getElementById('advantagesGrid');
  const readyRoot = document.getElementById('readyGrid');
  const constructionRoot = document.getElementById('constructionGrid');

  if (advRoot) {
    advRoot.innerHTML = advantages
      .map(([title, text]) => `<article class="card"><h3>${title}</h3><p>${text}</p></article>`)
      .join('');
  }

  if (readyRoot) {
    readyRoot.innerHTML = readyDuplexes
      .map((item) => `
        <article class="card">
          <h3>${item.name}</h3>
          <p>Площадь: ${item.area}</p>
          <div class="price">${item.price}</div>
        </article>
      `)
      .join('');
  }

  if (constructionRoot) {
    constructionRoot.innerHTML = constructionDuplexes
      .map((item) => `
        <article class="card">
          <h3>${item.name}</h3>
          <p>Сдача: ${item.completion}</p>
          <div class="price">${item.price}</div>
        </article>
      `)
      .join('');
  }
}

function setupMenu() {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  btn?.addEventListener('click', () => menu?.classList.toggle('open'));
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').replace(/^8/, '7').replace(/^7?/, '7').slice(0, 11);
  const p = digits.slice(1);
  if (!digits) return '';
  if (p.length <= 3) return `+7 (${p}`;
  if (p.length <= 6) return `+7 (${p.slice(0, 3)}) ${p.slice(3)}`;
  if (p.length <= 8) return `+7 (${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6)}`;
  return `+7 (${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6, 8)}-${p.slice(8, 10)}`;
}

function setupLeadForm() {
  const form = document.getElementById('leadForm');
  if (!form) return;

  const phone = form.querySelector('input[name="phone"]');
  const email = form.querySelector('input[name="email"]');
  const msg = document.getElementById('formMsg');

  phone?.addEventListener('input', () => {
    phone.value = formatPhone(phone.value);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const phoneOk = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(phone?.value || '');
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email?.value || '');

    if (!phoneOk) {
      msg.textContent = 'Проверьте телефон: +7 (999) 999-99-99';
      msg.style.color = '#ffd9d9';
      return;
    }

    if (!emailOk) {
      msg.textContent = 'Проверьте email: name@example.com';
      msg.style.color = '#ffd9d9';
      return;
    }

    msg.textContent = 'Заявка отправлена (демо). Можно подключить API/почту.';
    msg.style.color = '#fff';
    form.reset();
  });
}

renderCards();
setupMenu();
setupSmoothScroll();
setupLeadForm();
