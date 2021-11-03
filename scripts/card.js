export class Card {
    constructor(initialCards, templateSelector, handleImageClick) { //
        this._name = initialCards.name;
        this._link = initialCards.link;
        this._handleImageClick = handleImageClick;
        this.initialCards = initialCards;
        this._templateSelector = templateSelector;
        this._element = null;
        this._deleteCard = this._deleteCard.bind(this);

    }

    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.cards__item')
            .cloneNode(true);

        // вернём DOM-элемент карточки
        return cardElement;
    }

    render() {
        console.log(this._popup, "this._popup");
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._setEventListeners(); // слушатель метода лайка в отрисовке карточки
        // Добавим данные
        this._element.querySelector('.cards__type_temlate_pic').src = this.initialCards.link;
        this._element.querySelector('.cards__type_temlate_text').textContent = this.initialCards.name;
        // Вернём элемент наружу
        return this._element;
    }

    //метод Zoom попапа

    // назначаем слушатель на кнопку
    _setEventListeners() {
        this._element.querySelector('.cards__like').addEventListener('click', () => {
            this._like();
        });

        this._element.querySelector('.cards__basket').addEventListener('click', () => {
            this._deleteCard()
        });

        this._element.querySelector('.cards__pic').addEventListener('click', () => {
            this._handleImageClick({ name: this._name, link: this._link });
        });


    }

    // метод переключения лайк
    _like() {
        this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
    }

    _deleteCard = () => {
        this._element.remove();
    }
}