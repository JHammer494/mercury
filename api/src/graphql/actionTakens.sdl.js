export const schema = gql`
  type ActionTaken {
    id: String!
    description: String!
    WCE: [WCE]!
  }

  type Query {
    actionTakens: [ActionTaken!]! @skipAuth
    actionTaken(id: String!): ActionTaken @skipAuth
  }

  input CreateActionTakenInput {
    description: String!
  }

  input UpdateActionTakenInput {
    description: String
  }

  type Mutation {
    createActionTaken(input: CreateActionTakenInput!): ActionTaken! @skipAuth
    updateActionTaken(
      id: String!
      input: UpdateActionTakenInput!
    ): ActionTaken! @skipAuth
    deleteActionTaken(id: String!): ActionTaken! @skipAuth
  }
`
