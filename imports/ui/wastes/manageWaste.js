import { Template } from 'meteor/templating';

import { Wastes } from '../../api/collections.js';

import './manageWaste.html';

Template.manageWaste.helpers ({
  currentWaste () {
    return Wastes.find({_id: this._id})
  },

});

Template.manageWaste.events({
  'click button.delete-waste' () {
    Wastes.remove(this._id);
    Router.go('/');
  },

  'submit .change-name' (event) {
    event.preventDefault();

    const target = event.target
    const newName = target.newName.value;

    Wastes.update(this._id, {
      $set: {wasteName: newName},
    });

    target.newName.value = '';
    Router.go('/manageWaste/:newName')

  }
});
