import ArrowForwardIosIconSharp from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { Box, Button, Grid, Stack } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { format } from 'date-fns'
import AddWceModalCell from 'src/components/AddWceModalCell/AddWceModalCell'
import CompleteWceModalCell from 'src/components/CompleteWceModalCell/CompleteWceModalCell'
import { OpenJobPanelContext } from 'src/pages/AircraftDetailsPage/AircraftDetailsPage'
import { useAuth } from '@redwoodjs/auth'

export const CompletionWceModalContext = React.createContext(null)
export const AddWceModalContext = React.createContext(null)

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosIconSharp sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

const MxList = ({ mxListInfo }) => {
  const { jobExpanded, handlePanelChange } =
    React.useContext(OpenJobPanelContext)
  const { currentUser } = useAuth()
  const [addWceModalOpen, setAddWceModalOpen] = React.useState(false)
  const [addWceModalJcn, setAddWceModalJcn] = React.useState(null)

  const [wceCompletionOpen, setOpenWceCompletionOpen] = React.useState(false)
  const [completionModalJcn, setCompletionModalJcn] = React.useState(null)
  const [completionModalWce, setCompletionModalWce] = React.useState(null)

  const handleWceCompletionModalOpen = (newJcn, newWce) => {
    setCompletionModalJcn(newJcn)
    setCompletionModalWce(newWce)
    setOpenWceCompletionOpen(true)
  }
  const handleWceCompletionModalClose = () => {
    setOpenWceCompletionOpen(false)
    setCompletionModalJcn(null)
    setCompletionModalWce(null)
  }

  const formatDate = (date) => {
    return format(new Date(date), 'PP | kkmm')
  }

  const handleAddWceOpen = (currJcn) => {
    setAddWceModalJcn(currJcn)
    setAddWceModalOpen(true)
  }
  const handleAddWceClose = () => {
    setAddWceModalOpen(false)
    setAddWceModalJcn(null)
  }

  if (mxListInfo?.all_jcns?.length === 0) {
    return <div>No Open Jobs</div>
  }

  return (
    <Box>
      <AddWceModalContext.Provider
        value={{
          open: addWceModalOpen,
          handleClose: handleAddWceClose,
          job: addWceModalJcn,
          aircraftNumber: mxListInfo.id,
        }}
      >
        <AddWceModalCell />
      </AddWceModalContext.Provider>
      <CompletionWceModalContext.Provider
        value={{
          open: wceCompletionOpen,
          handleClose: handleWceCompletionModalClose,
          jcn: completionModalJcn,
          wce: completionModalWce,
          formatDate: formatDate,
        }}
      >
        <CompleteWceModalCell shop_id={currentUser?.shop.id} />
      </CompletionWceModalContext.Provider>
      <Box>
        {mxListInfo.all_jcns.map((job) => (
          <div key={job.id}>
            <Accordion
              expanded={jobExpanded === job.id}
              onChange={handlePanelChange(job.id)}
            >
              <AccordionSummary aria-controls="panel1d-content" id={job.jcn_id}>
                <Grid container sx={{ marginLeft: '20px', marginTop: '15px' }}>
                  <Grid item xs={4}>
                    <Grid
                      container
                      sx={{ textAlign: 'center', marginBottom: '20px' }}
                    >
                      <Grid item sm={5}>
                        <Typography>{job.jcn_id}</Typography>
                      </Grid>
                      <Grid item sm={3}>
                        <Typography sx={{ color: 'red' }}>
                          <b>{job.symbol}</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={3}>
                        <Typography>{job.work_unit_code_id}</Typography>
                      </Grid>
                    </Grid>
                    {jobExpanded === job.id ? (
                      <Grid container sx={{ textAlign: 'center' }}>
                        <Grid item xs={5} sx={{ marginBottom: '8px' }}>
                          <Typography sx={{ color: 'gray' }}>
                            Date/Time
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography sx={{ color: 'gray' }}>WD</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography sx={{ color: 'gray' }}>Shop</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography>
                            {formatDate(job.when_created)}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography>{job.when_discovered_id}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography>{job.shop_id}</Typography>
                        </Grid>
                      </Grid>
                    ) : null}
                  </Grid>

                  <Grid item xs={8}>
                    <Typography>{job.discrepancy}</Typography>
                  </Grid>
                  {/* linebreak */}
                </Grid>
                {/* linebreak */}
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row">
                  <Typography variant="h5">
                    <b>WCE List</b>
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: '72%' }}
                    onClick={() => handleAddWceOpen(job)}
                  >
                    Add WCE
                  </Button>
                </Stack>
              </AccordionDetails>
              <AccordionDetails>
                <Grid container sx={{ textAlign: 'center' }}>
                  <Grid item sm={1}>
                    <Typography sx={{ color: 'gray' }}>WCE ID</Typography>
                  </Grid>
                  <Grid item sm={1}>
                    <Typography sx={{ color: 'gray' }}>Symbol</Typography>
                  </Grid>
                  <Grid item sm={1}>
                    <Typography sx={{ color: 'gray' }}>WUC</Typography>
                  </Grid>
                  <Grid item sm={1}>
                    <Typography sx={{ color: 'gray' }}>Shop</Typography>
                  </Grid>
                  <Grid item sm={8}>
                    <Typography sx={{ color: 'gray' }}>Discrepancy</Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
              {job.jcn_wces.map((wce) => (
                <AccordionDetails key={wce.wce_id}>
                  <Grid container sx={{ textAlign: 'center' }} rowSpacing={2}>
                    <Grid item sm={1}>
                      <Typography>
                        {wce.wce_id.toString().padStart(3, '0')}
                      </Typography>
                    </Grid>
                    <Grid item sm={1}>
                      <Typography sx={{ color: 'red' }}>
                        <b>{wce.symbol}</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={1}>
                      <Typography>{wce.work_unit_code_id}</Typography>
                    </Grid>
                    <Grid item sm={1}>
                      <Typography>{wce.shop_id}</Typography>
                    </Grid>
                    <Grid item sm={8}>
                      <Typography>{wce.discrepancy}</Typography>
                    </Grid>
                    <Grid item sm={12}>
                      {wce.stop_time ? (
                        <CheckIcon
                          color="success"
                          fontSize="large"
                          sx={{ marginLeft: '83%' }}
                        />
                      ) : (
                        <Button
                          variant="contained"
                          sx={{ marginLeft: '83%' }}
                          onClick={() => handleWceCompletionModalOpen(job, wce)}
                        >
                          Complete
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              ))}
            </Accordion>
          </div>
        ))}
      </Box>
    </Box>
  )
}

export default MxList
