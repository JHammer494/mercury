export const schema = gql`
  type Role {
    id: String!
    users: [User]!
  }

  type Query {
    roles: [Role!]! @skipAuth
  }

  # input CreateRoleInput {

  # }

  # input UpdateRoleInput {

  # }
`
