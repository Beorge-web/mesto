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
const saveData = {
  url: "https://nomoreparties.co/v1/cohort-25/users/me",
  headers: {
    authorization: "7cfb4270-9131-40e7-9051-7aff8402e693",
    "Content-Type": "application/json",
  },
};
const saveProifle = new Api(saveData, "PATCH");
const profileEdit = new UserInfo(profileSelectors);
const editProfile = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      profileEdit.setUserInfo(item);
      saveProifle.patchProfile(item);
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

const deleteData = {
  url: "https://mesto.nomoreparties.co/v1/cohort-25/cards/",
  headers: {
    authorization: "7cfb4270-9131-40e7-9051-7aff8402e693",
  },
};
const deleteCard = new Api(deleteData, "DELETE");

function handleDeletePopup(id, item) {
  confirmPopup.open();

  confDeleteButton.addEventListener("click", function () {
    item.remove();
    deleteCard.handleCard(id);
    confirmPopup.close();
  });
}

const likeData = {
  url: "https://mesto.nomoreparties.co/v1/cohort-25/cards/likes/",
  headers: {
    authorization: "7cfb4270-9131-40e7-9051-7aff8402e693",
  },
};
const addLike = new Api(likeData, "PUT");
const removeLike = new Api(likeData, "DELETE");
function handleLike(id, action) {
  if (action == true) {
    addLike.handleCard(id);
  } else {
    removeLike.handleCard(id);
  }
}
const addCardSelector = "#new-card";
const cardData = {
  url: "https://mesto.nomoreparties.co/v1/cohort-25/cards",
  headers: {
    authorization: "7cfb4270-9131-40e7-9051-7aff8402e693",
    "Content-Type": "application/json",
  },
};
const newCard = new Api(cardData, "POST");
const addCard = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      item.likes = [];
      const card = new Card(item, "#element", handleOpenPopup, handleDeletePopup, handleLike);
      newCard.addNewCard(item);
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
profileForm.enableValidation();
cardForm.enableValidation();

const profileData = {
  url: "https://nomoreparties.co/v1/cohort-25/users/me",
  headers: {
    authorization: "7cfb4270-9131-40e7-9051-7aff8402e693",
  },
};
const profileInfo = new Api(profileData, "GET");
profileInfo.getData().then((result) => {
  //console.log(result)
  profileEdit.setUserInfo(result);
  profileEdit.setUserAvatar(result);
});

const cardsData = {
  url: "https://nomoreparties.co/v1/cohort-25/cards",
  headers: {
    authorization: "7cfb4270-9131-40e7-9051-7aff8402e693",
  },
};
const newCards = new Api(cardsData, "GET");
newCards.getData().then((result) => {
  //console.log(result);
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

// function addNewCard(data) {
//   fetch("https://mesto.nomoreparties.co/v1/cohort-25/cards", {
//     method: "POST",
//     headers: {
//       authorization: "7cfb4270-9131-40e7-9051-7aff8402e693",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: data.name,
//       link: data.link,
//     }),
//   });
// }

export { handleOpenPopup, handleDeletePopup, handleLike };
