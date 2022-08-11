export const schema = gql`
  type WCE {
    id: Int!
    wce_id: Int!
    jcn: JCN!
    jcn_id: String!
    unit_id: Int!
    work_unit_code: WorkUnitCode!
    work_unit_code_id: String!
    discrepancy: String!
    symbol: String!
    when_discovered: WhenDiscovered!
    when_discovered_id: String!
    type_mx: TypeMx
    type_mx_id: String
    action_taken: ActionTaken
    action_taken_id: String
    corrective_action: String
    discovered_by_user: User!
    discovered_by_user_id: Int!
    corrected_by_user: User
    corrected_by_user_id: Int
    inspected_by_user: User
    inspected_by_user_id: Int
    shop: Shop!
    shop_id: String!
    how_mal: HowMal
    how_mal_id: String
    when_created: DateTime
    when_modified: DateTime
    start_time: DateTime
    stop_time: DateTime
  }
  type Query {
    wces: [WCE!]! @skipAuth
    wce(id: Int!): WCE @skipAuth
  }
  input CreateWCEInput {
    wce_id: Int!
    jcn_id: String!
    unit_id: Int!
    work_unit_code_id: String!
    discrepancy: String!
    symbol: String!
    when_discovered_id: String!
    type_mx_id: String
    action_taken_id: String
    corrective_action: String
    discovered_by_user_id: Int!
    corrected_by_user_id: Int
    inspected_by_user_id: Int
    shop_id: String!
    how_mal_id: String
    when_created: DateTime
    when_modified: DateTime
    start_time: DateTime
    stop_time: DateTime
  }
  input UpdateWCEInput {
    wce_id: Int
    jcn_id: String
    unit_id: Int
    work_unit_code_id: String
    discrepancy: String
    symbol: String
    when_discovered_id: String
    type_mx_id: String
    action_taken_id: String
    corrective_action: String
    discovered_by_user_id: Int
    corrected_by_user_id: Int
    inspected_by_user_id: Int
    shop_id: String
    how_mal_id: String
    when_created: DateTime
    when_modified: DateTime
    start_time: DateTime
    stop_time: DateTime
  }
  type Mutation {
    createWCE(input: CreateWCEInput!): WCE! @skipAuth
    updateWCE(id: Int!, input: UpdateWCEInput!): WCE! @skipAuth
    completeWCE(
      wce_id: Int!
      jcn_id: String!
      unit_id: Int!
      input: UpdateWCEInput!
    ): WCE! @skipAuth
    deleteWCE(id: Int!): WCE! @skipAuth
  }
`
