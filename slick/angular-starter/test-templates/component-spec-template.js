/**
 * HOW TO USE THIS FILE:
 *   COPY THIS FILE TO THE DIRECTORY IN WHICH THE CODE YOU WANT TO TEST EXISTS.
 *   THEN, COPY THE TESTS TEMPLATES AT THE BOTTOM OF THE FILE FOR WHAT YOU WANT
 *   TO TEST IN YOUR APPLICATION.
 * 
 * Documentation for jasmine matchers can be found at:
 *   https://jasmine.github.io/1.3/introduction.html
 */

describe("component: «component-name»", function() {
  var $componentController;

  beforeEach(module('app'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  /**
   * Templated test for checking if a controller binds
   * to a string or one-way binding correctly.
   */
  // it ('should have a binding', function() {
  //   // Here we are passing actual bindings to the component
  //   var bindings = {
  //     «binding»: {
  //       «key»: «value»
  //     }
  //   };
  //   var ctrl = $componentController('«component-name»', null, bindings);

  //   expect(ctrl.«binding»).toBeDefined();
  //   expect(ctrl.«binding».«key»).toBe(«value»);
  // });

  /**
   * Templated test for checking if a controller binds
   * to an output correctly.
   */
  // it ('should call the output binding, when an action occurs', function() {
  //   var onEventSpy = jasmine.createSpy('«output-name»');
  //   var bindings = {
  //     «binding»: {
  //       «key»: «value»
  //     },
  //     «output-name»: onEventSpy
  //   };
  //   var ctrl = $componentController('«component-name»', null, bindings);

  //   ctrl.«action-that-invokes-an-event»();
  //   expect(onEventSpy).toHaveBeenCalled();
  //   expect(onEventSpy).toHaveBeenCalledWith(«whatever value»);
  // });
});
