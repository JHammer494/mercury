export const schema = gql`
  type Sortie {
    id: Int!
    projected_launch: DateTime!
    projected_land: DateTime!
    unit: Unit!
    unit_id: Int!
    required_fuel: Int!
    config: String!
    call_sign: String!
    aircraft: Aircraft
    aircraft_id: Int
    crew_ready: DateTime
    crew_show: DateTime
    engine_start: DateTime
    taxi: DateTime
    actual_launch: DateTime
    actual_land: DateTime
    engine_shutdown: DateTime
    land_status: Int
    debrief_forms: [DebriefForm]!
    is_quickturn: Boolean
    is_ercc: Boolean
    is_published: Boolean
  }

  type Query {
    sorties: [Sortie!]! @skipAuth
    sortie(id: Int!): Sortie @skipAuth
    sortiesInDateRange(
      start: DateTime!
      end: DateTime!
      unit_id: Int!
    ): [Sortie!]! @skipAuth
    publishedSortiesRange(
      start: DateTime!
      end: DateTime!
      unit_id: Int!
    ): [Sortie!]! @skipAuth
    todaySorties(projected_launch: DateTime): [Sortie!]! @skipAuth
    sortieRange(aircraft_id: Int, from: DateTime!, to: DateTime!): [Sortie!]!
      @skipAuth
    nextSortie(aircraft_id: Int!, start: DateTime): [Sortie!]! @skipAuth
  }

  input CreateSortieInput {
    projected_launch: DateTime!
    projected_land: DateTime!
    unit_id: Int!
    required_fuel: Int!
    config: String!
    call_sign: String!
    aircraft_id: Int
    crew_ready: DateTime
    crew_show: DateTime
    engine_start: DateTime
    taxi: DateTime
    actual_launch: DateTime
    actual_land: DateTime
    engine_shutdown: DateTime
    land_status: Int
    is_quickturn: Boolean
    is_ercc: Boolean
    is_published: Boolean
  }

  input UpdateSortieInput {
    projected_launch: DateTime
    projected_land: DateTime
    unit_id: Int
    required_fuel: Int
    config: String
    call_sign: String
    aircraft_id: Int
    crew_ready: DateTime
    crew_show: DateTime
    engine_start: DateTime
    taxi: DateTime
    actual_launch: DateTime
    actual_land: DateTime
    engine_shutdown: DateTime
    land_status: Int
    is_quickturn: Boolean
    is_ercc: Boolean
    is_published: Boolean
  }

  type Mutation {
    createSortie(input: CreateSortieInput!): Sortie! @skipAuth
    updateSortie(id: Int!, input: UpdateSortieInput!): Sortie! @skipAuth
    deleteSortie(id: Int!): Sortie! @skipAuth
  }
`
