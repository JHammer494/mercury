import {
  whenDiscovereds,
  whenDiscovered,
  createWhenDiscovered,
  updateWhenDiscovered,
  deleteWhenDiscovered,
} from './whenDiscovereds'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('whenDiscovereds', () => {
  scenario('returns all whenDiscovereds', async (scenario) => {
    const result = await whenDiscovereds()

    expect(result.length).toEqual(Object.keys(scenario.whenDiscovered).length)
  })

  scenario('returns a single whenDiscovered', async (scenario) => {
    const result = await whenDiscovered({
      id: scenario.whenDiscovered.one.id,
    })

    expect(result).toEqual(scenario.whenDiscovered.one)
  })

  scenario('creates a whenDiscovered', async () => {
    const result = await createWhenDiscovered({
      input: { id: 'String', description: 'String' },
    })

    expect(result.id).toEqual('String')
    expect(result.description).toEqual('String')
  })

  scenario('updates a whenDiscovered', async (scenario) => {
    const original = await whenDiscovered({
      id: scenario.whenDiscovered.one.id,
    })

    const result = await updateWhenDiscovered({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a whenDiscovered', async (scenario) => {
    const original = await deleteWhenDiscovered({
      id: scenario.whenDiscovered.one.id,
    })

    const result = await whenDiscovered({ id: original.id })

    expect(result).toEqual(null)
  })
})
