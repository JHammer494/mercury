import { units, unit, createUnit, updateUnit, deleteUnit } from './units'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('units', () => {
  scenario('returns all units', async (scenario) => {
    const result = await units()

    expect(result.length).toEqual(Object.keys(scenario.unit).length)
  })

  scenario('returns a single unit', async (scenario) => {
    const result = await unit({ id: scenario.unit.one.id })

    expect(result).toEqual(scenario.unit.one)
  })

  scenario('creates a unit', async (scenario) => {
    const result = await createUnit({
      input: {
        id: 8332318,
        name: 'String9381076',
        geo_loc_id: scenario.unit.two.geo_loc_id,
      },
    })

    expect(result.id).toEqual(8332318)
    expect(result.name).toEqual('String9381076')
    expect(result.geo_loc_id).toEqual(scenario.unit.two.geo_loc_id)
  })

  scenario('updates a unit', async (scenario) => {
    const original = await unit({ id: scenario.unit.one.id })
    const result = await updateUnit({
      id: original.id,
      input: { id: 7396586 },
    })

    expect(result.id).toEqual(7396586)
  })

  scenario('deletes a unit', async (scenario) => {
    const original = await deleteUnit({ id: scenario.unit.one.id })
    const result = await unit({ id: original.id })

    expect(result).toEqual(null)
  })
})
