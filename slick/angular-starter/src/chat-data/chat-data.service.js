(function () {

  class ChatDataService {
    constructor($scope) {
      this.$scope = $scope;
      this.names = [];
      this.messages = [];
      //this.socket = io.connect('http://localhost:5000/');
      this.socket = io.connect('http://nsmc.curtissimo.com:9000/');
      this.socket.on('user named', ({ id, name }) => this.addUser(id, name));
      this.socket.on('chat message', ({ id, msg }) => this.addMessage(id, msg));
    }

    sendMessage(message) {
      this.socket.emit('chat message', message + ' (beta)');
    }

    addUser(id, name) {
      this.names.push({ id, name });
    }

    addMessage(id, msg) {
      const name = this.getUserName(id);
      this.messages.push({ id, msg, name });
      this.$scope.$apply();
    }

    getUserName(id) {
      var filtered = _.find(this.names, function (o) { return o.id === id; });
      if (filtered) {
        return filtered.name;
      } else {
        return id;
      }
    }

    nameUser(name) {
      this.socket.emit('user named', name);
      this.loggedIn = true;
    }

  }

  angular
    .module('app')
    .factory('chatData', ['$rootScope', ($scope) => new ChatDataService($scope)]);

}());
