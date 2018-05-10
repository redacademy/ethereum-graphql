const Web3 = require("web3");
const { address, ABI } = require("../../constants/donationContract");

const getWeb3 = () => {
  return (web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
  ));
};

const getContract = new Promise(function(resolve, reject) {
  const web3 = getWeb3();
  const donationContract = new web3.eth.Contract(ABI, address);
  if (donationContract) resolve(donationContract);
  else reject();
});

const getCoinbase = async () => {
  const web3 = getWeb3();
  return await web3.eth.getCoinbase();
};

module.exports = { getContract, getCoinbase };
