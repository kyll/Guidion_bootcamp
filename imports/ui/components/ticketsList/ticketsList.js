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

  removeExpert(expertId) {
    var match = Matches.findOne({expert_id: expertId});
    if (match) {
      Tickets.update(match.ticket_id, {$unset: {color: ''}});
      Matches.remove(match._id);
    }
    Experts.remove(expertId);
  }

  removeTicket(ticketId) {
    var match = Matches.findOne({ticket_id: ticketId});
    if (match) {
      Experts.update(match.expert_id, {$unset: {color: ''}});
      Matches.remove(match._id);
    }
    Tickets.remove(ticketId);
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