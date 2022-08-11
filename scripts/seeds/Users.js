import { faker } from '@faker-js/faker'
import Shops from './Shops'

const Users = [
  {
    email: 'admin',
    hashedPassword:
      'f092a10048e092741da10fd98cabf78dc8dc025a25a47c9429be77f129f8311c',
    salt: '6520208ae3ad5c3b8b8d63ce6690e036',
    roles: 'admin',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    shop_id: faker.helpers.arrayElement(Shops).id,
  },
  {
    email: 'moo',
    hashedPassword:
      '9804f164c69acfdb0fb30078193cba5d11426d6f4bb8daafc175e4bc6052de74',
    salt: 'd4f4384d730798033afda9026b926dda',
    roles: 'moo',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    shop_id: faker.helpers.arrayElement(Shops).id,
  },
  {
    email: 'moc',
    hashedPassword:
      '22d30250cf1848870186a7ec43cc8f9e44d86657bba383ccb89f7e6267ca5858',
    salt: '3745683a4aa99756e79e2cdec18621fe',
    roles: 'moc',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    shop_id: faker.helpers.arrayElement(Shops).id,
  },
  {
    email: 'leadprosuper',
    hashedPassword:
      '8d8c1e0de872f528b6b93b89499f1b27c967e3aac549590530ec5673a19c377b',
    salt: '6638659fd6a94cc1805f13ee5339bc5a',
    roles: 'lead pro super',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    shop_id: faker.helpers.arrayElement(Shops).id,
  },
  {
    email: 'prosuper',
    hashedPassword:
      'c2f2d75bbda82d55ea2f3be42600de13af3b4cfadb672c67039199e4747ee295',
    salt: '19dacfce15f473fdf6b5dcb963042917',
    roles: 'pro super',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    shop_id: faker.helpers.arrayElement(Shops).id,
  },
  {
    email: 'debrief',
    hashedPassword:
      '1720bdecb6d04e29009d782ca28fe317150483c0e52903c1076ac4f320be09ab',
    salt: 'c336729ce98ba36ac00896f1015edf42',
    roles: 'debrief',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    shop_id: faker.helpers.arrayElement(Shops).id,
  },
  {
    email: 'expo',
    hashedPassword:
      'c4d8c3c78fffb2795d84623e270adf7e451092b20b60b8a770db37f5c98ad6f7',
    salt: '816f5f884a380280e46f3bbf268bfffa',
    roles: 'expeditor',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    shop_id: faker.helpers.arrayElement(Shops).id,
  },
  {
    email: 'boot',
    hashedPassword:
      '3f96accbb22e1820d73488106659d06c9614d98250b3b3b9b8b6dee7cd1cbb69',
    salt: 'e647c0e1032c6ad5020fd34f45df467b',
    first_name: faker.name.firstName(),
    shop_id: faker.helpers.arrayElement(Shops).id,
    last_name: 'Snuffy',
  },
]

export default Users
