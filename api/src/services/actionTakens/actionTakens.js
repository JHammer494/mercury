import { db } from 'src/lib/db'

export const actionTakens = () => {
  return db.actionTaken.findMany()
}

export const actionTaken = ({ id }) => {
  return db.actionTaken.findUnique({
    where: { id },
  })
}

export const createActionTaken = ({ input }) => {
  return db.actionTaken.create({
    data: input,
  })
}

export const updateActionTaken = ({ id, input }) => {
  return db.actionTaken.update({
    data: input,
    where: { id },
  })
}

export const deleteActionTaken = ({ id }) => {
  return db.actionTaken.delete({
    where: { id },
  })
}

export const ActionTaken = {
  WCE: (_obj, { root }) =>
    db.actionTaken.findUnique({ where: { id: root.id } }).WCE(),
}
