 export const validationConfig = {
     formSelector: '.popup__form',
     inputSelector: '.popup__input', // классы наших инпутов
     submitButtonSelector: '.popup__button',
     inactiveButtonClass: 'popup__button_disabled', // класс заблокированной кнопки
     inputErrorClass: '.popup__input_type_error', // класс сообщения об ошибке
     errorClass: 'popup__error_visible'
 }

 export class FormValidator {
     constructor(config, popupFormSelector) { // 
         this._config = config;
         this._formElement = document.querySelector(popupFormSelector);
         this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
     }

     _showError = () => { // метод показа ошибки
         this._errorElement.textContent = this._inputElement.validationMessage;
         this._inputElement.classList.add(this._config.inputErrorClass)
     }

     _hideError = () => { // метод удаления ошибки
         this._errorElement.textContent = this._inputElement.validationMessage;
         this._inputElement.classList.remove(this._config.inputErrorClass)
     }

     _checkInputValidity = () => {
         const isInputNotValid = !this._inputElement.validity.valid; // создаем переменную которая хранит что форма не валидна
         this._errorElement = this._formElement.querySelector(`#${this._inputElement.id}-error`); // находим инпут по чтоб взять из него сообщение об ошибке
         if (isInputNotValid) { // если форма не валидна то показать ошибку в спан который рядом с инпутом
             this._showError();
         } else {
             this._hideError();
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
             this._disabledButton()
         }
     }

     _setEventListers = () => { // Устанавливаем обработчики событий
         this._inputsList = this._formElement.querySelectorAll(this._config.inputSelector); //Ищем все наши инпуты
         this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector); // нашли кнопку в форме чтоб ее заблокировать

         const isFormValid = this._formElement.checkValidity();
         this._toggleButtonState(isFormValid)

         Array.from(this._inputsList).forEach(inputElement => { // На каждый инпут вешаем обработчик события(inputElement название события)
             inputElement.addEventListener('input', () => {
                 this._inputElement = inputElement;
                 this._checkInputValidity()
                 const isFormValid = this._formElement.checkValidity(); //   проверяем валидна ли форма при каждом вводе поэтому она ноходится в массиве
                 this._toggleButtonState(isFormValid) // функция блокирования 
             })
         })

         this._formElement.addEventListener('submit', (evt) => { // Функция запрета  действия по умолчанию
             evt.preventDefault();
         })

         this._formElement.addEventListener('reset', () => {
             this._toggleButtonState(false)
         })

     }

     enableValidation = () => {
         this._setEventListers()
     }
 }