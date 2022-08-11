export const schema = gql`
  type Unit {
    id: Int!
    name: String!
    geo_loc: GeoLoc!
    geo_loc_id: String!
    sorties: [Sortie]!
    aircraft: [Aircraft]!
    jcns: [JCN]!
    shops: [Shop]!
  }

  type Query {
    units: [Unit!]! @skipAuth
    unit(id: Int!): Unit @skipAuth
  }

  input CreateUnitInput {
    name: String!
    geo_loc_id: String!
  }

  input UpdateUnitInput {
    name: String
    geo_loc_id: String
  }

  type Mutation {
    createUnit(input: CreateUnitInput!): Unit! @skipAuth
    updateUnit(id: Int!, input: UpdateUnitInput!): Unit! @skipAuth
    deleteUnit(id: Int!): Unit! @skipAuth
  }
`
