import {
  pexSorties,
  pexSortie,
  createPexSortie,
  updatePexSortie,
  deletePexSortie,
} from './pexSorties'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pexSorties', () => {
  scenario('returns all pexSorties', async (scenario) => {
    const result = await pexSorties()

    expect(result.length).toEqual(Object.keys(scenario.pexSortie).length)
  })

  scenario('returns a single pexSortie', async (scenario) => {
    const result = await pexSortie({ id: scenario.pexSortie.one.id })

    expect(result).toEqual(scenario.pexSortie.one)
  })

  scenario('creates a pexSortie', async () => {
    const result = await createPexSortie({
      input: {
        projected_launch: '2022-06-21T18:46:24Z',
        projected_land: '2022-06-21T18:46:24Z',
        unit: 'String',
        required_fuel: 8822207,
        config: 'String',
      },
    })

    expect(result.projected_launch).toEqual('2022-06-21T18:46:24Z')
    expect(result.projected_land).toEqual('2022-06-21T18:46:24Z')
    expect(result.unit).toEqual('String')
    expect(result.required_fuel).toEqual(8822207)
    expect(result.config).toEqual('String')
  })

  scenario('updates a pexSortie', async (scenario) => {
    const original = await pexSortie({ id: scenario.pexSortie.one.id })
    const result = await updatePexSortie({
      id: original.id,
      input: { projected_launch: '2022-06-22T18:46:24Z' },
    })

    expect(result.projected_launch).toEqual('2022-06-22T18:46:24Z')
  })

  scenario('deletes a pexSortie', async (scenario) => {
    const original = await deletePexSortie({ id: scenario.pexSortie.one.id })
    const result = await pexSortie({ id: original.id })

    expect(result).toEqual(null)
  })
})
