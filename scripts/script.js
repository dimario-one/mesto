//Переменные
const popup = document.querySelector(".popup__form_type_edit"); /*Нашел popup*/
const popupOpenBtn = document.querySelector(".profile__edit-button"); /*Нашел кнопку редактирования*/
const popupCloseBtn = popup.querySelector(".popup__close-button"); /*Нашел кнопку закрытия*/
const popupForm = popup.querySelector(".popup__form"); /*Нашел форму с кнопками*/
const popupSaveBtn = popup.querySelector(".popup__save-button")

let formName = document.querySelector(".popup__input_type_name"); /*Нашел инпут имени*/
let textTitle = document.querySelector('.profile__text-title'); /*Нашел куда буду сохранять новое имя*/

let formProf = document.querySelector(".popup__input_type_prof"); /*Нашел инпут професии*/
let textSubtitle = document.querySelector('.profile__text-subtitle'); /*Нашел куда буду сохранять новую професию*/

const popupAddFormBtn = document.querySelector(".popup__form_type_add"); /*Нашел popup формы добавления*/
const popupAddBtn = document.querySelector(".profile__add-button"); /*Нашел кнопку Добавить*/
const popupCreateBtn = document.querySelector(".popup__create-button"); //Нашел кнопку Создать
const popupCloseAddBtn = popupAddFormBtn.querySelector(".popup__close-AddButton"); /*Нашел кнопку закрытия формы добавления*/
let formAddName = document.querySelector(".popup__input_type_name-pic"); /*Нашел инпут названия местности*/
let formAddLink = document.querySelector(".popup__input_type_link"); /*Нашел инпут ссылки местности*/
let templateText = document.querySelector(".cards__type_temlate_text"); //нашел куда буду записывать имя карточки при еее создании
let templateLink = document.querySelector(".cards__type_temlate_pic"); //нашел куда буду сохранять ссылку

const popupImage = document.querySelector(".popup_type_image"); //Нашел картинку
const cardsUl = document.querySelector(".cards__items"); // Нашел список куда буду добавлять карточку

const popupImageCloseBtn = popupImage.querySelector(".popup__close-AddButton");

console.log(popupAddFormBtn, "popupAddFormBtn")

//Функции

//Функция открытия
function openModal(modal) {
    console.log(modal, "modal");
    modal.classList.add('popup_open');
}

popupOpenBtn.addEventListener('click', () => popupOpen(popup));
popupAddBtn.addEventListener('click', () => popupAddBtnOpen(popupAddFormBtn));

//Функция закрытия
function closeModal(modal) {
    modal.classList.remove('popup_open');
}

popupCloseBtn.addEventListener('click', () => closeModal(popup));
popupCloseAddBtn.addEventListener('click', () => closeModal(popupAddFormBtn));
popupImageCloseBtn.addEventListener('click', () => closeModal(popupImage));




//функция открытия попапа картинки
function popupImageOpen(e) {
    popupImage.classList.add("popup_open"); //
    const card = e.currentTarget.closest(".cards__item"); // Нашел где все лежит
    const image = card.querySelector('.cards__type_temlate_pic'); //
    const imageSrc = image.src; //
    const popupPic = popupImage.querySelector(".popup__type_image_pic"); //
    popupPic.src = imageSrc; //
    //
    const text = card.querySelector('.cards__type_temlate_text'); // Нашел элемент что буду сохранять

    const popupTitle = popupImage.querySelector(".popup__title"); // нашел куда буду сохранять

    popupTitle.textContent = text.textContent; // Перезаписал значение
}

//функция закрытия попапа картинки
function popupImageClose() {
    popupImage.classList.remove("popup_open");
}

//Функция удаления карточки
function deleteCard(e) {
    const card = e.currentTarget.closest(".cards__item");
    card.remove();
}

// Функция лайка
function likeCard(e) {
    e.preventDefault();
    const like = e.currentTarget;
    like.classList.toggle("cards__like_active");
}

//Функция добавления новой карточки

function newCardAdd(e) {
    e.preventDefault(); //
    if (formAddName.value.length > 0 && formAddLink.value.length > 0) {
        const cardTemplate = document.querySelector("#cards__template"); //Нашел что буду добавлять
        const clone = cardTemplate.content.cloneNode(true); //Клонирую содержимое строки
        clone.querySelector(".cards__type_temlate_text").textContent = formAddName.value;
        const cardsPic = clone.querySelector(".cards__type_temlate_pic");
        cardsPic.src = formAddLink.value;
        cardsPic.addEventListener("click", popupImageOpen);
        //
        const cardsBasket = clone.querySelector(".cards__basket"); //Функция удаления карточки
        cardsBasket.addEventListener('click', deleteCard);
        //
        const cardsLike = clone.querySelector(".cards__like"); // Функция лайка
        cardsLike.addEventListener('click', likeCard);
        //
        cardsUl.prepend(clone); //вставляю в список
        closeModal(popupAddFormBtn);
    }
}

const initialCardsContent = ((initialCards) => {
    const cardTemplate = document.querySelector("#cards__template");
    initialCards.map((item) => {
        const clone = cardTemplate.content.cloneNode(true);
        clone.querySelector(".cards__type_temlate_text").textContent = item.name;
        const cardsPic = clone.querySelector(".cards__type_temlate_pic");
        cardsPic.src = item.link;
        cardsPic.addEventListener("click", popupImageOpen);
        //
        const cardsBasket = clone.querySelector(".cards__basket"); //Функция удаления карточки
        cardsBasket.addEventListener('click', deleteCard);
        //
        const cardsLike = clone.querySelector(".cards__like"); //  Функция лайка
        cardsLike.addEventListener('click', likeCard);
        //
        cardsUl.prepend(clone); //вставляю в список
    });
});

const initialCards = [{
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

initialCardsContent(initialCards);

function popupAddBtnOpen(popupModal) {
    startNameLink();
    openModal(popupModal); //Функция открытия попапа формы добавления
}

function startNameLink() {
    formAddName.value = "Название";
    formAddLink.value = "Ссылка на картинку"; //Функция сохранения начальных значений в инпуты
}

/*function popupAddBtnClose() {
    popupAddFormBtn.classList.remove("popup_open"); //Функцияя закрытия попапа формы добавления
}
*/
//Спринт 4

function popupOpen(popupModal) {
    startNameProf()
    openModal(popupModal);
}

/*function popupClose() {
    popup.classList.remove("popup_open");
}*/

function startNameProf() {
    formName.value = textTitle.textContent; //Перезаписал имя
    formProf.value = textSubtitle.textContent; //Перезаписал профессию
}

function save(evt) {
    evt.preventDefault();
    textTitle.textContent = formName.value; /*перезаписал новое имя*/
    textSubtitle.textContent = formProf.value; /*перезаписал новую професию*/
    closeModal(popup);
}

// Слушатели событий

// Сприн 4
popupForm.addEventListener('submit', save);
// Спринт 5
popupCreateBtn.addEventListener('click', newCardAdd);