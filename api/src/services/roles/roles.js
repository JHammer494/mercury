import { db } from 'src/lib/db'

export const roles = () => {
  return db.role.findMany()
}

export const role = ({ id }) => {
  return db.role.findUnique({
    where: { id },
  })
}

export const Role = {
  users: (_obj, { root }) =>
    db.role.findUnique({ where: { id: root.id } }).users(),
}
