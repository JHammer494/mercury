import { db } from 'api/src/lib/db'

import Aircrafts from './seeds/Aircrafts'
import Airframes from './seeds/Airframes'
import GeoLocs from './seeds/GeoLocs'
import HowMals from './seeds/HowMals'
import JCNs from './seeds/JCNs'
import PexSorties from './seeds/PexSorties'
import Roles from './seeds/Roles'
import Shops from './seeds/Shops'
import Sorties from './seeds/Sorties'
import SpareFlyers from './seeds/SpareFlyers'
import Statuses from './seeds/Statuses'
import TypeMxs from './seeds/TypeMxs'
import Units from './seeds/Units'
import Users from './seeds/Users'
import WCEs from './seeds/WCEs'
import WhenDiscovereds from './seeds/WhenDiscovereds'
import WorkUnitCodes from './seeds/WorkUnitCodes'
import AircraftNotes from './seeds/AircraftNotes'
import PersonalNotes from './seeds/PersonalNotes'
import CalendarInspections from './seeds/CalendarInspections'
import HourlyInspections from './seeds/HourlyInspections'
import DebriefForms from './seeds/DebriefForms'
import ActionTaken from './seeds/ActionTaken'
import AircraftDrivers from './seeds/AircraftDrivers'

export default async () => {
  try {
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`

    console.log('\nUsing "./scripts/seed.js"\n')

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany

    console.log('seeding Airframe')
    await db.Airframe.createMany({ data: Airframes, skipDuplicates: true })

    console.log('seeding GeoLoc')
    await db.GeoLoc.createMany({ data: GeoLocs, skipDuplicates: true })

    console.log('seeding HowMal')
    await db.HowMal.createMany({ data: HowMals, skipDuplicates: true })

    console.log('seeding Role')
    await db.Role.createMany({ data: Roles, skipDuplicates: true })

    console.log('seeding Status')
    await db.Status.createMany({ data: Statuses, skipDuplicates: true })

    console.log('seeding TypeMx')
    await db.TypeMx.createMany({ data: TypeMxs, skipDuplicates: true })

    console.log('seeding Unit')
    await db.Unit.createMany({ data: Units, skipDuplicates: true })

    console.log('seeding Aircraft')
    await db.Aircraft.createMany({ data: Aircrafts, skipDuplicates: true })

    console.log('seeding ActionTaken')
    await db.ActionTaken.createMany({ data: ActionTaken, skipDuplicates: true })

    console.log('seeding HourlyInspections')
    await db.HourlyInspection.createMany({
      data: HourlyInspections,
      skipDuplicates: true,
    })

    console.log('seeding CalendarInspections')
    await db.CalendarInspection.createMany({
      data: CalendarInspections,
      skipDuplicates: true,
    })

    console.log('seeding Sortie')
    await db.Sortie.createMany({ data: Sorties, skipDuplicates: true })

    console.log('seeding SpareFlyer')
    await db.SpareFlyer.createMany({ data: SpareFlyers, skipDuplicates: true })

    console.log('seeding Shop')
    await db.Shop.createMany({ data: Shops, skipDuplicates: true })

    console.log('seeding User')
    await db.User.createMany({ data: Users, skipDuplicates: true })

    console.log('seeding DebriefForms')
    await db.DebriefForm.createMany({
      data: DebriefForms,
      skipDuplicates: true,
    })

    console.log('seeding AircraftNotes')
    await db.AircraftNote.createMany({
      data: AircraftNotes,
      skipDuplicates: true,
    })

    console.log('seeding PersonalNotes')
    await db.PersonalNote.createMany({
      data: PersonalNotes,
      skipDuplicates: true,
    })

    console.log('seeding WhenDiscovered')
    await db.WhenDiscovered.createMany({
      data: WhenDiscovereds,
      skipDuplicates: true,
    })

    console.log('seeding WorkUnitCode')
    await db.WorkUnitCode.createMany({
      data: WorkUnitCodes,
      skipDuplicates: true,
    })

    console.log('seeding JCN')
    await db.JCN.createMany({ data: JCNs, skipDuplicates: true })

    console.log('seeding WCE')
    await db.WCE.createMany({ data: WCEs, skipDuplicates: true })

    console.log('seeding Aircraft Drivers')
    for (let x of AircraftDrivers) {
      await db.Aircraft.update({
        where: {
          id: x.id,
        },
        data: {
          driver_jcn_id: x.driver_jcn,
          driver_jcn_unit: x.driver_jcn_unit,
        },
      })
    }
    //
  } catch (error) {
    console.error(error)
  }
}
