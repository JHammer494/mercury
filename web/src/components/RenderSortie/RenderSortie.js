import { useMutation } from '@redwoodjs/web'
import { Button } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDrag, useDrop } from 'react-dnd'
import RenderInsp from 'src/components/RenderInsp/RenderInsp'

const REASSIGN_ACFT = gql`
  mutation updateSortieMutation($id: Int!, $aircraft_id: Int) {
    updateSortie(id: $id, input: { aircraft_id: $aircraft_id }) {
      id
    }
  }
`

const RenderSortie = ({ sortieInfo, params, date, length }) => {
  const [reassignAcft] = useMutation(REASSIGN_ACFT)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sortie',
    item: { sortie: sortieInfo },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [{ isOver }, drop] = useDrop({
    accept: ['sortie'],
    drop: (sortie) => addSortie(sortie),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const updateSortie = () => {
    reassignAcft({
      variables: {
        id: sortieInfo.id,
        aircraft_id: null,
      },
    })
  }

  const addSortie = ({ sortie }) => {
    reassignAcft({
      variables: {
        id: sortie.id,
        aircraft_id: params.id,
      },
    })
  }

  const renderInsp = () => {
    const hasInsp = params.value.find((target) => target.type === 'insp')
    if (length > 1 && hasInsp !== undefined) return true
  }

  return (
    <>
      {!renderInsp() ? (
        <div
          ref={drop}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: length > 1 ? null : '100%',
            paddingTop: length > 1 ? null : '6%',
            border: isDragging ? '1px red solid' : null,
          }}
        >
          <div
            ref={drag}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',

              backgroundColor: isOver ? 'gray' : null,
            }}
          >
            <div>
              {params.hasFocus ? (
                <Button onClick={updateSortie}>
                  <DeleteForeverIcon size="small" color="action" />
                </Button>
              ) : null}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{sortieInfo.call_sign}&nbsp;</span>
                <span>&nbsp;{sortieInfo.times}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        params.value.map((val) => (
          <div key={val.id} className="SortieInspection">
            {val.type === 'sortie' ? (
              <div
                ref={drop}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: length > 1 ? null : '100%',
                  paddingTop: length > 1 ? null : '6%',
                  border: isDragging ? '1px red solid' : null,
                }}
              >
                <div
                  ref={drag}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',

                    backgroundColor: isOver ? 'gray' : null,
                  }}
                >
                  <div>
                    {params.hasFocus ? (
                      <Button onClick={updateSortie}>
                        <DeleteForeverIcon size="small" color="action" />
                      </Button>
                    ) : null}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{sortieInfo.call_sign}&nbsp;</span>
                      <span>&nbsp;{sortieInfo.times}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: '100vw',
                }}
              >
                <RenderInsp key={val.id} date={date} params={val} />
              </div>
            )}
          </div>
        ))
      )}
    </>
  )
}

export default RenderSortie
