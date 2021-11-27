//импорт классов
import './index.css';
import { Card } from "../components/Card.js";
import { validationConfig, FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import {
    profilePopup,
    popupOpenBtn,
    formName,
    formProf,
    popupAddFormBtn,
    popupAddBtn,
    popupImage,
    initialCards,
} from "../utils/constants.js"

function submitHandler(userInfo) {
    currentUserInfo.setUserInfo(userInfo);
    currentUserInfo.updateUserInfo();
    editFormPopup.close();
}

const editFormPopup = new PopupWithForm(profilePopup, submitHandler);
editFormPopup.setEventListeners();

function cardFormSubmit(data) {
    const card = createCard(data);
    currentSection.addItem(card)
    addFormPopup.close();
}

const addFormPopup = new PopupWithForm(popupAddFormBtn, cardFormSubmit);
addFormPopup.setEventListeners();

function editCardPopup() {
    addFormPopup.open();
}

const zoomPopupWithImage = new PopupWithImage(popupImage);

function handleImageClick(initialCards) {
    zoomPopupWithImage.openImage(initialCards);
}

const currentSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item)
        currentSection.addItem(card)
    }
}, ".cards__items");

currentSection.renderItems();

const currentUserInfo = new UserInfo({ nameEditProfile: ".profile__text-title", jobEditProfile: ".profile__text-subtitle" });
currentUserInfo.setUserInfo({ name: "Жак-Ив Кусто", job: "Исследователь океана" });

const validationFormAdd = new FormValidator(validationConfig, '.popup_type_add');
validationFormAdd.enableValidation();

const validationFormEdit = new FormValidator(validationConfig, '.popup_type_edit');
validationFormEdit.enableValidation();

function createCard(data) {
    return new Card(data, "#cards__template", handleImageClick).render();
}

function openProfilePopup() {
    editFormPopup.open();
    const { name, job } = currentUserInfo.getUserInfo()
    formName.value = name;
    formProf.value = job;

}

popupOpenBtn.addEventListener('click', openProfilePopup);
popupAddBtn.addEventListener('click', editCardPopup);
zoomPopupWithImage.setEventListeners();