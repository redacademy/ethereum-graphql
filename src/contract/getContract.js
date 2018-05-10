const Web3 = require("web3");
const { address, ABI } = require("../../constants/donationContract");

const getContract = new Promise(function(resolve, reject) {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
  );
  const donationContract = new web3.eth.Contract(ABI, address);
  if (donationContract) resolve(donationContract);
  else reject();
});

module.exports = getContract;
