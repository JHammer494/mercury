import { wces, wce, createWce, updateWce, deleteWce } from './wces'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('wces', () => {
  scenario('returns all wces', async (scenario) => {
    const result = await wces()

    expect(result.length).toEqual(Object.keys(scenario.wce).length)
  })

  scenario('returns a single wce', async (scenario) => {
    const result = await wce({ id: scenario.wce.one.id })

    expect(result).toEqual(scenario.wce.one)
  })

  scenario('creates a wce', async (scenario) => {
    const result = await createWce({
      input: {
        wce_id: 9842468,
        jcn_id: scenario.wce.two.jcn_id,
        unit_id: scenario.wce.two.unit_id,
        work_unit_code_id: scenario.wce.two.work_unit_code_id,
        discrepancy: 'String',
        symbol: 'String',
        when_discovered_id: scenario.wce.two.when_discovered_id,
        discovered_by_user_id: scenario.wce.two.discovered_by_user_id,
        shop_id: scenario.wce.two.shop_id,
      },
    })

    expect(result.wce_id).toEqual(9842468)
    expect(result.jcn_id).toEqual(scenario.wce.two.jcn_id)
    expect(result.unit_id).toEqual(scenario.wce.two.unit_id)
    expect(result.work_unit_code_id).toEqual(scenario.wce.two.work_unit_code_id)
    expect(result.discrepancy).toEqual('String')
    expect(result.symbol).toEqual('String')
    expect(result.when_discovered_id).toEqual(
      scenario.wce.two.when_discovered_id
    )

    expect(result.discovered_by_user_id).toEqual(
      scenario.wce.two.discovered_by_user_id
    )

    expect(result.shop_id).toEqual(scenario.wce.two.shop_id)
  })

  scenario('updates a wce', async (scenario) => {
    const original = await wce({ id: scenario.wce.one.id })
    const result = await updateWce({
      id: original.id,
      input: { wce_id: 8659508 },
    })

    expect(result.wce_id).toEqual(8659508)
  })

  scenario('deletes a wce', async (scenario) => {
    const original = await deleteWce({ id: scenario.wce.one.id })
    const result = await wce({ id: original.id })

    expect(result).toEqual(null)
  })
})
