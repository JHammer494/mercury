import { Typography, Stack } from '@mui/material'
import { useState, useEffect } from 'react'

export const QUERY = gql`
  query FleetStatusQuery {
    aircrafts {
      status_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ aircrafts }) => {
  const [statusPercent, setStatusPercent] = useState(null)
  const [percentageColor, setPercentageColor] = useState(null)

  useEffect(() => {
    const missionCapablePlanes = aircrafts.filter(
      (plane) => plane.status_id[0] == 'F'
    )

    const result = Math.floor(
      (missionCapablePlanes.length / aircrafts.length) * 100
    )

    setStatusPercent(result.toString())

    if (result < 60) {
      setPercentageColor('error.main')
    } else if (60 <= result < 80) {
      setPercentageColor('warning.main')
    } else {
      setPercentageColor('success.main')
    }
  }, [])

  return percentageColor != null ? (
    <>
      {/* <div>{JSON.stringify(aircrafts)}</div> */}
      <Stack direction="row" spacing={1}>
        <Typography
          variant="h6"
          sx={{ textAlign: 'left', color: percentageColor }}
        >
          {statusPercent?.concat('%')}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'left' }}>
          AMU Status
        </Typography>
      </Stack>
    </>
  ) : null
}
