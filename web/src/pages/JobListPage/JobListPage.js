import { Typography } from '@mui/material'
import { useAuth } from '@redwoodjs/auth'
import JobListCell from '../../components/JobListCell/JobListCell'

const JobListPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <Typography
        variant="h3"
        sx={{ margin: 0, paddingTop: '100px', marginLeft: 5, marginBottom: 5 }}
      >
        Current Job Listing for {currentUser.shop.id}
      </Typography>
      <Typography variant="div">
        <JobListCell />
      </Typography>
    </>
  )
}

export default JobListPage
