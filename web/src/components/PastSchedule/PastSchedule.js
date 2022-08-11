import { DataGrid } from '@mui/x-data-grid'
import * as React from 'react'
import { Box, Modal, Button } from '@mui/material'
import {
  eachWeekOfInterval,
  sub,
  endOfISOWeek,
  endOfWeek,
  format,
} from 'date-fns'
import ProjectedSortieCounterCell from '../ProjectedSortieCounterCell/ProjectedSortieCounterCell'
import CompletedSortieCounterCell from '../CompletedSortieCounterCell/CompletedSortieCounterCell'
import WeeklyViewerInfosCell from '../WeeklyViewerInfosCell/WeeklyViewerInfosCell'
import { useAuth } from '@redwoodjs/auth'

const weeks = eachWeekOfInterval(
  { start: sub(Date.now(), { years: 1 }), end: Date.now() },
  { weekStartsOn: 1 }
)
const rows = []
for (let x = 1; x < weeks.length; x++) {
  rows.push({
    id: x,
    date:
      format(weeks[weeks.length - x], 'dd LLL, yyyy') +
      ' - ' +
      format(
        endOfWeek(weeks[weeks.length - x], { weekStartsOn: 1 }),
        'dd LLL, yyyy'
      ),
    view: { id: 3, new: 'hi' },
    export: 'Download Schedule',
    start: new Date(weeks[weeks.length - x]),
    end: endOfISOWeek(weeks[weeks.length - x]),
  })
}

const PastSchedule = () => {
  const { currentUser } = useAuth()

  const [open, setOpen] = React.useState(false)
  const [dateRange, setDateRange] = React.useState({})

  const handleOpen = async (event, props) => {
    setDateRange({
      start: props.row.start,
      end: props.row.end,
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    if (Object.keys(dateRange).length !== 0) {
      setOpen(true)
    }
  }, [dateRange])

  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      flex: 1,
    },
    {
      field: 'projectedSortieCount',
      headerName: 'Projected Sortie Count',
      renderCell: (params) => (
        <strong>
          <ProjectedSortieCounterCell
            start={weeks[weeks.length - params.id].toISOString()}
            end={endOfISOWeek(weeks[weeks.length - params.id])}
            unit_id={currentUser?.shop.unit_id}
          />
        </strong>
      ),
      width: 150,
      flex: 1,
    },
    {
      field: 'completedSortieCount',
      headerName: 'Completed Sortie Count',
      renderCell: (params) => (
        <strong>
          <CompletedSortieCounterCell
            start={weeks[weeks.length - params.id].toISOString()}
            end={endOfISOWeek(weeks[weeks.length - params.id])}
            unit_id={currentUser?.shop.unit_id}
          />
        </strong>
      ),
      width: 150,
      flex: 1,
    },
    {
      field: 'view',
      headerName: 'View',
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <strong>
          <Button variant="text" onClick={(event) => handleOpen(event, params)}>
            View Schedule
          </Button>
        </strong>
      ),
    },
  ]
  const [pageSize, setPageSize] = React.useState(5)
  return (
    <div>
      <Modal
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: 1600,
            height: 'auto',
            backgroundColor: 'white',
            padding: 5,
            borderRadius: '16px',
          }}
        >
          <WeeklyViewerInfosCell
            start={dateRange.start}
            end={dateRange.end}
            unit_id={currentUser.shop.unit_id}
          />
        </Box>
      </Modal>
      <Box sx={{ height: '60vh' }}>
        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15]}
          pagination
          {...rows}
          rows={rows}
          columns={columns}
        />
      </Box>
    </div>
  )
}

export default PastSchedule
