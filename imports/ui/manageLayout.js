import { Template } from 'meteor/templating';

import { Bins } from '../api/collections.js';
import { Wastes } from '../api/collections.js';
import { Days } from '../api/collections.js';

import './day.html';
import './home.js';
import './bins/addBin.js';
import './bins/manageBin.js';
import './wastes/addWaste.js';
import './wastes/manageWaste.js';
import './manageLayout.html';


Template.manageLayout.helpers({
  bins() {
    return Bins.find({});
  },

  wastes() {
    return Wastes.find({});
  },
});

Template.manageLayout.events({
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

Router.route('/manageWaste/:wasteName', function () {
  this.render('manageWaste', {
    data: function () {
      return Wastes.findOne({wasteName: this.params.wasteName});
    }
  });
});

Router.route('/', function () {
  this.render('home');
});
