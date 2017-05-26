describe("component: login.component", function() {

  var $componentController;

  beforeEach(module('app'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  it ('should have no names if data service has none', function() {
    var dataService = { names: [] };
    var ctrl = $componentController('login', [dataService], {});
  })

})
