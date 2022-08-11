import { faker } from '@faker-js/faker'
import Aircraft from './Aircrafts'
const HourlyInspections = []

const scheduled = [
  {
    name: 'Oil',
    inspection_details: 'Check Oil Level Every 15 Hours',
    frequency: 5,
    last_completed: '',
    aircraft_id: '',
  },
  {
    name: 'Phase',
    inspection_details: 'Complete aircraft phase inspection every 600 hrs',
    frequency: 600,
    last_completed: '',
    aircraft_id: '',
  },
  {
    name: 'HSC',
    inspection_details: 'Every 75hr preform HomeStation Check',
    frequency: 75,
    last_completed: '',
    aircraft_id: '',
  },
]

for (let x of scheduled) {
  for (let y of Aircraft) {
    HourlyInspections.push({
      ...x,
      last_completed: y.flight_hours - faker.random.numeric(1),
      aircraft_id: y.id,
    })
  }
}

export default HourlyInspections
