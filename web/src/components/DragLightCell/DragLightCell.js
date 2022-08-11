import { useQuery } from '@apollo/client'
import { Box, Chip } from '@mui/material'

export const QUERY = gql`
  query FindDragLightQuery($id: Int!) {
    sortie(id: $id) {
      crew_ready
      id
      crew_show
      engine_start
      taxi
      engine_shutdown
      actual_launch
      actual_land
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ sortie }) => {
  const { data } = useQuery(QUERY, {
    variables: { id: sortie.id, sortie },
    pollInterval: 30000,
  })
  return (
    <Box
      sx={{
        height: '440px',
        maxWidth: '50',
        backgroundColor: '#f5f5f4',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderLeft: '1px solid lightgrey',
      }}
    >
      <Chip
        lable="."
        color={data.sortie.actual_launch !== null ? 'success' : 'default'}
        sx={{ height: '50px', width: '10px' }}
      />
      <Chip
        lable="."
        color={data.sortie.taxi !== null ? 'success' : 'default'}
        sx={{ height: '50px', width: '10px' }}
      />
      <Chip
        lable="."
        color={data.sortie.engine_start !== null ? 'success' : 'default'}
        sx={{ height: '50px', width: '10px' }}
      />
      <Chip
        lable="."
        color={data.sortie.crew_show !== null ? 'success' : 'default'}
        sx={{ height: '50px', width: '10px' }}
      />
      <Chip
        lable="."
        color={data.sortie.crew_ready !== null ? 'success' : 'default'}
        sx={{ height: '50px', width: '10px' }}
      />
    </Box>
  )
}
