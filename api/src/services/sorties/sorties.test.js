import {
  sorties,
  sortie,
  createSortie,
  updateSortie,
  deleteSortie,
} from './sorties'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('sorties', () => {
  scenario('returns all sorties', async (scenario) => {
    const result = await sorties()

    expect(result.length).toEqual(Object.keys(scenario.sortie).length)
  })

  scenario('returns a single sortie', async (scenario) => {
    const result = await sortie({ id: scenario.sortie.one.id })

    expect(result).toEqual(scenario.sortie.one)
  })

  scenario('creates a sortie', async (scenario) => {
    const result = await createSortie({
      input: {
        id: 4490076,
        projected_launch: '2022-06-29T15:13:18Z',
        projected_land: '2022-06-29T15:13:18Z',
        unit_id: scenario.sortie.two.unit_id,
        required_fuel: 4147197,
        config: 'String',
        call_sign: 'String',
      },
    })

    expect(result.id).toEqual(4490076)
    expect(result.projected_launch).toEqual('2022-06-29T15:13:18Z')
    expect(result.projected_land).toEqual('2022-06-29T15:13:18Z')
    expect(result.unit_id).toEqual(scenario.sortie.two.unit_id)
    expect(result.required_fuel).toEqual(4147197)
    expect(result.config).toEqual('String')
    expect(result.call_sign).toEqual('String')
  })

  scenario('updates a sortie', async (scenario) => {
    const original = await sortie({ id: scenario.sortie.one.id })
    const result = await updateSortie({
      id: original.id,
      input: { id: 5643502 },
    })

    expect(result.id).toEqual(5643502)
  })

  scenario('deletes a sortie', async (scenario) => {
    const original = await deleteSortie({ id: scenario.sortie.one.id })
    const result = await sortie({ id: original.id })

    expect(result).toEqual(null)
  })
})
