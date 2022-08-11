export const schema = gql`
  type PersonalNote {
    id: Int!
    note: String!
    timestamp: DateTime!
    user: User!
    user_id: Int!
  }

  type Query {
    personalNotes: [PersonalNote!]! @skipAuth
    personalNote(id: Int!): PersonalNote @skipAuth
  }

  input CreatePersonalNoteInput {
    note: String!
    timestamp: DateTime!
    user_id: Int!
  }

  input UpdatePersonalNoteInput {
    note: String
    timestamp: DateTime
    user_id: Int
  }

  type Mutation {
    createPersonalNote(input: CreatePersonalNoteInput!): PersonalNote! @skipAuth
    updatePersonalNote(
      id: Int!
      input: UpdatePersonalNoteInput!
    ): PersonalNote! @skipAuth
    deletePersonalNote(id: Int!): PersonalNote! @skipAuth
  }
`
