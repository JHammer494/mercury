import { Avatar, Grid, Typography, Tab, Tabs, Box, Button } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { format } from 'date-fns-tz'
import ScheduleTodayCardsCell from 'src/components/ScheduleTodayCardsCell/ScheduleTodayCardsCell'
import WeeklyViewerInfosCell from 'src/components/WeeklyViewerInfosCell/WeeklyViewerInfosCell'
import NextWeekViewerInfoCell from 'src/components/NextWeekViewerInfosCell/NextWeekViewerInfosCell'
import PastSchedule from 'src/components/PastSchedule/PastSchedule'
import {
  endOfWeek,
  nextMonday,
  startOfToday,
  startOfTomorrow,
  startOfWeek,
  lastDayOfWeek,
} from 'date-fns'
import { useAuth } from '@redwoodjs/auth'

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const SchedulePage = () => {
  const { currentUser } = useAuth()

  const [value, setValue] = useState(0)
  const start = new Date(startOfToday().toISOString())
  const nextMon = nextMonday(new Date())

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: '100px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt="Unit patch."
              src="data:image/png;base64,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"
              sx={{
                marginTop: '25px',
                marginLeft: '25px',
                top: 'auto',
                width: '22%',
                height: '22%',
              }}
            />
            <Typography
              variant="h4"
              sx={{ textAlign: 'left', marginTop: '20px', marginLeft: '20px' }}
            >
              Schedule
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="noPrint">
        <Tabs value={value} onChange={handleChange} sx={{ marginLeft: '25px' }}>
          <Tab label="Today" {...a11yProps(0)} className="noPrint" />
          <Tab label="This Week" {...a11yProps(1)} className="noPrint" />
          <Tab label="Next Week" {...a11yProps(2)} className="noPrint" />
          <Tab label="Archive" {...a11yProps(3)} className="noPrint" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Grid item>
            <Typography variant="h5">
              {format(start, 'LLLL dd, yyyy')}
            </Typography>
          </Grid>
        </Grid>
        <ScheduleTodayCardsCell
          start={start} //for Start of Day calculations
          end={startOfTomorrow()}
          unit_id={currentUser?.shop.unit_id}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WeeklyViewerInfosCell
          start={startOfWeek(start, { weekStartsOn: 1 })} //for Start of Week calculations
          end={endOfWeek(start, { weekStartsOn: 1 })}
          unit_id={currentUser?.shop.unit_id}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NextWeekViewerInfoCell
          start={nextMon} //for Start of Week calculations
          end={lastDayOfWeek(new Date(nextMon), { weekStartsOn: 1 })}
          unit_id={currentUser?.shop.unit_id}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PastSchedule />
      </TabPanel>
    </Box>
  )
}

export default SchedulePage
