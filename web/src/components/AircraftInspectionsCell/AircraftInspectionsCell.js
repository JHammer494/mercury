import CalendarInspectionsCard from '../CalendarInspectionsCard/CalendarInspectionsCard'
import HourlyInspectionsCard from '../HourlyInspectionsCard/HourlyInspectionsCard'

export const QUERY = gql`
  query AircraftInspectionsQuery($id: Int!) {
    aircraft(id: $id) {
      id
      calendar_inspections {
        aircraft_id
        id
        name
        inspection_details
        frequency
        last_completed
      }
      hourly_inspection {
        aircraft_id
        id
        name
        inspection_details
        frequency
        last_completed
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ aircraft }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-evenly',
      }}
    >
      <CalendarInspectionsCard
        calendarInspections={aircraft.calendar_inspections}
      />
      <HourlyInspectionsCard hourlyInspections={aircraft.hourly_inspection} />
    </div>
  )
}
