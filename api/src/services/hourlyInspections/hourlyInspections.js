import { db } from 'src/lib/db'

export const hourlyInspections = () => {
  return db.hourlyInspection.findMany()
}

export const hourlyInspection = ({ id }) => {
  return db.hourlyInspection.findUnique({
    where: { id },
  })
}

export const createHourlyInspection = ({ input }) => {
  return db.hourlyInspection.create({
    data: input,
  })
}

export const updateHourlyInspection = ({ id, input }) => {
  return db.hourlyInspection.update({
    data: input,
    where: { id },
  })
}

export const deleteHourlyInspection = ({ id }) => {
  return db.hourlyInspection.delete({
    where: { id },
  })
}

export const HourlyInspection = {
  aircraft: (_obj, { root }) =>
    db.hourlyInspection.findUnique({ where: { id: root.id } }).aircraft(),
}
