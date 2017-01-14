import { Template } from 'meteor/templating';

import { Bins } from '../../api/bins.js';

import './manageBin.html';


Template.manageBin.events({
  'click button.delete-bin'(){
    Bins.remove(this._id);
    Router.go('/');
  }
});
