import {
  hourlyInspections,
  hourlyInspection,
  createHourlyInspection,
  updateHourlyInspection,
  deleteHourlyInspection,
} from './hourlyInspections'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('hourlyInspections', () => {
  scenario('returns all hourlyInspections', async (scenario) => {
    const result = await hourlyInspections()

    expect(result.length).toEqual(Object.keys(scenario.hourlyInspection).length)
  })

  scenario('returns a single hourlyInspection', async (scenario) => {
    const result = await hourlyInspection({
      id: scenario.hourlyInspection.one.id,
    })

    expect(result).toEqual(scenario.hourlyInspection.one)
  })

  scenario('creates a hourlyInspection', async (scenario) => {
    const result = await createHourlyInspection({
      input: {
        name: 'String',
        inspection_details: 'String',
        frequency: 8110371.244487866,
        last_completed: 5317322.83984931,
        aircraft_id: scenario.hourlyInspection.two.aircraft_id,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.inspection_details).toEqual('String')
    expect(result.frequency).toEqual(8110371.244487866)
    expect(result.last_completed).toEqual(5317322.83984931)
    expect(result.aircraft_id).toEqual(
      scenario.hourlyInspection.two.aircraft_id
    )
  })

  scenario('updates a hourlyInspection', async (scenario) => {
    const original = await hourlyInspection({
      id: scenario.hourlyInspection.one.id,
    })

    const result = await updateHourlyInspection({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a hourlyInspection', async (scenario) => {
    const original = await deleteHourlyInspection({
      id: scenario.hourlyInspection.one.id,
    })

    const result = await hourlyInspection({ id: original.id })

    expect(result).toEqual(null)
  })
})
