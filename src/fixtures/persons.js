const genders = { M: 'm', F: 'f' };

const persons = [{
  firstName: 'Leon', lastName: 'Yalin', birthday: new Date('1986-01-03'), age: 33, gender: genders.M, img: 'https://cdn.vox-cdn.com/thumbor/g37mpxAYAlTnGSaHqNx193O1NWQ=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/53734993/the_matrix_neo_agent_smith_1920.0.jpg',
}, {
  firstName: 'Nelly', lastName: 'Yalin', birthday: new Date('1987-12-03'), age: 31, gender: genders.F, img: 'https://cdn.images.express.co.uk/img/dynamic/36/590x/Titanic-kiss-best-film-all-time-750749.jpg',
}, {
  firstName: 'Lisa', lastName: 'Yalin', birthday: new Date('2018-06-18'), age: 0, gender: genders.F, img: 'http://images6.fanpop.com/image/polls/1309000/1309095_1385684135906_full.png?',
}];

module.exports = { genders, persons };
