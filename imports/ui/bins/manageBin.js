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


  'submit .update-bin'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const weight = target.setWeight.value;
    const wasteType = target.selectWasteType.value;

    // Insert a task into the collection
    Bins.update(this._id, {
      $set: {
        binWeight: weight,
        wasteType: wasteType
      },
    });

    // Clear form
    target.setWeight.value = '';
  },

});
