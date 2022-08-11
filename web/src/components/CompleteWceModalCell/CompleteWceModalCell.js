import {
  Box,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Modal,
  Typography,
  Button,
  Grid,
  Autocomplete,
} from '@mui/material'
import { CompletionWceModalContext } from 'src/components/MxList/MxList'
import { useMutation } from '@redwoodjs/web'

export const QUERY = gql`
  query CompleteWCEInfoQuery($shop_id: String!) {
    typeMXInfo: typeMxes {
      id
      description
    }
    usersInfo: users(shop_id: $shop_id) {
      id
      first_name
      last_name
    }
    howMalsInfo: howMals {
      id
      description
    }
    actionTakenInfo: actionTakens {
      description
      id
    }
  }
`

const SUBMIT_WCE_MUTATION = gql`
  mutation mutateWce(
    $wce_id: Int!
    $jcn_id: String!
    $unit_id: Int!
    $how_mal_id: String!
    $type_mx_id: String!
    $action_taken_id: String!
    $corrective_action: String!
    $corrected_by_user_id: Int!
    $inspected_by_user_id: Int!
    $stop_time: DateTime!
  ) {
    completeWCE(
      wce_id: $wce_id
      jcn_id: $jcn_id
      unit_id: $unit_id
      input: {
        how_mal_id: $how_mal_id
        type_mx_id: $type_mx_id
        action_taken_id: $action_taken_id
        corrective_action: $corrective_action
        corrected_by_user_id: $corrected_by_user_id
        inspected_by_user_id: $inspected_by_user_id
        stop_time: $stop_time
      }
    ) {
      wce_id
      jcn_id
      unit_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  typeMXInfo,
  usersInfo,
  howMalsInfo,
  actionTakenInfo,
}) => {
  const { open, handleClose, jcn, wce, formatDate } = React.useContext(
    CompletionWceModalContext
  )

  const [mWce] = useMutation(SUBMIT_WCE_MUTATION)

  const [allUsers] = React.useState(
    usersInfo.map((user) => {
      return { label: `${user.last_name}, ${user.first_name}`, ...user }
    })
  )

  const [typeMX, setTypeMX] = React.useState('')
  const [howMal, setHowMal] = React.useState('')
  const [actionTaken, setActionTaken] = React.useState('')
  const [correctiveAction, setCorrectiveAction] = React.useState('')
  const [correctedBy, setCorrectedBy] = React.useState('')
  const [inspectedBy, setInspectedBy] = React.useState('')

  const [typeMXError, setTypeMXError] = React.useState(false)
  const [howMalError, setHowMalError] = React.useState(false)
  const [actionTakenError, setActionTakenError] = React.useState(false)
  const [correctiveActionError, setCorrectiveActionError] =
    React.useState(false)
  const [correctedByError, setCorrectedByError] = React.useState(false)
  const [inspectedByError, setInspectedByError] = React.useState(false)

  const inputStates = [
    typeMX,
    howMal,
    actionTaken,
    correctiveAction,
    correctedBy,
    inspectedBy,
  ]

  const inputStateMutators = [
    setTypeMX,
    setHowMal,
    setActionTaken,
    setCorrectiveAction,
    setCorrectedBy,
    setInspectedBy,
  ]

  const errorStateMutators = [
    setTypeMXError,
    setHowMalError,
    setActionTakenError,
    setCorrectiveActionError,
    setCorrectedByError,
    setInspectedByError,
  ]

  const clearStateValues = () => {
    inputStateMutators.forEach((mutator) => mutator(''))
    errorStateMutators.forEach((mutator) => mutator(false))
  }

  const handleChange = (event, valueMutator, error, errorMutator) => {
    valueMutator(event.target.value)

    error ? errorMutator(false) : null
  }

  const handleAutoCompleteChange = (
    newValue,
    valueMutator,
    error,
    errorMutator
  ) => {
    valueMutator(newValue)

    error ? errorMutator(false) : null
  }

  const handleSubmit = () => {
    const allStatesNonNull = inputStates.every((state) => state !== '')
    if (allStatesNonNull) {
      mWce({
        variables: {
          wce_id: wce.wce_id,
          jcn_id: jcn.jcn_id,
          unit_id: wce.unit_id,
          how_mal_id: howMal.id,
          type_mx_id: typeMX.id,
          action_taken_id: actionTaken.id,
          corrective_action: correctiveAction,
          corrected_by_user_id: correctedBy.id,
          inspected_by_user_id: inspectedBy.id,
          stop_time: new Date(),
        },
      })

      clearStateValues()

      handleClose()
    } else {
      for (let i = 0; i < inputStates.length; i++) {
        if (inputStates[i] === '') {
          errorStateMutators[i](true)
        }
      }
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '65vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px',
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            borderRadius: '5px',
          }}
        >
          <Grid container spacing={1} sx={{ padding: '10px' }}>
            <Grid item sm md lg textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}>JCN ID:</Typography>
              <Typography>{jcn?.jcn_id}</Typography>
            </Grid>

            <Grid item sm md lg textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}>Symbol:</Typography>
              <Typography sx={{ color: 'red' }}>
                <b>{jcn?.symbol}</b>
              </Typography>
            </Grid>
            <Grid item sm={4} md={4} lg={4} textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}>Discrepancy:</Typography>
              <Typography noWrap={true}> {jcn?.discrepancy}</Typography>
            </Grid>
            <Grid item sm md lg textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}>WUC:</Typography>
              <Typography> {jcn?.work_unit_code_id}</Typography>
            </Grid>
            <Grid item sm={2} md={2} lg={2} textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}>Created:</Typography>
              <Typography>
                {jcn ? formatDate(jcn.when_created) : null}
              </Typography>
            </Grid>
            <Grid item sm={2} md={2} lg={2} textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}> When Discovered:</Typography>
              <Typography>{jcn?.when_discovered_id}</Typography>
            </Grid>
            <Grid item sm md lg textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}>Shop:</Typography>
              <Typography>{jcn?.shop_id}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider orientation="horizontal" flexItem sx={{ margin: '5px' }} />

        <Box
          sx={{
            marginTop: '8px',
            borderRadius: '5px',
          }}
        >
          <Grid container spacing={1} sx={{ padding: '10px' }}>
            <Grid item sm md lg textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}>WCE ID:</Typography>
              <Typography>{wce?.wce_id}</Typography>
            </Grid>

            <Grid item sm md lg textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}>Symbol:</Typography>
              <Typography sx={{ color: 'red' }}>
                <b>{wce?.symbol}</b>
              </Typography>
            </Grid>
            <Grid item sm={5} md={5} lg={5} textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}>Discrepancy:</Typography>
              <Typography> {wce?.discrepancy}</Typography>
            </Grid>
            <Grid item sm md lg textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}>WUC:</Typography>
              <Typography> {wce?.work_unit_code_id}</Typography>
            </Grid>
            <Grid item sm md lg textAlign={'center'}>
              <Typography sx={{ color: 'gray' }}>Shop:</Typography>
              <Typography>{wce?.shop_id}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={1}>
          <Grid item sm={6} md={6} lg={6}>
            <Autocomplete
              disablePortal
              id="howMalsCombo"
              value={howMal}
              onChange={(e, newValue) =>
                handleAutoCompleteChange(
                  newValue,
                  setHowMal,
                  howMalError,
                  setHowMalError
                )
              }
              options={howMalsInfo.map((howMal) => {
                return {
                  label: `${howMal.id} - ${howMal.description}`,
                  ...howMal,
                }
              })}
              fullWidth
              sx={{ marginBottom: '8px' }}
              error={howMalError}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={howMalError}
                  required
                  label="How Mal"
                />
              )}
            />

            <Autocomplete
              disablePortal
              id="typeMxCombo"
              value={typeMX}
              onChange={(e, newValue) =>
                handleAutoCompleteChange(
                  newValue,
                  setTypeMX,
                  typeMXError,
                  setTypeMXError
                )
              }
              options={typeMXInfo.map((typeMX) => {
                return {
                  label: `${typeMX.id} - ${typeMX.description}`,
                  ...typeMX,
                }
              })}
              fullWidth
              sx={{ marginBottom: '8px' }}
              error={typeMXError}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={typeMXError}
                  required
                  label="Type MX"
                />
              )}
            />

            <Autocomplete
              disablePortal
              id="actionTakenCombo"
              value={actionTaken}
              onChange={(e, newValue) =>
                handleAutoCompleteChange(
                  newValue,
                  setActionTaken,
                  actionTakenError,
                  setActionTakenError
                )
              }
              options={actionTakenInfo.map((actionTaken) => {
                return {
                  label: `${actionTaken.id} - ${actionTaken.description}`,
                  ...actionTaken,
                }
              })}
              fullWidth
              sx={{ marginBottom: '8px' }}
              error={typeMXError}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={actionTakenError}
                  required
                  label="Action Taken"
                />
              )}
            />
          </Grid>
          <Grid item sm={6} md={6} lg={6}>
            <TextField
              id="correctiveActionText"
              label="Corrective Action"
              required
              error={correctiveActionError}
              multiline
              fullWidth
              rows={6.52}
              value={correctiveAction}
              onChange={(e) =>
                handleChange(
                  e,
                  setCorrectiveAction,
                  correctiveActionError,
                  setCorrectiveActionError
                )
              }
            />
          </Grid>
        </Grid>

        <Divider orientation="horizontal" flexItem sx={{ margin: '5px' }} />

        <Grid container spacing={1}>
          <Grid item sm={6} md={6} lg={6}>
            <Autocomplete
              disablePortal
              id="correctedByCombo"
              value={correctedBy}
              onChange={(e, newValue) =>
                handleAutoCompleteChange(
                  newValue,
                  setCorrectedBy,
                  correctedByError,
                  setCorrectedByError
                )
              }
              options={allUsers}
              fullWidth
              sx={{ marginBottom: '8px' }}
              error={correctedByError}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={correctedByError}
                  required
                  label="Corrected By"
                />
              )}
            />
          </Grid>

          <Grid item sm={6} md={6} lg={6}>
            <Autocomplete
              disablePortal
              id="inspectedByCombo"
              value={inspectedBy}
              onChange={(e, newValue) =>
                handleAutoCompleteChange(
                  newValue,
                  setInspectedBy,
                  inspectedByError,
                  setInspectedByError
                )
              }
              options={allUsers}
              fullWidth
              sx={{ marginBottom: '8px' }}
              error={inspectedByError}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={inspectedByError}
                  required
                  label="Inspected By"
                />
              )}
            />
          </Grid>
        </Grid>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ marginTop: '16px', marginBottom: '-8px' }}
        >
          <Button
            onClick={() => {
              clearStateValues()
              handleClose()
            }}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
