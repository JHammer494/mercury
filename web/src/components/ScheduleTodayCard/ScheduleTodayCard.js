import { Card, Grid, Chip } from '@mui/material'
import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ScheduleTodayAircraftInfoCell from '../ScheduleTodayAircraftInfoCell/ScheduleTodayAircraftInfoCell'
import ScheduleTodaySortieInfoCell from '../ScheduleTodaySortieInfoCell/ScheduleTodaySortieInfoCell'
import LineActionCell from '../LineActionCell/LineActionCell'
import DragLightCell from '../DragLightCell/DragLightCell'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

// comment
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const ScheduleTodayCard = ({ sortie }) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const statusColor = (status) => {
    if (status.includes('FMC')) {
      return (
        <strong>
          <Chip color="success" size="medium" label={status} />
        </strong>
      )
    } else if (status.includes('PMC')) {
      return (
        <strong>
          <Chip color="warning" size="medium" label={status} />
        </strong>
      )
    } else if (status.includes('NMC')) {
      return (
        <strong>
          <Chip label={status} color="error" size="medium" />
        </strong>
      )
    } else
      return (
        <span style={{ color: 'black' }}>
          <b>{status}</b>
        </span>
      )
  }

  return (
    <Card
      elevation={12}
      sx={{
        display: 'flex',
        width: 470,
        height: 440,
      }}
    >
      <Box sx={{ width: '420' }}>
        <Box sx={{ margin: '15px' }}>
          <Grid container sx={{ margin: '3%', textAlign: 'center' }}>
            <Grid item xs={3}>
              <Typography sx={{ color: 'gray' }}>Line</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{ color: 'gray' }}>Tail Number</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ color: 'gray' }}>Status</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5">
                <b>{sortie.id}</b>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h5">
                <b>{sortie.aircraft_id}</b>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5">
                {!sortie.aircraft
                  ? null
                  : statusColor(sortie.aircraft?.status_id)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{ justifyContent: 'center' }}
          >
            <Tab label="Sortie Info" {...a11yProps(0)} />
            <Tab label="Aircraft Info" {...a11yProps(1)} />
            <Tab label="Line Actions" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ScheduleTodaySortieInfoCell id={sortie.id} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ScheduleTodayAircraftInfoCell id={sortie.aircraft_id} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <LineActionCell id={sortie.id} />
          </TabPanel>
        </Box>
      </Box>
      <Box>
        <DragLightCell id={sortie.id} />
      </Box>
    </Card>
  )
}

export default ScheduleTodayCard
