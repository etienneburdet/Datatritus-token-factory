import { Template } from 'meteor/templating';

import { Bins } from '../api/collections.js';
import { Days } from '../api/collections.js';
import { UserInfo } from '../api/collections.js';

import './day.html';
import './home.html';
import './ethTemp.js';
import './metaLog.js'

Template.metaLog.onCreated(function(){
  Session.set('currentAddress', web3.eth.accounts[0]);
});

Template.home.helpers({

  days: [
    { jour: moment().subtract(1,'days').format('dddd')},
    { jour: moment().subtract(2,'days').format('dddd')},
    { jour: moment().subtract(3,'days').format('dddd')},
    { jour: moment().subtract(4,'days').format('dddd')},
    { jour: moment().subtract(5,'days').format('dddd')},
    { jour: moment().subtract(6,'days').format('dddd')},
  ],


  bins() {
    return Bins.find({username: Meteor.user().username});
  },


  isLinked () {
    const currentAddress = Session.get('currentAddress');
    const linkedAccount = UserInfo.findOne({ accountAddress: currentAddress });

    return !linkedAccount;
  },

  isLinked () {
    const currentAddress = Session.get('currentAddress');
    const linkedAccount = UserInfo.findOne({ accountAddress: currentAddress });

    if (!linkedAccount) {
      return false;
    } else {
      return true;
    }
  },

});

Template.home.events({
  'click .is-linked ' () {
    const currentAddress = web3.eth.accounts[0];
    const linkedAccount = UserInfo.findOne({ accountAddress: currentAddress });

    console.log(!linkedAccount);
  }
});

Template.day.helpers({
  bins() {
    return Bins.find({username: Meteor.user().username});
  },
});

Template.today.helpers({
  bins() {
    return Bins.find({username: Meteor.user().username});
  },
});
