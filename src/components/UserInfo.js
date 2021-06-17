export default class UserInfo {
  constructor(profileSelectors) {
    this._name = document.querySelector(profileSelectors.name);
    this._activity = document.querySelector(profileSelectors.activity);
    this._profileName = document.querySelector(".profile__title");
    this._profileActivity = document.querySelector(".profile__subtitle");
  }
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.value;
    userInfo.activity = this._activity.value;
    return userInfo;
  }
  setUserInfo(item) {
    this._profileName.textContent = item.name;
    this._profileActivity.textContent = item.activity;
  }
}
