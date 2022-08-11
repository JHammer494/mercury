export const standard = defineScenario({
  aircraftNote: {
    one: {
      data: {
        note: 'String',
        user: {
          create: {
            email: 'String3796390',
            hashedPassword: 'String',
            salt: 'String',
            role: { create: { id: 'String' } },
          },
        },

        aircraft: {
          create: {
            id: 1397180,
            fuel_quant: 9500887,
            preflight_inspection: '2022-07-29T15:04:02Z',
            flight_hours: 9003157.490605084,
            config: 'String',
            cur_oxygen: 6311634,
            status: { create: { id: 'String', description: 'String' } },
            geo_loc: { create: { id: 'String', name: 'String' } },
            unit: {
              create: {
                id: 7889175,
                name: 'String1616362',
                geo_loc: { create: { id: 'String', name: 'String' } },
              },
            },

            airframe: { create: { id: 'String' } },
          },
        },
      },
    },

    two: {
      data: {
        note: 'String',
        user: {
          create: {
            email: 'String2857120',
            hashedPassword: 'String',
            salt: 'String',
            role: { create: { id: 'String' } },
          },
        },

        aircraft: {
          create: {
            id: 5558547,
            fuel_quant: 9296845,
            preflight_inspection: '2022-07-29T15:04:02Z',
            flight_hours: 8173802.346914007,
            config: 'String',
            cur_oxygen: 4824659,
            status: { create: { id: 'String', description: 'String' } },
            geo_loc: { create: { id: 'String', name: 'String' } },
            unit: {
              create: {
                id: 9169405,
                name: 'String3688683',
                geo_loc: { create: { id: 'String', name: 'String' } },
              },
            },

            airframe: { create: { id: 'String' } },
          },
        },
      },
    },
  },
})
