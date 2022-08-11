import {
  geoLocs,
  geoLoc,
  createGeoLoc,
  updateGeoLoc,
  deleteGeoLoc,
} from './geoLocs'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('geoLocs', () => {
  scenario('returns all geoLocs', async (scenario) => {
    const result = await geoLocs()

    expect(result.length).toEqual(Object.keys(scenario.geoLoc).length)
  })

  scenario('returns a single geoLoc', async (scenario) => {
    const result = await geoLoc({ id: scenario.geoLoc.one.id })

    expect(result).toEqual(scenario.geoLoc.one)
  })

  scenario('creates a geoLoc', async () => {
    const result = await createGeoLoc({
      input: { id: 'String', name: 'String' },
    })

    expect(result.id).toEqual('String')
    expect(result.name).toEqual('String')
  })

  scenario('updates a geoLoc', async (scenario) => {
    const original = await geoLoc({ id: scenario.geoLoc.one.id })
    const result = await updateGeoLoc({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a geoLoc', async (scenario) => {
    const original = await deleteGeoLoc({ id: scenario.geoLoc.one.id })
    const result = await geoLoc({ id: original.id })

    expect(result).toEqual(null)
  })
})
