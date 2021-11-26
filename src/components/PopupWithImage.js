import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = popupSelector.querySelector(".popup__pic");
        this._title = popupSelector.querySelector(".popup__title_white");
    }
    openImage(popupSelector) {
        this._image.src = popupSelector.link;
        this._image.alt = popupSelector.name;
        this._title.textContent = popupSelector.name;
        super.open();
    }


}