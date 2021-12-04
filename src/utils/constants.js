//Переменные

export let userId = null;
export let arrLikes = null;
export const popupDeleteSubmit = document.querySelector(".popup_type_submit");
export const avatarImg = document.querySelector(".profile__avatar-link");
export const editForm = document.querySelector(".popup__form_type_edit");
export const addForm = document.querySelector(".popup__form_type_add");
export const avatarForm = document.querySelector(".popup__form_type_avatar");
export const popupAvatar = document.querySelector(".popup_type_avatar"); /*Нашел popup Аватара*/
export const profilePopup = document.querySelector(".popup_type_edit"); /*Нашел popup*/
export const popupOpenBtn = document.querySelector(".profile__edit-button"); /*Нашел кнопку редактирования*/
export const formName = document.querySelector(".popup__input_type_name"); /*Нашел инпут имени*/
export const formProf = document.querySelector(".popup__input_type_prof"); /*Нашел инпут професии*/
export const popupAddFormBtn = document.querySelector(".popup_type_add"); /*Нашел popup формы добавления*/
export const popupAddBtn = document.querySelector(".profile__add-button"); /*Нашел кнопку Добавить*/
export const popupImage = document.querySelector(".popup_type_image"); //Нашел картинку
export const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];