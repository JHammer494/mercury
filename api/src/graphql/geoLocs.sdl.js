export const schema = gql`
  type GeoLoc {
    id: String!
    name: String!
    units: [Unit]!
    aircraft: [Aircraft]!
  }

  type Query {
    geoLocs: [GeoLoc!]! @skipAuth
    geoLoc(id: String!): GeoLoc @skipAuth
  }

  input CreateGeoLocInput {
    name: String!
  }

  input UpdateGeoLocInput {
    name: String
  }

  type Mutation {
    createGeoLoc(input: CreateGeoLocInput!): GeoLoc! @skipAuth
    updateGeoLoc(id: String!, input: UpdateGeoLocInput!): GeoLoc! @skipAuth
    deleteGeoLoc(id: String!): GeoLoc! @skipAuth
  }
`
