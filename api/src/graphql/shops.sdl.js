export const schema = gql`
  type Shop {
    id: String!
    unit: Unit!
    unit_id: Int!
    description: String!
    jcns: [JCN]!
    wces: [WCE]!
    users: [User]!
  }

  type Query {
    shops: [Shop!]! @skipAuth
    shop(id: String!): Shop @skipAuth
  }

  input CreateShopInput {
    unit_id: Int!
    description: String!
  }

  input UpdateShopInput {
    unit_id: Int
    description: String
  }

  type Mutation {
    createShop(input: CreateShopInput!): Shop! @skipAuth
    updateShop(id: String!, input: UpdateShopInput!): Shop! @skipAuth
    deleteShop(id: String!): Shop! @skipAuth
  }
`
