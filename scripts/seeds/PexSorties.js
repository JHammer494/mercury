// import { faker } from '@faker-js/faker'
// import Units from './Units'
// import Configs from './Configs'
// import { nextMonday } from 'date-fns'

// const capitalize = (str) => str[0].toUpperCase() + str.slice(1)
// const PexSorties = []
// let counter = 1

// let projectedLand, projectedLaunch, id, requiredFuel, config, animal, callSign

// //Generates Sorties for the Current and 1 Week in the Past
// for (let i = 0; i <= 30; i++) {
//   id = counter
//   requiredFuel = faker.datatype.number({ min: 180, max: 295 })
//   config = faker.helpers.arrayElement(Configs)
//   animal = faker.animal[faker.animal.type()]().split(' ')
//   callSign =
//     capitalize(faker.word.adjective()) +
//     ' ' +
//     capitalize(animal[animal.length - 1])

//   //Sortie is planned for the future
//   projectedLaunch = faker.date.soon(7, nextMonday(new Date()))
//   projectedLand = faker.date.soon(0.25, projectedLaunch)

//   PexSorties.push({
//     id: id,
//     projected_launch: projectedLaunch,
//     projected_land: projectedLand,
//     unit_id: faker.helpers.arrayElement(Units).id,
//     required_fuel: requiredFuel,
//     config: config,
//     aircraft_id: null,
//     call_sign: callSign,
//   })
//   counter++
// }
// //Generates 3 Unassigned Sorties for the Following Week

// for (let x = 0; x < 3; x++) {
//   const animal = faker.animal[faker.animal.type()]().split(' ')
//   const callSign =
//     capitalize(faker.word.adjective()) +
//     ' ' +
//     capitalize(animal[animal.length - 1])
//   PexSorties.push({
//     id: counter,
//     projected_launch: faker.date.soon(7, nextMonday(new Date())),
//     projected_land: faker.date.soon(0.25, projectedLaunch),
//     unit_id: faker.helpers.arrayElement(Units).id,
//     required_fuel: faker.datatype.number({ min: 180, max: 295 }),
//     config: faker.helpers.arrayElement(Configs),
//     call_sign: callSign,
//   })
//   counter++
// }

// export default PexSorties
