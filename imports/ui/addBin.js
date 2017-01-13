import { Template } from 'meteor/templating';

import { Bins } from '../api/bins.js';

import './addBin.html';

Template.addBin.events({
  'click button.add-bin'(){
    const dialog = document.querySelector('dialog');
    dialog.showModal();
  },

  'click button.close'(){
    const dialog = document.querySelector('dialog');
    dialog.close();
  },


  'submit .new-bin'(event) {
    event.preventDefault();

    const dialog = document.querySelector('dialog');
    const target = event.target;
    const binName = target.binName.value;


    Bins.insert({
      binName,
      createdAt: new Date(),
    });

    //clear
    target.binName.value = '';
    dialog.close();
  },
});
