import { db } from 'src/lib/db'

export const users = ({ shop_id }) => {
  return db.user.findMany({ where: { shop_id } })
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  role: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).role(),
  shop: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).shop(),
  jcns_discovered: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).jcns_discovered(),
  wces_discovered: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).wces_discovered(),
  wces_corrected: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).wces_corrected(),
  wces_inspected: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).wces_inspected(),
  aircraft_notes: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).aircraft_notes(),
  personal_notes: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).personal_notes(),
  Debrief_forms: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).Debrief_forms(),
}
