import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { useContext } from 'react'
import { DebriefFormContext } from 'src/pages/SortieDirectoryPage/SortieDirectoryPage'
export const QUERY = gql`
  query FindDebriefSortieArchiveQuery($start: DateTime!, $end: DateTime!) {
    debriefSortieArchive: debriefFormsSort(start: $start, end: $end) {
      air_refuel_amount
      air_refuel_callsign
      bird_strike
      bomb_door_actuation
      drag_chute
      hung_store
      id
      in_flight_emergency
      landing_fuel
      sortie_id
      submitted
      sortie {
        aircraft_id
        actual_land
        actual_launch
        land_status
        call_sign
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

const formatBool = (params) => (params.value ? '✓' : '')
const formatDate = (params) => format(new Date(params.value), 'DDD - HH:mm')
const formatLongDate = (params) =>
  format(new Date(params.value), 'LLLL dd, yyyy')

export const Success = ({ debriefSortieArchive }) => {
  const { setCurSortie, setEdit } = useContext(DebriefFormContext)
  const handleClick = (params) => {
    setCurSortie(params)
  }
  setEdit(true)
  const columns = [
    {
      field: 'debriefDate',
      headerName: 'Date',
      flex: 1,
      valueFormatter: formatLongDate,
    },
    { field: 'aircraftId', headerName: 'Aircraft ID', flex: 1 },
    { field: 'sortieId', headerName: 'Sortie ID', flex: 0.8 },
    { field: 'aerialRefuel', headerName: 'Aerial Refuel', flex: 0.8 },
    {
      field: 'birdStrike',
      headerName: 'Bird Strike',
      flex: 0.8,
      valueFormatter: formatBool,
    },
    {
      field: 'hungStore',
      headerName: 'Hung Store',
      flex: 0.8,
      valueFormatter: formatBool,
    },

    {
      field: 'IFE',
      headerName: 'IFE',
      flex: 0.8,
      valueFormatter: formatBool,
    },
    {
      field: 'launch',
      headerName: 'Launch',
      flex: 1,
      valueFormatter: formatDate,
    },
    { field: 'land', headerName: 'Land', flex: 1, valueFormatter: formatDate },
    {
      field: 'callSign',
      headerName: 'Call Sign',
      flex: 2,
    },
    {
      field: 'debriefForm',
      headerName: 'Debrief Form',
      flex: 1,
      renderCell: (params) => (
        <strong>
          <Button variant="text" onClick={() => handleClick(params.value)}>
            View Debrief
          </Button>
        </strong>
      ),
    },
  ]

  const rows = debriefSortieArchive.map((sortie) => {
    let AR
    if (sortie.air_refuel_amount != null) {
      AR = '✓'
    } else {
      AR = ' '
    }
    return {
      id: sortie.sortie_id,
      aerialRefuel: AR,
      aircraftId: sortie.sortie.aircraft_id,
      sortieId: sortie.sortie_id,
      birdStrike: sortie.bird_strike,
      hungStore: sortie.hung_store,
      IFE: sortie.in_flight_emergency,
      launch: sortie.sortie.actual_launch,
      land: sortie.sortie.actual_land,
      callSign: sortie.sortie.call_sign,
      debriefForm: sortie.sortie_id,
      debriefDate: sortie.submitted,
    }
  })
  return (
    <Box sx={{ height: '800px', width: '100%' }}>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: 'debriefDate', sort: 'asc' }],
          },
        }}
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        disableSelectionOnClick
      />
    </Box>
  )
}
