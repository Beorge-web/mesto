import {closeButton, cardPopup, cardPhoto, cardDesc} from './index.js'
class Card {
    constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
    }
    _closeByEscape(evt) {
      if (evt.key === "Escape") {
        this._handleClosePopup();
      }
    }
    _closeOverPopup(evt) {
      if (evt.target === evt.currentTarget) {
        this._handleClosePopup()
      }
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
  
    _handleOpenPopup() {
      cardPhoto.src = this._link;
      cardDesc.textContent = this._name;
      cardPopup.classList.add("popup_opened");
      document.addEventListener("keydown", (ev) => {
        this._closeByEscape(ev);
      });
    }
    _handleClosePopup() {
      cardPhoto.src = "";
      cardDesc.textContent = "";
      cardPopup.classList.remove("popup_opened");
      document.removeEventListener("keydown", (ev) => {
        this._closeByEscape(ev);
      });
    }
  
    _setEventListeners() {
      this._cardImg = this._element.querySelector(".element__image");
      this._elDelete = this._element.querySelector(".element__delete");
      this._like = this._element.querySelector(".element__like");
      this._cardImg.addEventListener("click", () => {
        this._handleOpenPopup();
      });
      closeButton.addEventListener("click", () => {
        this._handleClosePopup();
      });
      this._like.addEventListener("click", () => {
        this._like.classList.toggle("element__like_active");
      });
      this._elDelete.addEventListener("click", () => {
        this._element.remove();
      });
      cardPopup.addEventListener("mouseup", (ev) => {
        this._closeOverPopup(ev);
      });
    }
  }
  export default Card;