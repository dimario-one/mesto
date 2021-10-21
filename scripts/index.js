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
const popupImage = document.querySelector(".popup_type_image"); //Нашел картинку
const cardsUl = document.querySelector(".cards__items"); // Нашел список куда буду добавлять карточку
const popupImageCloseBtn = popupImage.querySelector(".popup__close-image"); // Нашел кнопку закрытия попап с картинкой

//Функции

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

//функция открытия попапа картинки
function openPopupImage(e) {
    const card = e.currentTarget.closest(".cards__item"); // Нашел где все лежит
    const image = card.querySelector('.cards__type_temlate_pic'); //
    const imageSrc = image.src; //
    const popupPic = popupImage.querySelector(".popup__pic"); //
    popupPic.src = imageSrc; //
    //
    const text = card.querySelector('.cards__type_temlate_text'); // Нашел элемент что буду сохранять

    const popupTitle = popupImage.querySelector(".popup__title"); // нашел куда буду сохранять

    popupTitle.textContent = text.textContent; // Перезаписал значение
    openModal(popupImage); //функция открытия попапа
}

//Функция удаления карточки
function deleteCard(e) {
    const card = e.currentTarget.closest(".cards__item");
    card.remove();
}

// Функция лайка
function likeCard(e) {
    const like = e.currentTarget;
    like.classList.toggle("cards__like_active");
}

//Функция добавления новой карточки
function createCard(name, link) { // Два аргумента в функцию имя и ссылка
    const cardTemplate = document.querySelector("#cards__template"); //Нашел что буду добавлять
    const cloneСardTemplate = cardTemplate.content.cloneNode(true); //Клонирую содержимое строки
    cloneСardTemplate.querySelector(".cards__type_temlate_text").textContent = name; // нашел и вставил содержимое строки в name
    const cardsPic = cloneСardTemplate.querySelector(".cards__type_temlate_pic"); // нашел  содержимое строки 
    cardsPic.src = link; // вставил путь  link
    cardsPic.alt = name; // вставил содержимое name
    cardsPic.addEventListener("click", openPopupImage); // добавил слушатель событий открытия на карточку
    //
    const cardsBasket = cloneСardTemplate.querySelector(".cards__basket"); //Функция удаления карточки
    cardsBasket.addEventListener('click', deleteCard);
    //
    const cardsLike = cloneСardTemplate.querySelector(".cards__like"); // Функция лайка
    cardsLike.addEventListener('click', likeCard);
    //

    //
    return cloneСardTemplate; //Возвращает значение, чтобы когда был вызов функции отдавала готовое значение
}

function newCardAdd(e) {
    e.preventDefault(); //
    const clone = createCard(formAddName.value, formAddLink.value);
    cardsUl.prepend(clone); //вставляю в список
    closeModal(popupAddFormBtn);
}

const initialCardsContent = ((initialCards) => {
    initialCards.map((item) => {
        const clone = createCard(item.name, item.link); // на вход функции отправляем два аргумента из item  берем два значения name и link
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

function popupAddBtnOpen(modal) {
    toggleButtonState(popupCreateBtn, false, validationConfig.inactiveButtonClass);
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