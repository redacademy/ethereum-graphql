const typeDefs = `
    type Contract {
        address: String!,
        balance: Int
    }

    type Query {
        contract: Contract
    }
`;

module.exports = typeDefs;
