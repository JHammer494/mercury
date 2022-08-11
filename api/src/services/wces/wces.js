import { db } from 'src/lib/db'

export const wces = () => {
  return db.WCE.findMany()
}

export const wce = ({ id }) => {
  return db.WCE.findUnique({
    where: { id },
  })
}

export const createWCE = ({ input }) => {
  return db.WCE.create({
    data: input,
  })
}

export const updateWCE = ({ id, input }) => {
  return db.WCE.update({
    data: input,
    where: { id },
  })
}

export const completeWCE = async ({ wce_id, jcn_id, unit_id, input }) => {
  const wces = await db.JCN.findUnique({
    where: { UnitJcn: { jcn_id, unit_id } },
  }).jcn_wces()

  const filteredWces = wces.filter((wce) => wce.wce_id != wce_id)

  if (filteredWces.length > 0) {
    const allStopTimes = filteredWces.map((wce) => wce.stop_time)
    const nonNullStopTimes = allStopTimes.every((stopTime) => stopTime != null)
    if (nonNullStopTimes) {
      await db.JCN.update({
        data: { when_cleared: new Date() },
        where: { UnitJcn: { jcn_id, unit_id } },
      })
    }
  } else {
    await db.JCN.update({
      data: { when_cleared: new Date() },
      where: { UnitJcn: { jcn_id, unit_id } },
    })
  }

  return db.WCE.update({
    data: input,
    where: { UnitJcnWce: { unit_id, jcn_id, wce_id } },
  })
}

export const deleteWCE = ({ id }) => {
  return db.WCE.delete({
    where: { id },
  })
}

export const WCE = {
  jcn: (_obj, { root }) => db.WCE.findUnique({ where: { id: root.id } }).jcn(),
  work_unit_code: (_obj, { root }) =>
    db.WCE.findUnique({ where: { id: root.id } }).work_unit_code(),
  when_discovered: (_obj, { root }) =>
    db.WCE.findUnique({ where: { id: root.id } }).when_discovered(),
  type_mx: (_obj, { root }) =>
    db.WCE.findUnique({ where: { id: root.id } }).type_mx(),
  discovered_by_user: (_obj, { root }) =>
    db.WCE.findUnique({ where: { id: root.id } }).discovered_by_user(),
  corrected_by_user: (_obj, { root }) =>
    db.WCE.findUnique({ where: { id: root.id } }).corrected_by_user(),
  inspected_by_user: (_obj, { root }) =>
    db.WCE.findUnique({ where: { id: root.id } }).inspected_by_user(),
  shop: (_obj, { root }) =>
    db.WCE.findUnique({ where: { id: root.id } }).shop(),
  how_mal: (_obj, { root }) =>
    db.WCE.findUnique({ where: { id: root.id } }).how_mal(),
  action_taken: (_obj, { root }) =>
    db.wce.findUnique({ where: { id: root.id } }).action_taken(),
}
