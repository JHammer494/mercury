import {
  actionTakens,
  actionTaken,
  createActionTaken,
  updateActionTaken,
  deleteActionTaken,
} from './actionTakens'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('actionTakens', () => {
  scenario('returns all actionTakens', async (scenario) => {
    const result = await actionTakens()

    expect(result.length).toEqual(Object.keys(scenario.actionTaken).length)
  })

  scenario('returns a single actionTaken', async (scenario) => {
    const result = await actionTaken({ id: scenario.actionTaken.one.id })

    expect(result).toEqual(scenario.actionTaken.one)
  })

  scenario('creates a actionTaken', async () => {
    const result = await createActionTaken({
      input: { id: 'String', description: 'String' },
    })

    expect(result.id).toEqual('String')
    expect(result.description).toEqual('String')
  })

  scenario('updates a actionTaken', async (scenario) => {
    const original = await actionTaken({ id: scenario.actionTaken.one.id })
    const result = await updateActionTaken({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a actionTaken', async (scenario) => {
    const original = await deleteActionTaken({
      id: scenario.actionTaken.one.id,
    })

    const result = await actionTaken({ id: original.id })

    expect(result).toEqual(null)
  })
})
