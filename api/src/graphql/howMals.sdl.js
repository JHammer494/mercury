export const schema = gql`
  type HowMal {
    id: String!
    description: String!
    wces: [WCE]!
  }

  type Query {
    howMals: [HowMal!]! @skipAuth
    howMal(id: String!): HowMal @skipAuth
  }

  input CreateHowMalInput {
    description: String!
  }

  input UpdateHowMalInput {
    description: String
  }

  type Mutation {
    createHowMal(input: CreateHowMalInput!): HowMal! @skipAuth
    updateHowMal(id: String!, input: UpdateHowMalInput!): HowMal! @skipAuth
    deleteHowMal(id: String!): HowMal! @skipAuth
  }
`
