import Aircraft from './Aircrafts'
import { faker } from '@faker-js/faker'

const CalenderInspections = []
const scheduled = [
  {
    name: 'Aircraft Corrosion Inspection',
    inspection_details: 'Wash',
    frequency: 10,
    last_completed: '',
    aircraft_id: '',
  },
  {
    name: 'Hourly Post Flight',
    inspection_details: 'Seat Chutes',
    frequency: 30,
    last_completed: '',
    aircraft_id: '',
  },
  {
    name: 'Phase Inspecion',
    inspection_details: 'Rain Rep',
    frequency: 30,
    last_completed: '',
    aircraft_id: '',
  },
]

for (let x of scheduled) {
  for (let y of Aircraft) {
    CalenderInspections.push({
      ...x,
      last_completed: faker.date.recent(25),
      aircraft_id: y.id,
    })
  }
}

export default CalenderInspections
