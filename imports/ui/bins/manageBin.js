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
    const newName = target.newName.value;

    // Insert a task into the collection
    Bins.update(this._id, {
      $set: {
        binWeight: weight,
        wasteType: wasteType
      },
    });

    if(newName.length!=0){
      Bins.update(this._id, {
        $set: {binName: newName},
      });
    }

    // Clear form
    target.setWeight.value = '…kg';
    target.newName.value = 'Nouveau nom';

    if(newName.length!=0){
      const newRoute = '/manageBin/'+newName;
      Router.go(newRoute);
    }
  },

});
