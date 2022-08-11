import {
  spareFlyers,
  spareFlyer,
  createSpareFlyer,
  updateSpareFlyer,
  deleteSpareFlyer,
} from './spareFlyers'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('spareFlyers', () => {
  scenario('returns all spareFlyers', async (scenario) => {
    const result = await spareFlyers()

    expect(result.length).toEqual(Object.keys(scenario.spareFlyer).length)
  })

  scenario('returns a single spareFlyer', async (scenario) => {
    const result = await spareFlyer({ id: scenario.spareFlyer.one.id })

    expect(result).toEqual(scenario.spareFlyer.one)
  })

  scenario('creates a spareFlyer', async (scenario) => {
    const result = await createSpareFlyer({
      input: {
        id: 173006,
        aircraft_id: scenario.spareFlyer.two.aircraft_id,
        date: '2022-07-13T15:22:22Z',
      },
    })

    expect(result.id).toEqual(173006)
    expect(result.aircraft_id).toEqual(scenario.spareFlyer.two.aircraft_id)
    expect(result.date).toEqual('2022-07-13T15:22:22Z')
  })

  scenario('updates a spareFlyer', async (scenario) => {
    const original = await spareFlyer({ id: scenario.spareFlyer.one.id })
    const result = await updateSpareFlyer({
      id: original.id,
      input: { id: 359858 },
    })

    expect(result.id).toEqual(359858)
  })

  scenario('deletes a spareFlyer', async (scenario) => {
    const original = await deleteSpareFlyer({ id: scenario.spareFlyer.one.id })
    const result = await spareFlyer({ id: original.id })

    expect(result).toEqual(null)
  })
})
