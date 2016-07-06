/**
 * Created by kyllian on 7/4/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './expertsList.html';

class ExpertsList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.helpers({
      experts() {
        return Experts.find({});
      }
    });
  }

  addExpert() {
    Experts.insert(this.newExpert);
    this.newExpert = {};
  }

  removeExpert(expertId) {
    Experts.remove(expertId);
    Meteor.call('unMatch');
  }
}

const name = 'expertsList';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: ExpertsList
});