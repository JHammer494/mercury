import {
  aircraftNotes,
  aircraftNote,
  createAircraftNote,
  updateAircraftNote,
  deleteAircraftNote,
} from './aircraftNotes'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('aircraftNotes', () => {
  scenario('returns all aircraftNotes', async (scenario) => {
    const result = await aircraftNotes()

    expect(result.length).toEqual(Object.keys(scenario.aircraftNote).length)
  })

  scenario('returns a single aircraftNote', async (scenario) => {
    const result = await aircraftNote({ id: scenario.aircraftNote.one.id })

    expect(result).toEqual(scenario.aircraftNote.one)
  })

  scenario('creates a aircraftNote', async (scenario) => {
    const result = await createAircraftNote({
      input: {
        note: 'String',
        user_id: scenario.aircraftNote.two.user_id,
        aircraft_id: scenario.aircraftNote.two.aircraft_id,
      },
    })

    expect(result.note).toEqual('String')
    expect(result.user_id).toEqual(scenario.aircraftNote.two.user_id)
    expect(result.aircraft_id).toEqual(scenario.aircraftNote.two.aircraft_id)
  })

  scenario('updates a aircraftNote', async (scenario) => {
    const original = await aircraftNote({ id: scenario.aircraftNote.one.id })
    const result = await updateAircraftNote({
      id: original.id,
      input: { note: 'String2' },
    })

    expect(result.note).toEqual('String2')
  })

  scenario('deletes a aircraftNote', async (scenario) => {
    const original = await deleteAircraftNote({
      id: scenario.aircraftNote.one.id,
    })

    const result = await aircraftNote({ id: original.id })

    expect(result).toEqual(null)
  })
})
