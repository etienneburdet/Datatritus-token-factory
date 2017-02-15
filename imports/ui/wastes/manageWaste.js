import { Template } from 'meteor/templating';

import { Wastes } from '../../api/collections.js';

import './manageWaste.html';


Template.manageWaste.helpers({
  tokenURL () {
    //const tokenAddr = '0xD50460AA1c82b29f4c19B16ACB6e8C46bA05425c';
    const tokenAddr = this.tokenAdress;
    return "https://tokenfactory.surge.sh/#/token/"+tokenAddr;
  },
});




Template.manageWaste.events({
  'click button.delete-waste' () {
    Wastes.remove(this._id);
    Router.go('/');
  },

  'submit .change-name' (event) {
    event.preventDefault();

    const target = event.target
    const newName = target.newName.value;

    if(newName.length!=0){
      Wastes.update(this._id, {
        $set: {wasteName: newName},
      });
    }

    target.newName.value = 'Nouveau nom';
  },
});
