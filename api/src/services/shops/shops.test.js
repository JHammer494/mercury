import { shops, shop, createShop, updateShop, deleteShop } from './shops'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('shops', () => {
  scenario('returns all shops', async (scenario) => {
    const result = await shops()

    expect(result.length).toEqual(Object.keys(scenario.shop).length)
  })

  scenario('returns a single shop', async (scenario) => {
    const result = await shop({ id: scenario.shop.one.id })

    expect(result).toEqual(scenario.shop.one)
  })

  scenario('creates a shop', async (scenario) => {
    const result = await createShop({
      input: {
        id: 'String',
        unit_id: scenario.shop.two.unit_id,
        description: 'String',
      },
    })

    expect(result.id).toEqual('String')
    expect(result.unit_id).toEqual(scenario.shop.two.unit_id)
    expect(result.description).toEqual('String')
  })

  scenario('updates a shop', async (scenario) => {
    const original = await shop({ id: scenario.shop.one.id })
    const result = await updateShop({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a shop', async (scenario) => {
    const original = await deleteShop({ id: scenario.shop.one.id })
    const result = await shop({ id: original.id })

    expect(result).toEqual(null)
  })
})
