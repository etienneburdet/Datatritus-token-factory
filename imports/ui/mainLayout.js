import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import { Bins } from '../api/collections.js';
import { Wastes } from '../api/collections.js';
import { Days } from '../api/collections.js';

import './day.html';
import './home.js';
import './bins/addBin.js';
import './bins/manageBin.js';
import './wastes/addWaste.js';
import './wastes/manageWaste.js';
import './mainLayout.html';
import './menuHead.js';

Template.mainLayout.onCreated(function(){
  const currentAddress = web3.eth.accounts[0];
  Session.set('currentAddress', currentAddress);
});

Template.mainLayout.helpers({
  bins() {
    return Bins.find({owner: Session.get('currentAddress')});
  },

  wastes() {
    return Wastes.find({owner: Session.get('currentAddress')});
  },

  isLogged() {
    return Session.get('isLogged');
  }
});

Template.mainLayout.events({
  'click button.show-dialog'(){
    const dialog = document.querySelector('dialog');
    dialog.showModal();
  },

  'click .is-logged'(){
    console.log(Session.get('isLogged'));
  },
});


Router.route('/manageBin/:_id', function () {
  this.render('manageBin', {
    data: function () {
      return Bins.findOne({_id: this.params._id});
    }
  });
});

Router.route('/manageWaste/:_id', function () {
  this.render('manageWaste', {
    data: function () {
      return Wastes.findOne({_id: this.params._id});
    }
  });
});

Router.route('/login', function () {
  this.render('metaLog');
});


Router.route('/', {
onBeforeAction: function () {
  if (!isLogged) {
    this.redirect('/login');
  } else {
    this.next();
  }
},

function () {
    this.render('home');
  }
});
