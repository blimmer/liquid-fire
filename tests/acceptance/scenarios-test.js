/* global ranTransition */
import Ember from 'ember';
import startApp from '../helpers/start-app';
import { injectTransitionSpies } from '../helpers/integration';

var App;

module('Acceptance: Scenarios', {
  setup: function() {
    App = startApp();
    injectTransitionSpies(App);
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('nested liquid-outlets wait for their ancestors to animate', function() {
  visit('/scenarios/nested-outlets/middle/inner');
  andThen(function(){
    visit('/scenarios/nested-outlets/middle2');
    Ember.run.later(function(){
      equal(find('#inner-index').length, 1, "inner view exists during animation");
    }, 30);
  });
});

test('inner nested liquid-outlets can animate', function() {
  visit('/scenarios/nested-outlets/middle/inner');
  visit('/scenarios/nested-outlets/middle');
  andThen(function(){
    ranTransition('fade');
  });
});

test('liquid-outlet animate by outlet name', function() {
  visit('/scenarios/in-test-outlet');
  andThen(function(){
    ranTransition('toLeft');
  });
});


test('model-dependent transitions are matching correctly', function() {
  visit('/scenarios/model-dependent-rule/1');
  andThen(() => click('a:contains(Next)'));
  andThen(() => {
    ranTransition('toLeft');
    click('a:contains(Previous)');
  });
  andThen(() => {
    ranTransition('toRight');
  });
});
