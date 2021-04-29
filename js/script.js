let tempCard = document.querySelector("#element").content;
let tempPopup = document.querySelector("#card__photo-popup").content;
let cardsContainer = document.querySelector(".elements");
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
initialCards.forEach(function (element) {
  let cardElement = tempCard.querySelector(".element").cloneNode(true);
  let openedPopup = tempPopup.querySelector(".card__photo-popup").cloneNode(true);
  openedPopup.querySelector(".card__photo").src = element.link;
  openedPopup.querySelector(".card__description").textContent = element.name;
  cardElement.querySelector(".element__title").textContent = element.name;
  cardElement.querySelector(".element__image").style.backgroundImage =
    "url(" + element.link + ")";
  cardsContainer.append(cardElement);
  cardsContainer.append(openedPopup);
  console.log(openedPopup);
});
console.log(tempPopup);

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
let cardPopup = document.querySelectorAll(".card__photo-popup");
let imgButton = document.querySelectorAll(".element__image");
let like = document.querySelectorAll(".element__like");
let imgClose = document.querySelectorAll(".image__close-icon");
console.log(cardPopup);
console.log(imgButton);

like.forEach((like) => {
  like.addEventListener("click", function (evt) {
    console.log(like);
    like.classList.toggle("element__like_active");
  });
});
imgButton.forEach(function(item,number){
  item.addEventListener("click",function (){
    console.log(cardPopup[number])
    cardPopup[number].classList.toggle("popup_opened");

  })
})
imgClose.forEach(function(item,number){
  item.addEventListener("click",function (){
    console.log(cardPopup[number])
    cardPopup[number].classList.toggle("popup_opened");

  })
})

// imgClose.forEach(function(item,number){
//   item.addEventListener("click",function (){
//     imgClose.classList.toggle
//   })
// })
 

// function imgPopup(){
//   cardPopup.classList.toggle("popup_opened");
// }

function showPopup() {
  popup.classList.toggle("popup_opened");
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
}
function closePopup() {
  popup.classList.toggle("popup_opened");
}

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileActivity.textContent = `${activityInput.value}`;
  closePopup();
}

form.addEventListener("submit", changeProfile);
editButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", closePopup);
