(function () {

  class ChatDataService {
    constructor() {
      this.socket = io.connect('http://localhost:5000/');
      //this.chatName = '';
     // this.socket.on('user joined', id => console.log('joined', id));
      //this.socket.on('user named', ({id, name}) => this.addUser(id, name));
    }

  }

  angular
    .module('app')
    .factory('chatData', () => new ChatDataService());

}());
