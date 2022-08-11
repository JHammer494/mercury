import { db } from 'src/lib/db'

export const personalNotes = () => {
  return db.personalNote.findMany()
}

export const personalNote = ({ id }) => {
  return db.personalNote.findUnique({
    where: { id },
  })
}

export const createPersonalNote = ({ input }) => {
  return db.personalNote.create({
    data: input,
  })
}

export const updatePersonalNote = ({ id, input }) => {
  return db.personalNote.update({
    data: input,
    where: { id },
  })
}

export const deletePersonalNote = ({ id }) => {
  return db.personalNote.delete({
    where: { id },
  })
}

export const PersonalNote = {
  user: (_obj, { root }) =>
    db.personalNote.findUnique({ where: { id: root.id } }).user(),
}
