import { db } from 'src/lib/db'
export const debriefFormsSort = ({ start, end }) => {
  return db.debriefForm.findMany({
    where: {
      submitted: {
        gte: start,
        lte: end,
      },
    },
  })
}

export const debriefForms = () => {
  return db.debriefForm.findMany()
}

export const debriefForm = ({ id }) => {
  return db.debriefForm.findUnique({
    where: { id },
  })
}

export const createDebriefForm = ({ input }) => {
  return db.debriefForm.create({
    data: input,
  })
}

export const updateDebriefForm = ({ id, input }) => {
  return db.debriefForm.update({
    data: input,
    where: { id },
  })
}

export const deleteDebriefForm = ({ id }) => {
  return db.debriefForm.delete({
    where: { id },
  })
}

export const DebriefForm = {
  sortie: (_obj, { root }) =>
    db.debriefForm.findUnique({ where: { id: root.id } }).sortie(),
  user: (_obj, { root }) =>
    db.debriefForm.findUnique({ where: { id: root.id } }).user(),
}
