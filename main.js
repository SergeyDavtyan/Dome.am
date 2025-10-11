let currentLang = localStorage.getItem('lang') || 'ru';
let translations = {};
const am_btn = document.getElementById('am_btn');
const ru_btn = document.getElementById('ru_btn');
am_btn.addEventListener('click', () => {
  localStorage.setItem('lang', 'am');
  loadLanguage('am');
  
  // if (window.location.pathname.includes('index.html')) {
    // window.location.reload();
  // }
});

// main.js




ru_btn.addEventListener('click', () => {
  localStorage.setItem('lang', 'ru');
  loadLanguage('ru');

  // if (window.location.pathname.includes('index.html')) {
    // window.location.reload();
  // }
});

async function loadLanguage(lang) {
  console.log(lang);

  try {
    const res = await fetch(`i18n/${lang}.json`);
    translations = await res.json();
  } catch (error) {
    console.error('Error loading language file:', error);
  }
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyTranslations();
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

    changeHref(currentLang);
  });
}


// rotate and height toggle
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

function changeHref(lang) {
  if (window.location.pathname.includes('parlament.html')) {
    const a = document.querySelectorAll('.parl_info_1 a[target="_blank"]');
    a.forEach(link => {
      if (link.href.includes('/ru/')) {
        link.href = link.href.replace('/ru/', `/${lang}/`);
      } else if (link.href.includes('/am/')) {
        link.href = link.href.replace('/am/', `/${lang}/`);
      }
    })
  }
}


function placeholders() {
  if (window.location.pathname.includes('index.html')) {
    const placeholder_1 = document.querySelector('input[placeholder="Имя*"]');
    const placeholder_2 = document.querySelector('input[placeholder="Email*"]');
    const placeholder_3 = document.querySelector('input[placeholder="Тема"]');
    const placeholder_4 = document.querySelector('textarea[placeholder="Сообщение*"]');
    const btn = document.querySelector('input[type="submit"]');



    if (currentLang === 'am') {
      placeholder_1.placeholder = "Անուն*";
      placeholder_2.placeholder = "Էլ. փոստ*";
      placeholder_3.placeholder = "Թեմա";
      placeholder_4.placeholder = "Հաղորդագրություն*";
      btn.value = "Ուղարկել";
    } else {
      placeholder_1.placeholder = "Имя*";
      placeholder_2.placeholder = "Email*";
      placeholder_3.placeholder = "Тема";
      placeholder_4.placeholder = "Сообщение*";
      btn.value = "Отправить";
    }
  }
}

placeholders();

loadLanguage(currentLang);


// function initLanguageSwitcher() {

//   const select = document.querySelector("#lang-select");
//   select.addEventListener("change", e => {
//     loadLanguage(e.target.value);
//   });
// }

// INIT

// initLanguageSwitcher();
