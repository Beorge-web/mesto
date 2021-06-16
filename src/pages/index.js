import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  activityInput,
  addButton,
  addForm,
  cardDesc,
  cardPhoto,
  cardPopup,
  cardsContainer,
  config,
  createButton,
  editButton,
  editForm,
  editPopup,
  initialCards,
  nameInput,
  newCard,
  profileActivity,
  profileName,
} from "../utils/constants.js";
function showPopup(item) {
  item.classList.add("popup_opened");
}
function closePopup(item) {
  item.classList.remove("popup_opened");
}


function closeOverPopup(evt) {
  
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}


addButton.addEventListener("click", function () {
  addCard.open();
  createButton.setAttribute("disabled", true);
  createButton.classList.add(config.inactiveButtonClass);
});
editButton.addEventListener("click", function () {
  editProfile.open();
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
});

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#element", handleOpenPopup);
      const cardElement = card.generateCard();
      cardList.setItem(cardElement);
    },
  },
  ".elements"
);
cardList.renderItems();
const imgPopupSelector = "#element__photo-popup";
function handleOpenPopup(name, link) {
  const popupImage = new PopupWithImage(imgPopupSelector);
  popupImage.open(name, link);
  popupImage.setEventListeners();
}
const editProfileSelector = "#edit-popup";
const editProfile = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      const profileEdit = new UserInfo(item.name, item.activity);
      const info = profileEdit.getUserInfo();
      profileEdit.setUserInfo(info);
    },
  },
  editProfileSelector
);
editProfile.setEventListeners();
const addCardSelector = "#new-card";
const addCard = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      const card = new Card(item, "#element", handleOpenPopup);
      const cardElement = card.generateCard();
      cardsContainer.prepend(cardElement);
    },
  },
  addCardSelector
);
addCard.setEventListeners();

const profileForm = new FormValidator(config, editForm);
const cardForm = new FormValidator(config, addForm);
profileForm.enableValidation();
cardForm.enableValidation();
editPopup.addEventListener("mouseup", closeOverPopup);
newCard.addEventListener("mouseup", closeOverPopup);
cardPopup.addEventListener("mouseup", closeOverPopup);
export { handleOpenPopup };
