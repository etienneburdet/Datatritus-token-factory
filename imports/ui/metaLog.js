import { UserInfo } from '../api/collections.js';
import { Wastes } from '../api/collections.js';

import './metaLog.html';


Template.metaLog.helpers({
  metaMaskAddress () {
    return Session.get('currentAddress');
  },


  isLinked () {
    const currentAddress = Session.get('currentAddress');
    const linkedAccount = UserInfo.findOne({ accountAddress: currentAddress });

    return (!!linkedAccount);
  },


  userName () {
    const currentAddress = Session.get("currentAddress");
    return UserInfo.findOne({accountAddress: currentAddress}).userName;
  },

});


Template.metaLog.events({
  'submit .link-account' (event,template) {
    event.preventDefault();
    const currentAddress = Session.get("currentAddress");
    const userName = event.target.userName.value;

    UserInfo.insert({
      accountAddress: currentAddress,
      userName: userName,
    });
  },

  'click .go-login' (event) {
    event.preventDefault();
    Session.set('isLogged',true);
    Router.go('/');
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
    return (!!hasAccount);
  },

  'click .refresh-address' (event,template) {
    const currentAddress = web3.eth.accounts[0];
    Session.set("currentAddress",currentAddress);
  },

});
