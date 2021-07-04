export const cardsContainer = document.querySelector(".elements");
export const addButton = document.querySelector(".profile__add-button");
export const newCard = document.querySelector("#new-card");
export const createButton = newCard.querySelector(".popup__submit-button");
export const editPopup = document.querySelector("#edit-popup");
export const editForm = editPopup.querySelector(".popup__form");
export const addForm = newCard.querySelector(".popup__form");
export const profileName = document.querySelector(".profile__title");
export const profileActivity = document.querySelector(".profile__subtitle");
export const editButton = document.querySelector(".profile__button");
export const closeButton = editPopup.querySelector(".popup__close-icon");
export const nameInput = document.querySelector(".popup__text_type_name");
export const activityInput = document.querySelector(".popup__text_type_activity");
export const cardPopup = document.querySelector("#element__photo-popup");
export const cardPhoto = cardPopup.querySelector(".popup__photo");
export const cardDesc = cardPopup.querySelector(".popup__description");
export const cardCloseButton = cardPopup.querySelector(".popup__close-icon");
export const avatarPopup = document.querySelector("#avatar-popup");
export const avatarForm = avatarPopup.querySelector(".popup__form");
export const avatar = document.querySelector(".profile__avatar");
export const avatarChange = document.querySelector(".profile__avatar_pen");

export const config = {
  form: ".popup__form",
  inputSelector: ".popup__text",
  fieldSelector: ".popup__set",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
};
export const initialCards = [
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
