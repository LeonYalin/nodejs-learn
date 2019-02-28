const genders = { M: 'm', F: 'f' };

const persons = [{
  firstName: 'Leon', lastName: 'Yalin', birthday: new Date('1986-01-03'), age: 33, gender: genders.M,
}, {
  firstName: 'Nelly', lastName: 'Yalin', birthday: new Date('1987-12-03'), age: 31, gender: genders.F,
}, {
  firstName: 'Lisa', lastName: 'Yalin', birthday: new Date('2018-06-19'), age: 0, gender: genders.F,
}];

module.exports = { genders, persons };
