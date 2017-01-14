import { Template } from 'meteor/templating';

import { Wastes } from '../../api/collections.js';

import './manageWaste.html';


Template.manageWaste.events({
  'click button.delete-waste'(){
    Wastes.remove(this._id);
    Router.go('/');
  }
});
