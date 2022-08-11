import ScheduleTodaySortieInfo from '../ScheduleTodaySortieInfo/ScheduleTodaySortieInfo'

export const QUERY = gql`
  query FindScheduleTodaySortieInfoQuery($id: Int!) {
    scheduleTodaySortieInfo: sortie(id: $id) {
      projected_launch
      config
      call_sign
      required_fuel
      projected_land
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ scheduleTodaySortieInfo }) => {
  return <ScheduleTodaySortieInfo sortieInfo={scheduleTodaySortieInfo} />
}
