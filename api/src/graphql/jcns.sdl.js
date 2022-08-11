export const schema = gql`
  type JCN {
    id: Int!
    jcn_id(jcn_id: String): String!
    aircraft: Aircraft!
    aircraft_id: Int!
    unit: Unit!
    unit_id: Int!
    driving_ac: Aircraft
    work_unit_code: WorkUnitCode!
    work_unit_code_id: String!
    discrepancy: String!
    symbol: String!
    when_discovered: WhenDiscovered!
    when_discovered_id: String!
    is_repeat: Boolean!
    is_recur: Boolean!
    priority: Int
    etic: DateTime
    shop: Shop!
    shop_id: String!
    discovered_by_user: User!
    discovered_by_user_id: Int!
    when_created: DateTime
    when_modified: DateTime
    when_cleared: DateTime
    jcn_wces(unit_id: Int, shop_id: String): [WCE]!
  }

  type Query {
    jcns(unit_id: Int): [JCN!]! @skipAuth
    jcn(id: Int!): JCN @skipAuth
  }

  input CreateJCNInput {
    jcn_id: String!
    aircraft_id: Int!
    unit_id: Int!
    work_unit_code_id: String!
    discrepancy: String!
    symbol: String!
    when_discovered_id: String!
    is_repeat: Boolean
    is_recur: Boolean
    priority: Int
    etic: DateTime
    shop_id: String!
    discovered_by_user_id: Int!
    when_created: DateTime
    when_modified: DateTime
    when_cleared: DateTime
  }

  input UpdateJCNInput {
    jcn_id: String
    aircraft_id: Int
    unit_id: Int
    work_unit_code_id: String
    discrepancy: String
    symbol: String
    when_discovered_id: String
    is_repeat: Boolean
    is_recur: Boolean
    priority: Int
    etic: DateTime
    shop_id: String
    discovered_by_user_id: Int
    when_created: DateTime
    when_modified: DateTime
    when_cleared: DateTime
  }

  type Mutation {
    createJCN(input: CreateJCNInput!): JCN! @skipAuth
    updateJCN(id: Int!, input: UpdateJCNInput!): JCN! @skipAuth
    deleteJCN(id: Int!): JCN! @skipAuth
  }
`
