import {
  typeMxes,
  typeMx,
  createTypeMx,
  updateTypeMx,
  deleteTypeMx,
} from './typeMxes'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('typeMxes', () => {
  scenario('returns all typeMxes', async (scenario) => {
    const result = await typeMxes()

    expect(result.length).toEqual(Object.keys(scenario.typeMx).length)
  })

  scenario('returns a single typeMx', async (scenario) => {
    const result = await typeMx({ id: scenario.typeMx.one.id })

    expect(result).toEqual(scenario.typeMx.one)
  })

  scenario('creates a typeMx', async () => {
    const result = await createTypeMx({
      input: { id: 'String', description: 'String' },
    })

    expect(result.id).toEqual('String')
    expect(result.description).toEqual('String')
  })

  scenario('updates a typeMx', async (scenario) => {
    const original = await typeMx({ id: scenario.typeMx.one.id })
    const result = await updateTypeMx({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a typeMx', async (scenario) => {
    const original = await deleteTypeMx({ id: scenario.typeMx.one.id })
    const result = await typeMx({ id: original.id })

    expect(result).toEqual(null)
  })
})
