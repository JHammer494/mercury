import {
  howMals,
  howMal,
  createHowMal,
  updateHowMal,
  deleteHowMal,
} from './howMals'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('howMals', () => {
  scenario('returns all howMals', async (scenario) => {
    const result = await howMals()

    expect(result.length).toEqual(Object.keys(scenario.howMal).length)
  })

  scenario('returns a single howMal', async (scenario) => {
    const result = await howMal({ id: scenario.howMal.one.id })

    expect(result).toEqual(scenario.howMal.one)
  })

  scenario('creates a howMal', async () => {
    const result = await createHowMal({
      input: { id: 'String', description: 'String' },
    })

    expect(result.id).toEqual('String')
    expect(result.description).toEqual('String')
  })

  scenario('updates a howMal', async (scenario) => {
    const original = await howMal({ id: scenario.howMal.one.id })
    const result = await updateHowMal({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a howMal', async (scenario) => {
    const original = await deleteHowMal({ id: scenario.howMal.one.id })
    const result = await howMal({ id: original.id })

    expect(result).toEqual(null)
  })
})
