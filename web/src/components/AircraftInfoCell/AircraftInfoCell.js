import AircraftInfo from '../AircraftInfo/AircraftInfo'

export const beforeQuery = ({ id }) => {
  const INTERVAL = 30000
  return { variables: { id: id }, pollInterval: INTERVAL }
}

export const QUERY = gql`
  query FindAircraftInfoQuery($id: Int!) {
    aircraftInfo: aircraft(id: $id) {
      config
      cur_oxygen
      flight_hours
      fuel_quant
      id
      status_id
      driver_jcn {
        etic
        work_unit_code_id
      }
      parking_location
      preflight_inspection
      sorties {
        actual_land
        projected_launch
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ aircraftInfo }) => {
  return <AircraftInfo aircraftInfo={aircraftInfo} />
}
