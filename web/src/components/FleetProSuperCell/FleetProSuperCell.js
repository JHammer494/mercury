import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro'
import { useQuery } from '@redwoodjs/web'
import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { Chip, Box } from '@mui/material/'
import * as React from 'react'
import { format } from 'date-fns'
import HeightIcon from '@mui/icons-material/Height'

export const QUERY = gql`
  query FleetProSupeQuery($unit_id: Int!) {
    aircrafts(unit_id: $unit_id) {
      id
      fuel_quant
      mx_priority
      parking_location
      status_id
      driver_jcn {
        etic
      }
      aircraft_notes {
        timestamp
      }
    }
  }
`

const UPDATE_PRIORITY = gql`
  mutation aircraftPriority($id: Int!, $mx_priority: Int!) {
    updateAircraft(id: $id, input: { mx_priority: $mx_priority }) {
      mx_priority
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

function updateRowPosition(initialIndex, newIndex, rows) {
  const rowsClone = [...rows]
  const row = rowsClone.splice(initialIndex, 1)[0]
  rowsClone.splice(newIndex, 0, row)

  return rowsClone
}

export const Success = ({ aircrafts, unit_id }) => {
  const { data, refetch } = useQuery(QUERY, {
    variables: { unit_id },
  })

  const [updatePriority] = useMutation(UPDATE_PRIORITY)
  const apiRef = useGridApiRef()

  const [rows, setRows] = useState(
    data.aircrafts.map((aircraft) => {
      return {
        id: aircraft.id,
        tailNumber: aircraft.id,
        priority: aircraft.mx_priority,
        fuel: aircraft.fuel_quant,
        parking: aircraft.parking_location,
        status: aircraft.status_id,
        etic: aircraft.driver_jcn?.etic,
        lastNote:
          aircraft.aircraft_notes[aircraft.aircraft_notes.length - 1]
            ?.timestamp,
      }
    })
  )

  const determineChipColor = (statusValue) => {
    if (statusValue.includes('FMC')) {
      return 'success'
    } else if (statusValue.includes('PMC')) {
      return 'warning'
    } else if (statusValue.includes('NMC')) {
      return 'error'
    } else {
      return 'primary'
    }
  }

  const updateMxPriority = async (rowIds, targetIndex, oldIndex) => {
    if (targetIndex > oldIndex) {
      rowIds.slice(oldIndex, targetIndex).map((row) => {
        let newMxPriority
        if (apiRef.current.getCellValue(row, 'priority') === 1) {
          newMxPriority = apiRef.current.getCellValue(row, 'priority')
        } else {
          newMxPriority = apiRef.current.getCellValue(row, 'priority') - 1
        }

        updatePriority({
          variables: {
            id: row,
            mx_priority: newMxPriority,
          },
        })
      })
    } else {
      let length = rowIds.length

      rowIds.slice(targetIndex + 1, oldIndex + 1).map((row) => {
        let newMxPriority
        if (apiRef.current.getCellValue(row, 'priority') === length) {
          newMxPriority = apiRef.current.getCellValue(row, 'priority')
        } else {
          newMxPriority = apiRef.current.getCellValue(row, 'priority') + 1
        }

        updatePriority({
          variables: {
            id: row,
            mx_priority: newMxPriority,
          },
        })
      })
    }

    let tempRows
    const updateAcft = await refetch({ aircrafts })
    tempRows = updateAcft.data.aircrafts.map((aircraft) => {
      return {
        id: aircraft.id,
        tailNumber: aircraft.id,
        priority: aircraft.mx_priority,
        fuel: aircraft.fuel_quant,
        parking: aircraft.parking_location,
        status: aircraft.status_id,
        etic: aircraft.driver_jcn?.etic,
        lastNote:
          aircraft.aircraft_notes[aircraft.aircraft_notes.length - 1]
            ?.timestamp,
      }
    })
    setRows(tempRows)
  }

  const handleRowOrderChange = (params) => {
    const rowIds = apiRef.current.getAllRowIds()

    updatePriority({
      variables: {
        id: params.row.id,
        mx_priority: params.targetIndex + 1,
      },
      onCompleted: () => {
        updateMxPriority(
          rowIds,
          params.targetIndex,
          params.oldIndex,
          params.row
        )
      },
    })

    const newRows = updateRowPosition(params.oldIndex, params.targetIndex, rows)
    setRows(newRows)
  }

  const columns = [
    {
      field: 'priority',
      headerName: 'Priority',
      type: 'number',
      flex: 1,
      maxWidth: 100,
      editable: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'tailNumber',
      headerName: 'Tail Number',
      flex: 1,
      renderCell: (params) => (
        <strong>
          <Link to={routes.aircraftDetails({ id: params.value })}>
            {params.value}
          </Link>
        </strong>
      ),
    },
    {
      field: 'fuel',
      headerName: 'Fuel (lbs)',
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return ''
        }

        const formattedValue = params.value.toString().concat('K')

        return formattedValue
      },
    },
    {
      field: 'parking',
      headerName: 'Parking',
      type: 'string',
      flex: 1,
    },
    {
      field: 'etic',
      headerName: 'ETIC',
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return ''
        }

        const formattedValue = format(
          new Date(params.value),
          'E, d MMM yyyy | HH:m'
        )

        return formattedValue
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      maxWidth: 100,
      renderCell: (params) => (
        <strong>
          <Chip
            label={params.value}
            size="small"
            color={determineChipColor(params.value)}
          />
        </strong>
      ),
    },
    {
      field: 'lastNote',
      headerName: 'Notes',
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return ''
        }

        const formattedValue = 'Last Note: '.concat(
          format(new Date(params.value), 'd MMM yyyy | HH:m')
        )

        return formattedValue
      },
    },
  ]

  return (
    <Box sx={{ height: '60vh', margin: '25px' }}>
      <DataGridPro
        apiRef={apiRef}
        components={{ RowReorderIcon: HeightIcon }}
        rows={rows}
        columns={columns}
        rowReordering
        onRowOrderChange={handleRowOrderChange}
        autoPageSize
      />
    </Box>
  )
}
