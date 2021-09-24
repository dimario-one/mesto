const popup = document.querySelector(".popup"); /*Нашел popup*/
const popupOpenBtn = document.querySelector(".profile__edit-button"); /*Нашел кнопку редактирования*/
const popupCloseBtn = popup.querySelector(".popup__close-button"); /*Нашел кнопку закрытия*/
const popupForm = popup.querySelector(".popup__form"); /*Нашел форму с кнопками*/


let formName = document.querySelector(".popup__input-name"); /*Нашел инпут имени*/
let textTitle = document.querySelector('.profile__text-title'); /*Нашел куда буду сохранять новое имя*/

let formProf = document.querySelector(".popup__input-prof"); /*Нашел инпут професии*/
let textSubtitle = document.querySelector('.profile__text-subtitle'); /*Нашел куда буду сохранять новую професию*/

function popupOpen() {
    startNameProf()
    popup.classList.add("popup_open");
}

function popupClose() {
    popup.classList.remove("popup_open");
}

function startNameProf() {
    formName.value = textTitle.textContent; //Перезаписал имя
    formProf.value = textSubtitle.textContent; //Перезаписал профессию
}

function save(evt) {
    evt.preventDefault();
    textTitle.textContent = formName.value; /*перезаписал новое имя*/
    textSubtitle.textContent = formProf.value; /*перезаписал новую професию*/
    popupClose();
}

popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
popupForm.addEventListener('submit', save);