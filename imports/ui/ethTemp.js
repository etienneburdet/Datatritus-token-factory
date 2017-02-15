import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './ethTemp.html';
import '../interfacesTemp/contracts.js';

//from global vars, for testing only
const myContract = web3.eth.contract(AbiArray).at(contractAddress);
const newToken = web3.eth.contract(newAbi);

Template.ethTemp.onCreated(function(){
  this.tokAddr = new ReactiveVar('0x0');
});

Template.ethTemp.helpers({
  name () {
    const template = Template.instance();

    myContract.name(function(err,res){
      TemplateVar.set(template, "name", res);
    })
  },

  balance () {
    const template = Template.instance();

    web3.eth.getBalance("0xD50460AA1c82b29f4c19B16ACB6e8C46bA05425c",
    function (err, res){
      TemplateVar.set(template, "balance", res);
    })
  },

  tokAddr () {
    const template = Template.instance();

    return template.tokAddr.get();
  }
});


Template.ethTemp.events({
  'click .change-name-samuel'(){
    myContract.changeName('Samuel', {gas: 300000},function(){});
},

'click .change-name-raphael'(){
  myContract.changeName('Raphael', {gas: 300000},function(){});
},

'click .deploy-token' (event, template) {
  //Test token, to be replaced by real variables
  let mySenderAddress = "0xD50460AA1c82b29f4c19B16ACB6e8C46bA05425c";
  let gasEstimate = web3.eth.estimateGas({data: newData},function(err,res){
    return res;
  });

  var newTokenReturned = newToken.new(1000000000, 'Raphael', 0, 'RPL', {
   from:mySenderAddress,
   data:newData,
   gas:gasEstimate}, function(err, newToken){
    if(!err) {
       // NOTE: The callback will fire twice!
       // Once the contract has the transactionHash property set and once its deployed on an address.

       // e.g. check tx hash on the first call (transaction send)
       if(!newToken.address) {
           console.log(newToken.transactionHash); // The hash of the transaction, which deploys the contract

       // check address on the second call (contract deployed)
       } else {
           console.log(newToken.address);
           template.tokAddr.set(newToken.address);
            // the contract address
       }

       // Note that the returned "myContractReturned" === "myContract",
       // so the returned "myContractReturned" object will also get the address set.
    }
  });


  },
});
