import { jcns, jcn, createJCN, updateJCN, deleteJCN } from './jcns'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('jcns', () => {
  scenario('returns all jcns', async (scenario) => {
    const result = await jcns()

    expect(result.length).toEqual(Object.keys(scenario.jcn).length)
  })

  scenario('returns a single jcn', async (scenario) => {
    const result = await jcn({ id: scenario.jcn.one.id })

    expect(result).toEqual(scenario.jcn.one)
  })

  scenario('creates a jcn', async (scenario) => {
    const result = await createJCN({
      input: {
        id: 6873161,
        jcn_id: 'String',
        aircraft_id: scenario.jcn.two.aircraft_id,
        unit_id: scenario.jcn.two.unit_id,
        work_unit_code_id: scenario.jcn.two.work_unit_code_id,
        discrepancy: 'String',
        symbol: 'String',
        when_discovered_id: scenario.jcn.two.when_discovered_id,
        is_repeat: true,
        is_recur: true,
        shop_id: scenario.jcn.two.shop_id,
        discovered_by_user_id: scenario.jcn.two.discovered_by_user_id,
      },
    })

    expect(result.id).toEqual(6873161)
    expect(result.jcn_id).toEqual('String')
    expect(result.aircraft_id).toEqual(scenario.jcn.two.aircraft_id)
    expect(result.unit_id).toEqual(scenario.jcn.two.unit_id)
    expect(result.work_unit_code_id).toEqual(scenario.jcn.two.work_unit_code_id)
    expect(result.discrepancy).toEqual('String')
    expect(result.symbol).toEqual('String')
    expect(result.when_discovered_id).toEqual(
      scenario.jcn.two.when_discovered_id
    )

    expect(result.is_repeat).toEqual(true)
    expect(result.is_recur).toEqual(true)
    expect(result.shop_id).toEqual(scenario.jcn.two.shop_id)
    expect(result.discovered_by_user_id).toEqual(
      scenario.jcn.two.discovered_by_user_id
    )
  })

  scenario('updates a jcn', async (scenario) => {
    const original = await jcn({ id: scenario.jcn.one.id })
    const result = await updateJCN({
      id: original.id,
      input: { id: 7664446 },
    })

    expect(result.id).toEqual(7664446)
  })

  scenario('deletes a jcn', async (scenario) => {
    const original = await deleteJCN({ id: scenario.jcn.one.id })
    const result = await jcn({ id: original.id })

    expect(result).toEqual(null)
  })
})
