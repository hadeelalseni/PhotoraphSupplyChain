const HDWallet = require('truffle-hdwallet-provider');
var mnemonic = '';
var infura = '';
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
      rinkeby: {
       provider: function(){
         return new HDWallet(mnemonic,infura);
       }, 
       network_id: '4',
       gas: 4500000,
       gasPrice: 10000000000,
      
       } 
     
  }
};