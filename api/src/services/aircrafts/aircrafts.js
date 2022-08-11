import { db } from 'src/lib/db'

export const aircrafts = ({ unit_id }) => {
  return db.aircraft.findMany({
    where: { unit_id },
    orderBy: { mx_priority: 'asc' },
  })
}

export const aircraft = ({ id }) => {
  return db.aircraft.findUnique({
    where: { id },
  })
}

export const createAircraft = ({ input }) => {
  return db.aircraft.create({
    data: input,
  })
}

export const updateAircraft = ({ id, input }) => {
  return db.aircraft.update({
    data: input,
    where: { id },
  })
}

export const deleteAircraft = ({ id }) => {
  return db.aircraft.delete({
    where: { id },
  })
}

export const Aircraft = {
  status: (_obj, { root }) =>
    db.aircraft.findUnique({ where: { id: root.id } }).status(),
  geo_loc: (_obj, { root }) =>
    db.aircraft.findUnique({ where: { id: root.id } }).geo_loc(),
  all_jcns: (_obj, { root }) =>
    db.aircraft.findUnique({ where: { id: root.id } }).all_jcns({
      where: {
        unit_id: _obj.unit_id,
        shop_id: _obj.shop_id,
      },
    }),
  driver_jcn: (_obj, { root }) =>
    db.aircraft.findUnique({ where: { id: root.id } }).driver_jcn(),
  unit: (_obj, { root }) =>
    db.aircraft.findUnique({ where: { id: root.id } }).unit(),
  airframe: (_obj, { root }) =>
    db.aircraft.findUnique({ where: { id: root.id } }).airframe(),
  sorties: (_obj, { root }) =>
    db.aircraft.findUnique({ where: { id: root.id } }).sorties(),
  sortiesInDateRange: (_obj, { root }) =>
    db.sortie.findMany({
      where: {
        aircraft_id: root.id,
        projected_launch: {
          gte: _obj.start,
          lte: _obj.end,
        },
      },
    }),
  publishedSortiesRange: (_obj, { root }) =>
    db.sortie.findMany({
      where: {
        aircraft_id: root.id,
        is_published: true,
        projected_launch: {
          gte: _obj.start,
          lte: _obj.end,
        },
      },
    }),
  spareFlyers: (_obj, { root }) =>
    db.aircraft.findUnique({ where: { id: root.id } }).spareFlyers(),
  spareFlyersInDateRange: (_obj, { root }) =>
    db.spareFlyer.findMany({
      where: {
        aircraft_id: root.id,
        date: {
          gte: _obj.start,
          lte: _obj.end,
        },
      },
    }),
  publishedSpareFlyersInDateRange: (_obj, { root }) =>
    db.spareFlyer.findMany({
      where: {
        is_published: true,
        aircraft_id: root.id,
        date: {
          gte: _obj.start,
          lte: _obj.end,
        },
      },
    }),
  aircraft_notes: (_obj, { root }) =>
    db.aircraft.findUnique({ where: { id: root.id } }).aircraft_notes(),
  hourly_inspection: (_obj, { root }) =>
    db.aircraft.findUnique({ where: { id: root.id } }).hourly_inspection(),
  calendar_inspections: (_obj, { root }) =>
    db.aircraft.findUnique({ where: { id: root.id } }).calendar_inspections(),
}
