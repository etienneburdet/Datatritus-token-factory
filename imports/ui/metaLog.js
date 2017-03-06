import { Ethereum } from '../api/collections.js';
import { Wastes } from '../api/collections.js';

import './metaLog.html';

Template.metaLog.onCreated(function(){
  this.currentAddress = new ReactiveVar(web3.eth.accounts[0]);
});

Template.metaLog.helpers({
  metaMaskAddress () {
    return Template.instance().currentAddress.get();
  },

  ethereumAccount () {
    return Ethereum.findOne({ owner: Meteor.userId() }).accountAddress;
  },

  isLinked () {
    const currentAddress = Template.instance().currentAddress.get();
    const linkedAccount = Ethereum.findOne({ accountAddress: currentAddress });

    if (!linkedAccount) {
      return false;
    } else {
      return true;
    }
  },

});


Template.metaLog.events({
  'click .link-account' (event,template) {
    event.preventDefault()
    const currentAddress = template.currentAddress.get();
    const currentUser = Meteor.userId();

    Ethereum.insert({
      accountAddress: currentAddress,
      userName: currentUser,
      owner: Meteor.userId(),
    });
  },

  'click .update-account-link' (event,template) {
    event.preventDefault()
    const currentAddress = web3.eth.accounts[0];
    const doc = Ethereum.findOne({owner: Meteor.userId()});

    Ethereum.update(doc._id, {
        $set: {accountAddress: currentAddress},
      },
    );
  },

  'click .has-account' () {
    const currentAddress = web3.eth.accounts[0];
    const hasAccount = Ethereum.findOne({ accountAddress: currentAddress });
    if (!hasAccount) {
      console.log(false);
    } else {
      console.log(true);
    }
  },

  'click .refresh-address' (event,template) {
    const currentAddress = web3.eth.accounts[0];
    template.currentAddress.set(currentAddress);
  },

});
