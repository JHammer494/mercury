import { db } from 'src/lib/db'

export const units = () => {
  return db.unit.findMany()
}

export const unit = ({ id }) => {
  return db.unit.findUnique({
    where: { id },
  })
}

export const createUnit = ({ input }) => {
  return db.unit.create({
    data: input,
  })
}

export const updateUnit = ({ id, input }) => {
  return db.unit.update({
    data: input,
    where: { id },
  })
}

export const deleteUnit = ({ id }) => {
  return db.unit.delete({
    where: { id },
  })
}

export const Unit = {
  geo_loc: (_obj, { root }) =>
    db.unit.findUnique({ where: { id: root.id } }).geo_loc(),
  sorties: (_obj, { root }) =>
    db.unit.findUnique({ where: { id: root.id } }).sorties(),
  aircraft: (_obj, { root }) =>
    db.unit.findUnique({ where: { id: root.id } }).aircraft(),
  jcns: (_obj, { root }) =>
    db.unit.findUnique({ where: { id: root.id } }).jcns(),
  shops: (_obj, { root }) =>
    db.unit.findUnique({ where: { id: root.id } }).shops(),
}
