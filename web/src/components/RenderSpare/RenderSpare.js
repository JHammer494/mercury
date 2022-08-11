import { useMutation } from '@redwoodjs/web'
import { Button } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RenderInsp from 'src/components/RenderInsp/RenderInsp'

const DELETE_SPARE = gql`
  mutation deleteSpareFlyerMutation($id: Int!) {
    deleteSpareFlyer(id: $id) {
      id
    }
  }
`

const RenderSpare = ({ params, date }) => {
  const [deleteSpare] = useMutation(DELETE_SPARE)

  const updateSortie = () => {
    const spareId = params.value.find((target) => target.type === 'spare')
    deleteSpare({
      variables: { id: spareId.id.id },
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
        width: '100vw',
      }}
    >
      {params.value.map((val) => (
        <div key={val.id}>
          {val.type === 'spare' ? (
            <div>
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                {params.hasFocus ? (
                  <Button onClick={updateSortie}>
                    <DeleteForeverIcon size="small" color="action" />
                  </Button>
                ) : null}
                <div>
                  <span>Spare</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <RenderInsp key={val.id} date={date} params={val} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default RenderSpare
