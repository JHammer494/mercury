import { db } from 'src/lib/db'

export const whenDiscovereds = () => {
  return db.whenDiscovered.findMany()
}

export const whenDiscovered = ({ id }) => {
  return db.whenDiscovered.findUnique({
    where: { id },
  })
}

export const createWhenDiscovered = ({ input }) => {
  return db.whenDiscovered.create({
    data: input,
  })
}

export const updateWhenDiscovered = ({ id, input }) => {
  return db.whenDiscovered.update({
    data: input,
    where: { id },
  })
}

export const deleteWhenDiscovered = ({ id }) => {
  return db.whenDiscovered.delete({
    where: { id },
  })
}

export const WhenDiscovered = {
  jcns: (_obj, { root }) =>
    db.whenDiscovered.findUnique({ where: { id: root.id } }).jcns(),
  wces: (_obj, { root }) =>
    db.whenDiscovered.findUnique({ where: { id: root.id } }).wces(),
}
