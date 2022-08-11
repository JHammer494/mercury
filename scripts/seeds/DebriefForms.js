import { faker } from '@faker-js/faker'
import Sorties from './Sorties'

const DebriefForms = []
const callSigns = ['MiHawk', 'Big Mom', 'Don Quixote', 'Hancock']

for (let x in Sorties) {
  if (Sorties[x].actual_land != null) {
    DebriefForms.push({
      landing_fuel: faker.datatype.number({
        min: 40,
        max: Sorties[x].required_fuel - 20,
      }),
      bird_strike: faker.datatype.boolean(),
      air_refuel_callsign: faker.helpers.arrayElement(callSigns),
      air_refuel_amount: faker.datatype.number({ min: 40, max: 100 }),
      drag_chute: faker.datatype.boolean(),
      hung_store: faker.datatype.boolean(),
      in_flight_emergency: faker.datatype.boolean(),
      bomb_door_actuation: faker.datatype.boolean(),
      sortie_id: parseInt(x) + 1,
      user_id: 6,
      submitted: Sorties[x].actual_land,
    })
  }
}

export default DebriefForms
