import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { useContext, useState } from 'react'
import { format } from 'date-fns'

import { OpenJobPanelContext } from 'src/pages/AircraftDetailsPage/AircraftDetailsPage'

export const QUERY = gql`
  query AircraftNotesQuery($aircraft_id: Int!) {
    aircraftNotes(aircraft_id: $aircraft_id) {
      id
      aircraft_id
      timestamp
      note
      user {
        first_name
        last_name
      }
      jcn {
        id
        jcn_id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No notes to show.</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ aircraftNotes, searchString }) => {
  const { setJobExpanded } = useContext(OpenJobPanelContext)

  const [panel, setPanel] = useState(false)

  const changePanel = (panel) => (event, isExpanded) => {
    setPanel(isExpanded ? panel : false)
  }

  const renderNotes = () => {
    return (
      <>
        {aircraftNotes
          .filter((note) =>
            note.note.toLowerCase().includes(searchString.toLowerCase())
          )
          .map((note) => (
            <Accordion
              key={note.id}
              expanded={panel === note.id}
              onChange={changePanel(note.id)}
              sx={{ contain: 'content' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ justifyContent: 'left' }}
              >
                <Stack orientation="vertical" spacing={2}>
                  <Typography>
                    {format(new Date(note.timestamp), 'PPP @ HHmm')}
                  </Typography>
                  {note.jcn ? (
                    <Box>
                      JCN #:{' '}
                      <Link
                        href={`#${note.jcn.jcn_id}`}
                        onClick={() => setJobExpanded(note.jcn.id)}
                      >
                        {note.jcn.jcn_id}
                      </Link>
                    </Box>
                  ) : null}
                  <Typography noWrap={panel !== note.id ? true : false}>
                    {note.note}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {note.user.last_name}, {note.user.first_name}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </>
    )
  }

  return <Box>{renderNotes()}</Box>
}
