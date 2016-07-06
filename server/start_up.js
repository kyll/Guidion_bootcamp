import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  // set up db with initial tickets and experts
  if (Tickets.find().count() === 0) {
    const tickets = [
      {
        title: "Ticket 1",
        region: "Amsterdam"
      },
      {
        title: "Ticket 2",
        region: "Amsterdam"
      },
      {
        title: "Ticket 3",
        region: "Rotterdam"
      },
      {
        title: "Ticket 4",
        region: "Den Hag"
      }
    ];

    tickets.forEach((ticket) => {
      Tickets.insert(ticket)
    })
  }

  if (Experts.find().count() === 0) {
    const experts = [
      {
        name: "Expert 1",
        operating_region: "Amsterdam",
        color: "white"
      },
      {
        name: "Expert 2",
        operating_region: "Berlin"
      },
      {
        name: "Expert 3",
        operating_region: "Amsterdam"
      },
      {
        name: "Expert 4",
        operating_region: "Den Hag"
      }
    ];

    experts.forEach((expert) => {
      Experts.insert(expert)
    })
  }

  return Meteor.methods({
    unMatch: function() {
      // remove color field to show the entry is not matched
      Experts.update({}, {$unset: {color: ''}}, {multi: true});
      Tickets.update({}, {$unset: {color: ''}}, {multi: true});
      return Matches.remove({}) ;
    }

  });
});
