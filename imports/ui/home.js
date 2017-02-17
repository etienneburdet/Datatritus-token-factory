import { Template } from 'meteor/templating';

import { Bins } from '../api/collections.js';
import { Days } from '../api/collections.js';

import './day.html';
import './home.html';
import './ethTemp.js';
import './showHide.js';

Template.home.helpers({

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
