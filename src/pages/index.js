//импорт классов
import { Api } from "../components/Api.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
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
    popupAvatar,
    avatarImg,
    popupDeleteSubmit,
    avatarForm,
    addForm,
    editForm,
} from "../utils/constants.js"
let userId = null;


const currentSection = new Section({
    renderer: (item) => {
        currentSection.addItem(createCard(item))
    }
}, ".cards__items");

const currentUserInfo = new UserInfo({ nameEditProfile: ".profile__text-title", jobEditProfile: ".profile__text-subtitle" }, ".profile__avatar");

function openProfilePopup() {
    editFormPopup.open();
    const { name, job } = currentUserInfo.getUserInfo()
    formName.value = name;
    formProf.value = job;
}

const editFormPopup = new PopupWithForm(profilePopup, submitHandler);
editFormPopup.setEventListeners();

function submitHandler(dataUser) {
    renderLoading(editForm, true)
    api.updateUserInfo(dataUser)
        .then((data) => {
            console.log(data)
            currentUserInfo.setUserInfo(data)
            currentUserInfo.updateUserInfo()
            editFormPopup.close()
        }).catch(err => console.log(err))
        .finally(() => renderLoading(editForm, false));
}

function renderLoading(form, isStatus) {
    const buttonAction = form.querySelector(".popup__button");
    if (isStatus) {
        buttonAction.textContent = "Сохранение..."
    } else {
        buttonAction.textContent = "Сохранить"
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30',
    headers: { authorization: '3536cfe9-c417-41c1-9a2d-162801d02bdc', 'Content-Type': 'application/json' }
})


Promise.all([api.getCards(), api.getUserInfo()])
    .then(([dataCards, dataUser]) => {
        userId = dataUser._id;
        currentSection.renderItems(dataCards) //рендер карточки
        currentUserInfo.setUserInfo(dataUser) //Рендер пользователя
        currentUserInfo.updateUserInfo()
        currentUserInfo.setAvatar(dataUser)
    })
    .catch(err => console.log(err))

const avatarEditPopup = new PopupWithForm(popupAvatar, handleSubmitForm);

function handleSubmitForm(data) {
    renderLoading(avatarForm, true);
    api.changeAvatar(data)
        .then(res => {
            currentUserInfo.setAvatar(res);
            avatarEditPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => renderLoading(avatarForm, false));
}

const cardDelete = new PopupWithSubmit(popupDeleteSubmit);

avatarImg.addEventListener('click', function() {
    avatarEditPopup.open();
})

const addFormPopup = new PopupWithForm(popupAddFormBtn, cardFormSubmit);

function cardFormSubmit(data) {
    renderLoading(addForm, true)
    api.createNewCard(data)
        .then((responceData) => {
            const card = createCard(responceData);
            currentSection.addItem(card);
            addFormPopup.close()
        })
        .catch(err => console.log(err))
        .finally(() => renderLoading(addForm, false));
}

function editCardPopup() {
    addFormPopup.open();
}

const zoomPopupWithImage = new PopupWithImage(popupImage);

function handleImageClick(initialCards) {
    zoomPopupWithImage.openImage(initialCards);
}

const validationFormAdd = new FormValidator(validationConfig, '.popup__form_type_add');
validationFormAdd.enableValidation();

const validationFormEdit = new FormValidator(validationConfig, '.popup__form_type_edit');
validationFormEdit.enableValidation();

const validationFormAvatar = new FormValidator(validationConfig, '.popup__form_type_avatar');
validationFormAvatar.enableValidation();

function createCard(data) {
    return new Card({
            data: {...data, currentUserId: userId },
            handleImageClick,
            handleLikeClick: (card) => {
                if (card.isLiked()) {
                    api.removeCardLike(card.id)
                        .then(dataCard => card.setLikes(dataCard.likes))
                        .catch(err => console.log(err))
                } else {
                    api.setCardLike(card.id)
                        .then(dataCard => {
                            card.setLikes(dataCard.likes)
                                .catch(err => console.log(err))
                        })
                }
            },
            handleCardDelete
        },
        "#cards__template").render();
}

function handleCardDelete(card) {
    cardDelete.open()
    cardDelete.setActionSubmit(() => {
        api.removeCard(card.id)
            .then(() => {
                card.deleteCard(), cardDelete.close()
            })
            .catch(err => console.log(err))
    })
}


cardDelete.setEventListeners();
avatarEditPopup.setEventListeners();
addFormPopup.setEventListeners();

popupOpenBtn.addEventListener('click', openProfilePopup);
popupAddBtn.addEventListener('click', editCardPopup);
zoomPopupWithImage.setEventListeners();