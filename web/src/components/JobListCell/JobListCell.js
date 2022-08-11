import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Box, Typography } from '@mui/material'

import FilteredMxListInfoCell from '../FilteredMxListInfoCell/FilteredMxListInfoCell'
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from '../CustomizedAccordions'
import { OpenJobPanelContext } from 'src/pages/AircraftDetailsPage/AircraftDetailsPage'

import formatTailNumber from 'src/functions/formatTailNumber'

export const QUERY = gql`
  query FindJobListQuery {
    jobList: aircrafts {
      name
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ jobList }) => {
  const { currentUser } = useAuth()

  const [expanded, setExpanded] = useState(null)
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : null)
  }

  const [jobExpanded, setJobExpanded] = useState(false)
  const handlePanelChange = (panel) => (event, newExpanded) => {
    setJobExpanded(newExpanded ? panel : false)
  }

  let planes = jobList.map((aircraft) => {
    return (
      <StyledAccordion
        key={aircraft.id}
        expanded={expanded === aircraft.id}
        onChange={handleChange(aircraft.id)}
      >
        <StyledAccordionSummary
          fullWidth
          display="flex"
          sx={{ justifyContent: 'space-around', minHeight: '80px' }}
        >
          <Typography>
            <Typography variant="h4">
              A/C {formatTailNumber(aircraft.id)}
            </Typography>
            <Link to={routes.aircraftDetails({ id: aircraft.id })}>
              Link to Aircraft
            </Link>
          </Typography>

          <Typography variant="h5">The {aircraft.name}</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <Typography variant="h5">
            <b>JCN List</b>
          </Typography>
        </StyledAccordionDetails>

        <StyledAccordionDetails
          sx={{ paddingTop: 0, paddingRight: 0, paddingBottom: 1 }}
        >
          <OpenJobPanelContext.Provider
            value={{ jobExpanded, handlePanelChange }}
          >
            <Box sx={{ width: '100vw', paddingTop: 0 }}>
              <FilteredMxListInfoCell
                id={aircraft.id}
                shop_id={currentUser.shop.id}
              />
            </Box>
          </OpenJobPanelContext.Provider>
        </StyledAccordionDetails>
      </StyledAccordion>
    )
  })

  return planes
}
