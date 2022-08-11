import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import DebriefSortieCard from '../DebriefSortieCard/DebriefSortieCard'
import { useContext } from 'react'
import { DebriefFormContext } from 'src/pages/SortieDirectoryPage/SortieDirectoryPage'

export const QUERY = gql`
  query FindDebriefSortieCardQuery(
    $end: DateTime!
    $start: DateTime!
    $unit_id: Int!
  ) {
    debriefSortieCard: sortiesInDateRange(
      end: $end
      start: $start
      unit_id: $unit_id
    ) {
      projected_launch
      actual_land
      actual_launch
      aircraft_id
      call_sign
      debrief_forms {
        id
      }
      sortie_id: id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ debriefSortieCard }) => {
  const { value } = useContext(DebriefFormContext)
  let cards = debriefSortieCard
  if (value === 1) {
    cards = debriefSortieCard.filter((sortie) => {
      if (sortie.debrief_forms.length > 0) {
        return true
      } else {
        return false
      }
    })
  } else {
    cards = debriefSortieCard.filter((sortie) => {
      if (sortie.debrief_forms.length == 0) {
        return true
      } else {
        return false
      }
    })
  }

  return (
    <Box>
      <Grid container rowSpacing={4} alignContent={'space-around'}>
        {cards.map((sortie) => (
          <Grid item key={sortie.sortie_id} xs={12} sm={8} md={6} lg={4} xl={3}>
            {<DebriefSortieCard sortie={sortie} />}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
