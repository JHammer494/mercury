import * as React from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Grid,
} from '@mui/material'
import { useMutation } from '@redwoodjs/web'
import { AddNoteModalContext } from 'src/pages/AircraftDetailsPage/AircraftDetailsPage'
import { useAuth } from '@redwoodjs/auth'

export const QUERY = gql`
  query FetchUnitJcns($aircraft_id: Int!, $unit_id: Int!) {
    aircraftJcns: aircraft(id: $aircraft_id) {
      all_jcns(unit_id: $unit_id) {
        id
        jcn_id
        discrepancy
        shop_id
        symbol
        when_discovered_id
        work_unit_code_id
        when_created
      }
    }
  }
`

const SUBMIT_NOTE_MUTATION = gql`
  mutation createAircraftNote(
    $note: String!
    $user_id: Int!
    $aircraft_id: Int!
    $jcn_id: Int
  ) {
    createAircraftNote(
      input: {
        note: $note
        user_id: $user_id
        aircraft_id: $aircraft_id
        jcn_id: $jcn_id
      }
    ) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ aircraftJcns }) => {
  const { currentUser } = useAuth()
  const { open, handleClose, aircraft } = React.useContext(AddNoteModalContext)

  const [noteText, setNoteText] = React.useState('')
  const [noteTextError, setNoteTextError] = React.useState(false)
  const [attachedJcn, setAttachedJcn] = React.useState({ id: null })

  const [mNote] = useMutation(SUBMIT_NOTE_MUTATION)

  const clearStateValues = () => {
    setNoteText('')
    setNoteTextError(false)
    setAttachedJcn('')
  }

  const handleSubmit = () => {
    if (noteText !== '') {
      mNote({
        variables: {
          note: noteText,
          user_id: currentUser.id,
          aircraft_id: aircraft.id,
          jcn_id: attachedJcn.id,
        },
      })

      clearStateValues()

      handleClose()
    } else {
      setNoteTextError(true)
    }
  }

  const handleTextFieldChange = (event, valueMutator, error, errorMutator) => {
    valueMutator(event.target.value)

    error ? errorMutator(false) : null
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px',
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>New Note</h1>

          <Grid container spacing={1} direction="column">
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <TextField
                required
                id="noteTextField"
                label="New Note"
                value={noteText}
                error={noteTextError}
                onChange={(e) =>
                  handleTextFieldChange(
                    e,
                    setNoteText,
                    noteTextError,
                    setNoteTextError
                  )
                }
                fullWidth
                multiline
                rows={7}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Autocomplete
                fullWidth
                disablePortal
                id="jcnCombo"
                sx={{ paddingBottom: '7px' }}
                onChange={(e, newValue) => {
                  setAttachedJcn(newValue)
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={aircraftJcns.all_jcns.map((jcn) => {
                  return {
                    label: `${jcn.jcn_id} - ${jcn.discrepancy}`,
                    ...jcn,
                  }
                })}
                renderInput={(params) => <TextField {...params} label="JCN" />}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            direction="row"
            sx={{ justifyContent: 'right' }}
          >
            <Grid item xs={3} s={3} md={3} lg={3} xl={3}>
              <Button
                onClick={handleClose}
                variant="outlined"
                size="large"
                color="warning"
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={3} s={3} md={3} lg={3} xl={3}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                size="large"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}
