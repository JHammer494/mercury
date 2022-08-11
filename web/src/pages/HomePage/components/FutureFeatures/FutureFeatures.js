/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Card, Avatar, Typography } from '@mui/material'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import ReplayIcon from '@mui/icons-material/Replay'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import EventRepeatIcon from '@mui/icons-material/EventRepeat'

const FutureFeatures = () => {
  const theme = useTheme()
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'textSecondary'}
          align={'center'}
        >
          Future Features
        </Typography>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          gutterBottom
          align={'center'}
        >
          Possible implementations for
          <br />
          for the future of Mercury
        </Box>
        <Typography
          variant={'h6'}
          component={'p'}
          color={'textSecondary'}
          align={'center'}
        >
          We are confident with a little more time we can make Mercury even
          better!
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={4}>
          {[
            {
              title: 'Mobile Usage',
              subtitle: 'For using Mercury on the go!',
              icon: (
                <PhoneIphoneIcon
                  height={24}
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </PhoneIphoneIcon>
              ),
            },
            {
              title: 'Notifications',
              subtitle:
                'To stay up to date with that latest information reguarding your fleet!',
              icon: (
                <NotificationsActiveIcon
                  height={24}
                  width={24}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </NotificationsActiveIcon>
              ),
            },
            {
              title: 'Analytics',
              subtitle: 'To track pinpoint statistics on your fleet!',
              icon: (
                <AnalyticsIcon
                  height={24}
                  width={24}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </AnalyticsIcon>
              ),
            },
            {
              title: 'Repeat/Recur Tracking',
              subtitle: 'To identify consistencies in MX write-ups!',
              icon: (
                <ReplayIcon
                  height={24}
                  width={24}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </ReplayIcon>
              ),
            },
            {
              title: 'Printable Forms',
              subtitle: 'To allow easy access to all types of aircraft forms!',
              icon: (
                <LocalPrintshopIcon
                  height={24}
                  width={24}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </LocalPrintshopIcon>
              ),
            },
            {
              title: 'Revisions to Schedule Builder',
              subtitle: `To make for a cleaner look!`,
              icon: (
                <EventRepeatIcon
                  height={24}
                  width={24}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </EventRepeatIcon>
              ),
            },
          ].map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                component={Card}
                padding={4}
                borderRadius={4}
                width={'100%'}
                height={'100%'}
                data-aos={'fade-up'}
              >
                <Box display={'flex'} flexDirection={'column'}>
                  <Box
                    component={Avatar}
                    width={50}
                    height={50}
                    marginBottom={2}
                    bgcolor={theme.palette.primary.main}
                    color={theme.palette.background.paper}
                  >
                    {item.icon}
                  </Box>
                  <Box
                    component={Typography}
                    variant={'h6'}
                    gutterBottom
                    sx={{ fontWeight: 500 }}
                  >
                    {item.title}
                  </Box>
                  <Typography color="text.secondary">
                    {item.subtitle}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default FutureFeatures
