import { Box, Container, Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { format, getDay, getWeek, formatDistanceToNowStrict } from 'date-fns'

const AircraftInfo = ({ aircraftInfo }) => {
  var weeklySchedule = []

  const weeklyFlying = () => {
    const curWeek = getWeek(new Date())
    weeklySchedule = aircraftInfo.sorties.filter(
      (sortie) => getWeek(new Date(sortie.projected_launch)) === curWeek
    )
  }

  weeklyFlying()

  const lastFly = new Date(
    Math.max.apply(
      null,
      aircraftInfo.sorties.map((sortie) => {
        return new Date(sortie.actual_land)
      })
    )
  )

  const daysSinceLastFlyString = formatDistanceToNowStrict(lastFly, {
    addSuffix: true,
    unit: 'day',
    roundingMethod: 'floor',
  })

  const columns = [
    { field: 'mon', headerName: 'Mon', flex: 1 },
    { field: 'tues', headerName: 'Tues', flex: 1 },
    { field: 'wed', headerName: 'Wed', flex: 1 },
    { field: 'thrus', headerName: 'Thurs', flex: 1 },
    { field: 'fri', headerName: 'Fri', flex: 1 },
    { field: 'sat', headerName: 'Sat', flex: 1 },
    { field: 'sun', headerName: 'Sun', flex: 1 },
  ]

  const buildSchedule = () => {
    const row = { id: 1 }

    weeklySchedule.forEach((sortie) => {
      let dayInt = getDay(new Date(sortie.projected_launch))
      switch (dayInt) {
        case 0:
          row['sun'] = 'Flying'
          break
        case 1:
          row['mon'] = 'Flying'
          break
        case 2:
          row['tues'] = 'Flying'
          break
        case 3:
          row['wed'] = 'Flying'
          break
        case 4:
          row['thurs'] = 'Flying'
          break
        case 5:
          row['fri'] = 'Flying'
          break
        case 6:
          row['sat'] = 'Flying'
          break
      }
    })
    return [row]
  }

  const rows = buildSchedule()

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ marginTop: '2%', marginBottom: '8%' }}>
        <Grid container>
          <Grid item lg={4}>
            <Typography>Location {aircraftInfo.parking_location} </Typography>
          </Grid>
          <Grid item lg={3}>
            <Typography>Fuel {aircraftInfo.fuel_quant}K </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography>Airframe Hrs {aircraftInfo.flight_hours} </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginBottom: '5%' }}>
        <Grid container spacing={2}>
          <Grid item sm={6} md={2}>
            <Typography>
              <b>Preflight</b>
            </Typography>
          </Grid>
          <Grid item sm={6} md={4}>
            <Typography>
              {format(
                new Date(aircraftInfo.preflight_inspection),
                'eee, d LLL yy @ HHmm'
              )}
            </Typography>
          </Grid>
          <Grid item sm={6} md={2}>
            <Typography>
              <b>Last Fly</b>
            </Typography>
          </Grid>
          <Grid item sm={6} md={4}>
            <Typography>
              {`${format(
                new Date(lastFly),
                'eee, d LLL yy @ HHmm'
              )} (${daysSinceLastFlyString})`}
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography>
              <b>WUC</b>
            </Typography>
          </Grid>
          <Grid item sm={6} md={4}>
            <Typography>
              {aircraftInfo.driver_jcn?.work_unit_code_id}
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography>
              <b>WPNS</b>
            </Typography>
          </Grid>
          <Grid item sm={6} md={4}>
            <Typography></Typography>
            {/* TBD on feedback for if needed */}
          </Grid>

          <Grid item md={2}>
            <Typography>
              <b>ETIC</b>
            </Typography>
          </Grid>
          <Grid item sm={6} md={4}>
            <Typography>
              {format(
                new Date(aircraftInfo.driver_jcn?.etic),
                'eee, d LLL yy @ HHmm'
              )}
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography>
              <b>Config</b>
            </Typography>
          </Grid>
          <Grid item sm={6} md={4}>
            <Typography>{aircraftInfo.config}</Typography>
          </Grid>

          <Grid item md={2}>
            <Typography>
              <b>Oxygen</b>
            </Typography>
          </Grid>
          <Grid item sm={6} md={4}>
            <Typography>{aircraftInfo.cur_oxygen}L</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography></Typography>
          </Grid>
          <Grid item sm={6} md={4}>
            <Typography></Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <DataGrid
          density="compact"
          autoHeight
          disableColumnMenu
          disableColumnFilter
          hideFooter
          hideFooterPagination
          columns={columns}
          rows={rows}
          rowCount={1}
          scrollbarSize={0}
          sx={{
            width: '100%',
          }}
        />
      </Box>
    </Container>
  )
}

export default AircraftInfo
