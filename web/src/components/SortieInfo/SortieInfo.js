import { Box, Grid, Typography } from '@mui/material'
import format from 'date-fns-tz/format'

const SortieInfo = ({ nextSortie }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Typography>
            <b>Line</b>
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Typography>{nextSortie.id}</Typography>
        </Grid>
        <Grid item md={3}>
          <Typography>
            <b>Callsign</b>
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Typography>{nextSortie.call_sign}</Typography>
        </Grid>

        <Grid item md={3}>
          <Typography>
            <b>Required Fuel</b>
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Typography>{nextSortie.required_fuel}K</Typography>
        </Grid>
        <Grid item md={2}>
          <Typography>
            <b>Config</b>
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography>{nextSortie.config}</Typography>
        </Grid>

        <Grid item md={2} sx={{ marginTop: '4%' }}>
          <Typography>
            <b>Take-off</b>
          </Typography>
        </Grid>
        <Grid item md={4} sx={{ marginTop: '4%' }}>
          <Typography>
            {format(
              new Date(nextSortie.projected_launch),
              'eee, d LLL yy @ HHmm'
            )}
          </Typography>
        </Grid>
        <Grid item md={2} sx={{ marginTop: '4%' }}>
          <Typography>
            <b>Land</b>
          </Typography>
        </Grid>
        <Grid item md={4} sx={{ marginTop: '4%' }}>
          <Typography>
            {format(
              new Date(nextSortie.projected_land),
              'eee, d LLL yy @ HHmm'
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SortieInfo
