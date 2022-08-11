import {
  personalNotes,
  personalNote,
  createPersonalNote,
  updatePersonalNote,
  deletePersonalNote,
} from './personalNotes'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('personalNotes', () => {
  scenario('returns all personalNotes', async (scenario) => {
    const result = await personalNotes()

    expect(result.length).toEqual(Object.keys(scenario.personalNote).length)
  })

  scenario('returns a single personalNote', async (scenario) => {
    const result = await personalNote({ id: scenario.personalNote.one.id })

    expect(result).toEqual(scenario.personalNote.one)
  })

  scenario('creates a personalNote', async (scenario) => {
    const result = await createPersonalNote({
      input: { note: 'String', user_id: scenario.personalNote.two.user_id },
    })

    expect(result.note).toEqual('String')
    expect(result.user_id).toEqual(scenario.personalNote.two.user_id)
  })

  scenario('updates a personalNote', async (scenario) => {
    const original = await personalNote({ id: scenario.personalNote.one.id })
    const result = await updatePersonalNote({
      id: original.id,
      input: { note: 'String2' },
    })

    expect(result.note).toEqual('String2')
  })

  scenario('deletes a personalNote', async (scenario) => {
    const original = await deletePersonalNote({
      id: scenario.personalNote.one.id,
    })

    const result = await personalNote({ id: original.id })

    expect(result).toEqual(null)
  })
})
