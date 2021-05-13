const tempCard = document.querySelector("#element").content;
const cardsContainer = document.querySelector(".elements");
const addButton = document.querySelector(".profile__add-button");
const newCard = document.querySelector("#new-card");
const newCardClose = newCard.querySelector(".popup__close-icon");
const createButton = newCard.querySelector(".popup__submit-button");
const editPopup = document.querySelector("#edit-profile");
const editForm = editPopup.querySelector(".popup__form");
const addForm = newCard.querySelector(".popup__form");
const profileName = document.querySelector(".profile__title");
const profileActivity = document.querySelector(".profile__subtitle");
const saveButton = document.querySelector(".popup__submit-button");
const editButton = document.querySelector(".profile__button");
const closeButton = editPopup.querySelector(".popup__close-icon");
const inputActivity = editPopup.querySelector(".popup__text_type_activity");
const nameInput = document.querySelector(".popup__text_type_name");
const activityInput = document.querySelector(".popup__text_type_activity");
const imgButton = document.querySelectorAll(".element__image");
const like = document.querySelectorAll(".element__like");
const imgClose = document.querySelectorAll(".element__close-icon");
const deleteButton = document.querySelectorAll(".element__delete");
const cards = document.querySelectorAll(".element");
const cardPopup = document.querySelector("#element__photo-popup");



const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
function createCard(element) {
  const cardElement = tempCard.querySelector(".element").cloneNode(true);
  const openedPopup = document.querySelector("#element__photo-popup");
  const cardPhoto = openedPopup.querySelector(".popup__photo");
  const cardDesc = openedPopup.querySelector(".popup__description");
  const elTitle = cardElement.querySelector(".element__title");
  const elImg = cardElement.querySelector(".element__image");
  elTitle.textContent = element.name;
  elImg.style.backgroundImage = `url(${element.link})`;

  elImg.addEventListener("click", function () {
    showPopup(openedPopup);
    cardPhoto.src = element.link;
    cardDesc.textContent = elTitle.textContent;
    cardPhoto.alt = "Полное изображение c карточки " + elTitle.textContent;
  });
  cardElement.querySelector(".element__delete").addEventListener("click", function () {
    cardElement.remove();
  });
  cardElement.querySelector(".element__like").addEventListener("click", function () {
    likeButton(cardElement.querySelector(".element__like"));
  });

  return cardElement;
}
initialCards.forEach((element) => {
  addCard(cardsContainer, createCard(element));
});

function addCard(container, cardElement) {
  container.prepend(cardElement);
}
function likeButton(item) {
  item.classList.toggle("element__like_active");
}
function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(editPopup);
}
function showPopup(item) {
  item.classList.add("popup_opened");
}
function closePopup(item) {
  item.classList.remove("popup_opened");
}
function getCard(element) {
  const name = element.querySelector(".popup__text_type_place").value;
  const link = element.querySelector(".popup__text_type_link").value;
  return { name, link };
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("popup__submit-button_inactive");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup__submit-button_inactive");
  }
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__text"));
  const buttonElement = formElement.querySelector(".popup__submit-button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    console.log(formElement);
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(".popup__set"));
    fieldsetList.forEach((fieldSet) => {
      console.log(fieldsetList);
      setEventListeners(fieldSet);
    });
  });
};

editPopup.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(editPopup);
  }
});
cardPopup.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(cardPopup);
  }
});
newCard.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(newCard);
  }
});
newCardClose.addEventListener("click", function () {
  closePopup(newCard);
});
addButton.addEventListener("click", function () {
  showPopup(newCard);
});
editButton.addEventListener("click", function () {
  showPopup(editPopup);
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
});
editForm.addEventListener("submit", changeProfile);
closeButton.addEventListener("click", function () {
  closePopup(editPopup);
});
addForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addCard(cardsContainer, createCard(getCard(addForm)));
  addForm.reset();
  closePopup(newCard);
});
cardPopup.querySelector(".popup__close-icon").addEventListener("click", function () {
  closePopup(cardPopup);
});
enableValidation({
  formElement: '.popup__form',
  inputElement: '.popup__text',
  buttonElement: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
}); 