import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitButton = document.querySelector("#delete-confirm");
    }
    open(callback){
        this.callback = callback;
        super.open();
        this._submitButton.onclick = this.callback;
    }
}