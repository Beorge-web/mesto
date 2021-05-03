const tempCard = document.querySelector("#element").content;
const cardsContainer = document.querySelector(".elements");
const addButton = document.querySelector(".profile__add-button");
const newCard = document.querySelector("#new-card");
const newCardClose = newCard.querySelector(".popup__close-icon");
const createButton = newCard.querySelector(".popup__submit-button");
const popup = document.querySelector("#edit-profile");
const form = popup.querySelector(".popup__form");
const addForm = newCard.querySelector(".popup__form");
const profileName = document.querySelector(".profile__title");
const profileActivity = document.querySelector(".profile__subtitle");
const saveButton = document.querySelector(".popup__submit-button");
const editButton = document.querySelector(".profile__button");
const closeButton = popup.querySelector(".popup__close-icon");
const inputActivity = popup.querySelector(".popup__text_type_activity");
const nameInput = document.querySelector(".popup__text_type_name");
const activityInput = document.querySelector(".popup__text_type_activity");
const imgButton = document.querySelectorAll(".element__image");
const like = document.querySelectorAll(".element__like");
const imgClose = document.querySelectorAll(".element__close-icon");
const deleteButton = document.querySelectorAll(".element__delete");
const cards = document.querySelectorAll(".element");
const cardPopup = document.querySelectorAll(".element__photo-popup");
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
function getCardElement(element) {
  const cardElement = tempCard.querySelector(".element").cloneNode(true);
  const openedPopup = document.querySelector(".element__photo-popup");
  const cardPhoto = document.querySelector(".element__photo");
  const cardDesc = document.querySelector(".element__description");
  const elTitle = cardElement.querySelector(".element__title");
  const elImg = cardElement.querySelector(".element__image");
  const place = newCard.querySelector(".popup__text_type_place");
  const imgLink = newCard.querySelector(".popup__text_type_link");
  elTitle.textContent = element.name;
  elImg.style.backgroundImage = "url(" + element.link + ")";
  let imgSrc = elImg.style.backgroundImage.slice(5, -2);
  if (element == addForm) {
    elTitle.textContent = place.value;
    elImg.style.backgroundImage = "url(" + imgLink.value + ")";
    imgSrc = elImg.style.backgroundImage.slice(5, -2);
  }
  elImg.addEventListener("click", function () {
    showPopup(openedPopup);
    cardPhoto.src = imgSrc;
    cardDesc.textContent = elTitle.textContent;
  });
  openedPopup.querySelector(".element__close-icon").addEventListener("click", function () {
    closePopup(openedPopup);
  });
  cardElement.querySelector(".element__delete").addEventListener("click", function () {
    cardElement.remove();
  });
  cardElement.querySelector(".element__like").addEventListener("click", function () {
    likeButton(cardElement.querySelector(".element__like"));
  });
  cardsContainer.prepend(cardElement);
  cardsContainer.prepend(openedPopup);
  addForm.reset();
  closePopup(newCard);
  return false;
}

function likeButton(item) {
  item.classList.toggle("element__like_active");
}
function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent =activityInput.value;
  closePopup(popup);
}
function showPopup(item) {
  item.classList.add("popup_opened");
  if (item == popup) {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    activityInput.value = profileActivity.textContent;
  }
}
function closePopup(item) {
  item.classList.remove("popup_opened");
}
initialCards.forEach(getCardElement);
newCardClose.addEventListener("click", function () {
  closePopup(newCard);
});
addButton.addEventListener("click", function () {
  showPopup(newCard);
});
editButton.addEventListener("click", function () {
  showPopup(popup);
});
form.addEventListener("submit", changeProfile);
closeButton.addEventListener("click", function () {
  closePopup(popup);
});
addForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  getCardElement(addForm);
});
