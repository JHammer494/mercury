export const schema = gql`
  type Aircraft {
    id: Int!
    fuel_quant: Int!
    name: String
    status: Status!
    status_id: String!
    parking_location: String
    geo_loc: GeoLoc!
    geo_loc_id: String!
    preflight_inspection: DateTime!
    publishedSortiesRange(
      start: DateTime
      end: DateTime
      unit_id: Int
    ): [Sortie!]!
    flight_hours: Float!
    mx_priority: Int
    all_jcns(unit_id: Int, shop_id: String): [JCN!]!
    driver_jcn: JCN
    driver_jcn_unit: Int
    driver_jcn_id: String
    unit: Unit!
    unit_id: Int!
    config: String!
    airframe: Airframe!
    airframe_id: String!
    cur_oxygen: Int!
    sorties: [Sortie!]!
    sortiesInDateRange(start: DateTime, end: DateTime, unit_id: Int): [Sortie!]!
    spareFlyers: [SpareFlyer!]!
    spareFlyersInDateRange(start: DateTime, end: DateTime): [SpareFlyer!]!
    publishedSpareFlyersInDateRange(
      start: DateTime
      end: DateTime
    ): [SpareFlyer!]!
    aircraft_notes: [AircraftNote!]!
    hourly_inspection: [HourlyInspection!]!
    calendar_inspections: [CalendarInspection!]!
  }

  type Query {
    aircrafts(unit_id: Int): [Aircraft!]! @skipAuth
    aircraft(id: Int!): Aircraft @skipAuth
  }

  input CreateAircraftInput {
    fuel_quant: Int!
    name: String
    status_id: String!
    parking_location: String
    geo_loc_id: String!
    preflight_inspection: DateTime!
    flight_hours: Float!
    mx_priority: Int
    driver_jcn_unit: Int
    driver_jcn_id: String
    unit_id: Int!
    config: String!
    airframe_id: String!
    cur_oxygen: Int!
  }

  input UpdateAircraftInput {
    fuel_quant: Int
    status_id: String
    parking_location: String
    name: String
    geo_loc_id: String
    preflight_inspection: DateTime
    flight_hours: Float
    mx_priority: Int
    driver_jcn_unit: Int
    driver_jcn_id: String
    unit_id: Int
    config: String
    airframe_id: String
    cur_oxygen: Int
  }

  type Mutation {
    createAircraft(input: CreateAircraftInput!): Aircraft! @skipAuth
    updateAircraft(id: Int!, input: UpdateAircraftInput!): Aircraft! @skipAuth
    deleteAircraft(id: Int!): Aircraft! @skipAuth
  }
`
