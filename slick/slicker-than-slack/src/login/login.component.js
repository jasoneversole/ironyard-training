(function () {

  class LoginController {
    constructor(chatData, $scope) {
      this.loggedIn = false;
      this.chatData = chatData;
    }

    sendMessage() {
      this.nameUser(this.name);
      this.chatData.sendMessage(this.message);
      this.message = '';
    }

    nameUser() {
      this.chatData.nameUser(this.name);
      this.loggedIn = true;
    }

    messageKeypress(keyEvent) {
      if (keyEvent.which === 13)
        this.sendMessage();
    }

    loginKeypress(keyEvent) {
      if (keyEvent.which === 13)
        this.nameUser();
    }

  }

  angular
    .module('app')
    .component('login', {
      controller: ['chatData' , (chatData) => new LoginController(chatData)],
      templateUrl: 'login/login.component.html',
      controllerAs: 'login'
    });

}());
