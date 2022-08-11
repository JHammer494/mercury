export const schema = gql`
  type SpareFlyer {
    id: Int!
    aircraft: Aircraft!
    aircraft_id: Int!
    date: DateTime!
    is_published: Boolean
  }

  type Query {
    spareFlyers: [SpareFlyer!]! @skipAuth
    spareFlyer(id: Int!): SpareFlyer @skipAuth
  }

  input CreateSpareFlyerInput {
    aircraft_id: Int!
    date: DateTime!
    is_published: Boolean
  }

  input UpdateSpareFlyerInput {
    aircraft_id: Int
    date: DateTime
    is_published: Boolean
  }

  type Mutation {
    createSpareFlyer(input: CreateSpareFlyerInput!): SpareFlyer! @skipAuth
    updateSpareFlyer(id: Int!, input: UpdateSpareFlyerInput!): SpareFlyer!
      @skipAuth
    deleteSpareFlyer(id: Int!): SpareFlyer! @skipAuth
  }
`
