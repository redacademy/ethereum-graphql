const contract = require("./contract/getContract");

contract
  .then(res => res.methods.checkContractBalance().call())
  .then(balance => console.log(balance))
  .catch(err => console.log(err));
