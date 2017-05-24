(function () {
  angular
    .module('app')
    .config(function ($stateProvider) {

      const login = {
        url: '/login',
        name: 'login',
        component: 'login'
//        resolve: {
//          ip: ['jsonData', jsonData => jsonData.getIp()],
//          now: ['jsonData', jsonData => jsonData.getNow()],
//        },
//        views: {
//          left: 'home',
//          '': 'home2'
//        }
      };

      $stateProvider.state(login);

    });
}());
