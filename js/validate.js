
const showInputError = (formSelector, inputSelector, errorMessage, config) => {
    const {errorClass} = config;
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
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
  const hideInputError = (formSelector, inputSelector, config) => {
    const {errorClass} = config;
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  };
  
  const checkInputValidity = (formSelector, inputSelector,config) => {
    if (!inputSelector.validity.valid) {
      showInputError(formSelector, inputSelector, inputSelector.validationMessage, config);
    } else {
      hideInputError(formSelector, inputSelector, config);
    }
  };
  
  const setEventListeners = (formSelector,config) => { 
    const {inputSelector,submitButtonSelector, ...restConfig} = config;
    const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
    const submitButton = formSelector.querySelector(submitButtonSelector);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener("input", function () {
        toggleButtonState(inputList, submitButton,restConfig);
        checkInputValidity(formSelector, inputSelector,restConfig);
      });
    });
  };
  
  const enableValidation = (config) => {
    
    const {formSelector,fieldSelector, ...restConfig} = config;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formSelector) => {
      formSelector.addEventListener("submit", function (evt) {
        evt.preventDefault();        
      });
      const fieldsetList = Array.from(formSelector.querySelectorAll(fieldSelector));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet,restConfig );
      });
    });
  };