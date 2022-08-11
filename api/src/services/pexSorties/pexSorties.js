import { db } from 'src/lib/db'

export const pexSorties = () => {
  return db.pexSortie.findMany()
}

export const pexSortie = ({ id }) => {
  return db.pexSortie.findUnique({
    where: { id },
  })
}

export const pexSortiesInDateRange = ({ start, end }) => {
  return db.pexSortie.findMany({
    where: {
      projected_launch: {
        gte: start,
        lte: end,
      },
    },
  })
}

export const createPexSortie = ({ input }) => {
  return db.pexSortie.create({
    data: input,
  })
}

export const updatePexSortie = ({ id, input }) => {
  return db.pexSortie.update({
    data: input,
    where: { id },
  })
}

export const deletePexSortie = ({ id }) => {
  return db.pexSortie.delete({
    where: { id },
  })
}
