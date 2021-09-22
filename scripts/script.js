const popup = document.querySelector(".popup"); /*Нашел popup*/
const popupOpenBtn = document.querySelector(".profile__editButton"); /*Нашел кнопку редактирования*/
const popupCloseBtn = popup.querySelector(".popup__close-button"); /*Нашел кнопку закрытия*/
const popupForm = popup.querySelector(".popup__form"); /*Нашел форму с кнопками*/


let formName = document.querySelector(".popup__form-name"); /*Нашел инпут имени*/
let textTitle = document.querySelector('.profile__text-title'); /*Нашел куда буду сохранять новое имя*/

let formProf = document.querySelector(".popup__form-about"); /*Нашел инпут професии*/
let textSubtitle = document.querySelector('.profile__text-subtitle'); /*Нашел куда буду сохранять новую професию*/

function popupToggle() {
    startNameProf() /*вызвал функцию сохранения */
    popup.classList.toggle('popup_open')
}

function startNameProf() {
    formName.value = textTitle.textContent; //Перезаписал имя
    formProf.value = textSubtitle.textContent; //Перезаписал профессию
}

function save(evt) {
    evt.preventDefault();
    textTitle.textContent = formName.value; /*перезаписал новое имя*/
    textSubtitle.textContent = formProf.value; /*перезаписал новую професию*/
    popupToggle();
}

popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);
popupForm.addEventListener('submit', save);