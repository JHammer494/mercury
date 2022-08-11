export const schema = gql`
  type WhenDiscovered {
    id: String!
    description: String!
    jcns: [JCN]!
    wces: [WCE]!
  }

  type Query {
    whenDiscovereds: [WhenDiscovered!]! @skipAuth
    whenDiscovered(id: String!): WhenDiscovered @skipAuth
  }

  input CreateWhenDiscoveredInput {
    description: String!
  }

  input UpdateWhenDiscoveredInput {
    description: String
  }

  type Mutation {
    createWhenDiscovered(input: CreateWhenDiscoveredInput!): WhenDiscovered!
      @skipAuth
    updateWhenDiscovered(
      id: String!
      input: UpdateWhenDiscoveredInput!
    ): WhenDiscovered! @skipAuth
    deleteWhenDiscovered(id: String!): WhenDiscovered! @skipAuth
  }
`
