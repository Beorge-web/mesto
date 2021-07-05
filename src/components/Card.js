export default class Card {
  constructor(data, cardSelector, handleOpenPopup, handleDeletePopup, handleLike) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleOpenPopup = handleOpenPopup;
    this._likes = data.likes.length;
    this._handleLike = handleLike;
    this._handleDeletePopup = handleDeletePopup;
    this._data = data;
    this._ownerId = '123';
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(true);
    return cardElement;
  }
  getOwnerId(id){
    this._ownerId = id;
  }
  generateCard() {
    // if (!this._data.owner) {
    //   this._data.owner = [];
    //   this._data.owner._id = this._ownerId;
    // }
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".element__title").textContent = this._name;
    this._likesCount = this._element.querySelector(".element__like-counter");
    this._likesCount.textContent = this._likes;
    this._setEventListeners();
    this._ownerCheck();
    return this._element;
  }
  _setEventListeners() {
    this._cardImg = this._element.querySelector(".element__image");
    this._elDelete = this._element.querySelector(".element__delete");
    this._like = this._element.querySelector(".element__like");
    this._delPopup = this._;
    this._cardImg.addEventListener("click", () => {
      this._handleOpenPopup(this._name, this._link);
    });
    this._like.addEventListener("click", () => {
      this._like.classList.toggle("element__like_active");
      if (this._like.classList.contains("element__like_active")) {
        this._likesCount.textContent = parseInt(this._likesCount.textContent, 10) + 1;
        this._handleLike(this._data._id, true);
      } else {
        this._likesCount.textContent = parseInt(this._likesCount.textContent, 10) - 1;
        this._handleLike(this._data._id, false);
      }
    });
    this._elDelete.addEventListener("click", () => {
      this._handleDeletePopup(this._data._id, this._element);
    });
  }
  _ownerCheck() {
    if (this._data.owner) {
      if (this._data.owner._id == this._ownerId) {
        this._element.querySelector(".element__delete").classList.add("element__delete_owner");
      }
      this._data.likes.forEach((item) => {
        if (item._id == this._ownerId) {
          this._like.classList.add("element__like_active");
        }
      });
    }
  }
}
