import { Link, routes } from '@redwoodjs/router'
import { Box, Grid, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { addDays, format, eachDayOfInterval } from 'date-fns'

import { formatTime, julian, longFormat } from 'src/functions/dateFormats'

const renderTailNumber = (id) => {
  const tn = id.toString().padStart(6, '0')
  return (
    <Link to={routes.aircraftDetails({ id })}>
      {tn.slice(0, 2) + '-' + tn.slice(2)}
    </Link>
  )
}

const renderSortie = (sortie) => (
  <div
    style={{
      display: 'flex',
      flexFlow: 'column',
      width: '100%',
    }}
  >
    <span
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>#{sortie.id}</span>
      <span>{sortie.times}</span>
    </span>
    <span
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>{sortie.fuel}K#</span>
      <span>{sortie.config}</span>
    </span>
  </div>
)

const WeeklySchedule = ({ aircrafts, start, end }) => {
  const datesArray = eachDayOfInterval({ start, end })
  const columns = [
    {
      field: 'id',
      headerName: 'Aircraft',
      flex: 1,
      minWidth: 75,
      maxWidth: 150,
      renderCell: (params) => renderTailNumber(params.value),
      cellClassName: 'tailNumber',
    },
  ]

  const dateRange = `${longFormat(start)} - ${longFormat(end)}`
  datesArray.forEach((date) => {
    columns.push({
      field: julian(date),
      headerName: format(date, 'EEEE'),
      description: longFormat(date),
      flex: 2,
      minWidth: 160,
      maxwidth: 360,
      renderCell: (params) => {
        if (Array.isArray(params.value)) return params.value.map(renderSortie)
      },
    })
  })

  const conflict = 'SCHEDULE CONFLICT - Contact Lead Pro Super'

  const rows = aircrafts.map((aircraft) => {
    let row = { id: aircraft.id }

    aircraft.sorties.forEach((sortie) => {
      const jul = julian(sortie.projected_launch)
      const newSortie = {
        id: sortie.id,
        times:
          formatTime(sortie.projected_launch) +
          '-' +
          formatTime(sortie.projected_land) +
          'L',
        fuel: sortie.required_fuel,
        config: sortie.config,
      }
      row[jul] = row[jul] ? [row[jul], newSortie].flat() : [newSortie]
      // TODO: ensure multiple sorties do not overlap
    })

    aircraft.spareFlyers.forEach((spare) => {
      const jul = julian(spare.date.slice(0, -1)) // slice off time zone indicator to prevent unwanted conversion
      row[jul] = row[jul] ? conflict : 'Spare' // show conflict if something already scheduled that day
    })

    aircraft.calendar_inspections.forEach((inspection) => {
      var dueDate = addDays(
        new Date(inspection.last_completed),
        inspection.frequency
      )
      const jul = julian(dueDate)
      row[jul] = row[jul] ? conflict : inspection.inspection_details
    })

    return row
  })

  return (
    <Box className="weeklyBox">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{dateRange}</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              document.title = dateRange
              window.print()
            }}
            className="noPrint"
          >
            Export
          </Button>
        </Grid>
      </Grid>
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
          disableColumnMenu
          hideFooter
          rows={rows}
          columns={columns}
          getRowHeight={() => 'auto'}
          showCellRightBorder={true}
          sx={{
            '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
              py: 1,
            },
          }}
          scrollbarSize={0}
          getCellClassName={(params) => {
            if (Array.isArray(params.value)) return 'sortie'
            if (typeof params.value === 'string') {
              if (params.value.includes('Spare')) return 'spare'
              else if (params.value.includes('Insp')) return 'insp'
              else return 'error'
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default WeeklySchedule
