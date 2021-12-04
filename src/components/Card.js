export class Card {
    constructor({ data, handleImageClick, handleLikeClick, handleCardDelete }, templateSelector) {
        this.id = data._id;
        this._element = null;
        this._likes = data.likes;
        this._name = data.name;
        this._link = data.link;
        this.data = data;
        this._ownerId = data.owner._id
        this._handleCardDelete = handleCardDelete;
        this._handleLikeClick = handleLikeClick;
        this._handleImageClick = handleImageClick;
        this._templateSelector = templateSelector;
        this._currentUserId = data.currentUserId;
        this.deleteCard = this.deleteCard.bind(this);


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
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._setEventListeners(); // слушатель методов в отрисовке карточки
        // Добавим данные

        if (!this.isOwner()) {
            this._buttonDelete.remove();
        }
        this._element.querySelector('.cards__type_temlate_pic').src = this.data.link;
        this._element.querySelector('.cards__type_temlate_text').textContent = this.data.name;
        this._element.querySelector('.cards__type_temlate_pic').alt = this.data.name;
        this._element.querySelector('.like-counter').textContent = this._likes.length; // вставил при отрисовке
        this._updateLikes();
        // Вернём элемент наружу
        return this._element;
    }


    // назначаем слушатель на кнопку
    _setEventListeners() {

        this._elementLikeButton = this._element.querySelector('.cards__like')

        this._elementLikeButton.addEventListener('click', () => {
            this._handleLikeClick(this);
        });
        this._buttonDelete = this._element.querySelector('.cards__basket');
        if (this._buttonDelete) {
            this._buttonDelete.addEventListener('click', () => {
                this._handleCardDelete(this)
            });
        }

        this._element.querySelector('.cards__pic').addEventListener('click', () => {
            this._handleImageClick({ name: this._name, link: this._link });
        });

    }
    isOwner() {
        return this._currentUserId === this._ownerId
    }

    deleteCard = () => {
        this._element.remove();
    }

    isLiked() {
        return (this._likes.some(user => user._id === this._currentUserId))
    }

    setLikes(dataLikes) {
        this._likes = dataLikes;
        this._element.querySelector('.like-counter').textContent = this._likes.length; // вставил при отрисовке
        this._updateLikes()
    }

    _updateLikes() {
        if (!this.isLiked()) {
            this._elementLikeButton.classList.remove('cards__like_active');
        } else {
            this._elementLikeButton.classList.add('cards__like_active');
        }
    }

    // likeCounter = () => {
    //     this._likeCounter.textContent = String(data.likes.length);
    // }

}