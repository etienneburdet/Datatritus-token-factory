import { Template } from 'meteor/templating';

import './ethTemp.html';

const AbiArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newName","type":"string"}],"name":"changeName","outputs":[],"payable":false,"type":"function"}];
const contractAddress = "0xcd4bb8d07cb7af6b7874faef1969ff1b23e8a427";
//const contractAddress = "0x894fb76956411be2951e80b09b7f2c43a346a447";
const data = "6060604052604060405190810160405280600781526020017f457469656e6e65000000000000000000000000000000000000000000000000008152506000908051906020019061005092919061005e565b50341561005957fe5b610103565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061009f57805160ff19168380011785556100cd565b828001600101855582156100cd579182015b828111156100cc5782518255916020019190600101906100b1565b5b5090506100da91906100de565b5090565b61010091905b808211156100fc5760008160009055506001016100e4565b5090565b90565b6102c3806101126000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100465780635353a2d8146100df575bfe5b341561004e57fe5b610056610139565b60405180806020018281038252838181518152602001915080519060200190808383600083146100a5575b8051825260208311156100a557602082019150602081019050602083039250610081565b505050905090810190601f1680156100d15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156100e757fe5b610137600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506101d7565b005b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101cf5780601f106101a4576101008083540402835291602001916101cf565b820191906000526020600020905b8154815290600101906020018083116101b257829003601f168201915b505050505081565b80600090805190602001906101ed9291906101f2565b505b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061023357805160ff1916838001178555610261565b82800160010185558215610261579182015b82811115610260578251825591602001919060010190610245565b5b50905061026e9190610272565b5090565b61029491905b80821115610290576000816000905550600101610278565b5090565b905600a165627a7a723058203bdf3657cf0a09e8798e3f74e454544c0ae8db058c4d83f541faf18d282a88e00029";
const myContract = web3.eth.contract(AbiArray).at(contractAddress);

const newAbi = [{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"ok","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"ok","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"ok","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
const newData = '60606040523415600b57fe5b5b60338060196000396000f30060606040525bfe00a165627a7a723058205e1aeb3c2b6fb3b88e8962d7f37f47c897acfe15ead5db0954d660231f97b1700029';
const newToken = web3.eth.contract(newAbi);



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
});


Template.ethTemp.events({
  'click .change-name-samuel'(){
    myContract.changeName('Samuel', {gas: 300000},function(){});
},

'click .change-name-raphael'(){
  myContract.changeName('Raphael', {gas: 300000},function(){});
},

'click .deploy-token'(){

  let mySenderAddress = "0xD50460AA1c82b29f4c19B16ACB6e8C46bA05425c";
  let gasEstimate = web3.eth.estimateGas({data: newData},function(err,res){
    return res;
  });

  var newTokenReturned = newToken.new({
   from:mySenderAddress,
   data:newData,
   gas:gasEstimate}, function(err, newToken){
    if(!err) {
       // NOTE: The callback will fire twice!
       // Once the contract has the transactionHash property set and once its deployed on an address.

       // e.g. check tx hash on the first call (transaction send)
       if(!myContract.address) {
           console.log(newToken.transactionHash) // The hash of the transaction, which deploys the contract

       // check address on the second call (contract deployed)
       } else {
           console.log(newToken.address) // the contract address
       }

       // Note that the returned "myContractReturned" === "myContract",
       // so the returned "myContractReturned" object will also get the address set.
    }
  });


  },
});
