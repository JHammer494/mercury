import { useEffect, useState } from 'react'
import { nextMonday, lastDayOfWeek } from 'date-fns'
import { Typography } from '@mui/material'

const start = nextMonday(new Date())
const end = lastDayOfWeek(new Date(start), { weekStartsOn: 1 })

export const beforeQuery = ({ unit_id }) => {
  return {
    variables: { start, end, unit_id },
    fetchPolicy: 'cache-and-network',
  }
}

export const QUERY = gql`
  query SortiesDateRangeQuery(
    $start: DateTime!
    $end: DateTime!
    $unit_id: Int!
  ) {
    sorties: sortiesInDateRange(start: $start, end: $end, unit_id: $unit_id) {
      id
      aircraft {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ sorties }) => {
  const [scheduledPercent, setScheduledPercent] = useState(null)
  const [scheduledColor, setScheduledColor] = useState(null)

  useEffect(() => {
    const scheduledSorties = sorties.filter(
      (schedSortie) => schedSortie.aircraft !== null
    )

    const percentage = Math.floor(
      (scheduledSorties.length / sorties.length) * 100
    )

    setScheduledPercent(percentage.toString())

    if (percentage < 60) {
      setScheduledColor('error.main')
    } else if (60 <= percentage && percentage < 80) {
      setScheduledColor('warning.main')
    } else {
      setScheduledColor('green')
    }
  }, [])

  return (
    <Typography variant="h7" sx={{ color: scheduledColor }}>
      {scheduledPercent?.concat('% Scheduled')}
    </Typography>
  )
}
