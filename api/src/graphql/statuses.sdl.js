export const schema = gql`
  type Status {
    id: String!
    description: String!
    aircraft: [Aircraft]!
  }

  type Query {
    statuses: [Status!]! @skipAuth
    status(id: String!): Status @skipAuth
  }

  input CreateStatusInput {
    description: String!
  }

  input UpdateStatusInput {
    description: String
  }

  type Mutation {
    createStatus(input: CreateStatusInput!): Status! @skipAuth
    updateStatus(id: String!, input: UpdateStatusInput!): Status! @skipAuth
    deleteStatus(id: String!): Status! @skipAuth
  }
`
