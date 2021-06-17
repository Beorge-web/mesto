import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardPhoto = document.querySelector(".popup__photo");
    this._cardDesc = document.querySelector(".popup__description");
  }
  open(name, link) {
    super.open();
    this._cardPhoto.src = link;
    this._cardDesc.textContent = name;
  }
}
