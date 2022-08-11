import { Box, Grid, Typography } from '@mui/material'
import { format, getHours } from 'date-fns'

const ScheduleTodaySortieInfo = ({ sortieInfo }) => {
  const formatDate = (date) => {
    return format(new Date(date), 'HH:mm')
  }

  const launch = getHours(new Date(sortieInfo.projected_launch))
  const land = getHours(new Date(sortieInfo.projected_land))
  const duration = Math.abs(launch - land)

  return (
    <Box>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={7}
        sx={{ paddingLeft: '15px' }}
      >
        <Grid item sm={6}>
          <Typography sx={{ color: 'gray' }}>Callsign</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography sx={{ color: 'gray' }}>Required Fuel</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h5">{sortieInfo?.call_sign}</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h5">{sortieInfo?.required_fuel}K</Typography>
        </Grid>

        <Grid item sm={6}>
          <Typography sx={{ color: 'gray' }}>Take-off</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography sx={{ color: 'gray' }}>Land</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h5">
            {formatDate(sortieInfo?.projected_launch)}
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h5">
            {formatDate(sortieInfo?.projected_land)}
          </Typography>
        </Grid>

        <Grid item sm={6}>
          <Typography sx={{ color: 'gray' }}>Duration</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography sx={{ color: 'gray' }}>Configuration</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h5">{duration} hrs</Typography>
        </Grid>
        <Grid item sm={6} variant="h5">
          <Typography>{sortieInfo?.config}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ScheduleTodaySortieInfo
