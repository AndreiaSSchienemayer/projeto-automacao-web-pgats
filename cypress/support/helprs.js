import { faker } from '@faker-js/faker'

export function getRandomNumber(){
    //return new Date().getTime()
    //return faker.number.bigInt()
    return faker.number.hex({min: 10000, max: 65535})
    
}

export function getRandonEmail(){
  return `qa-tester-${getRandomNumber()}@test.com.br`
}




export function createRandomUser() {
  return {
    name: faker.internet.username(),
    email: faker.internet.email()      
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 5,
});