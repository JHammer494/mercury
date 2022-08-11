export const schema = gql`
  type User {
    id: Int!
    first_name: String
    last_name: String
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    role: Role!
    roles: String!
    shop: Shop
    shop_id: String
    jcns_discovered: [JCN]!
    wces_discovered: [WCE]!
    wces_corrected: [WCE]!
    wces_inspected: [WCE]!
    aircraft_notes: [AircraftNote]!
    personal_notes: [PersonalNote]!
    Debrief_forms: [DebriefForm]!
  }

  type Query {
    users(shop_id: String): [User!]! @skipAuth
    user(id: Int!): User @skipAuth
  }

  input CreateUserInput {
    first_name: String
    last_name: String
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String!
    shop_id: String
  }

  input UpdateUserInput {
    first_name: String
    last_name: String
    email: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String
    shop_id: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @skipAuth
    deleteUser(id: Int!): User! @skipAuth
  }
`
