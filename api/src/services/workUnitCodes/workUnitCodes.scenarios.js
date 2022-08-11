export const standard = defineScenario({
  workUnitCode: {
    one: {
      data: {
        id: 'String',
        description: 'String',
        airframe: { create: { id: 'String' } },
      },
    },

    two: {
      data: {
        id: 'String',
        description: 'String',
        airframe: { create: { id: 'String' } },
      },
    },
  },
})
