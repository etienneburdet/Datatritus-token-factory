import { Template } from 'meteor/templating';

import { Bins } from '../api/collections.js';
import { Days } from '../api/collections.js';

import './day.js';

Template.home.helpers({

  days: [
    { jour: moment().format('dddd')},
    { jour: moment().subtract(1,'days').format('dddd')},
    { jour: moment().subtract(2,'days').format('dddd')},
    { jour: moment().subtract(3,'days').format('dddd')},
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
