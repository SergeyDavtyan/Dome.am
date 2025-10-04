import { changLang } from "./home-translate"

const am_btn = document.getElementById('am_btn')
const contactForm = document.getElementById('contact-form')
const ru_btn = document.getElementById('ru_btn')

const main_lang = localStorage.getItem('lang')


contactForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData)
    console.log(data);
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            e.target.reset()
        })
        .catch((err) => console.log(err))

})

am_btn.addEventListener('click', () => {
    localStorage.setItem('lang', 'am')
    changLang('am')

    // addEventListeners()
})

ru_btn.addEventListener('click', () => {
    localStorage.setItem('lang', 'ru')
    changLang('ru')

    addEventListeners()
})


if (main_lang) {
    changLang(main_lang)
}



document.addEventListener('DOMContentLoaded', () => {
    if (main_lang === 'am') {
        changLang('am');

    } else {
        changLang('ru');

    }

    // addEventListeners();
});


