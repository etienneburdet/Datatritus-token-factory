import { Template } from 'meteor/templating';

import { Bins } from '../api/bins.js';

import './manageBin.html';

Template.manageBin.rendered = function() {
  this.binName = this.data && this.data.binName;
};

Template.manageBin.events({
  'click button.delete-bin'(){
    Bins.remove(template.binName);
    Router.go('/');
  }
});
