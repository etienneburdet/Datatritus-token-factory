import { Template } from 'meteor/templating';

import { Bins } from '../api/bins.js';
import { Days } from '../api/bins.js';

import './day.html';
import './home.js';
import './bins/addBin.js';
import './bins/manageBin.js';
import './mainLayout.html';


Template.mainLayout.helpers({
  bins() {
    return Bins.find({});
  },
});

Template.mainLayout.events({
  'click button.show-dialog'(){
    const dialog = document.querySelector('dialog');
    dialog.showModal();
  },
});


Router.route('/manageBin/:binName', function () {
  this.render('manageBin', {
    data: function () {
      return Bins.findOne({binName: this.params.binName});
    }
  });
});

Router.route('/', function () {
  this.render('home');
});
