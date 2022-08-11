import {
  Box,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  Modal,
  Select,
  TextField,
  Typography,
  FormControl,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useMutation } from '@redwoodjs/web'
import { AircraftEditModalContext } from 'src/pages/AircraftDetailsPage/AircraftDetailsPage'

export const QUERY = gql`
  query FindEditAircraftDetailQuery($id: Int!) {
    aircraft(id: $id) {
      id
      driver_jcn_id
      flight_hours
      fuel_quant
      parking_location
      preflight_inspection
      status_id
      config
      cur_oxygen
      driver_jcn {
        id
        etic
      }
      all_jcns {
        jcn_id
        discrepancy
      }
    }
    statuses {
      id
    }
  }
`

const SUBMIT_AIRCRAFT_EDIT = gql`
  mutation updateAircraft(
    $id: Int!
    $driver_jcn_id: String
    $flight_hours: Float
    $fuel_quant: Int
    $parking_location: String
    $preflight_inspection: DateTime
    $status_id: String
    $config: String
    $cur_oxygen: Int
  ) {
    updateAircraft(
      id: $id
      input: {
        driver_jcn_id: $driver_jcn_id
        flight_hours: $flight_hours
        parking_location: $parking_location
        fuel_quant: $fuel_quant
        preflight_inspection: $preflight_inspection
        status_id: $status_id
        config: $config
        cur_oxygen: $cur_oxygen
      }
    ) {
      id
    }
  }
`

const UPDATE_ETIC = gql`
  mutation updateJCN($id: Int!, $etic: DateTime) {
    updateJCN(id: $id, input: { etic: $etic }) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ aircraft, statuses }) => {
  const { open, handleClose } = React.useContext(AircraftEditModalContext)
  const [etic, setEtic] = React.useState(aircraft?.driver_jcn?.etic)
  const [flightHours, setFlightHours] = React.useState(aircraft?.flight_hours)
  const [location, setLocation] = React.useState(aircraft?.parking_location)
  const [fuel, setFuel] = React.useState(aircraft?.fuel_quant)
  const [status, setStatus] = React.useState(aircraft?.status_id)
  const [config, setConfig] = React.useState(aircraft?.config)
  const [oxygen, setOxygen] = React.useState(aircraft?.cur_oxygen)
  const [statusDriver, setStatusDriver] = React.useState(
    aircraft?.driver_jcn_id
  )
  const [preflight, setPreflight] = React.useState(
    aircraft?.preflight_inspection
  )
  const [mAcft] = useMutation(SUBMIT_AIRCRAFT_EDIT)
  const [mJCN] = useMutation(UPDATE_ETIC)

  const handleChange = (e, state) => {
    state(e.target.value)
  }

  const handleIntChange = (e, state) => {
    state(parseInt(e.target.value))
  }

  const handleSubmit = () => {
    mAcft({
      variables: {
        id: aircraft.id,
        driver_jcn_id: statusDriver,
        parking_location: location,
        flight_hours: flightHours,
        fuel_quant: fuel,
        status_id: status,
        preflight_inspection: preflight,
        cur_oxygen: oxygen,
        config: config,
      },
    })
    mJCN({
      variables: {
        id: aircraft.driver_jcn?.id,
        etic: etic,
      },
    })
    handleClose()
  }
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          postition: 'absolute',
          marginTop: '30%',
          marginLeft: '50%',
          padding: '15px',
          transform: 'translate(-50%, -50%)',
          border: '2px solid #000',
          backgroundColor: 'whitesmoke',
          width: 800,
        }}
      >
        <Typography variant="h4" sx={{ marginTop: 5, marginLeft: 5 }}>
          Edit Aircraft Details
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Grid
            container
            spacing={2}
            sx={{ textAlign: 'center', marginTop: 2 }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="statusInputLabel">Status Driver</InputLabel>
                  <Select
                    labelid="statusDriverJCN"
                    id="statusDriverId"
                    label="Status Driver"
                    defaultValue={statusDriver}
                    onChange={(e) => {
                      handleChange(e, setStatusDriver)
                    }}
                    fullWidth
                  >
                    {aircraft.all_jcns.map((jcn) => (
                      <MenuItem key={jcn.jcn_id} value={jcn.jcn_id}>
                        {jcn.jcn_id} {jcn.discrepancy}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <InputLabel id="StatusInputLabel">Status</InputLabel>
                <Select
                  id="acStatus"
                  label="Status"
                  ladelid="statusId"
                  value={status}
                  onChange={(e) => {
                    handleChange(e, setStatus)
                  }}
                  fullWidth
                >
                  {statuses.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="fuelQuant"
                label="Fuel"
                type={'number'}
                defaultValue={fuel}
                onChange={(e) => {
                  handleIntChange(e, setFuel)
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="acftLocation"
                label="Location"
                defaultValue={location}
                onChange={(e) => {
                  handleChange(e, setLocation)
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} fullWidth />}
                  label="Preflight"
                  value={preflight}
                  onChange={(e) => {
                    setPreflight(e)
                  }}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="airframeHours"
                label="Airframe Hours"
                defaultValue={flightHours}
                onChange={(e) => {
                  handleIntChange(e, setFlightHours)
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} fullWidth />}
                  label="ETIC"
                  value={etic}
                  onChange={(e) => {
                    setEtic(e)
                  }}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="curOxygen"
                label="Oxygen"
                defaultValue={oxygen}
                onChange={(e) => {
                  handleIntChange(e, setOxygen)
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="weapons"
                label="WPNS"
                defaultValue={config}
                onChange={(e) => {
                  handleChange(e, setConfig)
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="configuration"
                label="Config"
                defaultValue={config}
                onChange={(e) => {
                  handleChange(e, setConfig)
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3} s={3} md={3} lg={3} xl={3}>
              <Button
                variant="outlined"
                size="large"
                color="warning"
                onClick={handleClose}
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={3} s={3} md={3} lg={3} xl={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  )
}
