const genders = { M: 'm', F: 'f' };

const persons = [{
  firstName: 'Bruce', lastName: 'Lee', birthday: new Date('1973-07-20'), age: 32, gender: genders.M, img: '/img/bruce.png',
}, {
  firstName: 'Arnold', lastName: 'Schwarzenegger', birthday: new Date('1947-07-30'), age: 72, gender: genders.M, img: '/img/arnold.jpg',
}, {
  firstName: 'Jason', lastName: 'Statham', birthday: new Date('1967-07-26'), age: 51, gender: genders.M, img: '/img/jason.jpg',
}];

module.exports = { genders, persons };
