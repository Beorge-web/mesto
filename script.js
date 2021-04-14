let profileName = document.querySelector(".profile__title");
let profileActivity = document.querySelector(".profile__subtitle");
let saveButton = document.querySelector(".popup__submit-button");
let editButton = document.querySelector(".profile__button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-icon");
let inputName = document.querySelector(".popup__text_type_name");
let likeButton = document.querySelector(".element__like");
let inoutActivity = document.querySelector(".popup__text popup__text_type_activity");



function like() {
  likeButton.classList.toggle("element__like_active");
}

function showPopup() {
  popup.classList.remove("disabled");
}
function closePopup() {
  popup.classList.add("disabled");
}

function changeProfile(evt) {
  evt.preventDefault();
  let name = document.querySelector(".popup__text_type_name");
  let activity = document.querySelector(".popup__text_type_activity");
  profileName.innerHTML = `<h1 class="profile__title">${name.value}</h1>`;
  profileActivity.innerHTML = `<p class="profile__subtitle">${activity.value}</p>`;
  closePopup();
}

saveButton.addEventListener("click", changeProfile);
editButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", closePopup);
likeButton.addEventListener("click", like);
