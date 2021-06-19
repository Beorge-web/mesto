export default class UserInfo {
  constructor(profileSelectors) {
    this._profileName = document.querySelector(profileSelectors.profileName);
    this._profileActivity = document.querySelector(profileSelectors.profileActivity);
  }
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._profileName.textContent;
    userInfo.activity = this._profileActivity.textContent;
    return userInfo;
  }
  setUserInfo(item) {
    this._profileName.textContent = item.name;
    this._profileActivity.textContent = item.activity;
  }
}
