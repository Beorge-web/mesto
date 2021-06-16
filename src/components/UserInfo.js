export default class UserInfo {
  constructor(name, activity) {
    this._name = name;
    this._activity = activity;
    this._profileName = document.querySelector(".profile__title");
    this._profileActivity = document.querySelector(".profile__subtitle");
  }
  getUserInfo() {
    const userInfo = {}
    userInfo.name = this._name;
    userInfo.activity = this._activity;
    return userInfo;
  }
  setUserInfo(item){
    this._profileName.textContent = item.name;
    this._profileActivity.textContent = item.activity;
  }
}
