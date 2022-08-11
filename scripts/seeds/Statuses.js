// ref. AFI21-103 Att. 2
// https://static.e-publishing.af.mil/production/1/af_a4/publication/afi21-103/afi21-103.pdf

const Statuses = [
  {
    id: 'FMC',
    description: 'Fully Mission Capable',
  },
  {
    id: 'PMCB',
    description: 'Partial Mission Capable, Both Maintenance and Supply',
  },
  {
    id: 'PMCS',
    description: 'Partial Mission Capable, Supply',
  },
  {
    id: 'PMCM',
    description: 'Partial Mission Capable, Maintenance',
  },
  {
    id: 'NMCM',
    description: 'Non-Mission Capable, Maintenance',
  },
  {
    id: 'NMCA',
    description: 'Non-Mission Capable, Aircraft',
  },
  {
    id: 'NMCB',
    description: 'Non-Mission Capable, Both Maintenance and Supply',
  },
  {
    id: 'NMCBA',
    description: 'Non-Mission Capable, Both Maintenance and Supply Aircraft',
  },
  {
    id: 'NMCBS',
    description: 'Non-Mission Capable, Both Maintenance and Supply Scheduled',
  },
  {
    id: 'NMCBU',
    description: 'Non-Mission Capable, Both Maintenance and Supply Unscheduled',
  },
  {
    id: 'NMCBSA',
    description:
      'Non-Mission Capable, Both Maintenance and Supply Scheduled Aircraft',
  },
  {
    id: 'NMCBUA',
    description:
      'Non-Mission Capable, Both Maintenance and Supply Unscheduled Aircraft',
  },
  {
    id: 'NMCMA',
    description: 'Non-Mission Capable, Maintenance Aircraft',
  },
  {
    id: 'NMCMS',
    description: 'Non-Mission Capable, Maintenance Scheduled',
  },
  {
    id: 'NMCMU',
    description: 'Non-Mission Capable, Maintenance Unscheduled',
  },
  {
    id: 'NMCMSA',
    description: 'Non-Mission Capable, Maintenance Scheduled Aircraft',
  },
  {
    id: 'NMCMUA',
    description: 'Non-Mission Capable, Maintenance Unscheduled Aircraft',
  },
  {
    id: 'NMCS',
    description: 'Non-Mission Capable, Supply',
  },
  {
    id: 'NMCSA',
    description: 'Non-Mission Capable, Supply Aircraft',
  },
]

export default Statuses
