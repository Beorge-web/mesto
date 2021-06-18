export default class UserInfo {
  constructor(profileSelectors) {
    this._name = document.querySelector(profileSelectors.name);
    this._activity = document.querySelector(profileSelectors.activity);
    this._profileName = document.querySelector(profileSelectors.profileName); //не понял почему не используются, но они нужны в setUserInfo
    this._profileActivity = document.querySelector(profileSelectors.profileActivity);
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
