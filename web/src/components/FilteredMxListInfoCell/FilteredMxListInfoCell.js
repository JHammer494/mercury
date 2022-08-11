import MxList from '../MxList/MxList'
export const QUERY = gql`
  query FindFilteredMxListInfoQuery($id: Int!, $shop_id: String!) {
    mxListInfo: aircraft(id: $id) {
      id
      all_jcns: all_jcns(shop_id: $shop_id) {
        jcn_id
        id
        discrepancy
        shop_id
        symbol
        when_discovered_id
        work_unit_code_id
        when_created
        jcn_wces {
          discrepancy
          how_mal_id
          shop_id
          start_time
          symbol
          work_unit_code_id
          wce_id
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ mxListInfo }) => {
  return <MxList mxListInfo={mxListInfo} />
}
