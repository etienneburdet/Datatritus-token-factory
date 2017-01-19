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
    { jour: 'Lundi 16 Janvier'},
    { jour: 'Mardi 17 Janvier'},
    { jour: 'Mercredi 18 Janvier'},
    { jour: 'Jeudi 19 Janvier'},
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
