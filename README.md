# ethereum-graphql Node Server

An ethereum graphql node server app using web3, metamask, ganache and solidity (remix). This is a simple app that accepts donations from users and you can check contract balance too. It will also give you a donation receipt.

![check balance](./img/checkBalance.png, "Check balance queries")
![make donation](./img/makeDonation.png, "Make donation queries")

## Getting Started

1.  clone this project on your machine
2.  `npm install` or `yarn install` in the root directory of this project.
3.  open remix `https://remix.ethereum.org/` and create a new file and copy, paste from the donation.sol file. (in the root of this project.)
4.  connect your remix with `injected web3` and `metamask` (I used ganache for this)
5.  Run this project `npm start` or `yarn start`

### Prerequisites

1.  ganache-cli (`https://www.npmjs.com/package/ganache-cli`)
    after installation
    try `ganache-cli` to generate fake accounts and connect it to `metamask`, you will get 100 ehter for testing and don't forget to connect your metamask to the localhost.

## Built With

1.  Node
2.  Express server
3.  web3
4.  graphql
5.  Solidity (Remix)
6.  Metamask
7.  Ganache-cli

## Author

Sid Parmar

## Acknowledgments

All the good documentation out there
