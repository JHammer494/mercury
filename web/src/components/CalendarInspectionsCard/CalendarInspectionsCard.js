import { Box, Button, Card, Typography } from '@mui/material'
import { addDays } from 'date-fns'

import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from '../CustomizedAccordions'
import { longFormat } from 'src/functions/dateFormats'

export default function CalendarInspectionsCard({ calendarInspections = [] }) {
  const [expanded, setExpanded] = React.useState(null)

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : null)
  }

  return (
    <Card sx={{ height: '100%', width: 'calc(50vw - 12px)' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px',
        }}
      >
        <h2 style={{ margin: 0 }}>Calendar Inspections</h2>
        <Button variant="contained">Add New</Button>
      </Box>
      {calendarInspections.length
        ? calendarInspections.map((insp) => {
            const dueDate = addDays(
              new Date(insp.last_completed),
              insp.frequency
            )

            return (
              <StyledAccordion
                key={insp.id}
                expanded={expanded === insp.id}
                onChange={handleChange(insp.id)}
              >
                <StyledAccordionSummary>
                  <Typography style={{ margin: 0 }}>{insp.name}</Typography>
                  <Typography>due {longFormat(dueDate)}</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                  <Typography>{insp.inspection_details}</Typography>
                  <Typography>
                    last completed {longFormat(insp.last_completed)}
                  </Typography>
                </StyledAccordionDetails>
              </StyledAccordion>
            )
          })
        : 'No inspections found.'}
    </Card>
  )
}
