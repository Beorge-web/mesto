import "./index.css";
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
  cardsContainer,
  config,
  editButton,
  editForm,
  initialCards,
  nameInput,
  profileActivity,
  profileName,
} from "../utils/constants.js";

addButton.addEventListener("click", function () {
  addCard.open();
  cardForm.toggleButtonState();
  cardForm.hideInputErrors();
});
editButton.addEventListener("click", function () {
  editProfile.open();
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  profileForm.hideInputErrors();
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
const popupImage = new PopupWithImage(imgPopupSelector);
popupImage.setEventListeners();
function handleOpenPopup(name, link) {
  popupImage.open(name, link);
}
const editProfileSelector = "#edit-popup";
const profileSelectors = {
  name: ".popup__text_type_name",
  activity: ".popup__text_type_activity",
  profileName:".profile__title",
  profileActivity:".profile__subtitle",
};
const editProfile = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      const profileEdit = new UserInfo(profileSelectors);
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

export { handleOpenPopup };
