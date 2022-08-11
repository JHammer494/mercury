export const standard = defineScenario({
  aircraft: {
    one: {
      data: {
        id: 1410425,
        fuel_quant: 7601846,
        preflight_inspection: '2022-06-29T15:09:22Z',
        flight_hours: 3090986.280483863,
        config: 'String',
        cur_oxygen: 6206629,
        status: { create: { id: 'String', description: 'String' } },
        geo_loc: { create: { id: 'String', name: 'String' } },
        unit: {
          create: {
            id: 5534718,
            name: 'String9620035',
            geo_loc: { create: { id: 'String', name: 'String' } },
          },
        },

        airframe: { create: { id: 'String' } },
      },
    },

    two: {
      data: {
        id: 9101365,
        fuel_quant: 2643385,
        preflight_inspection: '2022-06-29T15:09:22Z',
        flight_hours: 920112.4360768609,
        config: 'String',
        cur_oxygen: 872040,
        status: { create: { id: 'String', description: 'String' } },
        geo_loc: { create: { id: 'String', name: 'String' } },
        unit: {
          create: {
            id: 9792554,
            name: 'String8175134',
            geo_loc: { create: { id: 'String', name: 'String' } },
          },
        },

        airframe: { create: { id: 'String' } },
      },
    },
  },
})
