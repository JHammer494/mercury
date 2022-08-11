import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns'
import { faker } from '@faker-js/faker'

import Aircrafts from './Aircrafts'
import Sorties from './Sorties'

const weekStartsOn = 1 // consider week start on Monday
const start = startOfWeek(Date.now(), { weekStartsOn })
const end = endOfWeek(start, { weekStartsOn })
const days = eachDayOfInterval({ start, end })

const SpareFlyers = []

days.forEach((day) => {
  const daySorties = Sorties.filter((sortie) =>
    isSameDay(day, sortie.projected_launch)
  )

  const busyAircrafts = daySorties.map((sortie) => sortie.aircraft_id)

  const availableAircrafts = Aircrafts.filter(
    (aircraft) => !busyAircrafts.includes(aircraft.id)
  )

  const aircraft_id = faker.helpers.arrayElement(availableAircrafts).id
  const date = day

  SpareFlyers.push({ aircraft_id, date })
})

export default SpareFlyers
