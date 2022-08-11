import { db } from 'src/lib/db'

export const workUnitCodes = () => {
  return db.workUnitCode.findMany()
}

export const workUnitCode = ({ id }) => {
  return db.workUnitCode.findUnique({
    where: { id },
  })
}

export const createWorkUnitCode = ({ input }) => {
  return db.workUnitCode.create({
    data: input,
  })
}

export const updateWorkUnitCode = ({ id, input }) => {
  return db.workUnitCode.update({
    data: input,
    where: { id },
  })
}

export const deleteWorkUnitCode = ({ id }) => {
  return db.workUnitCode.delete({
    where: { id },
  })
}

export const WorkUnitCode = {
  airframe: (_obj, { root }) =>
    db.workUnitCode.findUnique({ where: { id: root.id } }).airframe(),
  jcns: (_obj, { root }) =>
    db.workUnitCode.findUnique({ where: { id: root.id } }).jcns(),
  wces: (_obj, { root }) =>
    db.workUnitCode.findUnique({ where: { id: root.id } }).wces(),
}
