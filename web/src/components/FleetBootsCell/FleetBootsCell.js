import { DataGrid } from '@mui/x-data-grid'
import { Link, routes } from '@redwoodjs/router'
import { Chip, Box } from '@mui/material/'

export const beforeQuery = ({ shop_id, unit_id }) => {
  const INTERVAL = 30000
  return { variables: { shop_id, unit_id }, pollInterval: INTERVAL }
}

export const QUERY = gql`
  query FleetBootsQuery($shop_id: String!, $unit_id: Int!) {
    aircrafts(unit_id: $unit_id) {
      id
      fuel_quant
      mx_priority
      parking_location
      status_id
      filtered_jcns: all_jcns(shop_id: $shop_id) {
        id
      }
      filtered_wces: all_jcns {
        jcn_wces(shop_id: $shop_id) {
          id
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ aircrafts }) => {
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

  const columns = [
    {
      field: 'priority',
      headerName: 'Priority',
      type: 'number',
      flex: 1,
      maxWidth: 100,
      editable: true,
      align: 'center',
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
      field: 'activeJcns',
      headerName: 'Active Shop JCNs',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return ''
        }

        const formattedValue = `${params.value.length} JCNs`

        return formattedValue
      },
    },
    {
      field: 'activeWces',
      headerName: 'Active Shop WCEs',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return ''
        }

        let wceCount = 0

        params.value.forEach((entry) => (wceCount += entry.jcn_wces.length))

        const formattedValue = `${wceCount} WCEs`

        return formattedValue
      },
    },
  ]

  const rows = aircrafts.map((aircraft) => {
    return {
      id: aircraft.id,
      tailNumber: aircraft.id,
      priority: aircraft.mx_priority,
      fuel: aircraft.fuel_quant,
      parking: aircraft.parking_location,
      status: aircraft.status_id,
      activeJcns: aircraft.filtered_jcns,
      activeWces: aircraft.filtered_wces,
    }
  })

  return (
    <Box sx={{ height: '60vh', margin: '25px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        initialState={{
          sorting: {
            sortModel: [{ field: 'priority', sort: 'asc' }],
          },
        }}
      />
    </Box>
  )
}
