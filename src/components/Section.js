export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer; //renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
        this._container = document.querySelector(containerSelector); //Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
    }

    renderItems(item) {
        item.forEach(item => { //публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
            this._renderer(item);
        });
    }
    addItem(element) {
        this._container.prepend(element); //публичный метод, который принимает DOM-элемент и добавляет его в контейнер.( в тренажере)
    }
}