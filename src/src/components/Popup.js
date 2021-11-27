export default class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._handleEscClose = this._handleEscClose.bind(this);

    }
    open() {
        this._popupElement.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);

    }

    close() {
        this._popupElement.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            // Если нажал на Escape то закрываем попап
            this.close()
        }
    }

    setEventListeners() {

        this._popupElement.querySelector('.popup__close-button').addEventListener('click', () => this.close());

        this._popupElement.addEventListener('click', (evt) => { // слушатель кнопки закрытия по клику мыши
            if (evt.target.classList.contains("popup")) {
                this.close(evt.currentTarget);
            }
        });

    }
}