import { UserInfo } from '../api/collections.js';
import { Wastes } from '../api/collections.js';

import './metaLog.html';

Template.metaLog.onCreated(function(){
  this.currentAddress = new ReactiveVar(web3.eth.accounts[0]);
  this.isLogged = new ReactiveVar(false);
});

Template.metaLog.helpers({
  metaMaskAddress () {
    return Template.instance().currentAddress.get();
  },


  isLinked () {
    const currentAddress = Template.instance().currentAddress.get();
    const linkedAccount = UserInfo.findOne({ accountAddress: currentAddress });

    if (!linkedAccount) {
      return false;
    } else {
      return true;
    }
  },


  userName () {
    const currentAddress = Template.instance().currentAddress.get();
    return UserInfo.findOne({accountAddress: currentAddress}).userName;
  },

});


Template.metaLog.events({
  'submit .link-account' (event,template) {
    event.preventDefault()
    const currentAddress = template.currentAddress.get();
    const userName = event.target.userName.value;

    UserInfo.insert({
      accountAddress: currentAddress,
      userName: userName,
    });
  },

  'submit .fakeLog' (event,template) {
    const currentAddress = template.currentAddress.get();

    UserInfo.insert({
      accountAddress: currentAddress,
      userName: userName,
    });
  },

  'submit .change-name' (event,template) {
    event.preventDefault()
    const currentAddress = web3.eth.accounts[0];

    UserInfo.update(doc._id, {
        $set: {accountAddress: currentAddress},
      },
    );
  },

  'click .has-account' () {
    const currentAddress = web3.eth.accounts[0];
    const hasAccount = UserInfo.findOne({ accountAddress: currentAddress });
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
