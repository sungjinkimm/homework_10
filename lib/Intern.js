
const Employee = require("./Employee")

class Intern extends Employee {
  constructor(name, email, id, school) {
    super(name, "Intern", email, id, school);
    this.school = school;
  }

  getSchool(){
    return this.school;
  };
    
}

module.exports = Intern;