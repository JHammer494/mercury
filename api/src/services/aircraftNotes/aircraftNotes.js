import { db } from 'src/lib/db'

export const aircraftNotes = ({ aircraft_id }) => {
  return db.aircraftNote.findMany({ where: { aircraft_id } })
}

export const aircraftNote = ({ id }) => {
  return db.aircraftNote.findUnique({
    where: { id },
  })
}

export const createAircraftNote = ({ input }) => {
  return db.aircraftNote.create({
    data: input,
  })
}

export const updateAircraftNote = ({ id, input }) => {
  return db.aircraftNote.update({
    data: input,
    where: { id },
  })
}

export const deleteAircraftNote = ({ id }) => {
  return db.aircraftNote.delete({
    where: { id },
  })
}

export const AircraftNote = {
  user: (_obj, { root }) =>
    db.aircraftNote.findUnique({ where: { id: root.id } }).user(),
  aircraft: (_obj, { root }) =>
    db.aircraftNote.findUnique({ where: { id: root.id } }).aircraft(),
  jcn: (_obj, { root }) =>
    db.aircraftNote.findUnique({ where: { id: root.id } }).jcn(),
}
