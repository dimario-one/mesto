import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._image = popupElement.querySelector(".popup__pic");
        this._title = popupElement.querySelector(".popup__title_white");
    }
    openImage(card) {
        this._image.src = card.link;
        this._image.alt = card.name;
        this._title.textContent = card.name;
        super.open();
    }


}