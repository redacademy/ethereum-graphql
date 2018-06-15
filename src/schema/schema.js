const typeDefs = `
    type Contract {
        address: String!,
        balance: Int
    }

    type DonationReceipt {
        transactionHash: String!,
        blockHash: String!,
        blockNumber: Int!,
        gasUsed: Int!,
        status: Boolean!
    }

    type Query {
        contract: Contract
    }

    type Mutation {
        donate(amount: Int!): DonationReceipt 
    }
`;

module.exports = typeDefs;
