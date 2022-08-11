export const standard = defineScenario({
  personalNote: {
    one: {
      data: {
        note: 'String',
        user: {
          create: {
            email: 'String6605096',
            hashedPassword: 'String',
            salt: 'String',
            role: { create: { id: 'String' } },
          },
        },
      },
    },

    two: {
      data: {
        note: 'String',
        user: {
          create: {
            email: 'String9369261',
            hashedPassword: 'String',
            salt: 'String',
            role: { create: { id: 'String' } },
          },
        },
      },
    },
  },
})
