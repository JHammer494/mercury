import { DataGrid } from '@mui/x-data-grid'
import {
  nextMonday,
  lastDayOfWeek,
  addDays,
  format,
  eachDayOfInterval,
} from 'date-fns'
import { Box } from '@mui/material'
import { Link, routes } from '@redwoodjs/router'
import RenderSortie from '../RenderSortie/RenderSortie'
import EmptyCell from '../EmptyCell/EmptyCell'
import RenderInsp from '../RenderInsp/RenderInsp'
import RenderSpare from '../RenderSpare/RenderSpare'

const start = nextMonday(new Date())
const end = lastDayOfWeek(new Date(start), { weekStartsOn: 1 })

export const beforeQuery = ({ unit_id }) => {
  return {
    variables: { start, end, unit_id },
    fetchPolicy: 'network-only',
    pollInterval: 500,
  }
}

export const QUERY = gql`
  query FindScheduleBuilderQuery(
    $start: DateTime!
    $end: DateTime!
    $unit_id: Int!
  ) {
    aircrafts {
      id
      unit_id
      status_id
      flight_hours
      sorties: sortiesInDateRange(start: $start, end: $end, unit_id: $unit_id) {
        id
        required_fuel
        projected_launch
        projected_land
        config
        call_sign
        is_published
      }
      calendar_inspections {
        id
        frequency
        last_completed
        inspection_details
      }
      hourly_inspection {
        last_completed
        name
      }
      spareFlyers: spareFlyersInDateRange(start: $start, end: $end) {
        id
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

const julian = (date) => format(date, 'yyDDD')
const longFormat = (date) => format(date, 'MMMM dd, yyyy')
const formatTime = (date) => format(date, 'HHmm')

////////////////////////////////////////////////////////////////////////////////////

export const Success = ({ aircrafts }) => {
  const datesArray = eachDayOfInterval({ start, end })
  const [columns] = React.useState([
    {
      field: 'id',
      headerName: 'Aircraft',
      flex: 1,
      minWidth: 75,
      maxWidth: 150,
      renderCell: (params) => {
        const tn = params.value.toString().padStart(6, '0')
        return (
          <Link to={routes.aircraftDetails({ id: params.value })}>
            {tn.slice(0, 2) + '-' + tn.slice(2)}
          </Link>
        )
      },
      cellClassName: 'tailNumber',
    },
    {
      field: 'phase',
      headerName: 'Phase',
      flex: 1,
      minWidth: 50,
      maxWidth: 150,
      renderCell: (params) => {
        return (
          <div
            style={{
              textAlign: 'center',
              color: params.value < 5 ? 'red' : 'black',
              fontSize: params.value < 5 ? 'large' : null,
            }}
          >
            {params.value}
          </div>
        )
      },
      cellClassName: 'phase',
    },
    {
      field: 'hpo',
      headerName: 'HPO',
      flex: 1,
      minWidth: 75,
      maxWidth: 150,
      renderCell: (params) => {
        return (
          <div
            style={{
              textAlign: 'center',
              color: params.value < 5 ? 'red' : 'black',
              fontSize: params.value < 5 ? 'large' : null,
            }}
          >
            {params.value}
          </div>
        )
      },
      cellClassName: 'hpo',
    },
  ])

  datesArray.forEach((date) => {
    columns.push({
      field: julian(date),
      headerName: format(date, 'EEEE'),
      description: longFormat(date),
      flex: 2,
      minWidth: 160,
      maxwidth: 360,
      renderCell: (params) => {
        if (params.value === undefined) {
          return <EmptyCell params={params} date={date} />
        } else {
          if (params.value.type === 'insp')
            return <RenderInsp params={params} date={date} />
          if (Array.isArray(params.value)) {
            return params.value.map((sortie) => {
              if (sortie.type === 'sortie')
                return (
                  <RenderSortie
                    key={sortie.id}
                    sortieInfo={sortie}
                    params={params}
                    date={date}
                    length={params.value.length}
                  />
                )
              else if (sortie.type === 'spare')
                return <RenderSpare params={params} date={date} />
            })
          }
        }
      },
    })
  })

  const rows = aircrafts.map((aircraft) => {
    // Determine hours until next phase
    var phaseInsp = aircraft.hourly_inspection.find(
      (insp) => insp.name === 'Phase'
    )
    // Determine hours until next HPO
    var hpoInsp = aircraft.hourly_inspection.find((insp) => insp.name === 'HSC')
    // Define the data that rows will contain
    var row = {
      id: aircraft.id,
      phase: aircraft.flight_hours - phaseInsp.last_completed,
      hpo: aircraft.flight_hours - hpoInsp.last_completed,
    }
    // Set the calendar insp on the correct day
    aircraft.calendar_inspections.forEach((inspection) => {
      var dueDate = addDays(
        new Date(inspection.last_completed),
        inspection.frequency
      )
      const jul = julian(dueDate)
      row[jul] = { type: 'insp', name: inspection.inspection_details }
    })
    // Set the spares on the correct day
    aircraft.spareFlyers.forEach((spare) => {
      const dateString = spare.date.slice(0, -1)
      const jul = julian(new Date(dateString))
      const newSpare = {
        type: 'spare',
        id: spare,
      }
      row[jul] = row[jul] ? [row[jul], newSpare].flat() : [newSpare]
    })
    // Set the sortie on the correct day
    aircraft.sorties.forEach((sortie) => {
      const jul = julian(new Date(sortie.projected_launch))
      const newSortie = {
        type: 'sortie',
        id: sortie.id,
        times:
          formatTime(new Date(sortie.projected_launch)) +
          '-' +
          formatTime(new Date(sortie.projected_land)),
        fuel: sortie.required_fuel + 'K',
        config: sortie.config,
        aircraft_id: sortie.aircraft_id,
        call_sign: sortie.call_sign,
      }
      row[jul] = row[jul] ? [row[jul], newSortie].flat() : [newSortie]
    })
    return row
  })

  return (
    <Box className="weeklyBox">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Box
            sx={{
              display: 'block',
              width: '1500px',
              paddingTop: '20px',
              textAlign: 'center',
              '& div.tailNumber a': {
                color: '#39f',
                fontWeight: 'bold',
              },
              '& div.sortie': {
                background: '#295',
                color: '#fff',
                flexFlow: 'column',
              },
              '& div.sortie > div + div::before': {
                content: '" "',
                margin: '0 -8px',
                border: '1px dashed',
              },
              '& .spare': {
                background: '#f94',
                color: '#fff',
              },
              '& .insp': {
                background: '#38e',
                color: '#fff',
                whiteSpace: 'normal !important',
              },
              '& .spareInsp': {
                background: '#f94',
                color: '#fff',
              },
              '& .sortieInsp': {
                background: '#295',
                color: '#fff',
                flexFlow: 'column',
              },
              '& .error': {
                background: '#900',
                color: '#fff',
                whiteSpace: 'normal !important',
              },
            }}
          >
            <DataGrid
              className="dataGrid"
              autoHeight
              density="compact"
              disableColumnMenu={true}
              disableColumnFilter={true}
              hideFooter={true}
              hideFooterPagination={true}
              rows={rows}
              columns={columns}
              rowHeight={80}
              showCellRightBorder={true}
              sx={{
                '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                  py: 1,
                },
              }}
              scrollbarSize={0}
              getCellClassName={(params) => {
                if (Array.isArray(params.value)) {
                  if (
                    params.value.find((element) => element.type === 'insp') &&
                    params.value.find((element) => element.type === 'spare')
                  )
                    return 'spareInsp'
                  if (
                    params.value.find((element) => element.type === 'insp') &&
                    params.value.find((element) => element.type === 'sortie')
                  )
                    return 'sortieInsp'
                  if (params.value.find((element) => element.type === 'sortie'))
                    return 'sortie'
                  if (params.value.find((element) => element.type === 'spare'))
                    return 'spare'
                }
                if (typeof params.value === 'object') {
                  if (params.value.type?.includes('insp')) return 'insp'
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
