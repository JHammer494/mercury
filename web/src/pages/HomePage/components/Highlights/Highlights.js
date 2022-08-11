import React from 'react'
import { alpha, useTheme } from '@mui/material/styles'
import { Box, Typography, Avatar, Grid } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EngineeringIcon from '@mui/icons-material/Engineering'

const Highlights = () => {
  const theme = useTheme()
  return (
    <Box>
      <Grid container spacing={2}>
        {[
          {
            title: 'Built for maintainers',
            subtitle:
              'We’ve designed this application to include roles participating in aircraft maintenance assigned within an aircraft maintenance unit to include: lead pro supers, pro supers, expeditors, maintainers, and debriefers.',
            icon: (
              <EngineeringIcon
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
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </EngineeringIcon>
            ),
          },
          {
            title: 'Designed to save time',
            subtitle:
              'Designed to save time and effort spent across various forms of maintenance documentation.',
            icon: (
              <AccessTimeIcon
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
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </AccessTimeIcon>
            ),
          },
          {
            title: 'Developed by maintainers',
            subtitle:
              "We know what a day in maintenance is like, so we've kept that in mind throughout the development process to improve quality of life!",
            icon: (
              <svg
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            ),
          },
        ].map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Box width={1} height={'100%'} data-aos={'fade-up'}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Box
                  component={Avatar}
                  width={60}
                  height={60}
                  marginBottom={2}
                  bgcolor={alpha(theme.palette.primary.main, 0.1)}
                  color={theme.palette.primary.main}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant={'h6'}
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                  align={'center'}
                >
                  {item.title}
                </Typography>
                <Typography align={'center'} color="textSecondary">
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Highlights
