import { Template } from 'meteor/templating';

import { Bins } from '../../api/collections.js';

import './addBin.html';

Template.addBin.events({
  'click button.add-bin'(){
    const dialog = document.querySelector('dialog.addBinDialog');
    dialog.showModal();
  },

  'click button.close'(){
    const dialog = document.querySelector('dialog.addBinDialog');
    dialog.close();
  },


  'submit .new-bin'(event) {
    event.preventDefault();

    const dialog = document.querySelector('dialog.addBinDialog');
    const target = event.target;
    const binName = target.binName.value;


    Bins.insert({
      binName,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });


    //clear
    target.binName.value = '';
    dialog.close();
  },
});
