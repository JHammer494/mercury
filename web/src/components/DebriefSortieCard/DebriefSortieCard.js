import { Box, Button, Card } from '@mui/material'
import { Link, routes } from '@redwoodjs/router'
import { format } from 'date-fns'
import { useContext } from 'react'
import { DebriefFormContext } from 'src/pages/SortieDirectoryPage/SortieDirectoryPage'

const DebreifSorieCard = ({ sortie }) => {
  const { setCurSortie, value, setEdit } = useContext(DebriefFormContext)
  let editable = false
  let disabled = true
  let date = format(new Date(sortie.actual_land), 'LLLL dd, yyyy @ HH:mm')
  if (value === 1) {
    editable = true
    setEdit(true)
  } else if (value === 0) {
    if (sortie.actual_land) {
      disabled = false
    }
    editable = false
    setEdit(false)
  }

  const handleClick = (e) => {
    setCurSortie(sortie.sortie_id)
    return e
  }

  return (
    <Card
      sx={{ width: 380, height: 250, display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ height: 300, marginLeft: '15px' }}>
        <h1
          style={{ marginTop: 1, marginBottom: 5 }}
        >{`Sortie ${sortie.sortie_id}`}</h1>
        {sortie.actual_launch ? (
          sortie.actual_land ? (
            <h4 style={{ margin: 3, paddingBottom: 80 }}>
              {'Landed: ' + date}
            </h4>
          ) : (
            <h4 style={{ margin: 3, paddingBottom: 80 }}>Airborne</h4>
          )
        ) : (
          <h4 style={{ margin: 3, paddingBottom: 80 }}>
            {`Launch time: ` +
              format(
                new Date(sortie.projected_launch),
                'LLLL dd, yyyy @ HH:mm'
              )}
          </h4>
        )}
        <div>
          <Link to={routes.aircraftDetails({ id: sortie.aircraft_id })}>
            {sortie.aircraft_id}
          </Link>
          {` | ${sortie.call_sign}`}
        </div>
      </Box>
      <Box
        sx={{
          padding: 1.5,
          justifyContent: 'center',
          flexDirection: 'row',
          display: 'flex',
          backgroundColor: '#eceff1',
          height: 270,
        }}
      >
        {editable ? (
          <div>
            <Button
              variant="outlined"
              sx={{ marginRight: 1, backgroundColor: 'white', color: 'blue' }}
              onClick={handleClick}
            >
              Edit Debrief
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="outlined"
              sx={{ marginLeft: 1, backgroundColor: 'white', color: '#9c27b0' }}
              onClick={handleClick}
              disabled={disabled}
            >
              Debrief Aircraft
            </Button>
          </div>
        )}
      </Box>
    </Card>
  )
}

export default DebreifSorieCard
