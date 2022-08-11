import WeeklySchedule from '../WeeklySchedule/WeeklySchedule'

export const QUERY = gql`
  query NextWeekViewerInfosQuery(
    $start: DateTime
    $end: DateTime
    $unit_id: Int!
  ) {
    aircrafts {
      id
      unit_id
      status_id
      sorties: publishedSortiesRange(
        start: $start
        end: $end
        unit_id: $unit_id
      ) {
        id
        required_fuel
        projected_launch
        projected_land
        config
      }
      calendar_inspections {
        id
        frequency
        last_completed
        inspection_details
      }
      spareFlyers: publishedSpareFlyersInDateRange(start: $start, end: $end) {
        date
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = (aircrafts) => {
  return (
    <WeeklySchedule
      aircrafts={aircrafts.aircrafts}
      start={aircrafts.start}
      end={aircrafts.end}
    />
  )
}
