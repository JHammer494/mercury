import Aircraft from './Aircrafts'
import JCNs from './JCNs'
const AircraftDrivers = []

for (let x of Aircraft) {
  for (let y of JCNs) {
    if (y.aircraft_id == x.id && y.symbol === 'X') {
      AircraftDrivers.push({
        id: x.id,
        driver_jcn: y.jcn_id,
        driver_jcn_unit: y.unit_id,
      })
      break
    }
  }
}

export default AircraftDrivers
