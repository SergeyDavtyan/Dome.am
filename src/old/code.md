(function () {
        emailjs.init("jRQe8cyWeDH6sIvK4"); // например: "vT1Xb123ABC456"
    })()


    // Обработка формы
    document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault(); // Отключаем стандартную отправку формы

        emailjs.sendForm("service_9zvgrpc", "template_c1i265l", this)
            .then(function () {
                alert("Письмо успешно отправлено!");
                document.getElementById("contact-form").reset();
            }, function (error) {
                alert("Ошибка при отправке: " + JSON.stringify(error));
            });
    });



    