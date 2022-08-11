import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FaqGroupItem = ({ title, items }) => {
  const theme = useTheme()
  return (
    <Box>
      <Box>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h5'}
          align={'left'}
        >
          {title}
        </Box>
      </Box>
      <Box>
        {items.map((item, i) => (
          <Box
            component={Accordion}
            key={i}
            paddingY={1}
            elevation={0}
            sx={{
              '&:first-of-type': {
                borderTopLeftRadius: theme.spacing(1),
                borderTopRightRadius: theme.spacing(1),
              },
              '&:not(:first-of-type):before': {
                opacity: '1 !important',
                display: 'block !important',
              },
              '&.Mui-expanded': {
                margin: 0,
              },
            }}
          >
            <Box
              component={AccordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={`panel1a-header--${i}`}
              padding={`${theme.spacing(0)} !important`}
            >
              <Typography fontWeight={600}>{item.title}</Typography>
            </Box>
            <AccordionDetails>
              <Typography color="text.secondary">{item.subtitle}</Typography>
            </AccordionDetails>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

FaqGroupItem.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

const Content = () => {
  return (
    <Box>
      <Box marginBottom={6}>
        <FaqGroupItem
          title={'Basics'}
          items={[
            {
              title: 'Will Mercury replace IMDS and PEX?',
              subtitle: `Currently no, the goal is to interface with them. Ideally we'd love to transfer to Mercury over time, and have all maintenance documation stored in Mercury's back end.`,
            },
            {
              title: 'Can Mercury interface with Envision, G081, or REMIS?',
              subtitle:
                'After Mercury is routed through the proper channels and approval processes absolutely! We have set up our back end to mirror that of other applications to make the transition seamless.',
            },
            {
              title: 'Why can’t Mercury be implemented as is?',
              subtitle:
                'Our system is currently running off local databases and will need proper integration into the current Application Programming Interface ecosystem.',
            },
            {
              title:
                'How much work is involved in implementing Mercury into an aircraft maintenance unit?',
              subtitle: `The implementation process involves 3 baseline steps. The first step being set-up; a process requiring permissions on authority to operate, a security audit, and any AFI revisions/waivers required. We would then need to tailor our data in order to directly correlate with a specific aircraft’s work unit codes.
                Secondly, we would have to establish the proper data pipelines to databases such as PEX and IMDS additionally we would need to deploy the site to DoD Platform One and authorize Mercury’s users through Platform One. Lastly, we would need to execute the onboarding process and bring on system admins to assign/ manage user accounts and permissions.`,
            },
            {
              title:
                'Can any base use Mercury? Does it require a special setup for each base?',
              subtitle:
                'For AFGSC, the answer is yes. For other MAJCOMs the answer is still yes. However, there will need to be customizations tailored to their specific needs.',
            },
            {
              title: 'Can Mercury be used on phones?',
              subtitle:
                'Yes, but currently as it stands Mercury is not fully optimized for operation on mobile devices, although Platform One covers mobile authentication as it allows the use of username/password logins thus eliminating the need for a CAC reader.',
            },
            {
              title: 'How much time will Mercury save?',
              subtitle: 'We approximate roughly 16 man hours per week!',
            },
          ]}
        />
      </Box>
    </Box>
  )
}

export default Content
