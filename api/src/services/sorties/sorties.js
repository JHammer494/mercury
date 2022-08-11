import { db } from 'src/lib/db'

export const sorties = () => {
  return db.sortie.findMany()
}

export const sortie = ({ id }) => {
  return db.sortie.findUnique({
    where: { id },
  })
}

export const publishedSortiesRange = ({ start, end, unit_id }) => {
  return db.sortie.findMany({
    where: {
      is_published: true,
      unit_id: unit_id,
      projected_launch: {
        gte: start,
        lte: end,
      },
    },
  })
}

export const sortiesInDateRange = ({ start, end, unit_id }) => {
  return db.sortie.findMany({
    where: {
      unit_id: unit_id,
      projected_launch: {
        gte: start,
        lte: end,
      },
    },
  })
}
export const sortieRange = ({ aircraft_id, from, to }) => {
  return db.sortie.findMany({
    where: {
      aircraft_id: aircraft_id,
      projected_launch: {
        lte: to,
        gte: from,
      },
    },
  })
}

export const nextSortie = ({ aircraft_id, start }) => {
  return db.sortie.findMany({
    orderBy: { projected_launch: 'asc' },
    where: {
      aircraft_id: aircraft_id,
      projected_launch: {
        gte: start,
      },
    },
  })
}

export const todaySorties = ({ projected_launch }) => {
  return db.sortie.findMany({
    where: { projected_launch },
  })
}

export const createSortie = ({ input }) => {
  return db.sortie.create({
    data: input,
  })
}

export const updateSortie = ({ id, input }) => {
  return db.sortie.update({
    data: input,
    where: { id },
  })
}

export const deleteSortie = ({ id }) => {
  return db.sortie.delete({
    where: { id },
  })
}

export const Sortie = {
  unit: (_obj, { root }) =>
    db.sortie.findUnique({ where: { id: root.id } }).unit(),
  aircraft: (_obj, { root }) =>
    db.sortie.findUnique({ where: { id: root.id } }).aircraft(),
  debrief_forms: (_obj, { root }) =>
    db.sortie.findUnique({ where: { id: root.id } }).debrief_forms(),
}
