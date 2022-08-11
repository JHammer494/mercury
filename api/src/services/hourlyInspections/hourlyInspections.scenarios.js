export const standard = defineScenario({
  hourlyInspection: {
    one: {
      data: {
        name: 'String',
        inspection_details: 'String',
        frequency: 4254732.983151599,
        last_completed: 3427102.6003451175,
        aircraft: {
          create: {
            id: 8656561,
            fuel_quant: 7725709,
            preflight_inspection: '2022-07-07T19:55:09Z',
            flight_hours: 7526855.251125843,
            config: 'String',
            cur_oxygen: 3186946,
            status: { create: { id: 'String', description: 'String' } },
            geo_loc: { create: { id: 'String', name: 'String' } },
            unit: {
              create: {
                id: 4537745,
                name: 'String7222459',
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
        frequency: 2925912.772213206,
        last_completed: 3277844.547964077,
        aircraft: {
          create: {
            id: 1166848,
            fuel_quant: 4409409,
            preflight_inspection: '2022-07-07T19:55:09Z',
            flight_hours: 3921587.8421196626,
            config: 'String',
            cur_oxygen: 340973,
            status: { create: { id: 'String', description: 'String' } },
            geo_loc: { create: { id: 'String', name: 'String' } },
            unit: {
              create: {
                id: 4985293,
                name: 'String1408293',
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
