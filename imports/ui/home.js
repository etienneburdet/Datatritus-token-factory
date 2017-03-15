import { Template } from 'meteor/templating';

import { Bins } from '../api/collections.js';
import { Days } from '../api/collections.js';
import { UserInfo } from '../api/collections.js';

import './day.html';
import './home.html';
import './ethTemp.js';
import './metaLog.js'

Template.metaLog.onCreated(function(){
  const currentAddress = web3.eth.accounts[0];
  Session.set('currentAddress', currentAddress);
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
    return Bins.find({owner: Session.get('currentAddress')});
  },

});


Template.day.helpers({
  bins() {
    return Bins.find({username: Session.get('currentAddress')});
  },
});


Template.today.helpers({
  bins() {
    return Bins.find({username: Meteor.user().username});
  },
});
