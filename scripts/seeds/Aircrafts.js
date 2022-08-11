import { faker } from '@faker-js/faker'
import Airframes from './Airframes'
import Configs from './Configs'

const tailNumbers = [
  100124, 130129, 200129, 860080, 940004, 210054, 402072, 412446, 490268,
  520008, 570166, 580187, 580188, 580256, 600053, 610026, 610273, 960085,
  929000, 486563,
]
const names = [
  'Bansheeflow',
  'Dreamnova',
  'Azurelight',
  'Ghostflight',
  'Brightpyre',
  'Small Cobra',
  'Smooth Ducchess',
  'False Flight',
  'Forsaken Thunder',
  'Royal Cobra',
  'Dreamcry',
  'Skyblast',
  'Ironrage',
  'Dreamshade',
  'Ebonroar',
  'Rude Thunder',
  'Vengeful Ducchess',
  'Swift Cobra',
  'Silent Bee',
  'Vivid Harrier',
]
const ParkLoc = [
  'A2',
  'A3',
  'A4',
  'A1',
  'A5',
  'A6',
  'A7',
  'A8',
  'D1',
  'D2',
  'D3',
  'D4',
  'D5',
  'D6',
  'D7',
  'E4',
  'E5',
  'E7',
  'H2',
  'H3',
  'H5',
  'H12',
  'H14',
  'H16',
  'H21',
]
const Aircraft = []

for (let x = 0; x < tailNumbers.length; x++) {
  let unit_id = 1111
  Aircraft.push({
    name: names[x],
    status_id: faker.helpers.arrayElement(['FMC', 'PMCB', 'NMCM']),
    id: tailNumbers[x],
    fuel_quant: faker.datatype.number({ min: 0, max: 300 }),
    parking_location: faker.unique(faker.helpers.arrayElement, [ParkLoc], {
      maxRetries: 300,
    }),
    preflight_inspection: faker.date.recent(4),
    flight_hours: faker.datatype.number({ min: 15, max: 8000 }),
    mx_priority: faker.unique(faker.datatype.number, [
      {
        min: 1,
        max: tailNumbers.length,
      },
    ]),
    unit_id: 1113,
    geo_loc_id: 'DYAF',
    config: faker.helpers.arrayElement(Configs),
    airframe_id: faker.helpers.arrayElement(Airframes).id,
    cur_oxygen: faker.datatype.number({ min: 0, max: 70 }),
  })
}

export default Aircraft
