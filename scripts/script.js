import { Card } from "./card.js";
//import FormValidator from "./FormValidator.js";
import { initialCards } from "./data.js";


const cardList = document.querySelector(".cards__items");



/* function openPopup(modal) {
    modal.lassList.add('popup_open');
};*/

initialCards.forEach(function(elementData) {
    const card = new Card(elementData, "#cards__template").render();
    cardList.append(card);
});