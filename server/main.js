import { Meteor } from 'meteor/meteor';

import '../imports/api/collections.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'compileContract'() {
    const solc = require('solc');

    let source = Assets.getText('contracts/token/BigSimpleToken.sol');
    var compiled = solc.compile(source, 1);
    console.log(compiled);
    return compiled;
  }
});
