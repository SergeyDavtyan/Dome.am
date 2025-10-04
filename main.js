let currentLang = localStorage.getItem('lang') || 'ru';
let translations = {};
const am_btn = document.getElementById('am_btn');
const ru_btn = document.getElementById('ru_btn');
am_btn.addEventListener('click', () => {
  localStorage.setItem('lang', 'am');
  loadLanguage('am');
});

ru_btn.addEventListener('click', () => {
  localStorage.setItem('lang', 'ru');
  loadLanguage('ru');
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
  });
}

// function initLanguageSwitcher() {

//   const select = document.querySelector("#lang-select");
//   select.addEventListener("change", e => {
//     loadLanguage(e.target.value);
//   });
// }

// INIT
loadLanguage(currentLang);
// initLanguageSwitcher();
