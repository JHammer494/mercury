import { faker } from '@faker-js/faker'
import JCNs, { symbol } from './JCNs'
import WhenDiscovereds from './WhenDiscovereds'
import WorkUnitCodes from './WorkUnitCodes'
import Shops from './Shops'
import HowMals from './HowMals'

const WCEs = []
for (let x of JCNs) {
  for (let i = 0; i <= faker.datatype.number({ min: 0, max: 8 }); i++) {
    let whenCreated = faker.date.soon(0.1, x.when_created)
    WCEs.push({
      wce_id: i + 1,
      jcn_id: x.jcn_id,
      unit_id: x.unit_id,
      work_unit_code_id: faker.helpers.arrayElement(WorkUnitCodes).id,
      discrepancy: faker.lorem.sentence(),
      symbol: faker.helpers.arrayElement(symbol),
      when_discovered_id: faker.helpers.arrayElement(WhenDiscovereds).id,
      discovered_by_user_id: faker.datatype.number({ min: 1, max: 8 }),
      shop_id: faker.helpers.arrayElement(Shops).id,
      how_mal_id: faker.helpers.arrayElement(HowMals).id,
      when_created: whenCreated,
      start_time: faker.date.soon(0.1, whenCreated),
    })
  }
}

export default WCEs
