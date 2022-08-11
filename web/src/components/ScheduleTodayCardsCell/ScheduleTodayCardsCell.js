import { Box, Grid } from '@mui/material'
import ScheduleTodayCard from '../ScheduleTodayCard/ScheduleTodayCard'

export const QUERY = gql`
  query ScheduleTodayCardsQuery(
    $start: DateTime!
    $end: DateTime!
    $unit_id: Int!
  ) {
    scheduleTodayCards: sortiesInDateRange(
      start: $start
      end: $end
      unit_id: $unit_id
    ) {
      aircraft_id
      projected_launch
      aircraft {
        status_id
      }
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ scheduleTodayCards }) => {
  return (
    <Box>
      <Grid container rowSpacing={4}>
        {scheduleTodayCards.map((sortie) => (
          <Grid key={sortie.id} item xs={12} sm={12} md={6} lg={6} xl={4}>
            <ScheduleTodayCard sortie={sortie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
