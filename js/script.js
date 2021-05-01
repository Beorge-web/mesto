let tempCard = document.querySelector("#element").content;
let tempPopup = document.querySelector("#element__photo-popup").content;
let cardsContainer = document.querySelector(".elements");
let addButton = document.querySelector(".profile__add-button");
let newCard = document.querySelector(".popup-add");
let newCardClose = document.querySelector(".popup-add__close-icon");
let createButton = document.querySelector(".popup-add__submit-button");
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
initialCards.forEach(function (element) {
  let cardElement = tempCard.querySelector(".element").cloneNode(true);
  let openedPopup = tempPopup.querySelector(".element__photo-popup").cloneNode(true);
  openedPopup.querySelector(".element__photo").src = element.link;
  openedPopup.querySelector(".element__description").textContent = element.name;
  cardElement.querySelector(".element__title").textContent = element.name;
  cardElement.querySelector(".element__image").style.backgroundImage = "url(" + element.link + ")";
  cardsContainer.append(cardElement);
  cardsContainer.append(openedPopup);
});
createButton.addEventListener("submit", addNewCard);
let profileName = document.querySelector(".profile__title");
let profileActivity = document.querySelector(".profile__subtitle");
let saveButton = document.querySelector(".popup__submit-button");
let editButton = document.querySelector(".profile__button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-icon");
let likeButton = document.querySelector(".element__like");
let inoutActivity = document.querySelector(".popup__text popup__text_type_activity");
let nameInput = document.querySelector(".popup__text_type_name");
let activityInput = document.querySelector(".popup__text_type_activity");
let form = document.querySelector(".popup__form");
let addForm = document.querySelector(".popup-add__form");
let cardPopup = document.querySelectorAll(".element__photo-popup");
let imgButton = document.querySelectorAll(".element__image");
let like = document.querySelectorAll(".element__like");
let imgClose = document.querySelectorAll(".element__close-icon");
let deleteButton = document.querySelectorAll(".element__delete");
let cards = document.querySelectorAll(".element");

function addNewCard(evt) {
  evt.preventDefault();
  let cardElement = tempCard.querySelector(".element").cloneNode(true);
  let openedPopup = tempPopup.querySelector(".element__photo-popup").cloneNode(true);
  let place = document.querySelector(".popup-add__text_type_place");
  let imgLink = document.querySelector(".popup-add__text_type_link");
  let cardPhoto = openedPopup.querySelector(".element__photo");
  let cardDesc = openedPopup.querySelector(".element__description");
  let elTitle = cardElement.querySelector(".element__title");
  let elImg = cardElement.querySelector(".element__image");
  cardPhoto.src = imgLink.value;
  cardDesc.textContent = place.value;
  elTitle.textContent = place.value;
  elImg.style.backgroundImage = "url(" + imgLink.value + ")";
  elImg.addEventListener("click", function () {
    openedPopup.classList.toggle("popup_opened");
  });
  openedPopup.querySelector(".element__close-icon").addEventListener("click", function () {
    openedPopup.classList.toggle("popup_opened");
  });
  cardElement.querySelector(".element__delete").addEventListener("click", function () {
    cardElement.style.display = "none";
  });
  cardElement.querySelector(".element__like").addEventListener("click",function(){
    cardElement.querySelector(".element__like").classList.toggle("element__like_active");
  })
  cardsContainer.prepend(cardElement);
  cardsContainer.append(openedPopup);
  place.value= '';
  imgLink.value= '';
  toggleNewCard();
}

deleteButton.forEach(function (item, number) {
  item.addEventListener("click", function () {
    cards[number].style.display = "none";
  });
});

addForm.addEventListener("submit", addNewCard);

like.forEach((like) => {
  like.addEventListener("click", function (evt) {
    like.classList.toggle("element__like_active");
  });
});

imgButton.forEach(function (item, number) {
  item.addEventListener("click", function () {
    cardPopup[number].classList.toggle("popup_opened");
  });
});
imgClose.forEach(function (item, number) {
  item.addEventListener("click", function () {
    cardPopup[number].classList.toggle("popup_opened");
  });
});

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileActivity.textContent = `${activityInput.value}`;
  closePopup();
}
function showPopup() {
  popup.classList.toggle("popup_opened");
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
}
function closePopup() {
  popup.classList.toggle("popup_opened");
}
function toggleNewCard() {

  newCard.classList.toggle("popup-add_opened");
}

newCardClose.addEventListener("click", toggleNewCard);
addButton.addEventListener("click", toggleNewCard);
editButton.addEventListener("click", showPopup);
form.addEventListener("submit", changeProfile);
closeButton.addEventListener("click", closePopup);