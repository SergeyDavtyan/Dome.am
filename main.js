let currentLang = localStorage.getItem('lang') || 'ru';
let translations = {};
let intervalID = null;

const am_btn = document.getElementById('am_btn');
const ru_btn = document.getElementById('ru_btn');
const anima_divs = document.querySelector('.anima_divs');

am_btn.addEventListener('click', () => loadLanguage('am'));
ru_btn.addEventListener('click', () => loadLanguage('ru'));

async function loadLanguage(lang) {
  if (anima_divs) {
    clearTimeout(intervalID);
    anima_divs.classList.remove('active');
    intervalID = setTimeout(() => {
      anima_divs.classList.add('active');
    }, 50);
  }

  try {
    const res = await fetch(`i18n/${lang}.json`);
    translations = await res.json();
  } catch (error) {
    console.error('Error loading language file:', error);
  }

  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyTranslations();
  placeholders();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (el.children.length > 0) {
      el.querySelectorAll('[data-i18n]').forEach(child => {
        const childKey = child.dataset.i18n;
        if (translations[childKey]) child.textContent = translations[childKey];
      });
    } else {
      if (translations[key]) el.textContent = translations[key];
    }
  });

  changeHref(currentLang);
}

// rotate and height toggle
const show_btn = document.querySelectorAll('.bi-arrow-right');
const h2 = document.querySelectorAll('.div_1 > h2');
const container = document.querySelectorAll('.div_1 > .parl_info_1');

function toggleAccordion(button, content) {
  const isActive = button.classList.contains('rotate');

  show_btn.forEach(b => b.classList.remove('rotate'));
  container.forEach(c => c.classList.remove('height'));

  if (!isActive) {
    button.classList.add('rotate');
    content.classList.add('height');
  }
}

show_btn.forEach(elem => {
  elem.addEventListener('click', () => {
    toggleAccordion(elem, elem.nextElementSibling);
  });
});

h2.forEach(elem => {
  elem.addEventListener('click', () => {
    toggleAccordion(
      elem.nextElementSibling,
      elem.nextElementSibling.nextElementSibling
    );
  });
});

function changeHref(lang) {
  if (!window.location.pathname.includes('parlament.html')) return;

  const links = document.querySelectorAll('.parl_info_1 a[target="_blank"]');
  links.forEach(link => {
    link.href = link.href.replace(/\/(ru|am)\//, `/${lang}/`);
  });
}

function placeholders() {
  if (!window.location.pathname.includes('index.html')) return;

  const nameInput = document.querySelector('input[name="username"]');
  const emailInput = document.querySelector('input[name="from"]');
  const themeInput = document.querySelector('input[name="theme"]');
  const messageTextarea = document.querySelector('textarea[name="message"]');
  const submitBtn = document.querySelector('input[type="submit"]');

  if (
    !nameInput ||
    !emailInput ||
    !themeInput ||
    !messageTextarea ||
    !submitBtn
  )
    return;

  if (currentLang === 'am') {
    nameInput.placeholder = 'Անուն*';
    emailInput.placeholder = 'Էլ. փոստ*';
    themeInput.placeholder = 'Թեմա';
    messageTextarea.placeholder = 'Հաղորդագրություն*';
    submitBtn.value = 'Ուղարկել';
  } else {
    nameInput.placeholder = 'Имя*';
    emailInput.placeholder = 'Email*';
    themeInput.placeholder = 'Тема';
    messageTextarea.placeholder = 'Сообщение*';
    submitBtn.value = 'Отправить';
  }
}

loadLanguage(currentLang);
