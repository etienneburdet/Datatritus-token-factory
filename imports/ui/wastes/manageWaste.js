import { Template } from 'meteor/templating';

import { Wastes } from '../../api/collections.js';

import './manageWaste.html';


Template.manageWaste.events({
  'click button.delete-waste' () {
    Wastes.remove(this._id);
    Router.go('/');
  },

  'submit .change-name' (event) {
    event.preventDefault();

    const target = event.target
    const newName = target.newName.value;

    if(newName.length!=0){
      Wastes.update(this._id, {
        $set: {wasteName: newName},
      });
    }

    target.newName.value = 'Nouveau nom';
    if(newName.length!=0){
      const newRoute = '/manageWaste/'+newName;
      Router.go(newRoute);
    }
  }
});
