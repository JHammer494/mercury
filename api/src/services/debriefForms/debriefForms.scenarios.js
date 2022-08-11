export const standard = defineScenario({
  debriefForm: {
    one: {
      data: {
        landing_fuel: 2763145.4674504763,
        bird_strike: true,
        drag_chute: true,
        hung_store: true,
        in_flight_emergency: true,
        bomb_door_actuation: true,
        sortie: {
          create: {
            id: 7137981,
            projected_launch: '2022-06-29T15:11:25Z',
            projected_land: '2022-06-29T15:11:25Z',
            required_fuel: 4933031,
            config: 'String',
            call_sign: 'String',
            unit: {
              create: {
                id: 3698772,
                name: 'String1972958',
                geo_loc: { create: { id: 'String', name: 'String' } },
              },
            },
          },
        },

        user: {
          create: {
            email: 'String2996677',
            hashedPassword: 'String',
            salt: 'String',
            role: { create: { id: 'String' } },
          },
        },
      },
    },

    two: {
      data: {
        landing_fuel: 1998565.8107513648,
        bird_strike: true,
        drag_chute: true,
        hung_store: true,
        in_flight_emergency: true,
        bomb_door_actuation: true,
        sortie: {
          create: {
            id: 3701240,
            projected_launch: '2022-06-29T15:11:25Z',
            projected_land: '2022-06-29T15:11:25Z',
            required_fuel: 6021235,
            config: 'String',
            call_sign: 'String',
            unit: {
              create: {
                id: 3279858,
                name: 'String5996483',
                geo_loc: { create: { id: 'String', name: 'String' } },
              },
            },
          },
        },

        user: {
          create: {
            email: 'String1861100',
            hashedPassword: 'String',
            salt: 'String',
            role: { create: { id: 'String' } },
          },
        },
      },
    },
  },
})
