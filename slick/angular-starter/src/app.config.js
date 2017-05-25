(function () {
  angular
    .module('app')
    .filter('reverse', function () {
      return function (items) {
        return items.slice().reverse();
      };
    })
    .config(function ($stateProvider, $urlRouterProvider) {

    const login = {
      url: '/main',
      name: 'main',
      //    resolve: {
      //      chatName: ['chatData', chatData => chatData.chatName],
      //   },
      views: {
        top: 'login'
      }
    };

    $stateProvider.state(login);
    $urlRouterProvider.otherwise('/main');

  });
}());
