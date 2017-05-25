(function () {

  class LoginController {
    constructor(chatData) {
      this.names = [];
      this.messages = [];
      this.message = '';
      this.loggedIn = false;
      this.chatData = chatData;
      this.chatData.socket.on('user named', ({ id, name }) => this.addUser(id, name));
      this.chatData.socket.on('chat message', ({ id, msg }) => this.addMessage(id, msg));
    }

    sendMessage() {
      this.chatData.socket.emit('chat message', { msg: this.message, id: this.chatData.socket.id });
      this.message = '';
    }

    addUser(id, name) {
      this.names.push({ id, name });
    }

    addMessage(id, msg) {
      const name = this.getUserName(id);
      this.messages.push({ id, msg, name });
    }

    getUserName(id) {
      var filtered = _.find(this.names, function (o) { return o.id === id; });
      return filtered.name.name;
    }

    nameUser() {
      this.chatData.socket.emit('user named', { name: this.name, id: this.chatData.socket.id });
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
      controller: ['chatData', chatData => new LoginController(chatData)],
      templateUrl: 'login/login.component.html',
      controllerAs: 'login'
    });

}());
