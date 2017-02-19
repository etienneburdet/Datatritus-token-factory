import { Ethereum } from '../api/collections.js';

import './metaLog.html';

Template.metaLog.onCreated(function(){
  this.metaMaskAccount = new ReactiveVar('0x0');
});


Template.metaLog.helpers({
  metaMaskAddress () {
    return web3.eth.accounts[0];
  },

  accountAddress () {
    return Ethereum.findOne({username: Meteor.user().username}, {fields: {accountAddress: 1}});
  },
});


Template.metaLog.events({
  'click .link-account' () {
    const currentAccount = web3.eth.accounts[0];
    console.log(currentAccount);

    Ethereum.insert({
      accountAddress: web3.eth.accounts[0],
      username: Meteor.user().username,
    });

  }
});
