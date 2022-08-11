import { db } from 'src/lib/db'

export const calendarInspections = () => {
  return db.calendarInspection.findMany()
}

export const calendarInspection = ({ id }) => {
  return db.calendarInspection.findUnique({
    where: { id },
  })
}

export const createCalendarInspection = ({ input }) => {
  return db.calendarInspection.create({
    data: input,
  })
}

export const updateCalendarInspection = ({ id, input }) => {
  return db.calendarInspection.update({
    data: input,
    where: { id },
  })
}

export const deleteCalendarInspection = ({ id }) => {
  return db.calendarInspection.delete({
    where: { id },
  })
}

export const CalendarInspection = {
  aircraft: (_obj, { root }) =>
    db.calendarInspection.findUnique({ where: { id: root.id } }).aircraft(),
}
