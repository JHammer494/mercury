import { db } from 'src/lib/db'

export const howMals = () => {
  return db.howMal.findMany()
}

export const howMal = ({ id }) => {
  return db.howMal.findUnique({
    where: { id },
  })
}

export const createHowMal = ({ input }) => {
  return db.howMal.create({
    data: input,
  })
}

export const updateHowMal = ({ id, input }) => {
  return db.howMal.update({
    data: input,
    where: { id },
  })
}

export const deleteHowMal = ({ id }) => {
  return db.howMal.delete({
    where: { id },
  })
}

export const HowMal = {
  wces: (_obj, { root }) =>
    db.howMal.findUnique({ where: { id: root.id } }).wces(),
}
