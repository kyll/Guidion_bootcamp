/**
 * Created by kyllian on 7/4/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './ticketsList.html';

class TicketsList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.helpers({
      tickets() {
        return Tickets.find({});
      }
    });
  }

  addTicket() {
    Tickets.insert(this.newTicket);
    this.newTicket = {};
  }

  removeTicket(ticketId) {
    Tickets.remove(ticketId);
    Meteor.call('unMatch');
  }
}

const name = 'ticketsList';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: TicketsList
});