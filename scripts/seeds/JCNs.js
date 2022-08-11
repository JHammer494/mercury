import { faker } from '@faker-js/faker'
import WorkUnitCodes from './WorkUnitCodes'
import WhenDiscovereds from './WhenDiscovereds'
import Shops from './Shops'

import Aircraft from './Aircrafts'

const components = [
  'Brakes',
  'Tires',
  'UHF Radio #1',
  'UHF Radio #2',
  'VHF Radio #1',
  'VHF Radio #2',
  'Toliet',
  'Data Bus',
  'Compass',
  'Processor #1',
  'Processor #2',
  'Panel',
  'Circut-Breaker',
  'Fill-Port',
  'Reciever/Transmitter',
  'Transformer / Rectifier #1',
  'Transformer / Rectifier #2',
  'Transformer / Rectifier #3',
  'Transformer / Rectifier #4',
  'Wiper Moter #1',
  'Wiper Moter #2',
  'Hydro Pump #1',
  'Hydro Pump #2',
  'Pressure Sensor',
  'FWD Engine #1 Temp Sensor',
  'RW Engine #1 Temp Sensor',
  'FWD Engine #2 Temp Sensor',
  'RW Engine #2 Temp Sensor',
  'Pitot Membrane',
  'Pilot Drink Holder',
  'Central Display Screen',
  'Standby Flight Instruments',
]
const actions = [
  'replacement',
  'inspection',
  're-install',
  'ops-check',
  'removal',
]
const intervals = ['before next flight', 'after next flight', 'next power-up']
export const symbol = ['/', 'X', '-']
const JCNs = []
for (let plane of Aircraft) {
  for (let i = 0; i < 20; i++) {
    let whenCreated = faker.date.recent(0.5)
    JCNs.push({
      jcn_id: faker.unique(() => {
        return (
          '21' +
          faker.datatype.number(1, { max: 2 }).toString() +
          faker.datatype.number(1).toString() +
          faker.datatype.number(1).toString() +
          faker.random.numeric(4).toString()
        )
      }),
      aircraft_id: plane.id,
      unit_id: plane.unit_id,
      work_unit_code_id: faker.helpers.arrayElement(WorkUnitCodes).id,
      discrepancy: `Aircraft ${faker.helpers.arrayElement(
        components
      )} requires ${faker.helpers.arrayElement(
        actions
      )} ${faker.helpers.arrayElement(intervals)}`,
      symbol: faker.helpers.arrayElement(symbol),
      when_discovered_id: faker.helpers.arrayElement(WhenDiscovereds).id,
      is_repeat: false,
      is_recur: false,
      shop_id: faker.helpers.arrayElement(Shops).id,
      discovered_by_user_id: faker.datatype.number({ min: 1, max: 8 }),
      when_created: whenCreated,
      etic: faker.date.soon(0.8, whenCreated),
    })
  }
}

export default JCNs
