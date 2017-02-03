import { Template } from 'meteor/templating';

import { Bins } from '../api/collections.js';
import { Days } from '../api/collections.js';

import './day.html';
import './home.html';
import './ethAcc.html';

Template.home.helpers({

  counter () {
    web3.eth.getBalance("0xD50460AA1c82b29f4c19B16ACB6e8C46bA05425c",
    function (err, res){
      alert(res);
    })
  },

  days: [
    { jour: moment().subtract(1,'days').format('dddd')},
    { jour: moment().subtract(2,'days').format('dddd')},
    { jour: moment().subtract(3,'days').format('dddd')},
    { jour: moment().subtract(4,'days').format('dddd')},
    { jour: moment().subtract(5,'days').format('dddd')},
    { jour: moment().subtract(6,'days').format('dddd')},
  ],

  bins() {
    return Bins.find({username: Meteor.user().username});
  },
});

Template.day.helpers({
  bins() {
    return Bins.find({username: Meteor.user().username});
  },
});

Template.today.helpers({
  bins() {
    return Bins.find({username: Meteor.user().username});
  },
});
