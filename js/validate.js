
const showInputError = (form, inputSelector, errorMessage, config) => {
    const {errorClass} = config;
    const errorElement = form.querySelector(`.${inputSelector.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid; 
    });
  };
  const toggleButtonState = (inputList, submitButton,config) => {
    
    const {inactiveButtonClass} = config;
    if (hasInvalidInput(inputList)) {
      submitButton.setAttribute("disabled", true);
      submitButton.classList.add(inactiveButtonClass);
    } else {
      submitButton.removeAttribute("disabled");
      submitButton.classList.remove(inactiveButtonClass);
    }
  };
  const hideInputError = (form, inputSelector, config) => {
    const {errorClass} = config;
    const errorElement = form.querySelector(`.${inputSelector.id}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  };
  
  const checkInputValidity = (form, inputSelector,config) => {
    if (!inputSelector.validity.valid) {
      showInputError(form, inputSelector, inputSelector.validationMessage, config);
    } else {
      hideInputError(form, inputSelector, config);
    }
  };
  
  const setEventListeners = (form,config) => { 
    const {inputSelector,submitButtonSelector, ...restConfig} = config;
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(submitButtonSelector);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener("input", function () {
        toggleButtonState(inputList, submitButton,restConfig);
        checkInputValidity(form, inputSelector,restConfig);
      });
    });
  };
  
  const enableValidation = (config) => {
    
    const {form,fieldSelector, ...restConfig} = config;
    const formList = Array.from(document.querySelectorAll(form));
    formList.forEach((form) => {
      form.addEventListener("submit", function (evt) {
        evt.preventDefault();        
      });
      const fieldsetList = Array.from(form.querySelectorAll(fieldSelector));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet,restConfig );
      });
    });
  };
  enableValidation({
    form: '.popup__form',
    inputSelector: '.popup__text',
    fieldSelector: '.popup__set',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active',
  });