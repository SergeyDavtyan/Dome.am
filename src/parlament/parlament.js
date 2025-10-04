import { chang_lang } from './parlament-translate.js';

const head = document.querySelector('head > title');

function addEventListeners() {
  const show_btn = document.querySelectorAll('.bi-arrow-right');
  const h2 = document.querySelectorAll('.div_1 > h2');
  const container = document.querySelectorAll('.div_1 > .parl_info_1');

  show_btn.forEach(elem => {
    elem.addEventListener('click', () => {
      const isActive = elem.classList.contains('rotate');

      show_btn.forEach(b => b.classList.remove('rotate'));
      container.forEach(c => c.classList.remove('height'));

      if (!isActive) {
        elem.classList.add('rotate');
        elem.nextElementSibling.classList.add('height');
      }
    });
  });

  h2.forEach(elem => {
    elem.addEventListener('click', () => {
      const isActive = elem.nextElementSibling.classList.contains('rotate');

      show_btn.forEach(b => b.classList.remove('rotate'));
      container.forEach(c => c.classList.remove('height'));

      if (!isActive) {
        elem.nextElementSibling.classList.add('rotate');
        elem.nextElementSibling.nextElementSibling.classList.add('height');
      }
    });
  });
}

am_btn.addEventListener('click', () => {
  localStorage.setItem('lang', 'am');
  chang_lang('am');
  head.textContent = 'Dome.am - Useful links';

  addEventListeners();
});

ru_btn.addEventListener('click', () => {
  localStorage.setItem('lang', 'ru');
  chang_lang('ru');
  head.textContent = 'Dome.am - Полезные ссылки';

  addEventListeners();
});

const main_lang = localStorage.getItem('lang');

if (main_lang) {
  chang_lang(main_lang);
}

document.addEventListener('DOMContentLoaded', () => {
  if (main_lang === 'am') {
    chang_lang('am');
    head.textContent = 'Dome.am - Useful links';
  } else {
    chang_lang('ru');
    head.textContent = 'Dome.am - Полезные ссылки';
  }

  addEventListeners();
});
