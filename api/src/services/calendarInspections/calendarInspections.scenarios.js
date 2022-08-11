export const standard = defineScenario({
  calendarInspection: {
    one: {
      data: {
        name: 'String',
        inspection_details: 'String',
        frequency: 5537806.894251722,
        last_completed: '2022-07-07T19:55:25Z',
        aircraft: {
          create: {
            id: 1315402,
            fuel_quant: 7931109,
            preflight_inspection: '2022-07-07T19:55:25Z',
            flight_hours: 6802295.40096303,
            config: 'String',
            cur_oxygen: 5070213,
            status: { create: { id: 'String', description: 'String' } },
            geo_loc: { create: { id: 'String', name: 'String' } },
            unit: {
              create: {
                id: 9720801,
                name: 'String5868717',
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
        name: 'String',
        inspection_details: 'String',
        frequency: 3201986.1199595146,
        last_completed: '2022-07-07T19:55:25Z',
        aircraft: {
          create: {
            id: 5832082,
            fuel_quant: 8163198,
            preflight_inspection: '2022-07-07T19:55:25Z',
            flight_hours: 3329555.994556894,
            config: 'String',
            cur_oxygen: 2479105,
            status: { create: { id: 'String', description: 'String' } },
            geo_loc: { create: { id: 'String', name: 'String' } },
            unit: {
              create: {
                id: 1732825,
                name: 'String4223050',
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
