import {
  workUnitCodes,
  workUnitCode,
  createWorkUnitCode,
  updateWorkUnitCode,
  deleteWorkUnitCode,
} from './workUnitCodes'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('workUnitCodes', () => {
  scenario('returns all workUnitCodes', async (scenario) => {
    const result = await workUnitCodes()

    expect(result.length).toEqual(Object.keys(scenario.workUnitCode).length)
  })

  scenario('returns a single workUnitCode', async (scenario) => {
    const result = await workUnitCode({ id: scenario.workUnitCode.one.id })

    expect(result).toEqual(scenario.workUnitCode.one)
  })

  scenario('creates a workUnitCode', async (scenario) => {
    const result = await createWorkUnitCode({
      input: {
        id: 'String',
        description: 'String',
        airframe_id: scenario.workUnitCode.two.airframe_id,
      },
    })

    expect(result.id).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.airframe_id).toEqual(scenario.workUnitCode.two.airframe_id)
  })

  scenario('updates a workUnitCode', async (scenario) => {
    const original = await workUnitCode({ id: scenario.workUnitCode.one.id })
    const result = await updateWorkUnitCode({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a workUnitCode', async (scenario) => {
    const original = await deleteWorkUnitCode({
      id: scenario.workUnitCode.one.id,
    })

    const result = await workUnitCode({ id: original.id })

    expect(result).toEqual(null)
  })
})
