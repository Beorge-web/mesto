import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup";
import Api from "../components/Api";
import {
  activityInput,
  addButton,
  addForm,
  avatar,
  avatarChange,
  avatarForm,
  avatarPopup,
  cardsContainer,
  config,
  editButton,
  editForm,
  initialCards,
  nameInput,
  profileActivity,
  profileName,
} from "../utils/constants.js";

// const cardList = new Section(
//   {
//     data: initialCards,
//     renderer: (item) => {
//       const card = new Card(item, "#element", handleOpenPopup);
//       const cardElement = card.generateCard();
//       cardList.setItem(cardElement);
//     },
//   },
//   ".elements"
// );
// cardList.renderItems();
const apiData = {
  url: "https://nomoreparties.co/v1/cohort-25",
  headers: {
    authorization: "7cfb4270-9131-40e7-9051-7aff8402e693",
    "Content-Type": "application/json",
  },
};
const api = new Api(apiData);

api.getData("/users/me")
  .then((result) => {
  profileEdit.setUserInfo(result);
  profileEdit.setUserAvatar(result);
});

api.getData("/cards").then((result) => {
  const newCardList = new Section(
    {
      data: result,
      renderer: (item) => {
        const card = new Card(item, "#element", handleOpenPopup, handleDeletePopup, handleLike);
        const cardElementt = card.generateCard();
        newCardList.setItem(cardElementt);
      },
    },
    ".elements"
  );
  newCardList.renderItems();
});

const imgPopupSelector = "#element__photo-popup";
const popupImage = new PopupWithImage(imgPopupSelector);
popupImage.setEventListeners();
function handleOpenPopup(name, link) {
  popupImage.open(name, link);
}

const editProfileSelector = "#edit-popup";
const profileSelectors = {
  profileName: ".profile__title",
  profileActivity: ".profile__subtitle",
  profileAvatar: ".profile__avatar",
};

const profileEdit = new UserInfo(profileSelectors);
const editProfile = new PopupWithForm(
  {
    handleFormSubmit: (item, button) => {
      profileEdit.setUserInfo(item);
      api.patchProfile(item, button);
    },
  },
  editProfileSelector
);
editProfile.setEventListeners();

editButton.addEventListener("click", function () {
  editProfile.open();
  const userData = profileEdit.getUserInfo();
  nameInput.value = userData.name;
  activityInput.value = userData.activity;
  profileForm.hideInputErrors();
});
const deleteConfSelector = "#element__delete-confirm";
const confDeleteButton = document.querySelector("#delete-confirm");
const confirmPopup = new Popup(deleteConfSelector);
confirmPopup.setEventListeners();
function handleDeletePopup(id, item) {
  confirmPopup.open();
  confDeleteButton.addEventListener("click", function () {
    item.remove();
    api.deleteCard(id);
    confirmPopup.close();
  });
}

function handleLike(id, action) {
  if (action == true) {
    api.handleCard(id, true); //add like
  } else {
    api.handleCard(id, false); // remove like
  }
}

const avatarPopupSelector = "#avatar-popup";
const newAvatar = new PopupWithForm(
  {
    handleFormSubmit: (item, button) => {
      avatar.src = item.avatar;
      api.updateAvatar(item, button);
    },
  },
  avatarPopupSelector
);
newAvatar.setEventListeners();
avatarChange.addEventListener("click", function () {
  newAvatar.open();
});

const addCardSelector = "#new-card";
const addCard = new PopupWithForm(
  {
    handleFormSubmit: (item, button) => {
      item.likes = [];
      const card = new Card(item, "#element", handleOpenPopup, handleDeletePopup, handleLike);
      api.addNewCard(item, button);
      const cardElement = card.generateCard();
      cardsContainer.prepend(cardElement);
    },
  },
  addCardSelector
);
addCard.setEventListeners();
addButton.addEventListener("click", function () {
  addCard.open();
  cardForm.toggleButtonState();
  cardForm.hideInputErrors();
});

const profileForm = new FormValidator(config, editForm);
const cardForm = new FormValidator(config, addForm);
const avatarValid = new FormValidator(config, avatarForm);
avatarValid.enableValidation();
profileForm.enableValidation();
cardForm.enableValidation();



export { handleOpenPopup, handleDeletePopup, handleLike };
