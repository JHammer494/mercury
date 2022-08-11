export const QUERY = gql`
  query FindSortiecounterQuery(
    $start: DateTime!
    $end: DateTime!
    $unit_id: Int!
  ) {
    sorties: sortiesInDateRange(start: $start, end: $end, unit_id: $unit_id) {
      id
      required_fuel
      projected_launch
      projected_land
      config
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>0</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ sorties }) => {
  return <p>{sorties.filter((sortie) => sortie.actual_land !== null).length}</p>
}
