export const schema = gql`
  type WorkUnitCode {
    id: String!
    description: String!
    airframe: Airframe!
    airframe_id: String!
    jcns: [JCN]!
    wces: [WCE]!
  }

  type Query {
    workUnitCodes: [WorkUnitCode!]! @skipAuth
    workUnitCode(id: String!): WorkUnitCode @skipAuth
  }

  input CreateWorkUnitCodeInput {
    description: String!
    airframe_id: String!
  }

  input UpdateWorkUnitCodeInput {
    description: String
    airframe_id: String
  }

  type Mutation {
    createWorkUnitCode(input: CreateWorkUnitCodeInput!): WorkUnitCode! @skipAuth
    updateWorkUnitCode(
      id: String!
      input: UpdateWorkUnitCodeInput!
    ): WorkUnitCode! @skipAuth
    deleteWorkUnitCode(id: String!): WorkUnitCode! @skipAuth
  }
`
