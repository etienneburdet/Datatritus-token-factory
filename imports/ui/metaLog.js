import { Ethereum } from '../api/collections.js';
import { Wastes } from '../api/collections.js';

import './metaLog.html';

Template.metaLog.helpers({
  metaMaskAddress () {
    return web3.eth.accounts[0];
  },

  ethereumAccount () {
    return Ethereum.findOne({ owner: Meteor.userId() }).accountAddress;
  },

  isLinked () {
    const linkedAccount = Ethereum.findOne({ owner: Meteor.userId() });

    if (!linkedAccount) {
      return false;
    } else {
      return true;
    }
  }
});


Template.metaLog.events({
  'click .link-account' () {
    const currentAddress = web3.eth.accounts[0];
    const currentUser = Meteor.userId();

    Ethereum.insert({
      accountAddress: currentAddress,
      userName: currentUser,
      owner: Meteor.userId(),
    });
  },

  'click .update-account-link' (event) {
    event.preventDefault()
    const currentAddress = web3.eth.accounts[0];
    const doc = Ethereum.findOne({owner: Meteor.userId()});

    Ethereum.update(doc._id, {
        $set: {accountAddress: currentAddress},
      },
    );
  },
});
