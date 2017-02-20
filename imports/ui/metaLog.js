import { Ethereum } from '../api/collections.js';

import './metaLog.html';

Template.metaLog.onCreated(function(){
  this.metaMaskAccount = new ReactiveVar('0x0');
});


Template.metaLog.helpers({
  metaMaskAddress () {
    return web3.eth.accounts[0];
  },

  ethereumAccount () {
    return Ethereum.findOne({ owner: Meteor.userId() }).accountAddress;
  },
});


Template.metaLog.events({
  'click .link-account' () {
    const accountAddress = web3.eth.accounts[0];
    const currentUser = Meteor.userId();
    console.log(accountAddress);
    console.log(currentUser);

    Ethereum.insert({
      accountAddress,
      userName: currentUser,
      owner: Meteor.userId(),
    });
  },

  'click .test-account' () {
    const findAccount = Ethereum.findOne( { owner: Meteor.userId()}).accountAddress;
    console.log(findAccount);
  }
});
