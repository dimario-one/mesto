//импорт классов

import { Card } from "./Card.js";
import { validationConfig, FormValidator } from "./FormValidator.js";


//Переменные
const profilePopup = document.querySelector(".popup_type_edit"); /*Нашел popup*/
const popupOpenBtn = document.querySelector(".profile__edit-button"); /*Нашел кнопку редактирования*/
const popupCloseBtn = profilePopup.querySelector(".popup__close-button"); /*Нашел кнопку закрытия*/
const popupForm = profilePopup.querySelector(".popup__form"); /*Нашел форму с кнопками*/
const formName = document.querySelector(".popup__input_type_name"); /*Нашел инпут имени*/
const textTitle = document.querySelector('.profile__text-title'); /*Нашел куда буду сохранять новое имя*/
const formProf = document.querySelector(".popup__input_type_prof"); /*Нашел инпут професии*/
const textSubtitle = document.querySelector('.profile__text-subtitle'); /*Нашел куда буду сохранять новую професию*/
const popupAddFormBtn = document.querySelector(".popup_type_add"); /*Нашел popup формы добавления*/
const popupAddBtn = document.querySelector(".profile__add-button"); /*Нашел кнопку Добавить*/
const popupCreateBtn = document.querySelector(".popup__create-button"); //Нашел кнопку Создать
const popupCloseAddBtn = popupAddFormBtn.querySelector(".popup__close-AddButton"); /*Нашел кнопку закрытия формы добавления*/
const formAddName = document.querySelector(".popup__input_type_name-pic"); /*Нашел инпут названия местности*/
const formAddLink = document.querySelector(".popup__input_type_link"); /*Нашел инпут ссылки местности*/
const templateText = document.querySelector(".cards__type_temlate_text"); //нашел куда буду записывать имя карточки при еее создании
const templateLink = document.querySelector(".cards__type_temlate_pic"); //нашел куда буду сохранять ссылк
const popupImages = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup_type_image"); //Нашел картинку
const cardsUl = document.querySelector(".cards__items"); // Нашел список куда буду добавлять карточку
const popupImageCloseBtn = popupImage.querySelector(".popup__close-image"); // Нашел кнопку закрытия попап с картинкой
const initialCard = [{
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

const cardList = document.querySelector(".cards__items");



//Функции
//
function handleImageClick(initialCard) {
    popupImages.querySelector(".popup__pic").src = initialCard.link;
    popupImages.querySelector(".popup__title_white").textContent = initialCard.name;
    openModal(popupImages);
}

//спринт 7
//создаем новай класс 

const validationFormAdd = new FormValidator(validationConfig, '.popup_type_add');
validationFormAdd.enableValidation();
const validationFormEdit = new FormValidator(validationConfig, '.popup_type_edit');
validationFormEdit.enableValidation();

function createCard(data) {
    return new Card(data, "#cards__template", handleImageClick).render();
}

function newCardAdd(e) {
    e.preventDefault(); //
    cardsUl.prepend(createCard({ name: formAddName.value, link: formAddLink.value })); //вставляю в список
    closeModal(popupAddFormBtn);
}

initialCard.forEach(function(elementData) {
    const card = new Card(elementData, "#cards__template", handleImageClick).render();
    cardList.append(card);
});

// спринт 6
//функция закрытия по клику мыши вне попапа

function mouseClickPopup(evt) {
    if (evt.target.classList.contains("popup")) {
        closeModal(evt.currentTarget); //осуществлять поиск активного класса как  в функции ESC не обязательно если ты вешаешь обработчик на modal
        //Можно использовать evt.currentTarget, в этой переменной содержится элемент на котором повесили обработчик события, это и будет наш modal 
    }
};

// Функция закрытия попапа по кнопке
function handleKeydownEsc(evt) {
    const activeModal = document.querySelector(".popup_open");
    // Проверяем, была ли нажата escape 
    if (evt.key === "Escape") {
        // Если нажал на Escape то закрываем попап
        closeModal(activeModal);
    }
};

//Функция открытия
function openModal(modal) {
    modal.classList.add('popup_open');
    document.addEventListener('keydown', handleKeydownEsc); // обработчик модального окна находится в функции открытия для того чтоб когда модальное окно закрыто esc не срабатывал 
    modal.addEventListener('click', mouseClickPopup);
}

//Функции слушатели открытия
popupOpenBtn.addEventListener('click', () => openProfilePopup(profilePopup)); //при клике на кнопку вызываю функцию в которой две функции 1. автозаполнения инпутов 2. функция открытия
popupAddBtn.addEventListener('click', () => popupAddBtnOpen(popupAddFormBtn));

//Функция закрытия
function closeModal(modal) {
    modal.classList.remove('popup_open');
    document.removeEventListener('keydown', handleKeydownEsc);
    modal.removeEventListener('click', mouseClickPopup);
}

//Функции слушатели закрытия
popupCloseBtn.addEventListener('click', () => closeModal(profilePopup));
popupCloseAddBtn.addEventListener('click', () => closeModal(popupAddFormBtn));
popupImageCloseBtn.addEventListener('click', () => closeModal(popupImage));


function popupAddBtnOpen(modal) {
    validationFormAdd._toggleButtonState(false);
    startNameLink();
    openModal(modal); //Функция открытия попапа формы добавления
};

function startNameLink() {
    formAddName.value = "";
    formAddLink.value = ""; //Функция сохранения начальных значений в инпуты 
}

//Спринт 4

function openProfilePopup(modal) {
    startNameProf();
    openModal(modal);
}

function startNameProf() {
    formName.value = textTitle.textContent; //Перезаписал имя
    formProf.value = textSubtitle.textContent; //Перезаписал профессию
}

function saveNameProf(evt) {
    evt.preventDefault();
    textTitle.textContent = formName.value; /*перезаписал новое имя*/
    textSubtitle.textContent = formProf.value; /*перезаписал новую професию*/
    closeModal(profilePopup);
}


// Слушатели событий

// Сприн 4
popupForm.addEventListener('submit', saveNameProf);
// Спринт 5
popupAddFormBtn.addEventListener('submit', newCardAdd);