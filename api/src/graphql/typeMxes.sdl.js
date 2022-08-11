export const schema = gql`
  type TypeMx {
    id: String!
    description: String!
    wces: [WCE]!
  }

  type Query {
    typeMxes: [TypeMx!]! @skipAuth
    typeMx(id: String!): TypeMx @skipAuth
  }

  input CreateTypeMxInput {
    description: String!
  }

  input UpdateTypeMxInput {
    description: String
  }

  type Mutation {
    createTypeMx(input: CreateTypeMxInput!): TypeMx! @skipAuth
    updateTypeMx(id: String!, input: UpdateTypeMxInput!): TypeMx! @skipAuth
    deleteTypeMx(id: String!): TypeMx! @skipAuth
  }
`
