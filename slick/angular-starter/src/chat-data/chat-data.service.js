(function () {

  class ChatDataService {
    constructor() {
      this.socket = io.connect('http://localhost:5000/');
      this.names = [];
     // this.socket.on('user joined', id => console.log('joined', id));
      this.socket.on('user named', ({id, name}) => this.addUser(id, name));
    }

    nameUser(name) {
      this.socket.emit('user named', name);
    }

    addUser(id, name) {
      this.names.push({id, name});
      console.log('NAMES:', this.names);
    }

  }

  angular
    .module('app')
    .factory('chatData', () => new ChatDataService());

}());
