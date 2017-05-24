(function () {

  class LoginController {
    constructor(chatData) {
      this.chatData = chatData;
    }

    nameUser() {
      this.chatData.nameUser (this.name);
    }
  }

  angular
    .module('app')
    .component('login', {
      controller: ['chatData', chatData => new LoginController(chatData)],
      templateUrl: 'login/login.component.html',
      controllerAs: 'login'
    });

}());
