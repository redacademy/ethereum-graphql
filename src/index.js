// const express = require("express");
// const bodyParser = require("body-parser");
// const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
// const { makeExecutableSchema } = require("graphql-tools");

// const typeDefs = require("./schema/schema");
// const contract = require("./contract/getContract");

// const PORT = 4000;

// const schema = makeExecutableSchema({ typeDefs });

// // Initialize the app
// const app = express();

// // The GraphQL endpoint
// app.use("/graphql", graphqlExpress({ schema }));

// // GraphiQL, a visual editor for queries
// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// app.listen(PORT);

const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./schema/schema");
const contract = require("./contract/getContract");

let contractInstance = {};
let balance = 0;
let error = {};

contract
  .then(res => (contractInstance = res))
  .then(() =>
    contractInstance.methods
      .checkContractBalance()
      .call()
      .then(bal => (balance = bal / 1000000000000000000))
  )
  .then(() => console.log(contractInstance))
  .catch(err => (error = err));

getBalance = () => {
  contract
    .then(res =>
      res.methods
        .checkContractBalance()
        .call()
        .then(bal => (balance = bal))
    )
    .catch(err => (error = err));
  return balance;
};

// The resolvers
const resolvers = {
  Query: {
    contract() {
      console.log(balance);
      return {
        address: contractInstance._address,
        balance
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

// Start the server
app.listen(PORT, () => {
  console.log("Go to http://localhost:4000/graphiql to run queries!");
});
