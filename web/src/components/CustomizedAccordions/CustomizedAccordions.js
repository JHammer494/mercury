import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArrowForwardIos } from '@mui/icons-material'

export const StyledAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

export const StyledAccordionSummary = styled((props) => (
  <AccordionSummary
    expandIcon={<ArrowForwardIos sx={{ fontSize: '1em' }} />}
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
    alignContent: 'center',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(1),
  },
}))

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}))
