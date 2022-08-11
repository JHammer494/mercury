export const schema = gql`
  type DebriefForm {
    id: Int!
    landing_fuel: Float!
    bird_strike: Boolean!
    air_refuel_callsign: String
    air_refuel_amount: Float
    drag_chute: Boolean!
    hung_store: Boolean!
    in_flight_emergency: Boolean!
    bomb_door_actuation: Boolean!
    sortie: Sortie!
    sortie_id: Int!
    user: User!
    user_id: Int!
    submitted: DateTime
  }

  type Query {
    debriefForms: [DebriefForm!]! @skipAuth
    debriefForm(id: Int!): DebriefForm @skipAuth
    debriefFormsSort(start: DateTime!, end: DateTime!): [DebriefForm!]!
      @skipAuth
  }

  input CreateDebriefFormInput {
    landing_fuel: Float!
    bird_strike: Boolean!
    air_refuel_callsign: String
    air_refuel_amount: Float
    drag_chute: Boolean!
    hung_store: Boolean!
    in_flight_emergency: Boolean!
    bomb_door_actuation: Boolean!
    sortie_id: Int!
    user_id: Int!
  }

  input UpdateDebriefFormInput {
    landing_fuel: Float
    bird_strike: Boolean
    air_refuel_callsign: String
    air_refuel_amount: Float
    drag_chute: Boolean
    hung_store: Boolean
    in_flight_emergency: Boolean
    bomb_door_actuation: Boolean
    sortie_id: Int
    user_id: Int
  }

  type Mutation {
    createDebriefForm(input: CreateDebriefFormInput!): DebriefForm! @skipAuth
    updateDebriefForm(id: Int!, input: UpdateDebriefFormInput!): DebriefForm!
      @skipAuth
    deleteDebriefForm(id: Int!): DebriefForm! @skipAuth
  }
`
