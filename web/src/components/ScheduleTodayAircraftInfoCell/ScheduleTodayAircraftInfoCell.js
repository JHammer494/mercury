import ScheduleTodayAircraftInfo from '../ScheduleTodayAircraftInfo/ScheduleTodayAircraftInfo'

export const QUERY = gql`
  query FindScheduleTodayAircraftInfoQuery($id: Int!) {
    scheduleTodayAircraftInfo: aircraft(id: $id) {
      fuel_quant
      parking_location
      config
      driver_jcn {
        discrepancy
        work_unit_code_id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ scheduleTodayAircraftInfo }) => {
  return <ScheduleTodayAircraftInfo aircraftInfo={scheduleTodayAircraftInfo} />
}
