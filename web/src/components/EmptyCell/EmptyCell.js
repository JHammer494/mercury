import { useDrop } from 'react-dnd'
import { useMutation } from '@redwoodjs/web'

export const ASSIGN_ACFT = gql`
  mutation updateSortieMutation($id: Int!, $aircraft_id: Int) {
    updateSortie(id: $id, input: { aircraft_id: $aircraft_id }) {
      id
    }
  }
`

export const ADD_SPARE = gql`
  mutation AddSpareMutation($aircraft_id: Int!, $date: DateTime!) {
    createSpareFlyer(input: { aircraft_id: $aircraft_id, date: $date }) {
      id
    }
  }
`

const EmptyCell = ({ params, date }) => {
  const [addAcft] = useMutation(ASSIGN_ACFT)
  const [addSpare] = useMutation(ADD_SPARE)

  const [{ isOver }, drop] = useDrop({
    accept: ['sortie'],
    drop: (sortie) => addSortie(sortie),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const addSortie = ({ sortie }) => {
    Array.isArray(sortie)
      ? addSpare({
          variables: {
            aircraft_id: params.id,
            date: date,
          },
        })
      : addAcft({
          variables: {
            id: sortie.id,
            aircraft_id: params.id,
          },
        })
  }

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: isOver ? 'green' : null,
        color: 'white',
      }}
    >
      {' '}
    </div>
  )
}

export default EmptyCell
