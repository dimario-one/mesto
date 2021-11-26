import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupElement, submitHandler) {
        super(popupElement);
        this._submitHandler = submitHandler;
        this._form = popupElement.querySelector('.popup__form'); //Нахожу форму
        this._inputPopup = popupElement.querySelectorAll('.popup__input'); // Нахожу инпуты в форме
    }

    close() {
        super.close();
        this._form.reset();
    }

    _getInputValues() {
        this._formValues = {}; // Создаем объект
        this._inputPopup.forEach((element) => { // начинаем наполнять объект в цикле  проходя по всем инпутам
            this._formValues[element.name] = element.value; // в атрибут name  записываем значение
        });
        return this._formValues; // на выходе готовый объект с данными введеными в инпуты
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            this._submitHandler(this._getInputValues());
        });
    }
}