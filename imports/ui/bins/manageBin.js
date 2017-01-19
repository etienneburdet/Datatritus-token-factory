import { Template } from 'meteor/templating';

import { Bins } from '../../api/collections.js';
import { Wastes } from '../../api/collections.js';

import './manageBin.html';


Template.manageBin.helpers({
  wastes() {
    return Wastes.find({});
  },
})

Template.manageBin.events({
  'click button.delete-bin' () {
    Bins.remove(this._id);
    Router.go('/');
  },

  'submit .update-bin' () {
    event.preventDefault();

    const target = event.target;
    const weight = target.binWeight.value;
    const wasteType = target.selectWasteType.value;

    Bins.update(this._id, {
      $set: {binWeight: weight},
      $set: {wasteType: wasteType},
    });
  },

});
