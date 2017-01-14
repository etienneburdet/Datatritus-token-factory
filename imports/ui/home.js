import { Template } from 'meteor/templating';

import { Bins } from '../api/collections.js';
import { Days } from '../api/collections.js';

import './day.html';
import './home.html';

Template.home.helpers({
  // days() {
  //   return Days.find({});
  // },
  days: [
    { jour: 'Mardi 21 Décembre'},
    { jour: 'Mercredi 22 Décembre'},
  ],

  bins() {
    return Bins.find({});
  },
});

Template.day.helpers({
  bins() {
    return Bins.find({});
  },
});
