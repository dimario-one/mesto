export class UserInfo {
    constructor({ nameEditProfile, jobEditProfile }, avatarSelector) {
        this._nameSelector = document.querySelector(nameEditProfile);
        this._jobSelector = document.querySelector(jobEditProfile);
        this._name = null;
        this._job = null;
        this._avatar = document.querySelector(avatarSelector);
    }
    getUserInfo() { //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
        return {
            name: this._nameSelector.textContent, //Перезаписал имя
            job: this._jobSelector.textContent, //Перезаписал профессию
        }
    }

    setUserInfo({ name, about, avatar }) {
        this._name = name;
        this._job = about;
    }

    updateUserInfo() {
        this._nameSelector.textContent = this._name;
        this._jobSelector.textContent = this._job;
    }

    setAvatar(ava) { // сюда приходит data.avatar
        if (ava) {
            this._avatar.src = ava.avatar;
        } else {
            console.log('err')
        }
    }

}