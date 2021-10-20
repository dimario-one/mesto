const showError = (errorElement, inputElement, inputErrorClass) => { // метод показа ошибки
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputErrorClass)
}

const hideError = (errorElement, inputElement, inputErrorClass) => { // метод удаления ошибки
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.remove(inputErrorClass)
}

const checkInputValidity = (formElement, inputElement, config) => {
    const isInputNotValid = !inputElement.validity.valid; // создаем переменную которая хранит что форма не валидна
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // находим инпут по чтоб взять из него сообщение об ошибке
    if (isInputNotValid) { // если форма не валидна то показать ошибку в спан который рядом с инпутом
        showError(errorElement, inputElement, config);
    } else {
        hideError(errorElement, inputElement, config);
    }
}

const toggleButtonState = (button, isActive, inactiveButtonClass) => { // изменение состояния кнопки чтоб если форма не валидна она была не активна
    if (isActive) {
        button.classList.remove(inactiveButtonClass); // если хотим кнопку разблокировать
        button.disabled = false;
    } else {
        button.classList.add(inactiveButtonClass); // если хотим кнопку заблокировать
        button.disabled = 'disabled';
    }
}

const setEventListers = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) => { // Устанавливаем обработчики событий
    const inputsList = formElement.querySelectorAll(inputSelector); //Ищем все наши инпуты
    const submitButton = formElement.querySelector(submitButtonSelector); // нашли кнопку в форме чтоб ее заблокировать
    Array.from(inputsList).forEach(inputElement => { // На каждый инпут вешаем обработчик события(inputElement название события)
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass)
            const isFormValid = formElement.checkValidity(); //   проверяем валидна ли форма при каждом вводе поэтому она ноходится в массиве
            toggleButtonState(submitButton, isFormValid, inactiveButtonClass) // функция блокирования 
        })
    })

    formElement.addEventListener('submit', (evt) => { // Функция запрета  действия по умолчанию
        evt.preventDefault();
    })
}

const enableValidation = ({ formSelector, ...rest }) => {
    const forms = document.querySelectorAll(formSelector);
    Array.from(forms).forEach(formElement => {
        setEventListers(formElement, rest)
    })
}

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input', // классы наших инпутов
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled', // класс заблокированной кнопки
    inputErrorClass: '.popup__input_type_error', // класс сообщения об ошибке
    errorClass: 'popup__error_visible'
}


const { inputSelector, ...rest } = validationConfig;

enableValidation(validationConfig);