import { Template } from 'meteor/templating';

import './addBin.html';

Template.addBin.events({
  'click button.show-dialog'(){
        console.log("clic");
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }

    dialog.showModal();
  },
});
