import { db } from 'src/lib/db'

export const typeMxes = () => {
  return db.typeMx.findMany()
}

export const typeMx = ({ id }) => {
  return db.typeMx.findUnique({
    where: { id },
  })
}

export const createTypeMx = ({ input }) => {
  return db.typeMx.create({
    data: input,
  })
}

export const updateTypeMx = ({ id, input }) => {
  return db.typeMx.update({
    data: input,
    where: { id },
  })
}

export const deleteTypeMx = ({ id }) => {
  return db.typeMx.delete({
    where: { id },
  })
}

export const TypeMx = {
  wces: (_obj, { root }) =>
    db.typeMx.findUnique({ where: { id: root.id } }).wces(),
}
