import { chang_lang } from "./stroyka-translate.js";

const am_btn = document.getElementById('am_btn')
const ru_btn = document.getElementById('ru_btn')

const main_lang = localStorage.getItem('lang')

const head = document.querySelector('head > title')

if (main_lang === 'am') {
    head.textContent = 'Dome.am - construction'
} else {
    head.textContent = 'Dome.am - строительство'
}

if (main_lang) {
    chang_lang(main_lang)
}

am_btn.addEventListener('click', () => {
    localStorage.setItem('lang', 'am')
    chang_lang('am')
    
    head.textContent = 'Dome.am - construction'
})

ru_btn.addEventListener('click', () => {
    localStorage.setItem('lang', 'ru')
    chang_lang('ru')

    head.textContent = 'Dome.am - строительство'
})