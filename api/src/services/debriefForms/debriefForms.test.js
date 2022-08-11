import {
  debriefForms,
  debriefForm,
  createDebriefForm,
  updateDebriefForm,
  deleteDebriefForm,
} from './debriefForms'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('debriefForms', () => {
  scenario('returns all debriefForms', async (scenario) => {
    const result = await debriefForms()

    expect(result.length).toEqual(Object.keys(scenario.debriefForm).length)
  })

  scenario('returns a single debriefForm', async (scenario) => {
    const result = await debriefForm({ id: scenario.debriefForm.one.id })

    expect(result).toEqual(scenario.debriefForm.one)
  })

  scenario('creates a debriefForm', async (scenario) => {
    const result = await createDebriefForm({
      input: {
        landing_fuel: 6617186.423877371,
        bird_strike: true,
        drag_chute: true,
        hung_store: true,
        in_flight_emergency: true,
        bomb_door_actuation: true,
        sortie_id: scenario.debriefForm.two.sortie_id,
        user_id: scenario.debriefForm.two.user_id,
      },
    })

    expect(result.landing_fuel).toEqual(6617186.423877371)
    expect(result.bird_strike).toEqual(true)
    expect(result.drag_chute).toEqual(true)
    expect(result.hung_store).toEqual(true)
    expect(result.in_flight_emergency).toEqual(true)
    expect(result.bomb_door_actuation).toEqual(true)
    expect(result.sortie_id).toEqual(scenario.debriefForm.two.sortie_id)
    expect(result.user_id).toEqual(scenario.debriefForm.two.user_id)
  })

  scenario('updates a debriefForm', async (scenario) => {
    const original = await debriefForm({ id: scenario.debriefForm.one.id })
    const result = await updateDebriefForm({
      id: original.id,
      input: { landing_fuel: 9752310.861369338 },
    })

    expect(result.landing_fuel).toEqual(9752310.861369338)
  })

  scenario('deletes a debriefForm', async (scenario) => {
    const original = await deleteDebriefForm({
      id: scenario.debriefForm.one.id,
    })

    const result = await debriefForm({ id: original.id })

    expect(result).toEqual(null)
  })
})
