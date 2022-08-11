import * as React from 'react'
import { Box, Tab } from '@mui/material'
import SortieAssignment from '../SortieAssignment/SortieAssignment'
import {
  isSameDay,
  nextTuesday,
  nextWednesday,
  nextThursday,
  nextFriday,
  nextSaturday,
} from 'date-fns'
import { useDrag } from 'react-dnd'
import { TabPanel } from '@mui/lab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'

export const beforeQuery = ({ start, end, unit_id }) => {
  return {
    variables: { start, end, unit_id },
    fetchPolicy: 'cache-and-network',
  }
}
export const QUERY = gql`
  query SortiesQuery($start: DateTime!, $end: DateTime!, $unit_id: Int!) {
    sorties: sortiesInDateRange(start: $start, end: $end, unit_id: $unit_id) {
      config
      id
      projected_land
      projected_launch
      required_fuel
      call_sign
      unit_id
      aircraft_id
    }
    aircrafts {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ sorties, aircrafts, variables }) => {
  const { start, end } = variables
  const [value, setValue] = React.useState('0')
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sortie',
    item: { sortie: sorties, aircraft: aircrafts, value: value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const sortieDay = (dateval) => {
    const sortie = sorties.filter((dateMatch) =>
      isSameDay(new Date(dateMatch.projected_launch), new Date(dateval))
    )
    if (sortie.length) {
      return sortie.map((dateMatch) => (
        <SortieAssignment
          key={dateMatch.id}
          sortie={dateMatch}
          aircrafts={aircrafts}
        />
      ))
    } else return 'No sorties today...'
  }

  const tabDaySorting = (value) => {
    switch (value) {
      case '0':
        return sortieDay(start)
      case '1':
        return sortieDay(nextTuesday(start))
      case '2':
        return sortieDay(nextWednesday(start))
      case '3':
        return sortieDay(nextThursday(start))
      case '4':
        return sortieDay(nextFriday(start))
      case '5':
        return sortieDay(nextSaturday(start))
      case '6':
        return sortieDay(end)
    }
  }

  return (
    <Box>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Box
          ref={drag}
          sx={{
            border: '1px orange solid',
            textAlign: 'center',
            padding: '15px',
            borderRadius: '5px',
            color: 'orange',
            maxWidth: isDragging ? '500px' : null,
          }}
        >
          Spare
        </Box>
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="M" value="0" style={{ minWidth: '14%' }} />
                <Tab label="T" value="1" style={{ minWidth: '14%' }} />
                <Tab label="W" value="2" style={{ minWidth: '14%' }} />
                <Tab label="R" value="3" style={{ minWidth: '14%' }} />
                <Tab label="F" value="4" style={{ minWidth: '14%' }} />
                <Tab label="S" value="5" style={{ minWidth: '14%' }} />
                <Tab label="U" value="6" style={{ minWidth: '14%' }} />
              </TabList>
            </Box>
            <TabPanel style={{ padding: 0 }} value="0">
              {tabDaySorting('0')}
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="1">
              {tabDaySorting('1')}
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="2">
              {tabDaySorting('2')}
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="3">
              {tabDaySorting('3')}
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="4">
              {tabDaySorting('4')}
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="5">
              {tabDaySorting('5')}
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="6">
              {tabDaySorting('6')}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  )
}
