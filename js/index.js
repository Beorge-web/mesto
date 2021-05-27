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
const cardPopup = document.querySelector("#element__photo-popup");
const cardPhoto = cardPopup.querySelector(".popup__photo");
const cardDesc = cardPopup.querySelector(".popup__description");
const popups = document.querySelectorAll(".popup");
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
class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _closeByEscape(evt) {
    if (evt.key === "Escape") {
      this._handleClosePopup();
    }
  }
  _closeOverPopup(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
    }
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".element__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _handleOpenPopup() {
    cardPhoto.src = this._link;
    cardDesc.textContent = this._name;
    cardPopup.classList.add("popup_opened");
    document.addEventListener("keydown", (ev) => {
      this._closeByEscape(ev);
    });
  }
  _handleClosePopup() {
    cardPhoto.src = "";
    cardDesc.textContent = "";
    cardPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", (ev) => {
      this._closeByEscape(ev);
    });
  }

  _setEventListeners() {
    this._cardImg = this._element.querySelector(".element__image");
    this._elDelete = this._element.querySelector(".element__delete");
    this._like = this._element.querySelector(".element__like");
    console.log(this._element)
    this._cardImg.addEventListener("click", () => {
      this._handleOpenPopup();
    });
    closeButton.addEventListener("click", () => {
      this._handleClosePopup();
    });
    this._like.addEventListener("click", () => {
      this._like.classList.toggle("element__like_active");
    });
    this._elDelete.addEventListener("click", () => {
      this._element.remove();
    });
    cardPopup.addEventListener("mouseup",(ev) => {
      this._closeOverPopup(ev);
    });
  }
}
// function createCard(element) {
//   const cardElement = tempCard.querySelector(".element").cloneNode(true);
//   const elTitle = cardElement.querySelector(".element__title");
//   const elImg = cardElement.querySelector(".element__image");
//   elTitle.textContent = element.name;
//   elImg.style.backgroundImage = `url(${element.link})`;

//   elImg.addEventListener("click", function () {
//     showPopup(cardPopup);
//     cardPhoto.src = element.link;
//     cardDesc.textContent = elTitle.textContent;
//     cardPhoto.alt = "Полное изображение c карточки " + elTitle.textContent;
//   });
//   cardElement.querySelector(".element__delete").addEventListener("click", function () {
//     cardElement.remove();
//   });
//   cardElement.querySelector(".element__like").addEventListener("click", function (evt) {
//     likeButton(evt);
//   });
//   return cardElement;
// }
// initialCards.forEach((element) => {
//   addCard(cardsContainer, createCard(element));
// });

// function addCard(container, cardElement) {
//   container.prepend(cardElement);
// }
// function likeButton(evt) {
//   evt.target.classList.toggle("element__like_active");
// }
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

editPopup.addEventListener("mouseup", closeOverPopup);

newCard.addEventListener("mouseup", closeOverPopup);
newCardClose.addEventListener("click", function () {
  closePopup(newCard);
});
addButton.addEventListener("click", function () {
  showPopup(newCard);
  createButton.setAttribute("disabled", true);
  createButton.classList.add("popup__submit-button_inactive");
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
  const card = new Card(getCard(addForm),"#element")
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
