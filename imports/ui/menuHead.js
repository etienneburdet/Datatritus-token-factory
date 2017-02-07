import { Template } from 'meteor/templating';

import './menuHead.html';

Template.menuHead.helpers({
  accountAddr () {
    return web3.eth.accounts;
  },
    /*const template = Template.instance();

    web3.eth..name(function(err,res){
      TemplateVar.set(template, "name", res);
    })
  },
  */
});
