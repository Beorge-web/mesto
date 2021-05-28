import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
const editButton = document.querySelector(".profile__button");
const closeButton = editPopup.querySelector(".popup__close-icon");
const nameInput = document.querySelector(".popup__text_type_name");
const activityInput = document.querySelector(".popup__text_type_activity");
const cardPopup = document.querySelector("#element__photo-popup");
const cardPhoto = cardPopup.querySelector(".popup__photo");
const cardDesc = cardPopup.querySelector(".popup__description");
const cardCloseButton = cardPopup.querySelector(".popup__close-icon")
const config = {
  form: ".popup__form",
  inputSelector: ".popup__text",
  fieldSelector: ".popup__set",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
};
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

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(editPopup);
}
function showPopup(item) {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}
function closePopup(item) {
  item.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}
function getCard(element) {
  const name = element.querySelector(".popup__text_type_place").value;
  const link = element.querySelector(".popup__text_type_link").value;
  return { name, link };
}
function handleOpenPopup(name, link) {
  cardPhoto.src = link;
  cardDesc.textContent = name;
  showPopup(cardPopup)
}  
function handleClosePopup() {
  cardPhoto.src = "";
  cardDesc.textContent = "";
  closePopup(cardPopup);
}
function closeOverPopup(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

newCardClose.addEventListener("click", function () {
  closePopup(newCard);
});
addButton.addEventListener("click", function () {
  showPopup(newCard);
  createButton.setAttribute("disabled", true);
  createButton.classList.add(config.inactiveButtonClass);
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
  const card = new Card(getCard(addForm), "#element");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  addForm.reset();
  closePopup(newCard);
});
cardPopup.querySelector(".popup__close-icon").addEventListener("click", function () {
  closePopup(cardPopup);
});
initialCards.forEach((item) => {
  const card = new Card(item, "#element");
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});
cardCloseButton.addEventListener("click", handleClosePopup)


const profileForm = new FormValidator(config, editForm);
const cardForm = new FormValidator(config, addForm);
profileForm.enableValidation();
cardForm.enableValidation();
editPopup.addEventListener("mouseup", closeOverPopup);
newCard.addEventListener("mouseup", closeOverPopup);
cardPopup.addEventListener("mouseup", closeOverPopup);
export { config, editForm, addForm, closeButton, cardPopup, cardPhoto, cardDesc, handleOpenPopup, showPopup, closePopup};