import { Box, Grid, Typography } from '@mui/material'

const ScheduleTodayAircraftInfo = ({ aircraftInfo }) => {
  return (
    <Box>
      <Grid container columnSpacing={6} sx={{ textAlign: 'left' }}>
        <Grid item sm={4}>
          <Typography sx={{ color: 'gray' }}>Location</Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography sx={{ color: 'gray' }}>Fuel</Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography sx={{ color: 'gray' }}>Config</Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography variant="h5">{aircraftInfo.parking_location}</Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography variant="h5">{aircraftInfo.fuel_quant}K</Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography variant="h7">{aircraftInfo.config}</Typography>
        </Grid>
        <Grid item sm={12} sx={{ paddingTop: '5%' }}>
          <Typography sx={{ color: 'gray' }}>Status Driver</Typography>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <Typography variant="body2">
          {aircraftInfo.driver_jcn?.discrepancy}
        </Typography>
      </Grid>
    </Box>
    // comment
  )
}

export default ScheduleTodayAircraftInfo
