import { Template } from 'meteor/templating';

import { Wastes } from '../../api/collections.js';

import './addWaste.html';
import '../../interfacesTemp/contracts.js';

const newToken = web3.eth.contract(newAbi);


Template.addWaste.onCreated(function(){
  this.isLoading = new ReactiveVar(false);
});

Template.addWaste.helpers({
  isLoading () {
    return Template.instance().isLoading.get();
  },
})

Template.addWaste.events({
  'click button.add-waste'(){
    const dialog = document.querySelector('dialog.addWasteDialog');
    dialog.showModal();
  },

  'click button.close'(){
    const dialog = document.querySelector('dialog.addWasteDialog');
    dialog.close();
  },


  'submit .new-waste'(event, template) {
    event.preventDefault();
    template.isLoading.set(true);


    const dialog = document.querySelector('dialog.addWasteDialog');
    const target = event.target;
    const wasteName = target.wasteName.value;

    let mySenderAddress = web3.eth.accounts[0];
    let gasEstimate = web3.eth.estimateGas({data: newData},function(err,res){
      return res;
    });

    const newTokenReturned = newToken.new(0, wasteName, 0, 'kg', {
     from:mySenderAddress,
     data:newData,
     gas:gasEstimate},
     function(err, newToken){
      if(err) {
        template.isLoading.set(false);
        dialog.close();
      }

      if(!err) {
         // NOTE: The callback will fire twice!
         // Once the contract has the transactionHash property set and once its deployed on an address.

         // e.g. check tx hash on the first call (transaction send)
         if(!newToken.address) {
             console.log(newToken.transactionHash); // The hash of the transaction, which deploys the contract

         // check address on the second call (contract deployed)
         } else {
             console.log(newToken.address);
              // the contract address

              //insert into DB
              Wastes.insert({
                wasteName,
                createdAt: new Date(),
                owner: Meteor.userId(),
                ownerAdress: mySenderAddress,
                tokenAdress: newToken.address,
                username: Meteor.user().username,
              });

              //clear
              template.isLoading.set(false);
              dialog.close();
         }

         // Note that the returned "myContractReturned" === "myContract",
         // so the returned "myContractReturned" object will also get the address set.
      }
    });




  },
});
