import MxList from '../MxList/MxList'
import { Box, CircularProgress } from '@mui/material'

export const beforeQuery = ({ id }) => {
  return { variables: { id: id }, pollInterval: 30000 }
}

export const QUERY = gql`
  query FindMxListInfoQuery($id: Int!) {
    mxListInfo: aircraft(id: $id) {
      id
      all_jcns {
        id
        jcn_id
        discrepancy
        shop_id
        symbol
        when_discovered_id
        work_unit_code_id
        when_created
        unit {
          id
        }
        jcn_wces {
          discrepancy
          how_mal_id
          shop_id
          start_time
          stop_time
          symbol
          work_unit_code_id
          wce_id
          unit_id
        }
      }
    }
  }
`

export const Loading = () => (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ mxListInfo }) => {
  return <MxList mxListInfo={mxListInfo} />
}
