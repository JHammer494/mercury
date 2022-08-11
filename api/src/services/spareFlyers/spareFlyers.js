import { db } from 'src/lib/db'

export const spareFlyers = () => {
  return db.spareFlyer.findMany()
}

export const spareFlyer = ({ id }) => {
  return db.spareFlyer.findUnique({
    where: { id },
  })
}

export const createSpareFlyer = ({ input }) => {
  return db.spareFlyer.create({
    data: input,
  })
}

export const updateSpareFlyer = ({ id, input }) => {
  return db.spareFlyer.update({
    data: input,
    where: { id },
  })
}

export const deleteSpareFlyer = ({ id }) => {
  return db.spareFlyer.delete({
    where: { id },
  })
}

export const SpareFlyer = {
  aircraft: (_obj, { root }) =>
    db.spareFlyer.findUnique({ where: { id: root.id } }).aircraft(),
}
