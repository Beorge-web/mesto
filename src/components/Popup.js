export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-icon");
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mouseup", this._closeOverPopup);
  }
  close = () => {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mouseup", this._closeOverPopup);
  };
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      this.close(openedPopup);
    }
  };
  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
  }
}
