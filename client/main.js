import '../imports/ui/mainLayout.js';
import '../imports/api/collections.js';

Template.body.onCreated(function() {
  Session.set('currentAddress', web3.eth.accounts[0]);
  Session.set('isLogged',false);
});

Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.onBeforeAction( function() {
  if (!Session.get('isLogged')) {
    this.render('metaLog');
  } else {
    this.next();
  }
});
