import { Template } from 'meteor/templating';

import { Wastes } from '../api/collections.js';

import './addWaste.html';

Template.addWaste.events({
  'click button.show-dialog-waste'(){
    console.log('click waste');
    const dialog = document.querySelector('dialog');
    dialog.showModal();
  },

  'click button.close'(){
    const dialog = document.querySelector('dialog');
    dialog.close();
  },

  'submit .new-waste'(event) {
    event.preventDefault();

    const dialog = document.querySelector('dialog');
    const target = event.target;
    const binName = target.wasteName.value;


    Wastes.insert({
      wasteName,
      createdAt: new Date(),
    });

    //clear
    target.wasteName.value = '';
    dialog.close();
  },
});
