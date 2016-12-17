import { Template } from 'meteor/templating';

import { Bins } from '../api/bins.js';
import { Days } from '../api/bins.js';

import './day.html';
import './addBin.html';
import './body.html';

Template.body.helpers({
  days() {
    return Days.find({});
  },

  bins() {
    return Bins.find({});
  },
});

Template.day.helpers({
  bins() {
    return Bins.find({});
  },
});

Template.body.events({
  'submit .new-bin'(event) {
    event.preventDefault();

    const target = event.target;
    const binName = target.binName.value;

    Bins.insert({
      binName,
      createdAt: new Date(),
    });

    //clear
    target.text.value = '';
  },
});
