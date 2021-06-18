class FormValidator {
  constructor(config, form) {
    this._formElement = form;
    this._form = config.form;
    this._config = config;
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }
  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  };
  _showInputError = (input) => {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  _hideInputError = (input) => {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    errorElement.classList.remove(input.errorClass);
    errorElement.textContent = "";
    
  };
  hideInputErrors(){
    this._inputList.forEach(input => this._hideInputError(input));
  }
  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }
  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };
  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this.toggleButtonState(this._inputList, this._buttonElement);
        this._checkInputValidity(input);
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
