import {
  calendarInspections,
  calendarInspection,
  createCalendarInspection,
  updateCalendarInspection,
  deleteCalendarInspection,
} from './calendarInspections'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('calendarInspections', () => {
  scenario('returns all calendarInspections', async (scenario) => {
    const result = await calendarInspections()

    expect(result.length).toEqual(
      Object.keys(scenario.calendarInspection).length
    )
  })

  scenario('returns a single calendarInspection', async (scenario) => {
    const result = await calendarInspection({
      id: scenario.calendarInspection.one.id,
    })

    expect(result).toEqual(scenario.calendarInspection.one)
  })

  scenario('creates a calendarInspection', async (scenario) => {
    const result = await createCalendarInspection({
      input: {
        name: 'String',
        inspection_details: 'String',
        frequency: 3983204.682336099,
        last_completed: '2022-07-07T19:55:25Z',
        aircraft_id: scenario.calendarInspection.two.aircraft_id,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.inspection_details).toEqual('String')
    expect(result.frequency).toEqual(3983204.682336099)
    expect(result.last_completed).toEqual('2022-07-07T19:55:25Z')
    expect(result.aircraft_id).toEqual(
      scenario.calendarInspection.two.aircraft_id
    )
  })

  scenario('updates a calendarInspection', async (scenario) => {
    const original = await calendarInspection({
      id: scenario.calendarInspection.one.id,
    })

    const result = await updateCalendarInspection({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a calendarInspection', async (scenario) => {
    const original = await deleteCalendarInspection({
      id: scenario.calendarInspection.one.id,
    })

    const result = await calendarInspection({ id: original.id })

    expect(result).toEqual(null)
  })
})
