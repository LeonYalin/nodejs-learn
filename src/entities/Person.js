class Person {
  constructor(firstName = '', lastName = '', birthday = '', age = 0, gender = 'm', img = '') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.age = age;
    this.gender = gender;
    this.img = img;
  }

  toString() {
    return `Person[firstName='${this.firstName}','lastName='${this.lastName}','birthday='${this.birthday}',age=${this.age},gender='${this.gender}',img='${this.img}']`;
  }
}

module.exports = Person;
