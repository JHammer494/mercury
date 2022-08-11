import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'
import {
  Button,
  Box,
  CircularProgress,
  Grid,
  InputBase,
  Paper,
  Stack,
  Tab,
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Search as SearchIcon } from '@mui/icons-material'

import FilteredMxListInfoCell from 'src/components/FilteredMxListInfoCell/FilteredMxListInfoCell'
import AircraftInfoCell from 'src/components/AircraftInfoCell/AircraftInfoCell'
import MxListInfoCell from 'src/components/MxListInfoCell/MxListInfoCell'
import SortieInfoCell from 'src/components/SortieInfoCell'
import EditAircraftDetailCell from 'src/components/EditAircraftDetailCell/EditAircraftDetailCell'
import AircraftNotesCell from 'src/components/AircraftNotesCell/AircraftNotesCell'
import AddAircraftNoteModalCell from 'src/components/AddAircraftNoteModalCell/AddAircraftNoteModalCell'
import AddJcnModalCell from 'src/components/AddJcnModalCell/AddJcnModalCell'
import {
  AircraftEditModalContext,
  AddJcnModalContext,
  AddNoteModalContext,
  OpenJobPanelContext,
} from 'src/pages/AircraftDetailsPage/AircraftDetailsPage'

export const QUERY = gql`
  query FindAircraftDetailQuery($id: Int!) {
    aircraft(id: $id) {
      id
      status_id
      unit_id
      driver_jcn {
        discrepancy
      }
    }
  }
`

export const Loading = () => (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ aircraft: acft }) => {
  const { hasRole, currentUser } = useAuth()
  const [value, setValue] = useState('1')
  const [value2, setValue2] = useState('1')
  const [openAddJcn, setOpenAddJcn] = useState(false)
  const [openEditAircraft, setOpenEditAircraft] = useState(false)
  const [editAcft, setEditAcft] = useState(null)

  const [openAddNote, setOpenAddNote] = useState(false)
  const [searchString, setSearchString] = useState('')
  const [jobExpanded, setJobExpanded] = useState(false)

  const [tabSelect] = useState(() => {
    if (
      currentUser.roles === 'lead pro super' ||
      currentUser.roles === 'pro super' ||
      currentUser.roles === 'expeditor' ||
      currentUser.roles === 'debrief'
    ) {
      return true
    } else return false
  })
  const { refetch } = useQuery(QUERY, {
    variables: { id: acft.id },
  })

  const today = new Date()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChange2 = (event, newValue) => {
    setValue2(newValue)
  }

  const handleAddJcnOpen = () => {
    setOpenAddJcn(true)
  }
  const handleAddJcnClose = () => {
    setOpenAddJcn(false)
  }

  const handleEditAircraftOpen = (acft) => {
    setOpenEditAircraft(true)
    setEditAcft(acft)
  }
  const handleEditAircraftClose = () => {
    setOpenEditAircraft(false)
    setEditAcft(null)
    refetch({ id: acft.id })
  }

  const handlePanelChange = (panel) => (event, newExpanded) => {
    setJobExpanded(newExpanded ? panel : false)
  }

  const handleAddNoteOpen = () => {
    setOpenAddNote(true)
  }

  const handleAddNoteClose = () => {
    setOpenAddNote(false)
  }

  function handleSearchChange(event) {
    setSearchString(event.target.value)
  }

  return (
    <>
      <AircraftEditModalContext.Provider
        value={{
          open: openEditAircraft,
          handleClose: handleEditAircraftClose,
          id: editAcft,
        }}
      >
        <EditAircraftDetailCell id={acft.id} />
      </AircraftEditModalContext.Provider>

      <AddJcnModalContext.Provider
        value={{
          open: openAddJcn,
          handleClose: handleAddJcnClose,
          aircraft: acft,
        }}
      >
        <AddJcnModalCell unit_id={acft.unit_id} />
      </AddJcnModalContext.Provider>

      <AddNoteModalContext.Provider
        value={{
          open: openAddNote,
          handleClose: handleAddNoteClose,
          aircraft: acft,
        }}
      >
        <AddAircraftNoteModalCell
          aircraft_id={acft.id}
          unit_id={currentUser?.shop.unit_id}
        />
      </AddNoteModalContext.Provider>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '40VW', typography: 'body1' }}>
          <TabContext value={value}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                paddingLeft: '24px',
                paddingRight: '24px',
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Aircraft Info" value="1" />
                <Tab label="Next Sortie" value="2" />
                {hasRole(['lead pro super', 'pro super', 'expeditor']) && (
                  <Tab label="Notes" value="3" />
                )}
              </TabList>
            </Stack>
            <TabPanel value="1">
              {hasRole(['lead pro super', 'pro super', 'moc', 'expeditor']) && (
                <Button
                  variant="contained"
                  onClick={() => handleEditAircraftOpen(acft.id)}
                  sx={{ height: '35px', marginTop: '0.7%' }}
                >
                  Edit Details
                </Button>
              )}
              <AircraftInfoCell id={acft.id} />
            </TabPanel>
            <TabPanel value="2">
              <SortieInfoCell aircraft_id={acft.id} start={today} />
            </TabPanel>
            <TabPanel value="3">
              <OpenJobPanelContext.Provider
                value={{
                  setJobExpanded: setJobExpanded,
                }}
              >
                <Grid
                  container
                  direction="row"
                  sx={{ justifyContent: 'space-between' }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{ height: '35px' }}
                      onClick={handleAddNoteOpen}
                    >
                      Add Note
                    </Button>
                  </Grid>
                  <Grid item>
                    <Paper
                      sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 400,
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearchChange}
                      />
                      <SearchIcon />
                    </Paper>
                  </Grid>
                </Grid>
                <AircraftNotesCell
                  aircraft_id={acft.id}
                  searchString={searchString}
                />
              </OpenJobPanelContext.Provider>
            </TabPanel>
          </TabContext>
        </Box>
        <Box sx={{ width: '60VW' }}>
          <TabContext value={value2}>
            <Box
              sx={{
                borderLeft: 1,
                borderBottom: 1,
                borderColor: 'divider',
                paddingRight: '24px',
                paddingLeft: '24px',
              }}
            >
              {tabSelect ? (
                <Box>
                  <TabList
                    onChange={handleChange2}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="All" value="1" />
                    <Tab label="APG" value="2" />
                    <Tab label="Hydro" value="3" />
                    <Tab label="E/E" value="4" />
                    <Tab label="Jets" value="5" />
                    <Tab label="IFC" value="6" />
                    <Tab label="Comm/Nav" value="7" />
                    <Tab label="Weapons" value="8" />
                  </TabList>
                </Box>
              ) : (
                <Box>
                  <TabList
                    onChange={handleChange2}
                    aria-label="boots tabs"
                    fullwidth
                  >
                    <Tab label={currentUser.shop.id} value="1" />
                    <Tab label="All" value="2" />
                  </TabList>
                </Box>
              )}
            </Box>
            <Box textAlign="right" paddingRight="24px" paddingTop="24px">
              <Button
                variant="contained"
                sx={{ height: '35px', marginTop: '0.7%' }}
                onClick={handleAddJcnOpen}
              >
                Add JCN
              </Button>
            </Box>
            <OpenJobPanelContext.Provider
              value={{ jobExpanded, handlePanelChange }}
            >
              {hasRole(['lead pro super', 'pro super', 'expeditor']) && (
                <>
                  <TabPanel value="1">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <MxListInfoCell id={acft.id} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <FilteredMxListInfoCell id={acft.id} shop_id={'AOXED'} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="3">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <FilteredMxListInfoCell id={acft.id} shop_id={'AOXBA'} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="4">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <FilteredMxListInfoCell id={acft.id} shop_id={'ATGOX'} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="5">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <FilteredMxListInfoCell id={acft.id} shop_id={'AOMOD'} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="6">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <FilteredMxListInfoCell id={acft.id} shop_id={'AOMOO'} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="7">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <FilteredMxListInfoCell id={acft.id} shop_id={'AOMAP'} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="8">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <FilteredMxListInfoCell id={acft.id} shop_id={'AOMBB'} />
                    </Box>
                  </TabPanel>
                </>
              )}
              {hasRole(['boot']) && (
                <>
                  <TabPanel value="1">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <MxListInfoCell id={acft.id} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <FilteredMxListInfoCell id={acft.id} shop_id={'AOMAP'} />
                    </Box>
                  </TabPanel>
                </>
              )}
            </OpenJobPanelContext.Provider>
          </TabContext>
        </Box>
      </Box>
    </>
  )
}
