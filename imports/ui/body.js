import { Template } from 'meteor/templating';

import { Bins } from '../api/bins.js';
import { Days } from '../api/bins.js';

import './day.html';
import './addBin.js';
import './body.html';

Template.body.helpers({
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

Template.body.events({
  'click button.show-dialog'(){
    const dialog = document.querySelector('dialog');
    dialog.showModal();
  },
});

Template.day.helpers({
  bins() {
    return Bins.find({});
  },
});
