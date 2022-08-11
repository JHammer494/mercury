export const schema = gql`
  type HourlyInspection {
    id: Int!
    name: String!
    inspection_details: String!
    frequency: Float!
    last_completed: Float!
    aircraft: Aircraft!
    aircraft_id: Int!
  }

  type Query {
    hourlyInspections: [HourlyInspection!]! @skipAuth
    hourlyInspection(id: Int!): HourlyInspection @skipAuth
  }

  input CreateHourlyInspectionInput {
    name: String!
    inspection_details: String!
    frequency: Float!
    last_completed: Float!
    aircraft_id: Int!
  }

  input UpdateHourlyInspectionInput {
    name: String
    inspection_details: String
    frequency: Float
    last_completed: Float
    aircraft_id: Int
  }

  type Mutation {
    createHourlyInspection(
      input: CreateHourlyInspectionInput!
    ): HourlyInspection! @skipAuth
    updateHourlyInspection(
      id: Int!
      input: UpdateHourlyInspectionInput!
    ): HourlyInspection! @skipAuth
    deleteHourlyInspection(id: Int!): HourlyInspection! @skipAuth
  }
`
