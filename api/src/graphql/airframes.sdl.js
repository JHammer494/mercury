export const schema = gql`
  type Airframe {
    id: String!
    aircraft: [Aircraft]!
    wucs: [WorkUnitCode]!
  }

  type Query {
    airframes: [Airframe!]! @skipAuth
  }

  # input CreateAirframeInput {

  # }

  # input UpdateAirframeInput {

  # }
`
