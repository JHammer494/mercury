export const schema = gql`
  type AircraftNote {
    id: Int!
    note: String!
    timestamp: DateTime!
    user: User!
    user_id: Int!
    aircraft: Aircraft!
    aircraft_id: Int!
    jcn: JCN
    jcn_id: Int
  }

  type Query {
    aircraftNotes(aircraft_id: Int): [AircraftNote!]! @skipAuth
    aircraftNote(id: Int!): AircraftNote @skipAuth
  }

  input CreateAircraftNoteInput {
    note: String!
    timestamp: DateTime
    user_id: Int!
    aircraft_id: Int!
    jcn_id: Int
  }

  input UpdateAircraftNoteInput {
    note: String
    timestamp: DateTime
    user_id: Int
    aircraft_id: Int
    jcn_id: Int
  }

  type Mutation {
    createAircraftNote(input: CreateAircraftNoteInput!): AircraftNote! @skipAuth
    updateAircraftNote(
      id: Int!
      input: UpdateAircraftNoteInput!
    ): AircraftNote! @skipAuth
    deleteAircraftNote(id: Int!): AircraftNote! @skipAuth
  }
`
