import * as React from 'react'
import { format } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useMutation } from '@redwoodjs/web'
import CircularProgress from '@mui/material/CircularProgress'
import {
  Modal,
  TextField,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Autocomplete,
} from '@mui/material/'
import { AddJcnModalContext } from 'src/pages/AircraftDetailsPage/AircraftDetailsPage'

export const QUERY = gql`
  query FindAddJcnWceModalQuery($unit_id: Int!) {
    shops {
      id
    }
    whenDiscovereds {
      id
      description
    }
    workUnitCodes {
      id
      description
    }
    users {
      id
      first_name
      last_name
    }
    jcns(unit_id: $unit_id) {
      jcn_id
    }
  }
`

const SUBMIT_JCN_MUTATION = gql`
  mutation createJcn(
    $jcn_id: String!
    $aircraft_id: Int!
    $unit_id: Int!
    $work_unit_code_id: String!
    $discrepancy: String!
    $symbol: String!
    $when_discovered_id: String!
    $shop_id: String!
    $discovered_by_user_id: Int!
    $etic: DateTime!
  ) {
    createJCN(
      input: {
        jcn_id: $jcn_id
        aircraft_id: $aircraft_id
        unit_id: $unit_id
        work_unit_code_id: $work_unit_code_id
        discrepancy: $discrepancy
        symbol: $symbol
        when_discovered_id: $when_discovered_id
        shop_id: $shop_id
        discovered_by_user_id: $discovered_by_user_id
        etic: $etic
      }
    ) {
      id
    }
  }
`

const SUBMIT_WCE_MUTATION = gql`
  mutation createWce(
    $wce_id: Int!
    $jcn_id: String!
    $unit_id: Int!
    $when_discovered_id: String!
    $symbol: String!
    $work_unit_code_id: String!
    $start_time: DateTime!
    $shop_id: String!
    $discovered_by_user_id: Int!
    $discrepancy: String! # $when_created: DateTime!
  ) {
    createWCE(
      input: {
        wce_id: $wce_id
        jcn_id: $jcn_id
        unit_id: $unit_id
        when_discovered_id: $when_discovered_id
        symbol: $symbol
        work_unit_code_id: $work_unit_code_id
        start_time: $start_time
        shop_id: $shop_id
        discovered_by_user_id: $discovered_by_user_id
        discrepancy: $discrepancy
      }
    ) {
      id
    }
  }
`

export const Loading = () => (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  shops,
  whenDiscovereds,
  workUnitCodes,
  users,
  jcns,
}) => {
  const { open, handleClose, aircraft } = React.useContext(AddJcnModalContext)

  const [mJcn] = useMutation(SUBMIT_JCN_MUTATION)
  const [mWce] = useMutation(SUBMIT_WCE_MUTATION)

  const [jcn, setJcn] = React.useState(format(new Date(), 'yyDDD'))
  const [occupiedJcns] = React.useState(jcns.map((jcn) => jcn.jcn_id))
  const [jcnHelperText, setJcnHelperText] = React.useState('')
  const [discrepancy, setDiscrepancy] = React.useState('')
  const [wuc, setWuc] = React.useState('')
  const [symbol, setSymbol] = React.useState('')
  const [whenDiscovered, setWhenDiscovered] = React.useState('')
  const [startTime, setStartTime] = React.useState('')
  const [workCenter, setWorkCenter] = React.useState('')
  const [discoveredBy, setDiscoveredBy] = React.useState('')
  const [etic, setEtic] = React.useState('')

  const [jcnError, setJcnError] = React.useState(false)
  const [discrepancyError, setDiscrepancyError] = React.useState(false)
  const [wucError, setWucError] = React.useState(false)
  const [symbolError, setSymbolError] = React.useState(false)
  const [whenDiscoveredError, setWhenDiscoveredError] = React.useState(false)
  const [startTimeError, setStartTimeError] = React.useState(false)
  const [workCenterError, setWorkCenterError] = React.useState(false)
  const [discoveredByError, setDiscoveredByError] = React.useState(false)

  const inputStates = [
    jcn,
    discrepancy,
    wuc,
    symbol,
    whenDiscovered,
    startTime,
    workCenter,
    discoveredBy,
  ]

  const inputStateMutators = [
    setDiscrepancy,
    setWuc,
    setSymbol,
    setWhenDiscovered,
    setStartTime,
    setWorkCenter,
    setDiscoveredBy,
    setEtic,
  ]

  const errorStates = [
    jcnError,
    discrepancyError,
    wucError,
    symbolError,
    whenDiscoveredError,
    startTimeError,
    workCenterError,
    discoveredByError,
  ]

  const errorStateMutators = [
    setJcnError,
    setDiscrepancyError,
    setWucError,
    setSymbolError,
    setWhenDiscoveredError,
    setStartTimeError,
    setWorkCenterError,
    setDiscoveredByError,
  ]

  const clearStateValues = () => {
    inputStateMutators.forEach((mutator) => mutator(''))
    errorStateMutators.forEach((mutator) => mutator(false))
    setJcn(format(new Date(), 'yyDDD'))
    setJcnHelperText('')
  }

  const handleSelectChange = (
    eventTargetValue,
    valueMutator,
    error,
    errorMutator
  ) => {
    valueMutator(eventTargetValue)

    error ? errorMutator(false) : null
  }

  const handleJcnChange = (eventTargetValue) => {
    setJcn(eventTargetValue)
    if (eventTargetValue.length < 9) {
      jcnHelperText ? setJcnHelperText('') : null
      jcnError ? setJcnError(false) : null
    } else {
      occupiedJcns.includes(eventTargetValue)
        ? (setJcnError(true), setJcnHelperText('* JCN taken - try another * '))
        : (setJcnError(false), setJcnHelperText(''))
    }
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

  const evaluateStates = () => {
    const allStatesDefined = inputStates.every((state) => state !== '')
    if (!allStatesDefined) {
      for (let i = 0; i < inputStates.length; i++) {
        if (inputStates[i] === '') {
          errorStateMutators[i](true)
        }
      }
    }

    if (jcn.length < 9) {
      setJcnError(true)
      setJcnHelperText('* JCN must be 9 digits long * ')

      return false
    }

    const allStatesNonError = errorStates.every((error) => error !== true)
    if (allStatesNonError) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async () => {
    if (evaluateStates()) {
      await mJcn({
        variables: {
          jcn_id: jcn,
          aircraft_id: aircraft.id,
          unit_id: aircraft.unit_id,
          when_discovered_id: whenDiscovered.id,
          symbol: symbol,
          work_unit_code_id: wuc.id,
          start_time: startTime,
          etic: etic,
          shop_id: workCenter.id,
          discovered_by_user_id: discoveredBy,
          discrepancy: discrepancy,
        },
      })

      await mWce({
        variables: {
          wce_id: 1,
          jcn_id: jcn,
          unit_id: aircraft.unit_id,
          when_discovered_id: whenDiscovered.id,
          symbol: symbol,
          work_unit_code_id: wuc.id,
          start_time: startTime,
          shop_id: workCenter.id,
          discovered_by_user_id: discoveredBy,
          discrepancy: discrepancy,
        },
      })
      clearStateValues()

      handleClose()
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
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
          <h1>Create Job</h1>
          <Stack direction="row">
            <Box sx={{ width: '50%', height: '100%' }}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <TextField
                    disabled
                    id="tailNumberTextField"
                    label="Tail #"
                    defaultValue={aircraft.id}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <TextField
                    required
                    id="jcnTextField"
                    label="JCN"
                    value={jcn}
                    error={jcnError}
                    helperText={jcnHelperText}
                    onChange={(e) =>
                      handleJcnChange(
                        e.target.value.replace(/\D/g, ''),
                        setJcn,
                        jcnError,
                        setJcnError
                      )
                    }
                    fullWidth
                    inputProps={{
                      maxLength: 9,
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Autocomplete
                    disablePortal
                    id="whenDiscoveredCombo"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(e, newValue) =>
                      handleAutoCompleteChange(
                        newValue,
                        setWhenDiscovered,
                        whenDiscoveredError,
                        setWhenDiscoveredError
                      )
                    }
                    options={whenDiscovereds.map((whenDiscovered) => {
                      return {
                        label: `${whenDiscovered.id} - ${whenDiscovered.description}`,
                        ...whenDiscovered,
                      }
                    })}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={whenDiscoveredError}
                        required
                        label="When Disc."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <FormControl error={symbolError} fullWidth required>
                    <InputLabel id="symbolInputLabel">Symbol</InputLabel>
                    <Select
                      labelId="symbolLabel"
                      id="symbolLabelId"
                      value={symbol}
                      label="Symbol"
                      onChange={(e) =>
                        handleSelectChange(
                          e.target.value,
                          setSymbol,
                          symbolError,
                          setSymbolError
                        )
                      }
                      fullWidth
                    >
                      {['-', '/', 'X'].map((symbol) => (
                        <MenuItem key={symbol} value={symbol}>
                          {symbol}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Autocomplete
                    disablePortal
                    id="wucCombo"
                    onChange={(e, newValue) =>
                      handleAutoCompleteChange(
                        newValue,
                        setWuc,
                        wucError,
                        setWucError
                      )
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    options={workUnitCodes.map((wuc) => {
                      return {
                        label: `${wuc.id} - ${wuc.description}`,
                        ...wuc,
                      }
                    })}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={wucError}
                        required
                        label="WUC"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Start Date/Time"
                      value={startTime}
                      ampm={false}
                      onChange={(newValue) =>
                        handleAutoCompleteChange(
                          newValue,
                          setStartTime,
                          startTimeError,
                          setStartTimeError
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          error={startTimeError}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="ETIC"
                      value={etic}
                      ampm={false}
                      onChange={(newValue) => setEtic(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} error={false} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Autocomplete
                    disablePortal
                    id="workcenterCombo"
                    onChange={(e, newValue) =>
                      handleAutoCompleteChange(
                        newValue,
                        setWorkCenter,
                        workCenterError,
                        setWorkCenterError
                      )
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    options={shops.map((shop) => {
                      return {
                        label: shop.id,
                        ...shop,
                      }
                    })}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={workCenterError}
                        required
                        label="Workcenter"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <FormControl error={discoveredByError} fullWidth required>
                    <InputLabel id="DiscoveredByInputLabel">
                      Discovered By
                    </InputLabel>
                    <Select
                      labelId="DiscoveredByLabel"
                      id="DiscoveredByLabelId"
                      value={discoveredBy}
                      label="Discovered By"
                      onChange={(e) =>
                        handleSelectChange(
                          e.target.value,
                          setDiscoveredBy,
                          discoveredByError,
                          setDiscoveredByError
                        )
                      }
                      fullWidth
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.last_name}, {user.first_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ width: '50%', height: '100%' }}>
              <Grid container spacing={1} style={{ paddingLeft: '8px' }}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    required
                    id="discrepancyText"
                    label="Discrepancy"
                    multiline
                    fullWidth
                    rows={7.16}
                    value={discrepancy}
                    error={discrepancyError}
                    onChange={(e) =>
                      handleSelectChange(
                        e.target.value,
                        setDiscrepancy,
                        discrepancyError,
                        setDiscrepancyError
                      )
                    }
                  />
                  <Grid container spacing={1} style={{ paddingTop: '8px' }}>
                    <Grid item xs={6} s={6} md={6} lg={6} xl={6}>
                      <Button
                        onClick={() => {
                          clearStateValues()
                          handleClose()
                        }}
                        color="warning"
                        variant="outlined"
                        size="large"
                        fullWidth
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={6} s={6} md={6} lg={6} xl={6}>
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
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
