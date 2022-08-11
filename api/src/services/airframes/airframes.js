import { db } from 'src/lib/db'

export const airframes = () => {
  return db.airframe.findMany()
}

export const airframe = ({ id }) => {
  return db.airframe.findUnique({
    where: { id },
  })
}

export const Airframe = {
  aircraft: (_obj, { root }) =>
    db.airframe.findUnique({ where: { id: root.id } }).aircraft(),
  wucs: (_obj, { root }) =>
    db.airframe.findUnique({ where: { id: root.id } }).wucs(),
}
