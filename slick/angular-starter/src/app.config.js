(function () {
  angular
    .module('app')
    .config(function ($stateProvider) {

      const home = {
        url: '/home',
        name: 'home',
        component: 'home'
      };

      const notHome = {
        url: '/not-home',
        name: 'notHome',
        template: '<h1 style="color: red">Not home</h1>'
      };

      $stateProvider.state(home);
      $stateProvider.state(notHome);
    });
}());
