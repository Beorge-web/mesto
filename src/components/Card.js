export default class Card {
  constructor(data, cardSelector, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleOpenPopup = handleOpenPopup;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".element__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._cardImg = this._element.querySelector(".element__image");
    this._elDelete = this._element.querySelector(".element__delete");
    this._like = this._element.querySelector(".element__like");
    this._cardImg.addEventListener("click", () => {
      this._handleOpenPopup(this._name, this._link);
    });
    this._like.addEventListener("click", () => {
      this._like.classList.toggle("element__like_active");
    });
    this._elDelete.addEventListener("click", () => {
      this._element.remove();
    });
  }
}
