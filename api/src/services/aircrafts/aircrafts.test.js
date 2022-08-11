import {
  aircrafts,
  aircraft,
  createAircraft,
  updateAircraft,
  deleteAircraft,
} from './aircrafts'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('aircrafts', () => {
  scenario('returns all aircrafts', async (scenario) => {
    const result = await aircrafts()

    expect(result.length).toEqual(Object.keys(scenario.aircraft).length)
  })

  scenario('returns a single aircraft', async (scenario) => {
    const result = await aircraft({ id: scenario.aircraft.one.id })

    expect(result).toEqual(scenario.aircraft.one)
  })

  scenario('creates a aircraft', async (scenario) => {
    const result = await createAircraft({
      input: {
        id: 504372,
        fuel_quant: 1662280,
        status_id: scenario.aircraft.two.status_id,
        geo_loc_id: scenario.aircraft.two.geo_loc_id,
        preflight_inspection: '2022-06-29T15:09:22Z',
        flight_hours: 4516058.264846982,
        unit_id: scenario.aircraft.two.unit_id,
        config: 'String',
        airframe_id: scenario.aircraft.two.airframe_id,
        cur_oxygen: 6666097,
      },
    })

    expect(result.id).toEqual(504372)
    expect(result.fuel_quant).toEqual(1662280)
    expect(result.status_id).toEqual(scenario.aircraft.two.status_id)
    expect(result.geo_loc_id).toEqual(scenario.aircraft.two.geo_loc_id)
    expect(result.preflight_inspection).toEqual('2022-06-29T15:09:22Z')
    expect(result.flight_hours).toEqual(4516058.264846982)
    expect(result.unit_id).toEqual(scenario.aircraft.two.unit_id)
    expect(result.config).toEqual('String')
    expect(result.airframe_id).toEqual(scenario.aircraft.two.airframe_id)
    expect(result.cur_oxygen).toEqual(6666097)
  })

  scenario('updates a aircraft', async (scenario) => {
    const original = await aircraft({ id: scenario.aircraft.one.id })
    const result = await updateAircraft({
      id: original.id,
      input: { id: 1294746 },
    })

    expect(result.id).toEqual(1294746)
  })

  scenario('deletes a aircraft', async (scenario) => {
    const original = await deleteAircraft({ id: scenario.aircraft.one.id })
    const result = await aircraft({ id: original.id })

    expect(result).toEqual(null)
  })
})
