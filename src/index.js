const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./schema/schema");
const { getContract, getCoinbase } = require("./contract/getContract");

let contractInstance = {};

function getBalance() {
  return contractInstance.methods.checkContractBalance().call();
}

async function makeDonation(amount) {
  let response = null;
  let coinbase = null;

  await getCoinbase()
    .then(res => (coinbase = res))
    .then(() =>
      contractInstance.methods
        .make_donation("sending some either")
        .send({
          gas: 300000,
          value: amount * 1000000000000000000, // conver to wei
          from: coinbase
        })
        .then(res => (response = res))
    )
    .catch(err => (error = err));
  return response;
}

// The resolvers
const resolvers = {
  Query: {
    async contract() {
      let balance = 0;
      await getBalance()
        .then(bal => (balance = bal / 1000000000000000000)) // conver to eth
        .catch(err => console.log(err));
      return {
        address: contractInstance._address,
        balance
      };
    },

    async donate(obj, args, context) {
      let transactionHash = "";
      let blockHash = "";
      let blockNumber = 0;
      let gasUsed = 0;
      let status = false;

      const response = makeDonation(args.amount);
      await response
        .then(res => {
          transactionHash = res.transactionHash;
          blockHash = res.blockHash;
          blockNumber = res.blockNumber;
          gasUsed = res.gasUsed;
          status = res.status;
        })
        .catch(err => console.log(err));
      // return donation receipt
      return {
        transactionHash,
        blockHash,
        blockNumber,
        gasUsed,
        status
      };
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the app
const app = express();
const PORT = 4000;

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server and get contract instance
app.listen(PORT, () => {
  console.log("Go to http://localhost:4000/graphiql to run queries!");
  getContract
    .then(res => (contractInstance = res))
    .catch(err => console.log(err));
});
