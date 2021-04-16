let profileName = document.querySelector('.profile__title');
let profileActivity = document.querySelector('.profile__subtitle');
let saveButton = document.querySelector('.popup__submit-button');
let editButton = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-icon');
let likeButton = document.querySelector('.element__like');
let inoutActivity = document.querySelector('.popup__text popup__text_type_activity');
let nameInput = document.querySelector('.popup__text_type_name');
let activityInput = document.querySelector('.popup__text_type_activity');
let form = document.querySelector('.popup__form');
console.log(form)
function showPopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value=profileName.textContent;
  activityInput.value=profileActivity.textContent; 

}
function closePopup() {
  popup.classList.toggle('popup_opened');
}

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileActivity.textContent = `${activityInput.value}`;

  closePopup();
  
}
form.addEventListener('submit', changeProfile); 
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);



