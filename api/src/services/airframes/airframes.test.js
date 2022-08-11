import { airframes } from './airframes'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('airframes', () => {
  scenario('returns all airframes', async (scenario) => {
    const result = await airframes()

    expect(result.length).toEqual(Object.keys(scenario.airframe).length)
  })
})
