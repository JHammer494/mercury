import { Box, Button, Grid, Typography } from '@mui/material'
import { useMutation } from '@redwoodjs/web'
import * as React from 'react'
import { useState } from 'react'
import { format } from 'date-fns'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

export const QUERY = gql`
  query FindLineActionQuery($id: Int!) {
    sortie(id: $id) {
      actual_launch
      crew_ready
      crew_show
      id
      engine_start
      engine_shutdown
      actual_land
      taxi
    }
  }
`

const CREW_READY_MUTATION = gql`
  mutation mCrewReady($id: Int!, $crew_ready: DateTime) {
    updateSortie(id: $id, input: { crew_ready: $crew_ready }) {
      id
    }
  }
`
const CREW_SHOW_MUTATION = gql`
  mutation mCrewShow($id: Int!, $crew_show: DateTime) {
    updateSortie(id: $id, input: { crew_show: $crew_show }) {
      id
    }
  }
`
const ENG_START_MUTATION = gql`
  mutation mEngStart($id: Int!, $engine_start: DateTime) {
    updateSortie(id: $id, input: { engine_start: $engine_start }) {
      id
    }
  }
`
const TAXI_MUTATION = gql`
  mutation mTaxi($id: Int!, $taxi: DateTime) {
    updateSortie(id: $id, input: { taxi: $taxi }) {
      id
    }
  }
`
const TAKEOFF_MUTATION = gql`
  mutation mTakeoff($id: Int!, $actual_launch: DateTime) {
    updateSortie(id: $id, input: { actual_launch: $actual_launch }) {
      id
    }
  }
`

const ACTUAL_LAND_MUTATION = gql`
  mutation mActualLand($id: Int!, $actual_land: DateTime) {
    updateSortie(id: $id, input: { actual_land: $actual_land }) {
      id
    }
  }
`

const ENGINE_SHUTDOWN_MUTATION = gql`
  mutation mEngineShutdown($id: Int!, $engine_shutdown: DateTime) {
    updateSortie(id: $id, input: { engine_shutdown: $engine_shutdown }) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ sortie }) => {
  const { currentUser } = useAuth()
  const { data } = useQuery(QUERY, {
    variables: { id: sortie.id, sortie },
    pollInterval: 1000,
  })

  const [crewReady, setCrewReady] = useState(null)
  const [crewShow, setCrewShow] = useState(null)
  const [engineStart, setEngineStart] = useState(null)
  const [taxi, setTaxi] = useState(null)
  const [takeOff, setTakeOff] = useState(null)
  const [actualLand, setActualLand] = useState(null)
  const [engineShutdown, setEngineShutdown] = useState(null)
  const [disable] = useState(() => {
    if (
      currentUser.roles === 'pro super' ||
      currentUser.roles === 'lead pro super' ||
      currentUser.roles === 'expeditor'
    ) {
      return false
    } else return true
  })

  const [mCR] = useMutation(CREW_READY_MUTATION)
  const [mCS] = useMutation(CREW_SHOW_MUTATION)
  const [mES] = useMutation(ENG_START_MUTATION)
  const [mT] = useMutation(TAXI_MUTATION)
  const [mTO] = useMutation(TAKEOFF_MUTATION)
  const [mAL] = useMutation(ACTUAL_LAND_MUTATION)
  const [mESD] = useMutation(ENGINE_SHUTDOWN_MUTATION)
  const sortieID = sortie.id

  const formatDate = (x) => format(new Date(x), 'HH:mm')

  const lsx = {
    fontSize: '20px',
    cursor: 'pointer',
    textDecoration: 'none',
    size: 'small',
    justifyContent: 'left',
    padding: '2px',
    borderRadius: '10px',
    '&:hover': {
      transition: 'all 0.4s',
      transform: 'scale(1.1)',
    },
  }

  const tsx = {
    color: 'gray',
  }

  return (
    <Box>
      <Grid container spacing={1} sx={{ textAlign: 'left' }}>
        <Grid item xs={6}>
          <Typography sx={tsx}>Crew Ready</Typography>
          {crewReady || data.sortie.crew_ready !== null ? (
            <Typography variant="h5">
              {formatDate(crewReady || data.sortie.crew_ready)}
            </Typography>
          ) : (
            <Button
              id="crewready"
              color="success"
              sx={lsx}
              disabled={disable}
              onClick={() => {
                setCrewReady(new Date())
                mCR({ variables: { id: sortieID, crew_ready: new Date() } })
              }}
            >
              Mark Time
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={tsx}>Crew Show</Typography>
          {crewShow || data.sortie.crew_show !== null ? (
            <Typography variant="h5">
              {formatDate(crewShow || data.sortie.crew_show)}
            </Typography>
          ) : (
            <Button
              id="crewshow"
              color="success"
              sx={lsx}
              disabled={!(crewReady || data.sortie.crew_ready) || disable}
              onClick={() => {
                setCrewShow(new Date())
                mCS({ variables: { id: sortieID, crew_show: new Date() } })
              }}
            >
              Mark Time
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={tsx}>Engine Start</Typography>
          {engineStart || data.sortie.engine_start !== null ? (
            <Typography variant="h5">
              {formatDate(engineStart || data.sortie.engine_start)}
            </Typography>
          ) : (
            <Button
              id="enginestart"
              color="success"
              disabled={!(crewShow || data.sortie.crew_show) || disable}
              sx={lsx}
              onClick={() => {
                setEngineStart(new Date())
                mES({ variables: { id: sortieID, engine_start: new Date() } })
              }}
            >
              Mark Time
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={tsx}>Taxi</Typography>
          {taxi || data.sortie.taxi !== null ? (
            <Typography variant="h5">
              {formatDate(taxi || data.sortie.taxi)}
            </Typography>
          ) : (
            <Button
              id="taxistart"
              color="success"
              disabled={!(engineStart || data.sortie.engine_start) || disable}
              sx={lsx}
              onClick={() => {
                setTaxi(new Date())
                mT({ variables: { id: sortieID, taxi: new Date() } })
              }}
            >
              Mark Time
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={tsx}>Take-Off</Typography>
          {takeOff || data.sortie.actual_launch !== null ? (
            <Typography variant="h5">
              {formatDate(takeOff || data.sortie.actual_launch)}
            </Typography>
          ) : (
            <Button
              id="actuallaunch"
              color="success"
              disabled={!(taxi || data.sortie.taxi) || disable}
              sx={lsx}
              onClick={() => {
                setTakeOff(new Date())
                mTO({
                  variables: { id: sortieID, actual_launch: new Date() },
                })
              }}
            >
              Mark Time
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={tsx}>Wheels Down</Typography>
          {actualLand || data.sortie.actual_land !== null ? (
            <Typography variant="h5">
              {formatDate(actualLand || data.sortie.actual_land)}
            </Typography>
          ) : (
            <Button
              id="actualland"
              color="success"
              disabled={!(takeOff || data.sortie.actual_launch) || disable}
              sx={lsx}
              onClick={() => {
                setActualLand(new Date())
                mAL({ variables: { id: sortieID, actual_land: new Date() } })
              }}
            >
              Mark Time
            </Button>
          )}
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: '10px' }}>
          <Typography sx={tsx}>Eng Shut-down</Typography>
          {engineShutdown || data.sortie.engine_shutdown !== null ? (
            <Typography variant="h5">
              {formatDate(engineShutdown || data.sortie.engine_shutdown)}
            </Typography>
          ) : (
            <Button
              id="engineshutdown"
              color="success"
              disabled={!(actualLand || data.sortie.actual_land) || disable}
              sx={lsx}
              onClick={() => {
                setEngineShutdown(new Date())
                mESD({
                  variables: { id: sortieID, engine_shutdown: new Date() },
                })
              }}
            >
              Mark Time
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
