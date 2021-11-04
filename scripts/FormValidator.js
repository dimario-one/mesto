 export const validationConfig = {
     inputSelector: '.popup__input', // классы наших инпутов
     submitButtonSelector: '.popup__button',
     inactiveButtonClass: 'popup__button_disabled', // класс заблокированной кнопки
     inputErrorClass: '.popup__input_type_error', // класс сообщения об ошибке
     errorClass: 'popup__error_visible'
 }

 export class FormValidator {
     constructor(config, popupFormElement) { // 
         this._config = config;

         this._element = document.querySelector(popupFormElement);
         this._submitButton = this._element.querySelector(this._config.submitButtonSelector);
         this._formElement = this._element.querySelector(".popup__form");
     }

     _showError = (errorElement, inputElement) => { // метод показа ошибки
         errorElement.textContent = inputElement.validationMessage;
         inputElement.classList.add(this._config.inputErrorClass)
     }

     _hideError = (errorElement, inputElement) => { // метод удаления ошибки
         errorElement.textContent = inputElement.validationMessage;
         inputElement.classList.remove(this._config.inputErrorClass)
     }

     _checkInputValidity = (inputElement) => {
         const isInputNotValid = !inputElement.validity.valid; // создаем переменную которая хранит что форма не валидна
         const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); // находим инпут по чтоб взять из него сообщение об ошибке
         if (isInputNotValid) { // если форма не валидна то показать ошибку в спан который рядом с инпутом
             this._showError(errorElement, inputElement);
         } else {
             this._hideError(errorElement, inputElement);
         }
     }

     _disabledButton = () => {
         this._submitButton.classList.add(this._config.inactiveButtonClass);
         this._submitButton.disabled = 'disabled';
     }


     _toggleButtonState = (isActive) => { // изменение состояния кнопки чтоб если форма не валидна она была не активна
         if (isActive) {
             this._submitButton.classList.remove(this._config.inactiveButtonClass); // если хотим кнопку разблокировать
             this._submitButton.disabled = false;
         } else {
             this._submitButton.classList.add(this._config.inactiveButtonClass); // если хотим кнопку заблокировать
             this._submitButton.disabled = 'disabled';
         }
     }

     _setEventListers = () => { // Устанавливаем обработчики событий
         this._inputsList = this._formElement.querySelectorAll(this._config.inputSelector); //Ищем все наши инпуты
         this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector); // нашли кнопку в форме чтоб ее заблокировать

         Array.from(this._inputsList).forEach(inputElement => { // На каждый инпут вешаем обработчик события(inputElement название события)
             inputElement.addEventListener('input', () => {
                 this._checkInputValidity(inputElement)
                 const isFormValid = this._formElement.checkValidity(); //   проверяем валидна ли форма при каждом вводе поэтому она ноходится в массиве
                 this._toggleButtonState(isFormValid) // функция блокирования 
             })
         })

         this._element.addEventListener('submit', (evt) => { // Функция запрета  действия по умолчанию
             evt.preventDefault();
         })
     }

     enableValidation = () => {
         this._setEventListers()
     }
 }