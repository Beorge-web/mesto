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
  toggleButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.setAttribute("disabled", true);
      submitButton.classList.add(this._config.inactiveButtonClass);
    } else {
      submitButton.removeAttribute("disabled");
      submitButton.classList.remove(this._config.inactiveButtonClass);
    }
  }
  _hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
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
