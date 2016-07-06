/**
 * Created by kyllian on 7/4/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './matching.html';

class Matching {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.helpers({
      matches() {
        return Matches.find({});
      }
    });
  }

  randomColors(nColors) {
    const dHue = 360/nColors;
    const saturation = '60%';
    const lightness = '75%';

    // create n colors spread over the hue range, return shuffled
    var colors = Array.apply(null, Array(nColors)).map(function (_, hue) {
      return 'hsl(' + hue*dHue + ',' + saturation + ',' + lightness + ')';
    });
    return this.shuffle(colors);
  }

  // Fisher-Yates Shuffle
  shuffle(array) {
    var i, j = 0;
    var temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  updateMatches() {
    Meteor.call('unMatch', (err, res) => {
      if(err){
        console.log(err);
      }else{
        this.match()
      }
    });
  }
  match() {
    var colors = this.randomColors(Tickets.find({}).count());

    Tickets.find({}).forEach((ticket) => {
      // find available expert, experts without color are still unmatched
      var expert = Experts.findOne({operating_region: ticket.region, color: {$exists: false}});
      if (expert) {
        var color = colors.pop();
        // set color for ticket and expert to imply match and insert title and name in match collection
        Experts.update(expert._id, {$set: {color: color}});
        Tickets.update(ticket._id, {$set: {color: color}});
        Matches.insert({expert: expert.name, ticket: ticket.title, timestamp: new Date()})
      }
    });
  }

  unMatch() {
    Meteor.call('unMatch');
  }

  isMatched() {
    return Matches.find({}).count();
  }
}

const name = 'matching';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: Matching
});