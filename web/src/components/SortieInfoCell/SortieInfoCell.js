import SortieInfo from '../SortieInfo/SortieInfo'

export const QUERY = gql`
  query FindSortieInfoQuery($aircraft_id: Int!, $start: DateTime!) {
    nextSortie(aircraft_id: $aircraft_id, start: $start) {
      projected_land
      projected_launch
      id
      call_sign
      required_fuel
      config
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No upcoming sorties scheduled.</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ nextSortie }) => {
  return <SortieInfo nextSortie={nextSortie[0]} />
}
