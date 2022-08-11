export const standard = defineScenario({
  jcn: {
    one: {
      data: {
        id: 8213845,
        jcn_id: 'String',
        discrepancy: 'String',
        symbol: 'String',
        is_repeat: true,
        is_recur: true,
        aircraft: {
          create: {
            id: 4028135,
            fuel_quant: 2968532,
            preflight_inspection: '2022-06-21T20:04:49Z',
            flight_hours: 732089.092942696,
            config: 'String',
            cur_oxygen: 7779593,
            status: { create: { id: 'String', description: 'String' } },
            geo_loc: { create: { id: 'String', name: 'String' } },
            unit: {
              create: {
                id: 687862,
                name: 'String7823226',
                geo_loc: { create: { id: 'String', name: 'String' } },
              },
            },

            airframe: { create: { id: 'String' } },
          },
        },

        unit: {
          create: {
            id: 8739693,
            name: 'String2261931',
            geo_loc: { create: { id: 'String', name: 'String' } },
          },
        },

        work_unit_code: {
          create: {
            id: 'String',
            description: 'String',
            airframe: { create: { id: 'String' } },
          },
        },

        when_discovered: { create: { id: 'String', description: 'String' } },
        shop: {
          create: {
            id: 'String',
            description: 'String',
            unit: {
              create: {
                id: 4077820,
                name: 'String6220465',
                geo_loc: { create: { id: 'String', name: 'String' } },
              },
            },
          },
        },

        discovered_by_user: {
          create: {
            email: 'String9702554',
            hashedPassword: 'String',
            salt: 'String',
            role: { create: { id: 'String' } },
            shop: {
              create: {
                id: 'String',
                description: 'String',
                unit: {
                  create: {
                    id: 6258036,
                    name: 'String628165',
                    geo_loc: { create: { id: 'String', name: 'String' } },
                  },
                },
              },
            },
          },
        },
      },
    },

    two: {
      data: {
        id: 1937067,
        jcn_id: 'String',
        discrepancy: 'String',
        symbol: 'String',
        is_repeat: true,
        is_recur: true,
        aircraft: {
          create: {
            id: 3126862,
            fuel_quant: 2767245,
            preflight_inspection: '2022-06-21T20:04:49Z',
            flight_hours: 1751973.9975165648,
            config: 'String',
            cur_oxygen: 7964743,
            status: { create: { id: 'String', description: 'String' } },
            geo_loc: { create: { id: 'String', name: 'String' } },
            unit: {
              create: {
                id: 789440,
                name: 'String5816838',
                geo_loc: { create: { id: 'String', name: 'String' } },
              },
            },

            airframe: { create: { id: 'String' } },
          },
        },

        unit: {
          create: {
            id: 6423750,
            name: 'String628570',
            geo_loc: { create: { id: 'String', name: 'String' } },
          },
        },

        work_unit_code: {
          create: {
            id: 'String',
            description: 'String',
            airframe: { create: { id: 'String' } },
          },
        },

        when_discovered: { create: { id: 'String', description: 'String' } },
        shop: {
          create: {
            id: 'String',
            description: 'String',
            unit: {
              create: {
                id: 9650143,
                name: 'String5674857',
                geo_loc: { create: { id: 'String', name: 'String' } },
              },
            },
          },
        },

        discovered_by_user: {
          create: {
            email: 'String7565464',
            hashedPassword: 'String',
            salt: 'String',
            role: { create: { id: 'String' } },
            shop: {
              create: {
                id: 'String',
                description: 'String',
                unit: {
                  create: {
                    id: 9454562,
                    name: 'String3171279',
                    geo_loc: { create: { id: 'String', name: 'String' } },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})
