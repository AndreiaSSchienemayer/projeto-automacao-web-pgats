import { faker } from '@faker-js/faker'
import { first } from 'lodash';

function getRandomNumber(){
    return new Date().getTime()
}
export default getRandomNumber();


export function createRandomUser() {
  return {
    name: faker.internet.username(),
    email: faker.internet.email()      
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 5,
});