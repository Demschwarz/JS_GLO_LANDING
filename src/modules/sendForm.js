const sendForm = () => {

    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка',
        sucsessMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

    const form = document.getElementById('form1'),
        popUp = document.getElementById('form3'),
        form2 = document.getElementById('form2');


    const bindingForm = (form) => {
        const inputs = form.querySelectorAll('input');
        const btn = form.querySelector('button');
        const telInput = form.querySelector('input[name="user_phone"]');
        btn.setAttribute('disabled', 'true');
        inputs.forEach((elem) => {
            elem.addEventListener('change', () => {
                if ((elem.value === '') 
                // || ((elem.getAttribute('name') === 'user_phone') && (((elem.value.length != 0) && (elem.value.length < 8)) || elem.value.length > 20))
                ) 
                {
                    btn.setAttribute('disabled', 'true');
                } else {
                    if ((telInput.value.length >= 8) &&(telInput.value.length <= 20)){
                        btn.removeAttribute('disabled');
                    } else {
                        btn.setAttribute('disabled', 'true');
                    }
                }
            })
        });

        const statusMessage = document.createElement('div');
        form.addEventListener('submit', (event) =>  {
            event.preventDefault();
            statusMessage.style.color = 'white';
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
                let body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body)
                    .then((response) => {
                        if (response.status != 200) {
                            throw new Error('network status is not 200');
                        }
                        statusMessage.textContent = sucsessMessage;
                        setTimeout(() => form.removeChild(statusMessage), 10000)
                        
                    })
                    .catch(error => {
                        console.error(error);
                        statusMessage.textContent = errorMessage;
                        setTimeout(() => form.removeChild(statusMessage), 10000)
                    });
        });
        
        const postData = (body) => {
            return fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                        },
                body: JSON.stringify(body)
            });
    }
    }
    bindingForm(form);
    bindingForm(popUp);
    bindingForm(form2);
    // прогон полей через регулярные выражения
    const setReg = () => {
        const nameForms = document.querySelectorAll('[name="user_name"]');
        const messageForms = document.querySelectorAll('[name="user_message"]');
        const telForms = document.querySelectorAll('[name="user_phone"]');
        nameForms.forEach((elem) => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^А-яа-я ]/g, '');
            })
        });
        messageForms.forEach((elem) => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^А-яа-я ]/g, '');
            })
        });
        telForms.forEach((elem) => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^+0-9]/g, '');
            })
        });
    }
    setReg();
};

export default sendForm;