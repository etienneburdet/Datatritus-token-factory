import { Template } from 'meteor/templating';

import { Wastes } from '../../api/collections.js';

import './addWaste.html';

Template.addWaste.events({
  'click button.add-waste'(){
    const dialog = document.querySelector('dialog.addWasteDialog');
    dialog.showModal();
  },

  'click button.close'(){
    const dialog = document.querySelector('dialog.addWasteDialog');
    dialog.close();
  },


  'submit .new-waste'(event) {
    event.preventDefault();

    const dialog = document.querySelector('dialog.addWasteDialog');
    const target = event.target;
    const wasteName = target.wasteName.value;

    Wastes.insert({
      wasteName,
      createdAt: new Date(),
    });


    //clear
    target.wasteName.value = '';
    dialog.close();
  },
});
