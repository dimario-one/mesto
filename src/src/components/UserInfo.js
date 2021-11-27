export class UserInfo {
    constructor({ nameEditProfile, jobEditProfile }) {
        this._nameSelector = document.querySelector(nameEditProfile);
        this._jobSelector = document.querySelector(jobEditProfile);
        this._name = null;
        this._job = null;
    }
    getUserInfo() { //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
        return {
            name: this._nameSelector.textContent, //Перезаписал имя
            job: this._jobSelector.textContent, //Перезаписал профессию
        }
    }

    setUserInfo({ name, job }) {
        this._name = name;
        this._job = job;
    }

    updateUserInfo() {
        this._nameSelector.textContent = this._name;
        this._jobSelector.textContent = this._job;
    }

}