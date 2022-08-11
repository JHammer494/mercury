import { db } from 'src/lib/db'

export const geoLocs = () => {
  return db.geoLoc.findMany()
}

export const geoLoc = ({ id }) => {
  return db.geoLoc.findUnique({
    where: { id },
  })
}

export const createGeoLoc = ({ input }) => {
  return db.geoLoc.create({
    data: input,
  })
}

export const updateGeoLoc = ({ id, input }) => {
  return db.geoLoc.update({
    data: input,
    where: { id },
  })
}

export const deleteGeoLoc = ({ id }) => {
  return db.geoLoc.delete({
    where: { id },
  })
}

export const GeoLoc = {
  units: (_obj, { root }) =>
    db.geoLoc.findUnique({ where: { id: root.id } }).units(),
  aircraft: (_obj, { root }) =>
    db.geoLoc.findUnique({ where: { id: root.id } }).aircraft(),
}
