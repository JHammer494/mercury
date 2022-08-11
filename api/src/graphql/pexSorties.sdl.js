export const schema = gql`
  type PexSortie {
    id: Int!
    projected_launch: DateTime!
    projected_land: DateTime!
    unit_id: Int!
    required_fuel: Int!
    config: String!
    call_sign: String
    aircraft_id: Int
    is_quickturn: Boolean
    is_ercc: Boolean
  }

  type Query {
    pexSorties: [PexSortie!]! @skipAuth
    pexSortie(id: Int!): PexSortie @skipAuth
    pexSortiesInDateRange(start: DateTime!, end: DateTime!): [PexSortie!]!
      @skipAuth
  }

  input CreatePexSortieInput {
    projected_launch: DateTime!
    projected_land: DateTime!
    unit_id: Int!
    required_fuel: Int!
    config: String!
    aircraft_id: Int
    is_quickturn: Boolean
    is_ercc: Boolean
  }

  input UpdatePexSortieInput {
    projected_launch: DateTime
    projected_land: DateTime
    unit_id: Int
    required_fuel: Int
    config: String
    aircraft_id: Int
    is_quickturn: Boolean
    is_ercc: Boolean
  }

  type Mutation {
    createPexSortie(input: CreatePexSortieInput!): PexSortie! @skipAuth
    updatePexSortie(id: Int!, input: UpdatePexSortieInput!): PexSortie!
      @skipAuth
    deletePexSortie(id: Int!): PexSortie! @skipAuth
  }
`
