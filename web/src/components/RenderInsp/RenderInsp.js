import { useDrop } from 'react-dnd'
import { useMutation } from '@redwoodjs/web'

const ASSIGN_ACFT = gql`
  mutation updateSortieMutation($id: Int!, $aircraft_id: Int) {
    updateSortie(id: $id, input: { aircraft_id: $aircraft_id }) {
      id
    }
  }
`

const ADD_SPARE = gql`
  mutation AddSpareMutation($aircraft_id: Int!, $date: DateTime!) {
    createSpareFlyer(input: { aircraft_id: $aircraft_id, date: $date }) {
      id
    }
  }
`

const RenderInsp = ({ params, date }) => {
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
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: isOver ? 'green' : null,
      }}
    >
      {params.value ? (
        <span>{params.value.name}</span>
      ) : (
        <span style={{ background: '#38e', color: '#fff' }}>{params.name}</span>
      )}
    </div>
  )
}

export default RenderInsp
