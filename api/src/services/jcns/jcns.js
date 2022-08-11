import { db } from 'src/lib/db'

export const jcns = ({ unit_id }) => {
  return db.JCN.findMany({
    where: { unit_id },
  })
}

export const jcn = ({ id }) => {
  return db.JCN.findUnique({
    where: { id },
  })
}

export const createJCN = ({ input }) => {
  return db.JCN.create({
    data: input,
  })
}

export const updateJCN = ({ id, input }) => {
  return db.JCN.update({
    data: input,
    where: { id },
  })
}

export const completeJCN = ({ jcn_id, input }) => {
  return db.JCN.update({
    data: input,
    where: { jcn_id },
  })
}

export const deleteJCN = ({ id }) => {
  return db.JCN.delete({
    where: { id },
  })
}

export const JCN = {
  aircraft: (_obj, { root }) =>
    db.JCN.findUnique({ where: { id: root.id } }).aircraft(),
  unit: (_obj, { root }) =>
    db.JCN.findUnique({ where: { id: root.id } }).unit(),
  driving_ac: (_obj, { root }) =>
    db.JCN.findUnique({ where: { id: root.id } }).driving_ac(),
  work_unit_code: (_obj, { root }) =>
    db.JCN.findUnique({ where: { id: root.id } }).work_unit_code(),
  when_discovered: (_obj, { root }) =>
    db.JCN.findUnique({ where: { id: root.id } }).when_discovered(),
  shop: (_obj, { root }) =>
    db.JCN.findUnique({ where: { id: root.id } }).shop(),
  discovered_by_user: (_obj, { root }) =>
    db.JCN.findUnique({ where: { id: root.id } }).discovered_by_user(),
  jcn_wces: (_obj, { root }) =>
    db.JCN.findUnique({ where: { id: root.id } }).jcn_wces({
      where: {
        unit_id: _obj.unit_id,
        shop_id: _obj.shop_id,
      },
    }),
}
